import * as React from 'react';
import withDefaultValue from './utils/withDefaultValue';
import withAttributes from './utils/withAttributes';
import withStates from './utils/withStates';
import withWrapper from './utils/withWrapper';

const WebformTime = ({ element, setValue, value = '', fieldProps }) => {
  const onChangeHandler = async (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <input
        type="time"
        name={element['#name']}
        onChange={(e) => onChangeHandler(e)}
        disabled={element['#disabled']}
        hidden={!element['#access']}
        required={element['#required']}
        readOnly={element['#readonly']}
        value={value}
        {...fieldProps}
        id={element['#id']}
        min={element['#date_time_min'] ?? null}
        max={element['#date_time_max'] ?? null}
      />
    </>
  );
};

export default withStates(
  withDefaultValue(withAttributes(withWrapper(WebformTime))),
);
