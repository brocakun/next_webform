import * as React from 'react';
import { useEffect, useState, useRef } from 'react';
import deepmerge from 'deepmerge';
import {
  ErrorObjectType,
  setDataFn,
  WebformDataType,
  WebformProps,
  FieldRegistry,
  StatusType,
  setStatusFn,
} from './types';
import {
  WebformContext,
  useConstructor,
  arrayMerge,
  isFunction,
  setIn,
} from './utils';
import { defaultOnSubmit } from './next/utils';
import { defaultComponentRegistry } from './components';

export class WebformError extends Error {
  response: string;

  constructor(response: string) {
    super();

    this.response = response;
  }
}

/**
 * Errors returned by Drupal.
 */
export type WebformErrors = {
  [name: string]: string;
};

export const Webform = ({
  data: webformObject,
  id,
  sid,
  customComponents = {},
  onSubmit: customOnSubmit,
  apiUrl = '/api/webform',
  validate,
  ...formProps
}: WebformProps) => {
  const componentRegistry = defaultComponentRegistry;
  useConstructor(() => {
    // Register components on the initial load.
    Object.keys(customComponents).forEach((key) => {
      componentRegistry.setComponent(key, customComponents[key]);
    });
  });
  // Update component library when `customComponents` changes. This ensures that
  // the component library is kept in a consistent state with hot module
  // replacement.
  useEffect(() => {
    Object.keys(customComponents).forEach((key) => {
      componentRegistry.setComponent(key, customComponents[key]);
    });
  }, [customComponents]);

  const [errors, setErrors] = useState<ErrorObjectType>({});
  const [status, setStatus]: [StatusType, setStatusFn] = useState();
  const [data, setData]: [WebformDataType, setDataFn] = useState({});

  const fieldRegistry = useRef<FieldRegistry>({});
  const registerField = React.useCallback((name: string, { validate }: any) => {
    fieldRegistry.current[name] = {
      validate,
    };
  }, []);

  const unregisterField = React.useCallback((name: string) => {
    delete fieldRegistry.current[name];
  }, []);

  const onSubmit = customOnSubmit ? customOnSubmit : defaultOnSubmit;

  const WebformForm = componentRegistry.getComponent('form_layout');
  const Message = componentRegistry.getComponent('message');

  const runSingleFieldLevelValidation = (
    field: string,
    value: void | string,
  ): Promise<string> => {
    return new Promise((resolve) =>
      resolve(fieldRegistry.current[field].validate(value) as string),
    );
  };

  const runFieldValidators = (values: WebformDataType) => {
    const fieldKeysWithValidation: string[] = Object.keys(
      fieldRegistry.current,
    ).filter((key) => isFunction(fieldRegistry.current[key].validate));
    const fieldValidations: Promise<string>[] = fieldKeysWithValidation.map(
      (key) => runSingleFieldLevelValidation(key, values[key] as string),
    );
    return Promise.all(fieldValidations).then((fieldErrorsList: string[]) => {
      return fieldErrorsList.reduce(
        (previousValue, currentValue, currentIndex) => {
          if (currentValue === undefined) {
            return previousValue;
          }

          setIn(
            previousValue,
            fieldKeysWithValidation[currentIndex],
            currentValue,
          );
          return previousValue;
        },
        {},
      );
    });
  };

  const runValidators = (values: WebformDataType) => {
    return Promise.all([
      runFieldValidators(values),
      validate ? validate(values) : {},
    ]).then(([fieldErrors, validateErrors]) => {
      return deepmerge.all([fieldErrors, validateErrors], { arrayMerge });
    });
  };

  return (
    <form
      {...formProps}
      onSubmit={(event) => {
        event.preventDefault();
        runValidators(data).then((combinedErrors: WebformErrors) => {
          if (Object.keys(combinedErrors).length !== 0) {
            setStatus('error');
            setErrors(combinedErrors);
          } else {
            onSubmit({
              id,
              sid,
              event,
              data,
              setData,
              setStatus,
              setErrors,
              apiUrl,
            });
          }
        });
      }}
    >
      {status === 'error' ? (
        <Message type="error">An error occurred. Please try again.</Message>
      ) : null}

      <WebformContext.Provider
        value={{
          id,
          apiUrl,
          data,
          setData,
          setStatus,
          errors,
          registry: componentRegistry,
          registerField,
          unregisterField,
        }}
      >
        <WebformForm webform={webformObject} status={status} />
      </WebformContext.Provider>
    </form>
  );
};
