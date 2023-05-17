import * as React from 'react';
import {
  checkDateMinMax,
  convertDateToISO,
  toKey,
  WebformContext,
} from '../utils';
import withDefaultValue from './utils/withDefaultValue';
import withStates from './utils/withStates';
import withWrapper from './utils/withWrapper';
import withAttributes from './utils/withAttributes';
import { useContext } from 'react';

const WebformDate = ({ element, setValue, value = '', fieldProps }) => {
  const { registerField } = useContext(WebformContext);

  const onChangeHandler = async (e) => {
    setValue(e.target.value);
  };

  React.useEffect(() => {
    if (element['#parents']) {
      registerField(toKey(element['#parents']), {
        validate: (value: string) => {
          if (!value) {
            return;
          }
          return checkDateMinMax(value, element);
        },
      });
    }
  }, []);

  return (
    <>
      <input
        onChange={(e) => onChangeHandler(e)}
        type={element['#type']}
        name={element['#name']}
        disabled={element['#disabled']}
        hidden={!element['#access']}
        required={element['#required']}
        readOnly={element['#readonly']}
        value={value}
        {...fieldProps}
        id={element['#id']}
        min={
          element['#date_date_min']
            ? convertDateToISO(element['#date_date_min'])
            : null
        }
        max={
          element['#date_date_max']
            ? convertDateToISO(element['#date_date_max'])
            : null
        }
      />
    </>
  );
};

export default withStates(
  withDefaultValue(withAttributes(withWrapper(WebformDate))),
);
