import * as React from 'react';
import withStates from './utils/withStates';
import withWrapper from './utils/withWrapper';
import withAttributes from './utils/withAttributes';
import withDefaultValue from './utils/withDefaultValue';

const WebformRange = ({ element, value = 0, setValue, fieldProps }) => {
  const onChangeHandler = async (e) => {
    setValue(e.target.value);
  };
  const styles = {
    below: {
      transform: `translateX(${value}px)`,
      display: 'block',
      position: 'absolute',
      padding: '2px 5px',
      textAlign: 'center',
      border: '1px solid #bbb',
      background: '#ededed',
    },
    above: {
      transform: `translateX(${value}px)`,
      display: 'block',
      position: 'absolute',
      padding: '2px 5px',
      textAlign: 'center',
      border: '1px solid #bbb',
      background: '#ededed',
      bottom: '22px',
    },
    left: {
      marginRight: '5px',
    },
    right: {
      marginLeft: '5px',
    },
  };

  // Styling is different based on user defined output position.
  const outputElement = (
    <output
      htmlFor={element['#id']}
      style={styles[element['#output']]}
      name="result"
    >
      {value}
    </output>
  );

  return (
    <div
      className="form-type-range"
      style={{ display: 'block', position: 'relative' }}
    >
      {element['#output'] && element['#output'] === 'left'
        ? outputElement
        : null}
      <input
        type={element['#type']}
        name={element['#webform_key']}
        min={element['#min'] ? element['#min'] : null}
        max={element['#max'] ? element['#max'] : null}
        onChange={(e) => onChangeHandler(e)}
        disabled={element['#disabled']}
        hidden={!element['#access']}
        required={element['#required']}
        readOnly={element['#readonly']}
        {...fieldProps}
        id={element['#id']}
        value={value}
      />
      {element['#output'] && element['#output'] !== 'left'
        ? outputElement
        : null}
    </div>
  );
};

export default withStates(
  withDefaultValue(withAttributes(withWrapper(WebformRange))),
);
