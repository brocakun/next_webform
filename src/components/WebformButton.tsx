import * as React from 'react';
import withAttributes from './utils/withAttributes';

const WebformButton = ({ element, fieldProps }) => {
  return (
    <button type="button" {...fieldProps}>
      {element['#value']}
    </button>
  );
};

export default withAttributes(WebformButton);
