import * as React from 'react';
import { useState } from 'react';
import { getChildElements } from '../utils';
import WizardPage from './WizardPage';
import WebformElement from '../WebformElement';

const MultiPageForm = ({ elements }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const children = getChildElements(elements);
  const [pageElement, setPageElement] = useState(
    elements[children[currentPage]],
  );
  const showPrevBtn = currentPage > 0;
  const [showSubmitBtn, setShowSubmitBtn] = useState(false);
  const submitBtnElement = elements['actions'];
  const highlightCurrent = (item) => {
    if (pageElement['#title'] == elements[item]['#title']) {
      return { color: 'blue' };
    }
  };

  // Function to increment count by 1
  const incrementPage = () => {
    setShowSubmitBtn(true);
    setCurrentPage(currentPage + 1);
    elements[children[currentPage + 1]]['#access'] = Boolean(1); // This forces the show of elements
    setPageElement(elements[children[currentPage + 1]]);
    currentPage === children.length - 2
      ? setShowSubmitBtn(true)
      : setShowSubmitBtn(false);
  };

  const decrementPage = () => {
    setCurrentPage(currentPage - 1);
    elements[children[currentPage - 1]]['#access'] = Boolean(1); // This forces the show of elements
    setPageElement(elements[children[currentPage - 1]]);
    currentPage < children.length
      ? setShowSubmitBtn(false)
      : setShowSubmitBtn(true);
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
      <h2>Page: #{currentPage + 1}</h2>
      <WizardPage element={{ ...pageElement }} />
      {showPrevBtn && (
        <button
          style={{ border: 'solid' }}
          type="button"
          onClick={decrementPage}
        >
          Previous
        </button>
      )}
      {!showSubmitBtn && (
        <button
          style={{ border: 'solid' }}
          type="button"
          onClick={incrementPage}
        >
          Next
        </button>
      )}
      {showSubmitBtn && <WebformElement element={submitBtnElement} />}
    </div>
  );
};

export default MultiPageForm;
