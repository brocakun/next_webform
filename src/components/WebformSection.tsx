import WebformElementWrapper from './wrappers/WebformElementWrapper';
import * as React from 'react';
import { WebformElementProps } from '../types';
import withAttributes from './utils/withAttributes';
import withStates from './utils/withStates';
import { getChildElements, WebformContext } from '../utils';
import WebformElement from '../WebformElement';
import { useContext } from 'react';

const WebformSection = ({
  element,
  error,
  labelProps,
  fieldProps,
  wrapperProps = {},
}: WebformElementProps) => {
  const { data, setData, errors } = useContext(WebformContext);

  const childElements = getChildElements(element).map((key) => {
    // Pass down the parent states down to the child elements. The parent state
    // will override the child state if there are any duplicate effects.
    const parentAndChildStates = element['#states']
      ? { ...element[key]['#states'], ...element['#states'] }
      : null;
    return (
      <WebformElement
        key={element[key]['#webform_key']}
        element={
          parentAndChildStates
            ? { ...element[key], '#states': parentAndChildStates }
            : element[key]
        }
        error={errors[element[key]['#webform_key']]}
        value={data[element[key]['#webform_key']]}
        setValue={(value) => {
          setData((previousData) => {
            return {
              ...previousData,
              [element[key]['#webform_key']]: value,
            };
          });
        }}
      />
    );
  });

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
    >
      <section {...fieldProps} style={fieldProps['style'] as object}>
        {childElements}
      </section>
    </WebformElementWrapper>
  );
};

export default withStates(withAttributes(WebformSection));
