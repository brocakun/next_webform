import * as React from 'react';
import { useContext, useEffect } from 'react';
import { getChildElements, WebformContext } from '../utils';
import WebformElement from '../WebformElement';
import DebugConfirmation from './DebugConfirmation';
import MultiPageForm from './MultiPageForm';

const FormLayout = ({ webform, status }) => {
  const { registry, setData, data, errors } = useContext(WebformContext);
  const { elements, confirmation } = webform;
  const children = getChildElements(elements);

  const renderConfirmationPage = () => {
    const ConfirmationPage = registry.getComponent('confirmation_page');
    return <ConfirmationPage webform={webform} submission={data} />;
  };
  const isMultiPageForm = children.some((i) => {
    return elements[i]['#type'] === 'webform_wizard_page';
  });

  useEffect(() => {
    if (confirmation.type !== 'debug' || status === 'success') {
      return;
    }
    // Store Webform debug data in local storage so that it can be retrieved
    // after submission.
    window.localStorage.setItem('webformDebugData', JSON.stringify(data));
  }, [data, status, confirmation.type]);

  const renderChildren = () => {
    return (
      <>
        {children.map((key) => (
          <WebformElement
            key={elements[key]['#webform_key']}
            element={elements[key]}
            setValue={(value) => {
              setData((previousData) => {
                return {
                  ...previousData,
                  [elements[key]['#webform_key']]: value,
                };
              });
            }}
            value={data[elements[key]['#webform_key']]}
            error={errors[elements[key]['#webform_key']]}
          />
        ))}
      </>
    );
  };

  if (status === 'success') {
    if (confirmation.type === 'debug') {
      const debugData = (() => {
        if (typeof window === 'undefined') {
          return data;
        }

        return JSON.parse(window.localStorage.getItem('webformDebugData'));
      })();

      return <DebugConfirmation submission={debugData} />;
    } else if (confirmation.type === 'page' || confirmation.type === 'inline') {
      return renderConfirmationPage();
    } else if (confirmation.type === 'message') {
      const Message = registry.getComponent('message');
      const defaultMessage = (
        <>
          New submission added to <em>{webform.title}</em>.
        </>
      );

      return (
        <>
          <Message type="success">
            {webform.confirmation.message &&
            webform.confirmation.message.length > 0
              ? webform.confirmation.message
              : defaultMessage}
          </Message>
          {renderChildren()}
        </>
      );
    } else if (confirmation.type === 'none') {
      return renderChildren();
    }
  }

  if (isMultiPageForm) {
    // Fix for element access on Wizard.
    for (const [key, value] of Object.entries(elements)) {
      if (typeof value === 'object' && value !== null) {
        const keys2 = Object.keys(value);
        const hasValue = keys2.includes('#access');
        if (hasValue) {
          elements[key]['#access'] = true;
        }
      }
    }
    return <MultiPageForm elements={elements}></MultiPageForm>;
  } else {
    return renderChildren();
  }
};

export default FormLayout;
