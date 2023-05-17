import * as React from 'react';
import withDefaultValue from './utils/withDefaultValue';
import withStates from './utils/withStates';

const WebformItem = ({ element }) => {
  return element['#access'] === false ? null : (
    <div>
      <label>{element['#title']}</label>
    </div>
  );
};

export default withStates(withDefaultValue(WebformItem));
