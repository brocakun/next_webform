import * as React from 'react';
import WebformElement from '../WebformElement';
import { getChildElements, getIndexOfMultiValue } from '../utils';
import withDefaultValue from './utils/withDefaultValue';
import withWrapper from './utils/withWrapper';

const WebformComposite = ({ element, error, value, setValue }) => {
  const compositeElements = getChildElements(element);
  return (
    <>
      {compositeElements.map((name) => {
        return (
          <WebformElement
            key={name}
            element={{
              // Ensure that all child elements have '#webform_key' and '#states' defined.
              '#webform_key': element['#webform_key'],
              '#states': element['#states'],
              ...element[name],
              '#id': element['#webform_multiple']
                ? `${element[name]['#id']}${getIndexOfMultiValue(
                    element['#webform_key'],
                  )}`
                : element[name]['#id'],
            }}
            value={value && value[name] ? value[name] : ''}
            setValue={(newValue) => {
              setValue({ ...value, [name]: newValue });
            }}
            error={error ? error[name] : null}
          />
        );
      })}
    </>
  );
};

export default withDefaultValue(
  withWrapper(WebformComposite, {
    displayErrors: false,
    defaultWrapperType: 'fieldset',
  }),
);
