import * as React from 'react';
import withDefaultValue from './utils/withDefaultValue';
import withAttributes from './utils/withAttributes';
import withStates from './utils/withStates';
import withWrapper from './utils/withWrapper';

const supportedTypes = {
  number: 'number',
  hidden: 'hidden',
  email: 'email',
  search: 'search',
  tel: 'tel',
  url: 'url',
  textfield: 'text',
};

export const WebformText = ({ element, value = '', setValue, fieldProps }) => {
  if (!(element['#type'] in supportedTypes)) {
    console.warn(
      `${element['#type']} which was used on ${element['#webform_key']} is not supported by WebformText.`,
    );
  }

  const onChangeHandler = async (e) => {
    setValue(e.target.value);
  };

  return (
    <>
      <input
        type={supportedTypes[element['#type']] ?? element['#type']}
        name={element['#name']}
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
  withDefaultValue(withAttributes(withWrapper(WebformText))),
);
