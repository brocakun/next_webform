import * as React from 'react';
import WebformElementWrapper from '../components/wrappers/WebformElementWrapper';

// Example custom component
export const WebformHeight = ({ element, error, value, setValue }) => {
  const onChangeHandler = async (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <WebformElementWrapper
      labelFor={element['#key']}
      label={element['#title']}
      isRequired={element['#required']}
      access={element['#access']}
      settings={null}
      error={error}
    >
      <div style={{ display: 'inline-flex', alignItems: 'center' }}>
        <input
          type="number"
          name="feet"
          min={0}
          max={8}
          onChange={(e) => onChangeHandler(e)}
        />
        <label style={{ padding: '0.5em' }}>feet</label>
        <input
          type="number"
          name="inches"
          min={0}
          max={11}
          onChange={(e) => onChangeHandler(e)}
        />
        <label style={{ padding: '0.5em' }}>inches</label>
      </div>
    </WebformElementWrapper>
  );
};
