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
  const submitBtnElement = elements['actions']?.submit;
  const highlightCurrent = (item) => {
    if (pageElement['#title'] == elements[item]['#title']) {
      return { color: 'blue' };
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
      <h1>Page Title: {pageElement['#title']}</h1>
      <h1>Current page: {currentPage + 1}</h1>
      <WizardPage element={{ ...pageElement }} />
      {showPrevBtn && (
        <button
          style={{ border: 'solid' }}
          type="button"
          onClick={() => setCurrentPage((prevState) => prevState - 1)}
        >
          Previous
        </button>
      )}
      <button
        style={{ border: 'solid' }}
        type="button"
        onClick={() => setCurrentPage((prevState) => prevState + 1)}
      >
        Next
      </button>
      {showSubmitBtn && <WebformElement element={submitBtnElement} />}
    </div>
  );
};

export default MultiPageForm;
