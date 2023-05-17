import * as React from 'react';
import withDefaultValue from './utils/withDefaultValue';
import withAttributes from './utils/withAttributes';
import withStates from './utils/withStates';
import withWrapper from './utils/withWrapper';

const WebformTextArea = ({ element, value = '', setValue, fieldProps }) => {
  const onChangeHandler = async (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <textarea
        name={element['#webform_key']}
        value={value}
        onChange={(e) => onChangeHandler(e)}
        disabled={element['#disabled']}
        hidden={!element['#access']}
        required={element['#required']}
        readOnly={element['#readonly']}
        placeholder={element['#placeholder']}
        {...fieldProps}
        id={element['#id']}
      />
    </>
  );
};

export default withStates(
  withDefaultValue(withAttributes(withWrapper(WebformTextArea))),
);
