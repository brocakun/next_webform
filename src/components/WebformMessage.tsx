import * as React from 'react';

export const WebformMessage = ({ element, error }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: element['#message_message']['#markup'],
      }}
    />
  );
};

export default WebformMessage;
