import { WebformCustomComponent } from '../types';
import * as React from 'react';
import Modal from './Modal';
import { useState } from 'react';
import withDefaultValue from './utils/withDefaultValue';
import withStates from './utils/withStates';
import withWrapper from './utils/withWrapper';
import withAttributes from './utils/withAttributes';

const WebformTermsOfService: WebformCustomComponent = ({
  element,
  setValue,
  fieldProps,
  labelProps,
}) => {
  const [show, setShow] = useState(false);
  const [checkedState, setCheckedState] = useState(
    element['#checked'] ? element['#checked'] : false,
  );
  const [accessState, setAccessState] = useState(
    element['#access'] ? element['#access'] : true,
  );
  const onChangeHandler = async (e) => {
    setCheckedState(!checkedState);
    if (e.target.value) {
      setValue('1');
    } else {
      setValue('0');
    }
  };
  // Generate label for the checkbox.
  const getLabel = () => {
    const regex = new RegExp(/(.*){(.*)}(.*)/);

    // Link cannot be added if the label doesn't match expected pattern.
    if (!regex.test(element['#title'])) {
      return <>{element['#title']}</>;
    }

    const parts = regex.exec(element['#title']);
    return (
      <>
        {parts[1]}
        <a
          href="#terms"
          role="button"
          target="_blank"
          className="terms-link"
          onClick={(e) => {
            e.preventDefault();
            setShow(!show);
          }}
        >
          {parts[2]}
        </a>
        {parts[3]}
      </>
    );
  };

  return (
    <>
      <div>
        <input
          type="checkbox"
          id={element['#id']}
          name={element['#webform_key']}
          onChange={(e) => onChangeHandler(e)}
          disabled={element['#disabled']}
          hidden={!accessState}
          required={element['#required']}
          readOnly={element['#readonly']}
          checked={checkedState}
          {...fieldProps}
        />
        <Modal onClose={() => setShow(false)} show={show}>
          <div
            dangerouslySetInnerHTML={{
              __html: element['#terms_content']['#markup'],
            }}
          />
        </Modal>
        <label htmlFor={element['#id']} {...labelProps}>
          {getLabel()}
        </label>
      </div>
    </>
  );
};

export default withStates(
  withDefaultValue(
    withAttributes(
      withWrapper(WebformTermsOfService, {
        labelProps: {
          style: {
            display: 'none',
          },
        },
      }),
    ),
  ),
);
