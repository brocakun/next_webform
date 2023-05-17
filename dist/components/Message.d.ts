import * as React from 'react';
export type messagePropTypes = {
    children: React.ReactNode;
    type: 'error' | 'warning' | 'status' | 'success';
};
declare const Message: ({ children, type }: messagePropTypes) => JSX.Element;
export default Message;
