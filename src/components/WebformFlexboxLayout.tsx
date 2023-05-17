import * as React from 'react';
import { WebformElementProps, PropsType } from '../types';
import withStates from './utils/withStates';
import { getChildElements, WebformContext } from '../utils';
import WebformElement from '../WebformElement';
import { useContext } from 'react';
import withWrapper from './utils/withWrapper';
import { normalizeAttributes } from './utils/withAttributes';

export type WebformFlexboxLayoutPropsType = {
  itemProps: PropsType;
} & WebformElementProps;
const WebformFlexboxLayout = ({
  element,
  itemProps = {},
}: WebformFlexboxLayoutPropsType) => {
  const { data, setData, errors } = useContext(WebformContext);
  const itemPropsWithDefaults = {
    style: {
      flexGrow: 1,
    },
    ...itemProps,
  };

  const childElements = getChildElements(element).map((key) => {
    const parentAndChildStates = element['#states']
      ? { ...element[key]['#states'], ...element['#states'] }
      : null;
    return (
      <div {...itemPropsWithDefaults} key={element[key]['#webform_key']}>
        <div key={element[key]['#webform_key']}>
          <WebformElement
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
        </div>
      </div>
    );
  });
  return <>{childElements}</>;
};

export default withStates(
  withWrapper(WebformFlexboxLayout, (element) => ({
    wrapperProps: {
      ...normalizeAttributes(element['#attributes'] ?? {}),
      style: {
        display: 'flex',
        boxSizing: 'border-box',
        gap: '1rem',
        justifyContent: element['#align_items'] ?? 'flex-start',
      },
    },
  })),
);
