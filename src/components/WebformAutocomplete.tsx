import { WebformContext } from '../utils';
import * as React from 'react';
import { useEffect, useState, useContext } from 'react';
import withDefaultValue from './utils/withDefaultValue';
import withAttributes from './utils/withAttributes';
import withStates from './utils/withStates';
import withWrapper from './utils/withWrapper';

const WebformAutocomplete = ({ element, setValue, value = '', fieldProps }) => {
  const [autocompleteOptions, setAutocompleteOptions] = useState({});
  const [autocompleteValue, setAutocompleteValue] = useState<string | null>(
    null,
  );
  const webform = useContext(WebformContext);

  useEffect(() => {
    const resolveAsyncAutocompleteItems = async () => {
      const url = `${webform.apiUrl}?op=autocomplete_options&id=${webform.id}&options_id=${element['#autocomplete_items']}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw Error((await response.json()).message.message);
      }

      setAutocompleteOptions(await response.json());
    };
    if (Array.isArray(element['#autocomplete_items'])) {
      setAutocompleteOptions(
        element['#autocomplete_items'].reduce((currentValue, item) => {
          currentValue[item] = item;
          return currentValue;
        }, {}),
      );
    } else if (typeof element['#autocomplete_items'] === 'string') {
      resolveAsyncAutocompleteItems();
    } else {
      console.warn(
        `Unsupported autocomplete type on element ${element['#name']}.`,
      );
    }
  }, [element['#autocomplete_items']]);

  const onChangeHandler = async (e) => {
    if (autocompleteOptions[e.target.value]) {
      setValue(e.target.value);
    } else {
      setValue('');
    }
    setAutocompleteValue(e.target.value);
  };

  // Update component state when value changes in upstream state.
  useEffect(() => {
    setAutocompleteValue(value);
  }, [value]);

  return (
    <>
      <input
        type="text"
        name={element['#webform_key']}
        onChange={(e) => onChangeHandler(e)}
        disabled={element['#disabled']}
        hidden={!element['#access']}
        required={element['#required']}
        readOnly={element['#readonly']}
        value={autocompleteValue ?? value}
        {...fieldProps}
        id={`${element['#id']}`}
        list={`${element['#webform_key']}-datalist`}
      />
      <datalist id={`${element['#webform_key']}-datalist`}>
        {Object.keys(autocompleteOptions).map((item, i) => {
          return (
            <option key={i} value={item}>
              {autocompleteOptions[item]}
            </option>
          );
        })}
      </datalist>
    </>
  );
};

export default withStates(
  withDefaultValue(withAttributes(withWrapper(WebformAutocomplete))),
);
