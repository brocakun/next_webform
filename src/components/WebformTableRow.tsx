import * as React from 'react';
import withAttributes, { normalizeAttributes } from './utils/withAttributes';
import { getChildElements, WebformContext } from '../utils';
import WebformElement from '../WebformElement';
import { useContext } from 'react';
import { PropsType, WebformElementProps } from '../types';

export interface WebformTableRowProps extends WebformElementProps {
  tdProps?: PropsType;
}

const WebformTableRow = ({
  element,
  error,
  fieldProps = {},
  tdProps = {},
}: WebformTableRowProps) => {
  const { data, setData } = useContext(WebformContext);
  return (
    <tr {...fieldProps}>
      {getChildElements(element).map((key) => {
        const rowAndChildStates = element['#states']
          ? {
              ...element[key]['#states'],
              ...element['#states'],
            }
          : null;
        const parentAndRowAndChildStates = element['#states']
          ? Object.assign({}, rowAndChildStates, element['#states'])
          : rowAndChildStates;
        return (
          <td
            {...{
              ...tdProps,
              ...normalizeAttributes(element[key]['#wrapper_attributes'] ?? {}),
            }}
            key={key}
          >
            <WebformElement
              element={{
                ...(parentAndRowAndChildStates
                  ? {
                      '#states': parentAndRowAndChildStates,
                      ...element[key],
                    }
                  : element[key]),
                // Make sure `#wrapper_attributes` is only applied once.
                '#wrapper_attributes': [],
              }}
              error={error}
              key={key}
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
          </td>
        );
      })}
    </tr>
  );
};

export default withAttributes(WebformTableRow);
