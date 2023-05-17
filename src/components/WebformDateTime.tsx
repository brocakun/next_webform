import * as React from 'react';
import { useContext } from 'react';
import withDefaultValue from './utils/withDefaultValue';
import withStates from './utils/withStates';
import { getChildElements, toKey, WebformContext } from '../utils';
import withAttributes from './utils/withAttributes';
import WebformElement from '../WebformElement';
import WebformElementWrapper from './wrappers/WebformElementWrapper';

const WebformDateTime = ({
  element,
  setValue,
  value,
  error,
  fieldProps,
  labelProps,
  wrapperProps = {},
}) => {
  const { registerField } = useContext(WebformContext);
  const [date = '', time = ''] = (value ?? '').split('T');
  const dateTime = {
    date,
    time,
  };

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
        },
      });
    }
  }, []);

  const children = getChildElements(element);
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
        {children.map((name) => {
          return (
            <WebformElement
              key={name}
              element={{
                ...element[name],
                '#webform_key': element['#webform_key'],
                '#access': element[name]['#access']
                  ? element[name]['#access']
                  : element['#access'],
                '#disabled': element['#disabled'],
                '#required': element['#required'],
                '#date_date_min': element['#date_date_min'],
                '#date_date_max': element['#date_date_max'],
                '#date_time_min': element['#date_time_min'],
                '#date_time_max': element['#date_time_max'],
                '#states': element['#states'],
              }}
              error={error ? error[name] : null}
              setValue={(newValue: string) => {
                setValue(
                  `${name === 'date' ? newValue : date}T${
                    name === 'time' ? newValue : time
                  }`,
                );
              }}
              labelProps={labelProps}
              fieldProps={fieldProps}
              value={dateTime[name] ? dateTime[name] : ''}
            />
          );
        })}
      </div>
    </WebformElementWrapper>
  );
};

export default withStates(withDefaultValue(withAttributes(WebformDateTime)));
