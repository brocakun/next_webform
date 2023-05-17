import * as React from 'react';

export const WebformMarkup = ({ element, error }) => {
  return <div dangerouslySetInnerHTML={{ __html: element['#markup'] }} />;
};

export default WebformMarkup;
