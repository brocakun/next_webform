import * as React from 'react';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const ConfirmationPage = ({ webform, submission }) => {
  const defaultMessage = (
    <>
      New submission added to <em>{webform.title}</em>.
    </>
  );
  return (
    <div>
      {webform.confirmation.message && webform.confirmation.message.length > 0
        ? webform.confirmation.message
        : defaultMessage}
    </div>
  );
};

export default ConfirmationPage;
