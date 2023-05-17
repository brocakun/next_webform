describe('Form reset', () => {
  it('all form fields can be reset', () => {
    cy.get('input#edit-custom-option-autocomplete').type('Corona');
    cy.get(
      'input#edit-radios-other-predefined-options-radios-full-time',
    ).check();
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

    cy.get('input#edit-checkboxes-other-checkboxes-peach').check();

    cy.get('input[id="edit-email-confirm-mail-1"]').type('testing@example.com');
    cy.get('input[id="edit-email-confirm-mail-2"]').type('testing@example.com');

    cy.get('button').contains('Reset').click();

    cy.get('input#edit-custom-option-autocomplete').should('not.have.value');
    cy.get(
      'input#edit-radios-other-predefined-options-radios-full-time',
    ).should('not.be.checked');
    cy.get(
      'input[id="edit-composite-basic-address-with-some-default-values-address"]',
    ).should('not.have.value');
    cy.get(
      'input[id="edit-composite-basic-address-with-some-default-values-city"]',
    ).should('not.have.value');
    cy.get(
      'select[id="edit-composite-basic-address-with-some-default-values-state-province"]',
    ).should('have.value', '- None -');
    cy.get(
      'input[id="edit-composite-basic-address-with-some-default-values-postal-code"]',
    ).should('not.have.value');

    cy.get('select[id="edit-select-custom-options"]').should('not.have.value');

    cy.get('input[id="edit-table-01-textfield-in-table-row-1"]').should(
      'not.have.value',
    );
    cy.get('textarea[id="edit-required-textarea-in-table-row-2"]').should(
      'not.have.value',
    );

    cy.get('input#edit-checkboxes-other-checkboxes-peach').should(
      'not.be.checked',
    );

    cy.get('input[id="edit-email-confirm-mail-1"]').should('not.have.value');
    cy.get('input[id="edit-email-confirm-mail-2"]').should('not.have.value');
  });
});
