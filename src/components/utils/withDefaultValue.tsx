import * as React from 'react';
import { useEffect } from 'react';

const withDefaultValue = (EnhancedComponent) => {
  return function WebformElementWithDefaultValue(props) {
    useEffect(() => {
      if (
        !props.value &&
        props.element['#default_value'] &&
        !props.element['#default_value']['headers']
      ) {
        props.setValue(props.element['#default_value']);
      }
    }, []);

    return <EnhancedComponent {...props} />;
  };
};

export default withDefaultValue;
