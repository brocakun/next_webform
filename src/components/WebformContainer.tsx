import * as React from 'react';
import { useContext } from 'react';
import { WebformElementProps } from '../types';
import withAttributes from './utils/withAttributes';
import withStates from './utils/withStates';
import { getChildElements, WebformContext } from '../utils';
import WebformElement from '../WebformElement';
import withWrapper from './utils/withWrapper';

const WebformContainer = ({ element, fieldProps }: WebformElementProps) => {
  const { data, setData, errors } = useContext(WebformContext);

  const childElements = getChildElements(element).map((key) => {
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
    <>
      <div {...fieldProps}>{childElements}</div>
    </>
  );
};

export default withStates(
  withAttributes(
    withWrapper(WebformContainer, { defaultWrapperType: 'container' }),
  ),
);
