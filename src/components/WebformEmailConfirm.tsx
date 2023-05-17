import * as React from 'react';
import { useContext, useEffect, useState } from 'react';
import withDefaultValue from './utils/withDefaultValue';
import withStates from './utils/withStates';
import withAttributes from './utils/withAttributes';
import { getChildElements, toKey, WebformContext } from '../utils';
import WebformElement from '../WebformElement';
import WebformElementWrapper from './wrappers/WebformElementWrapper';

const WebformEmailConfirm = ({
  element,
  error,
  setValue,
  labelProps,
  value,
  fieldProps,
  wrapperProps = {},
}) => {
  const { registerField } = useContext(WebformContext);

  const [email1, setEmail1] = useState('');
  const [email2, setEmail2] = useState('');

  React.useEffect(() => {
    if (element['#parents']) {
      registerField(toKey(element['#parents']), {
        validate: () => {
          if (email1 === email2) {
            return;
          }

          return 'The specified email addresses do not match.';
        },
      });
    }
  });
  useEffect(() => {
    // Do not reset value from state when value is empty because the value
    // changes into an empty value while typing into the field.
    if (value === '') {
      return;
    }

    setEmail1(value);
    setEmail2(value);
  }, [value]);

  useEffect(() => {
    if (!email1 || !email2) {
      setValue('');
      return;
    }

    if (email1 !== email2) {
      setValue('');
    } else {
      setValue(email1);
    }
  }, [email1, email2]);

  const children = getChildElements(element);
  const childElements = children.map((name) => {
    return (
      <WebformElement
        key={name}
        element={{
          ...element[name],
          '#states': element['#states'],
        }}
        error={error ? error[name] : null}
        value={name === 'mail_1' ? email1 : email2}
        setValue={(value) => {
          if (name === 'mail_1') {
            setEmail1(value as string);
          } else if (name === 'mail_2') {
            setEmail2(value as string);
          }
        }}
        labelProps={labelProps}
        fieldProps={fieldProps}
      />
    );
  });

  return (
    <WebformElementWrapper
      isRequired={false}
      labelDisplay="none"
      error={error}
      access={element['#access']}
      {...wrapperProps}
    >
      {childElements}
    </WebformElementWrapper>
  );
};

export default withStates(
  withDefaultValue(withAttributes(WebformEmailConfirm)),
);
