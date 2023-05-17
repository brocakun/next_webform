import { WebformContext } from './utils';
import * as React from 'react';
import { useContext } from 'react';
import WebformDebug from './components/WebformDebug';
import { WebformElementProps } from './types';

export const WebformElement = (props: WebformElementProps) => {
  const { registry } = useContext(WebformContext);
  const { element, error } = props;

  // Render using custom component if provided:
  if (registry.getComponent(element['#type'])) {
    const CustomComponent = registry.getComponent(element['#type']);
    return <CustomComponent {...props} />;
  } else {
    return <WebformDebug element={element} error={error} />;
  }
};

export default WebformElement;
