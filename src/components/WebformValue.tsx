import WebformElementWrapper from './wrappers/WebformElementWrapper';
import * as React from 'react';
import withStates from './utils/withStates';

const WebformValue = ({
  element,
  error,
  fieldProps = {},
  labelProps = {},
  wrapperProps = {},
}) => {
  return (
    <WebformElementWrapper
      label={element['#title']}
      isRequired={element['#required']}
      labelDisplay={element['#title_display']}
      access={element['#access']}
      settings={null}
      error={error}
      labelProps={labelProps}
      {...wrapperProps}
      labelFor={element['#webform_key']}
    >
      <div {...fieldProps} id={element['#webform_key']}>
        {element['#value']}
      </div>
    </WebformElementWrapper>
  );
};

export default withStates(WebformValue);
