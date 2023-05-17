import * as React from 'react';
import WebformElement from '../WebformElement';
import { getChildElements } from '../utils';
import { useEffect } from 'react';
import WebformMultifield from './WebformMultifield';
import WebformElementWrapper from './wrappers/WebformElementWrapper';

export const WebformCustomComposite = ({
  element,
  error,
  value,
  setValue,
  labelProps,
}) => {
  const compositeElements = getChildElements(element['#element']);
  const isMulti = !!element['add'];

  useEffect(() => {
    // The custom composite component handles setting default value.
    if (element['#default_value'] && Array.isArray(element['#default_value'])) {
      setValue(element['#default_value']);
    } else {
      setValue([{}]);
    }
  }, []);

  return (
    <>
      {isMulti ? (
        <>
          <WebformMultifield
            element={element}
            value={value}
            setValue={setValue}
            error={error}
          />
        </>
      ) : (
        <WebformElementWrapper
          label={element['#title']}
          labelDisplay={element['#title_display']}
          access={element['#access']}
          isRequired={false}
          error={error}
        >
          {compositeElements.map((name, index) => {
            const elementItem = element.items['0'][name];
            return (
              <WebformElement
                key={index}
                element={{
                  ...elementItem,
                  // Ensure that all child elements have '#webform_key' and '#states' defined.
                  '#webform_key': name,
                  '#states': element['#_webform_states'],
                  '#id': elementItem['#id'],
                  '#default_value': undefined,
                }}
                value={value && value[0][name] ? value[0][name] : ''}
                setValue={(newValue) => {
                  // A single value custom composite element needs to be an object
                  // wrapped in an array [{}]. So check first if the object
                  // exists yet and if so, create a new object with the existing object and the new value.
                  // Otherwise, create an object with the new key and value inside an array.
                  if (value && value[0]) {
                    setValue([{ ...value[0], [name]: newValue }]);
                  } else {
                    setValue([{ [name]: newValue }]);
                  }
                }}
                error={error ? error[name] : null}
                labelProps={labelProps}
              />
            );
          })}
        </WebformElementWrapper>
      )}
    </>
  );
};

export default WebformCustomComposite;
