describe('CSS classes and styles based on Webform configuration', () => {
  it('"multivalue_unlimited_predefined_options_autocomplete" label has class', () => {
    cy.get('label[data-cy-selector="multifield-label"]')
      .should('have.class', 'test-multifield-label-class')
      .should(
        'have.text',
        'Multivalue unlimited predefined options autocomplete',
      );
  });
  it('"checked_by_default_checkbox" has border, border-radius styles', () => {
    cy.get('input[id="edit-checked-by-default-checkbox"]').should(
      'have.css',
      'margin-inline-end',
      '10px',
    );
  });
  it('elements have "test-class-element" class', () => {
    cy.get('input[id="edit-checked-by-default-checkbox"]').should(
      'have.class',
      'test-class-element',
    );
    cy.get('input[id="edit-terms-of-service"]').should(
      'have.class',
      'test-class-element',
    );
    cy.get('select[id="edit-date-list-day"]').should(
      'have.class',
      'test-class-element',
    );
    cy.get('select[id="edit-date-list-month"]').should(
      'have.class',
      'test-class-element',
    );
    cy.get('select[id="edit-date-list-year"]').should(
      'have.class',
      'test-class-element',
    );
    cy.get('select[id="edit-date-list-hour"]').should(
      'have.class',
      'test-class-element',
    );
    cy.get('select[id="edit-date-list-second"]').should(
      'have.class',
      'test-class-element',
    );
    cy.get('input[id="edit-date"]').should('have.class', 'test-class-element');
    cy.get('input[id="edit-date-and-time-date"]').should(
      'have.class',
      'test-class-element',
    );
    cy.get('input[id="edit-date-and-time-time"]').should(
      'have.class',
      'test-class-element',
    );
    cy.get('input[id="edit-time"]').should('have.class', 'test-class-element');
  });
  it('"checked_by_default_checkbox" wrapper has "test-class-wrapper" class', () => {
    cy.get(
      '.test-class-wrapper input[id="edit-checked-by-default-checkbox"]',
    ).should('exist');
  });
  it('label for "checked_by_default_checkbox" has color, font-weight, margin-left styles', () => {
    cy.get('label[for="edit-checked-by-default-checkbox"]')
      .should('have.css', 'color', 'rgb(0, 128, 0)')
      .should('have.css', 'font-weight', '900')
      .should('have.css', 'margin-left', '8px');
  });
  it('elements have "test-class-label" class', () => {
    cy.get('label[for="edit-checked-by-default-checkbox"]').should(
      'have.class',
      'test-class-label',
    );
    cy.get('label[for="edit-terms-of-service"]').should(
      'have.class',
      'test-class-label',
    );
    cy.get('label[for="edit-range"]').should('have.class', 'test-class-label');
    cy.get('label[for="edit-date"]').should('have.class', 'test-class-label');
    cy.get('label[for="edit-date-and-time-date"]').should(
      'have.class',
      'test-class-label',
    );
    cy.get('label[for="edit-date-and-time-time"]').should(
      'have.class',
      'test-class-label',
    );
    cy.get('label[for="edit-time"]').should('have.class', 'test-class-label');
  });
  it('table has "webform-table" class', () => {
    cy.get('table.webform-table').should('exist');
  });
  it('table row has "webform-table-row" class', () => {
    cy.get('tr.webform-table-row').should('exist');
  });
  it('table column has "table-column-test-class" class', () => {
    cy.get('td.table-column-test-class').should('exist');
    // Ensure that the class is not duplicated on the element wrapper.
    cy.get('td.table-column-test-class .table-column-test-class').should(
      'not.exist',
    );
  });
  it('table header has "test-class-header-[i] class', () => {
    cy.get('th.test-class-header-1').should('exist');
    cy.get('th.test-class-header-2').should('exist');
  });
  it('both inputs for email confirm has "test-class-element class', () => {
    cy.get('input[id="edit-email-confirm-mail-1')
      .should('have.class', 'test-class-element')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
    cy.get('input[id="edit-email-confirm-mail-1')
      .should('have.class', 'test-class-element')
      .should('have.css', 'color', 'rgb(255, 0, 0)');
  });
  it('wrapper for email confirm has "test-class-wrapper-email-confirm" class and margin-top 16px style', () => {
    cy.get(
      '.test-class-wrapper-email-confirm input[id="edit-email-confirm-mail-1"]',
    ).should('exist');
    cy.get(
      '.test-class-wrapper-email-confirm input[id="edit-email-confirm-mail-2"]',
    ).should('exist');
    // Check that there is only one wrapper.
    cy.get('.test-class-wrapper-email-confirm')
      .should('have.length', 1)
      .should('have.css', 'margin-top', '16px');
  });
  it('Each checkbox/radio in "Checkboxes custom value with default", "radio group", "checkboxes other", "radios other predefined options", "entity checkbox group", "radio checkbox group" has "test-class-element class"', () => {
    const selectors = [
      'input[id="edit-checkboxes-custom-value-apple"]',
      'input[id="edit-checkboxes-custom-value-banana"]',
      'input[id="edit-checkboxes-custom-value-cherry"]',
      'input[id="edit-radio-group-english"]',
      'input[id="edit-radio-group-math"]',
      'input[id="edit-radio-group-science"]',
      'input[id="edit-radio-group-science"]',
      'input[id="edit-checkboxes-other-checkboxes-orange"]',
      'input[id="edit-checkboxes-other-checkboxes-peach"]',
      'input[id="edit-checkboxes-other-checkboxes-pineapple"]',
      'input[id="edit-checkboxes-other-checkboxes-other-"]',
      'input[id="edit-radios-other-predefined-options-radios-full-time"]',
      'input[id="edit-radios-other-predefined-options-radios-part-time"]',
      'input[id="edit-radios-other-predefined-options-radios-military"]',
      'input[id="edit-radios-other-predefined-options-radios-unemployed"]',
      'input[id="edit-radios-other-predefined-options-radios-retired"]',
      'input[id="edit-radios-other-predefined-options-radios-other-"]',
      'input[id="edit-entity-checkbox-group-10"]',
      'input[id="edit-entity-checkbox-group-3"]',
      'input[id="edit-entity-checkbox-group-6"]',
      'input[id="edit-entity-checkbox-group-5"]',
      'input[id="edit-entity-radio-group-10003"]',
      'input[id="edit-entity-radio-group-10027"]',
      'input[id="edit-entity-radio-group-10028"]',
    ];
    selectors.map((sel) => {
      cy.get(sel).should('have.class', 'test-class-element');
    });
  });
});

describe('CSS classes on React component', () => {
  it('additional properties are added to <form> element', () => {
    cy.get('form.form-test-class').should('exist');
  });
});
