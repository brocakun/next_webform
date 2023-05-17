import WebformElementWrapper from './wrappers/WebformElementWrapper';
import * as React from 'react';
import { PropsType } from '../types';
import withStates from './utils/withStates';
import { getChildElements } from '../utils';
import WebformElement from '../WebformElement';
import withAttributes, { normalizeAttributes } from './utils/withAttributes';
import { WebformTableRowProps } from './WebformTableRow';

export interface WebformTableProps extends WebformTableRowProps {
  theadProps?: PropsType;
  tbodyProps?: PropsType;
  trProps?: PropsType;
}

const WebformTable = ({
  element,
  error,
  wrapperProps = {},
  fieldProps = {},
  theadProps = {},
  tbodyProps = {},
  trProps = {},
  tdProps = {},
  labelProps,
}: WebformTableProps) => {
  const childElements = getChildElements(element).map((row) => {
    if (element[row]['#type'] !== 'webform_table_row') {
      return (
        <tr key={row}>
          <td>
            <div>
              The form element <em>{row}</em> is not inside a table row. To
              render the form element, it must be placed inside a table row.
            </div>
          </td>
        </tr>
      );
    }

    return (
      <WebformElement
        key={row}
        element={{ ...element[row], '#states': element['#states'] }}
        fieldProps={trProps}
        tdProps={tdProps}
      />
    );
  });

  const headers = element['#header'];

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
      <table {...fieldProps}>
        <thead {...theadProps}>
          <tr {...trProps}>
            {headers && headers.length
              ? headers.map((header, index) => {
                  const { data, ...attributes } = header;
                  return (
                    <th {...normalizeAttributes(attributes)} key={index}>
                      {data['#markup']}
                    </th>
                  );
                })
              : null}
          </tr>
        </thead>
        <tbody {...tbodyProps}>{childElements}</tbody>
      </table>
    </WebformElementWrapper>
  );
};

export default withStates(withAttributes(WebformTable));
