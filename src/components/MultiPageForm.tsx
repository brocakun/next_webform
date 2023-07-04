import * as React from 'react';
import { useState } from 'react';
import { getChildElements } from '../utils';
import WizardPage from './WizardPage';
import WebformElement from '../WebformElement';

const MultiPageForm = ({ elements }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const children = getChildElements(elements);
  const pageElement = elements[children[currentPage]];
  const showPrevBtn = currentPage > 0;
  const showSubmitBtn = currentPage === children.length - 2;
  const submitBtnElement = elements['actions'];
  const highlightCurrent = (item) => {
    if (pageElement['#title'] == elements[item]['#title']) {
      return { color: 'blue' };
    }
  };

  const scrollToTop = () => {
    if (typeof window !== undefined) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <ul style={{ display: 'flex' }}>
        {children.map((item) => {
          return (
            <li style={highlightCurrent(item)} key={item}>
              {elements[item]['#title']}----{'>'}
            </li>
          );
        })}
      </ul>
      <br />
      <h1>{pageElement['#title']}</h1>
      <h1>
        ({currentPage + 1}/{children.length - 1})
      </h1>
      <WizardPage element={{ ...pageElement }} />
      {showPrevBtn && (
        <button
          style={{ border: 'solid' }}
          type="button"
          className={'webform-button--previous'}
          onClick={() => (
            scrollToTop(), setCurrentPage((prevState) => prevState - 1)
          )}
        >
          {pageElement['#prev_button_label']
            ? pageElement['#prev_button_label']
            : 'Previous'}
        </button>
      )}
      {!showSubmitBtn && (
        <button
          style={{ border: 'solid' }}
          type="button"
          onClick={() => (
            scrollToTop(), setCurrentPage((prevState) => prevState + 1)
          )}
        >
          {pageElement['#next_button_label']
            ? pageElement['#next_button_label']
            : 'Next'}
        </button>
      )}
      {showSubmitBtn && <WebformElement element={submitBtnElement} />}
    </div>
  );
};

export default MultiPageForm;
