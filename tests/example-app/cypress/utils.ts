export const findDuplicateValues = (inputValue: Array<string>) => {
  return inputValue.filter((item, index) => inputValue.indexOf(item) !== index);
};

export const fillWithValidValues = () => {
  cy.get(
    'input[id="edit-composite-basic-address-with-some-default-values-address"]',
  ).type('2800 N Main Street Extention');
  cy.get(
    'input[id="edit-composite-basic-address-with-some-default-values-city"]',
  ).type('Jamestown');
  cy.get(
    'select[id="edit-composite-basic-address-with-some-default-values-state-province"]',
  ).select('North Dakota');
  cy.get(
    'input[id="edit-composite-basic-address-with-some-default-values-postal-code"]',
  ).type('14701');

  cy.get('select[id="edit-select-custom-options"]').select('kit kat');

  cy.get('input[id="edit-table-01-textfield-in-table-row-1"]').type(
    'Condimentum nascetur finibus maecenas massa facilisi penatibus',
  );
  cy.get('textarea[id="edit-required-textarea-in-table-row-2"]').type(
    'Nostra faucibus arcu accumsan dis bibendum risus',
  );

  cy.get('input[id="edit-email-confirm-mail-1"]').type('testing@example.com');
  cy.get('input[id="edit-email-confirm-mail-2"]').type('testing@example.com');
};
