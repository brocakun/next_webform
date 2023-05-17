import { WebformCustomComponent } from '../types';
import * as React from 'react';
import withDefaultValue from './utils/withDefaultValue';
import { useEffect, useState } from 'react';
import withStates from './utils/withStates';
import withAttributes from './utils/withAttributes';
import withWrapper from './utils/withWrapper';

const WebformCheckbox: WebformCustomComponent = ({
  element,
  setValue,
  fieldProps,
  value,
}) => {
  if (element['#type'] !== 'checkbox' && element['#type'] !== 'radio') {
    console.warn(
      `${element['#type']} which was used on ${element['#webform_key']} is not supported by WebformCheckbox.`,
    );
  }

  const [checkedState, setCheckedState] = useState(
    value ?? (element['#checked'] ? element['#checked'] : false),
  );

  // Update component state when value changes in upstream state.
  useEffect(() => {
    if (typeof value === 'boolean') {
      setCheckedState(value);
    }
  }, [value]);

  const onChangeHandler = async (e) => {
    setValue(e.target.checked);
  };

  return (
    <>
      <div>
        <input
          type={element['#type']}
          name={element['#name']}
          onChange={(e) => onChangeHandler(e)}
          disabled={element['#disabled']}
          hidden={!(element['#access'] ? element['#access'] : true)}
          required={element['#required']}
          readOnly={element['#readonly']}
          checked={checkedState}
          id={element['#id']}
          {...fieldProps}
          value={element['#return_value']}
        />
      </div>
    </>
  );
};

export default withStates(
  withDefaultValue(
    withAttributes(
      withWrapper(WebformCheckbox, {
        wrapperProps: {
          style: {
            display: 'flex',
          },
        },
      }),
    ),
  ),
);
