import WebformElementWrapper from './wrappers/WebformElementWrapper';
import * as React from 'react';
import withStates from './utils/withStates';
import withDefaultValue from './utils/withDefaultValue';
import withAttributes from './utils/withAttributes';
import withWrapper from './utils/withWrapper';

const WebformMarkup = ({
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
      <div
        {...fieldProps}
        id={element['#webform_key']}
        dangerouslySetInnerHTML={{
          __html: element['#markup'],
        }}
      />
    </WebformElementWrapper>
  );
};

export default withStates(
  withDefaultValue(
    withAttributes(
      withWrapper(WebformMarkup, {
        wrapperProps: {
          style: {
            display: 'flex',
          },
        },
      }),
    ),
  ),
);
