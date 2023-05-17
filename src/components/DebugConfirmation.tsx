import * as React from 'react';

const DebugConfirmation = ({ submission }) => {
  return (
    <pre>
      <code id="submitted-data">{JSON.stringify(submission)}</code>
    </pre>
  );
};

export default DebugConfirmation;
