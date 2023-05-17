import * as React from 'react';
import WebformElementWrapper from '../wrappers/WebformElementWrapper';
import WebformFieldsetWrapper from '../wrappers/WebformFieldsetWrapper';
import { WebformElementType } from '../../types';

export type customConfigFn = (element: WebformElementType) => object;
const withWrapper = (
  EnhancedComponent,
  customConfig: object | customConfigFn = {},
) => {
  return function WebformElementWithWrapper(props) {
    const { element, error } = props;

    const config = {
      defaultWrapperType: 'form_element',
      displayErrors: true,
      labelFor: (element) => element['#id'],
      labelProps: {},
      wrapperProps: {},
      ...(typeof customConfig === 'function'
        ? customConfig(element)
        : customConfig),
    };
    const { labelFor, defaultWrapperType, displayErrors } = config;

    // Apply wrapper type based on render array, otherwise use the default
    // value.
    const wrapperType = element['#wrapper_type']
      ? element['#wrapper_type']
      : defaultWrapperType;

    // Label is only configurable for `form_element` wrappers because:
    //   - `legend` is a required child of `fieldset`.
    //   - `container` type is specifically used for not rendering the label.
    const labelDisplay =
      wrapperType === 'form_element' && element['#title']
        ? element['#title_display']
        : 'none';

    // Only render errors that are tied to the current element by checking if
    // the curent error is a string or React element.
    const hasValidError =
      typeof error === 'string' || React.isValidElement(error);

    const WrapperComponent =
      wrapperType !== 'fieldset'
        ? WebformElementWrapper
        : WebformFieldsetWrapper;

    // Allow components to retrieve the `labelFor` property value from the element.
    const getLabel = () => {
      if (typeof labelFor === 'function') {
        return labelFor(element);
      }
      return;
    };

    // Allow overriding label and wrapper props.
    const labelProps = {
      ...props.labelProps,
      ...config.labelProps,
    };
    const wrapperProps = {
      ...props.wrapperProps,
      ...config.wrapperProps,
    };

    return (
      <WrapperComponent
        label={element['#title']}
        isRequired={element['#required']}
        access={element['#access']}
        labelDisplay={labelDisplay}
        error={displayErrors && hasValidError ? error : undefined}
        labelProps={labelProps}
        description={
          element['#description'] ? (
            <div
              dangerouslySetInnerHTML={{
                __html: element['#description']['#markup'],
              }}
            />
          ) : undefined
        }
        descriptionDisplay={element['#description_display']}
        {...wrapperProps}
        labelFor={labelDisplay !== 'none' ? getLabel() : undefined}
      >
        <EnhancedComponent {...props} />
      </WrapperComponent>
    );
  };
};

export default withWrapper;
