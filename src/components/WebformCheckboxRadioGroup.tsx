import * as React from 'react';
import { useEffect, useState } from 'react';
import { WebformElementProps } from '../types';
import withStates from './utils/withStates';
import withWrapper from './utils/withWrapper';
import WebformElement from '../WebformElement';
import { getChildElements } from '../utils';
import withAttributes from './utils/withAttributes';

const supportedTypes = {
  radios: 'radio',
  checkboxes: 'checkbox',
  webform_radios_other: 'radio',
  webform_checkboxes_other: 'checkbox',
  webform_entity_checkboxes: 'checkbox',
  webform_entity_radios: 'radio',
};

// Component for checkboxes or radio buttons that are an options list.
const WebformCheckboxRadioGroup = ({
  element,
  value = [],
  setValue,
  error,
  fieldProps,
}: WebformElementProps) => {
  if (!(element['#type'] in supportedTypes)) {
    throw new Error(
      `${element['#type']} which was used on ${element['#webform_key']} is not supported by WebformCheckboxRadioGroup.`,
    );
  }

  const [valueOther, setValueOther] = useState(null);
  const [showInputForOther, setShowInputForOther] = useState(false);

  const type = supportedTypes[element['#type']];
  const withOther =
    element['#type'] === 'webform_checkboxes_other' ||
    element['#type'] === 'webform_radios_other';
  const elementForOther = withOther ? element['other'] : null;

  function getOptions() {
    let options = {};
    const finalOptions = {};
    if (withOther) {
      for (const key of Object.keys(element)) {
        if (key === 'radios' || key === 'checkboxes') {
          options = element[key];
        }
      }
    } else {
      options = element;
    }

    for (const option of Object.keys(options['#options'])) {
      if (option !== '_other_') {
        finalOptions[option] = options['#options'][option];
      }
    }
    return finalOptions;
  }

  const options = getOptions();

  useEffect(() => {
    if (element['#default_value'] && !element['#default_value']['headers']) {
      setValue(element['#default_value']);

      const defaultValues =
        typeof element['#default_value'] === 'string'
          ? [element['#default_value']]
          : element['#default_value'];
      const normalizedDefaultValues = defaultValues.filter((option) => {
        return Object.hasOwn(options, option);
      });

      if (type === 'checkbox') {
        setValue(normalizedDefaultValues);
      }

      if (
        withOther &&
        Object.keys(defaultValues).length !==
          Object.keys(normalizedDefaultValues).length
      ) {
        for (const defaultValue of defaultValues) {
          if (!Object.hasOwn(options, defaultValue)) {
            setValueOther(defaultValue);
          }
        }
      }
    }
  }, []);

  useEffect(() => {
    if (valueOther && type === 'checkbox') {
      setValue([...(Array.isArray(value) ? value : []), valueOther]);
    } else if (valueOther && type === 'radio') {
      setValue(valueOther);
    }
  }, [valueOther]);

  const childElements = getChildElements(element).map((name) => {
    // Option lists without an 'Other' option.
    if (name !== 'other' && name !== 'radios' && name !== 'checkboxes') {
      return (
        <WebformElement
          key={name}
          element={{
            ...element[name],
            '#webform_key': element['#webform_key'],
            '#states': element['#states'],
            '#access': element['#access'],
          }}
          fieldProps={fieldProps}
          setValue={(newValue) => {
            if (
              element['#type'] === 'checkboxes' ||
              element['#type'] === 'webform_entity_checkboxes'
            ) {
              if (newValue === true) {
                setValue([
                  ...(Array.isArray(value) ? value : []),
                  element[name]['#return_value'],
                ]);
              } else {
                if (Array.isArray(value) && value.length) {
                  const filtered = value.filter(
                    (i) => i !== element[name]['#return_value'],
                  );
                  setValue(filtered);
                }
              }
            } else {
              setValue(element[name]['#return_value']);
            }
          }}
          value={
            (Array.isArray(value) &&
              value.includes(element[name]['#return_value'])) ||
            value === element[name]['#return_value']
          }
          error={error}
        />
      );
      // The element has an 'Other' option if the child element key is 'checkboxes' or 'radios' so we need to
      // go one level deeper to get the list of options.
    } else if (name == 'checkboxes' || name == 'radios') {
      return getChildElements(element[name]).map((option) => {
        return (
          <WebformElement
            fieldProps={fieldProps}
            key={option}
            element={{
              ...element[name][option],
              '#webform_key': element['#webform_key'],
              '#states': element['#states'],
              '#access': element['#access'],
            }}
            setValue={(newValue) => {
              if (element[name][option]['#type'] === 'checkbox') {
                if (element[name][option]['#return_value'] === '_other_') {
                  if (newValue) {
                    setValueOther(valueOther ?? '');
                    setShowInputForOther(true);
                  } else {
                    setShowInputForOther(false);
                    setValueOther(null);
                  }
                } else {
                  if (newValue === true) {
                    setValue([
                      ...(Array.isArray(value) ? value : []),
                      element[name][option]['#return_value'],
                    ]);
                  } else {
                    if (Array.isArray(value) && value.length) {
                      const filtered = value.filter(
                        (i) => i !== element[name][option]['#return_value'],
                      );
                      setValue(filtered);
                    }
                  }
                }
              } else {
                if (element[name][option]['#return_value'] === '_other_') {
                  setValueOther(valueOther ?? '');
                  setValue(valueOther ?? '');
                  setShowInputForOther(true);
                } else {
                  setShowInputForOther(false);
                  setValueOther(null);
                  setValue(element[name][option]['#return_value']);
                }
              }
            }}
            value={
              (Array.isArray(value) &&
                value.includes(element[name][option]['#return_value'])) ||
              value === element[name][option]['#return_value'] ||
              (element[name][option]['#return_value'] === '_other_' &&
                showInputForOther)
            }
            error={error}
          />
        );
      });
    }
  });

  return (
    <>
      {childElements}
      {withOther && showInputForOther ? (
        <WebformElement
          element={{
            ...element,
            '#type': elementForOther['#type'],
            '#webform_key': element['#webform_key'],
            '#title': elementForOther['#title'],
            '#description': elementForOther['#description'],
            '#id': `${element['#id']}-other-input`,
          }}
          value={valueOther}
          setValue={(newValue) => {
            setValueOther(newValue as string);
          }}
        />
      ) : null}
    </>
  );
};
export default withStates(
  withAttributes(
    withWrapper(WebformCheckboxRadioGroup, {
      defaultWrapperType: 'fieldset',
      labelFor: false,
    }),
  ),
);
