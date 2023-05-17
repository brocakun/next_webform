import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import withDefaultValue from './utils/withDefaultValue';
import withStates from './utils/withStates';
import withAttributes from './utils/withAttributes';
import {
  checkDateMinMax,
  getChildElements,
  toKey,
  WebformContext,
} from '../utils';
import WebformElement from '../WebformElement';
import WebformElementWrapper from './wrappers/WebformElementWrapper';

const WebformDateList = ({
  element,
  error,
  setValue,
  fieldProps,
  labelProps,
  wrapperProps = {},
}) => {
  const [dateList, setDateList] = useState({});
  const children = getChildElements(element);
  const { registerField } = useContext(WebformContext);

  React.useEffect(() => {
    if (element['#parents']) {
      registerField(toKey(element['#parents']), {
        validate: (value: string) => {
          if (!value) {
            return;
          }

          // Ex: 2010-05-10T09:15
          const re = new RegExp(
            '^((19|20)\\d{2})-((0|1)\\d{1})-((0|1|2)\\d{1})T(2[0-3]|[01][0-9]):[0-5][0-9]',
          );
          // Ex: 2010-05-10T09:15:10
          const reWithSeconds = new RegExp(
            '^((19|20)\\d{2})-((0|1)\\d{1})-((0|1|2)\\d{1})T(2[0-3]|[01][0-9]):[0-5][0-9]:[0-5][0-9]',
          );
          if (!(re.test(value) || reWithSeconds.test(value))) {
            return 'The value is invalid. Please fill out every field.';
          }
          return checkDateMinMax(value, element);
        },
      });
    }
  }, []);

  useEffect(() => {
    // When every value of the date list element is filled out then we can set the value.
    if (
      Object.keys(dateList)[0] &&
      Object.values(dateList).every((i) => i !== null)
    ) {
      let twentyFourHour;
      const isPM = dateList['ampm'] && dateList['ampm'] === 'pm';
      // Use military time for the hour if am/pm is used.
      if (dateList['hour']) {
        if (isPM) {
          twentyFourHour = dateList['hour'] + 12;
        } else {
          twentyFourHour = dateList['hour'];
        }
      } else if (isPM) {
        // If the hour is not part of the form but the am/pm is then it should be 12.
        twentyFourHour = 12;
      } else {
        twentyFourHour = '00';
      }

      let monthAsNum;
      if (dateList['month']) {
        const monthOptions = element['month']['#options'];
        // Get the number value of the month. ex) May -> 5
        monthAsNum = Object.keys(monthOptions).find(
          (key) => monthOptions[key] === dateList['month'],
        );
      } else {
        // Add fallback values if the unit is not part of the date list like in Webform.
        monthAsNum = '1';
      }
      // Add fallback values if the unit is not part of the date list like in Webform.
      const day = dateList['day'] ? dateList['day'] : '1';
      const year = dateList['year']
        ? dateList['year']
        : new Date().getFullYear();
      const hour = twentyFourHour;
      const minute = dateList['minute'] ? dateList['minute'] : '00';
      const second = dateList['second'] ? dateList['second'] : null;
      if (!second) {
        setValue(
          `${year}-${padZero(monthAsNum)}-${padZero(day)}T${padZero(
            hour,
          )}:${minute}`,
        );
      } else {
        setValue(
          `${year}-${padZero(monthAsNum)}-${padZero(day)}T${padZero(
            hour,
          )}:${minute}:${second}`,
        );
      }
    } else {
      if (Object.values(dateList).some((i) => i !== null)) {
        setValue(dateList);
      }
    }
  }, [dateList]);

  useEffect(() => {
    children.map((name) => {
      // Initialize dateList object keys with units.
      setDateList((prevState) => {
        return {
          ...prevState,
          [name]: null,
        };
      });
    });
  }, []);

  const padZero = (num) => {
    if (num <= 9) {
      num = '0' + num;
      return num;
    } else {
      return num;
    }
  };

  return (
    <WebformElementWrapper
      label={element['#title']}
      labelDisplay={element['#title_display']}
      access={element['#access']}
      isRequired={false}
      error={error}
      {...wrapperProps}
    >
      <div id={element['#id']}>
        {children.map((name, index) => {
          return (
            <WebformElement
              key={index}
              element={{
                ...element[name],
                '#webform_key': element['#webform_key'],
                '#disabled': element['#disabled'],
                '#access': element['#access'],
                '#required': element['#required'],
                '#states': element['#states'],
              }}
              error={error ? error[name] : null}
              setValue={(newValue) => {
                setDateList({ ...dateList, [name]: newValue });
              }}
              labelProps={labelProps}
              fieldProps={fieldProps}
              value={dateList[name] ? dateList[name] : ''}
            />
          );
        })}
      </div>
    </WebformElementWrapper>
  );
};

export default withStates(withDefaultValue(withAttributes(WebformDateList)));
