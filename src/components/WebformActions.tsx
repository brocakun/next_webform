import * as React from 'react';
import { useContext } from 'react';
import { WebformContext } from '../utils';

const WebformActions = ({ element, wrapperProps }) => {
  const buttons = [];
  const { registry, setData } = useContext(WebformContext);

  const supportedButtons = {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    submit: () => {},
    reset: (e) => {
      e.preventDefault();
      setData(() => {
        return {};
      });
    },
  };

  const WebformButton = registry.getComponent('button');
  Object.keys(supportedButtons).forEach((key) => {
    if (element[key]) {
      buttons.push(
        <WebformButton
          element={element[key]}
          fieldProps={{ type: 'submit', onClick: supportedButtons[key] }}
          key={key}
        />,
      );
    }
  });

  return <div {...wrapperProps}>{buttons}</div>;
};

export default WebformActions;
