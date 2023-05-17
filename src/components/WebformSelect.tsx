import * as React from 'react';
import { useState } from 'react';
import withDefaultValue from './utils/withDefaultValue';
import withAttributes from './utils/withAttributes';
import withStates from './utils/withStates';
import withWrapper from './utils/withWrapper';

const WebformSelect = ({ element, setValue, value = '', fieldProps }) => {
  const [showOther, setShowOther] = useState(false);

  // Used to get the options for select other elements that have the options nested one level deeper.
  function getOptions() {
    let options = {};
    for (const key of Object.keys(element)) {
      if (key == 'select') {
        options = element[key];
      }
    }
    return options;
  }

  const optionsForOther =
    element['#type'] === 'webform_select_other' ? getOptions() : null;

  const onChangeHandler = async (e) => {
    if (e.target.value == 'Other') {
      setShowOther(!showOther);
    } else if (showOther) {
      setShowOther(!showOther);
      setValue(e.target.value);
    } else {
      setValue(e.target.value);
    }
  };

  const onInputHandler = async (e) => {
    setValue(e.target.value);
  };

  function sortOptions(options) {
    const arr = [];
    let title;
    for (const key of Object.keys(options)) {
      if (key.length) {
        arr.push(options[key]);
      } else {
        title = options[key];
      }
    }
    arr.unshift(title);
    return arr;
  }

  return (
    <>
      <select
        name={element['#name']}
        onChange={(e) => onChangeHandler(e)}
        value={value}
        disabled={element['#disabled']}
        hidden={!element['#access']}
        required={element['#required']}
        {...fieldProps}
        id={element['#id']}
      >
        {element['#webform_plugin_id'] == 'select' ||
        (typeof element['#webform_plugin_id'] === 'undefined' &&
          element['#type'] !== 'webform_select_other')
          ? sortOptions(element['#options']).map(
              (option: string | number, index) => {
                return (
                  <option value={option} key={index}>
                    {option}
                  </option>
                );
              },
            )
          : null}
        {element['#webform_plugin_id'] == 'webform_entity_select'
          ? Object.keys(element['#options']).map(
              (entityId: number | string) => {
                const entityName = element['#options'][entityId];
                return (
                  <option key={entityId} value={entityId}>
                    {entityName}
                  </option>
                );
              },
            )
          : null}
        {element['#type'] === 'webform_select_other' &&
        optionsForOther['#options'] ? (
          <>
            {Object.values(optionsForOther['#options']).map((option, index) => {
              if (option != 'Other…') {
                return (
                  <option value={option.toString()} key={index}>
                    {option}
                  </option>
                );
              }
            })}
            <option value="Other">Other...</option>
          </>
        ) : null}
      </select>
      {showOther ? (
        <input
          type="text"
          id={element['#webform_key']}
          name={element['#webform_key']}
          onInput={(e) => onInputHandler(e)}
          value={value}
        />
      ) : null}
    </>
  );
};

export default withStates(
  withDefaultValue(withAttributes(withWrapper(WebformSelect))),
);
