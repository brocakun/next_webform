import * as React from 'react';

export type messagePropTypes = {
  children: React.ReactNode;
  type: 'error' | 'warning' | 'status' | 'success';
};
const Message = ({ children, type }: messagePropTypes) => {
  return <div>{children}</div>;
};

export default Message;
