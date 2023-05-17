import { findDuplicateValues, fillWithValidValues } from '../utils';

describe('Default values and configuration', () => {
  it('should have default values filled in', () => {
    const stateSelectSelector =
      'select[id="edit-composite-basic-address-with-some-default-values-state-province"]';
    const countrySelectSelector =
      'select[id="edit-composite-basic-address-with-some-default-values-country"]';
    cy.get(stateSelectSelector)
      .find('option:selected')
      .should('have.text', 'New York');
    cy.get(countrySelectSelector)
      .find('option:selected')
      .should('have.text', 'United States');
    cy.get('input[id="edit-checkboxes-custom-value-banana"]').should(
      'be.checked',
    );
    cy.get(
      'input[id="edit-text-field-with-a-default-value-inside-container"]',
    ).should('have.value', 'I am a default value!');
  });
  it('should render required and checked attributes based on Webform configuration', () => {
    const addressLabelSelector =
      'label[for="edit-composite-basic-address-with-some-default-values-address"]';
    cy.get(addressLabelSelector).should('have.class', 'required-field');
    cy.get('label[for="edit-select-custom-options"]').should(
      'have.class',
      'required-field',
    );
    cy.get('label[for="edit-table-01-textfield-in-table-row-1"]').should(
      'have.class',
      'required-field',
    );
    cy.get('label[for="edit-required-textarea-in-table-row-2"]').should(
      'have.class',
      'required-field',
    );
    cy.get('input[id="edit-checked-by-default-checkbox"]').should('be.checked');
  });
  it('should render description', () => {
    cy.get('datalist[id="custom_option_autocomplete-datalist"]')
      .next()
      .should(
        'contain.text',
        'Posuere elit aenean inceptos vulputate ex dolor',
      );
    cy.get('[data-cy-selector="multifield-label"]')
      .next()
      .should('contain.text', 'Imperdiet nostra in mi tellus vestibulum sed');
    cy.get('[id="edit-checked-by-default-checkbox"]')
      .parent()
      .next('.visually-hidden')
      .should(
        'contain.text',
        'Elementum suspendisse sociosqu sed suscipit cubilia accumsan',
      );
  });
});

describe('Elements use valid attributes', () => {
  it('elements have a unique ID including multi-value composite elements', () => {
    const listOfIds = [];
    const addBtnSelector1 =
      'button[id="multivalue_unlimited_predefined_options_autocomplete-add-btn"]';
    const addBtnSelector2 =
      'button[id="multivalue_textfield_in_table_row_2-add-btn"]';
    const addBtnSelector3 =
      'button[id="multivalue_basic_address_inside_of_a_container-add-btn"]';
    cy.get(addBtnSelector1).click();
    cy.get(addBtnSelector2).click();
    cy.get(addBtnSelector3).click();
    cy.get('form')
      .find('[id]')
      .each((item) => {
        listOfIds.push(item.attr('id'));
      })
      .then(() => {
        const duplicates = findDuplicateValues(listOfIds);
        expect(duplicates).to.deep.equal([]);
      });
  });
  it('for attributes reference an existing id', () => {
    const listOfIds = [];
    cy.get('form')
      .find('[for]')
      .each((item) => {
        listOfIds.push(item.attr('for'));
      })
      .then(() => {
        listOfIds.forEach((id) => {
          cy.get(`[id="${id}"]`).should('exist');
        });
      });
  });
});

describe('Form has elements', () => {
  it('Form has table and labels', () => {
    cy.get('h1').should('have.text', 'Default Test Form');
    cy.get('input[id="multivalue_textfield_in_table_row_2[0]"]').should(
      'exist',
    );
    cy.get('textarea[id="edit-table-01-textarea-in-table-row-1"]').should(
      'exist',
    );
    cy.get('input[id="edit-table-01-textfield-in-table-row-1"]').should(
      'exist',
    );
    cy.get('textarea[id="edit-required-textarea-in-table-row-2"]').should(
      'exist',
    );
    cy.get('label[for="edit-table-01-textarea-in-table-row-1"]').should(
      'have.text',
      'Textarea in table row 1',
    );
    cy.get('label[for="edit-table-01-textfield-in-table-row-1"]').should(
      'have.text',
      'Textfield in table row 1',
    );
    cy.get('label[for="edit-required-textarea-in-table-row-2"]').should(
      'have.text',
      'Required textarea in table row 2',
    );
    cy.get('label[data-cy-selector="multifield-label-table-child"]')
      .not('.visually-hidden')
      .should('have.text', 'Multivalue textfield in table row 2');
  });
  it('Form has radio buttons with predefined options', () => {
    cy.get(
      `input[id="edit-radios-other-predefined-options-radios-full-time"]`,
    ).should('have.value', 'Full Time');
    cy.get(
      `input[id="edit-radios-other-predefined-options-radios-part-time"]`,
    ).should('have.value', 'Part Time');
    cy.get(
      `input[id="edit-radios-other-predefined-options-radios-military"]`,
    ).should('have.value', 'Military');
    cy.get(
      `input[id="edit-radios-other-predefined-options-radios-unemployed"]`,
    ).should('have.value', 'Unemployed');
    cy.get(
      `input[id="edit-radios-other-predefined-options-radios-retired"]`,
    ).should('have.value', 'Retired');
    // Check "other" option
    cy.get(
      `label[for="edit-radios-other-predefined-options-radios-other-"]`,
    ).should('have.text', 'Other…');
  });
});

describe('Label is correctly displayed or not shown', () => {
  it('No label for "date_list"', () => {
    cy.get('div[id="edit-date-list"]')
      .parent()
      .parent()
      .next('label')
      .should('not.exist');
  });
  it('Label is displayed after "conditional_helper_checkbox"', () => {
    cy.get('input[id="edit-conditional-helper-checkbox"]')
      .parent()
      .next('label')
      .should('have.text', 'Conditional helper checkbox');
  });
  it('Label is displayed before "custom_option_autocomplete-input"', () => {
    cy.get('input[id="edit-custom-option-autocomplete"]')
      .prev('label')
      .should('have.text', 'Custom option autocomplete');
  });
});

describe('Form submission', () => {
  describe('debug confirmation', () => {
    beforeEach(() => {
      fillWithValidValues();
    });

    it('can be submitted with valid input', () => {
      cy.get('button[type="submit"]').contains('Submit').click();

      cy.get('#submitted-data').should('be.visible');
    });
  });

  describe('page confirmation', () => {
    it('can be submitted with valid input', () => {
      cy.visit(
        'http://localhost:3000/webform/default_test_form?confirmation_type=page',
      );
      fillWithValidValues();

      cy.get('#__next').find('input').should('have.length.greaterThan', 0);
      cy.get('button[type="submit"]').contains('Submit').click();

      cy.get('#__next').should(
        'contain.text',
        'New submission added to Default Test Form',
      );
      cy.get('#__next').find('input').should('have.length', 0);
    });

    it('custom message can be provided', () => {
      cy.visit(
        'http://localhost:3000/webform/default_test_form?confirmation_type=page&confirmation_message=Custom%20message',
      );
      fillWithValidValues();

      cy.get('#__next').find('input').should('have.length.greaterThan', 0);
      cy.get('button[type="submit"]').contains('Submit').click();

      cy.get('#__next').should('contain.text', 'Custom message');
      cy.get('#__next').find('input').should('have.length', 0);
    });
  });

  describe('message confirmation', () => {
    it('can be submitted with valid input', () => {
      cy.visit(
        'http://localhost:3000/webform/default_test_form?confirmation_type=message',
      );
      fillWithValidValues();

      cy.get('#__next').find('input').should('have.length.greaterThan', 0);
      cy.get('button[type="submit"]').contains('Submit').click();

      cy.get('#__next').should(
        'contain.text',
        'New submission added to Default Test Form',
      );
      cy.get('#__next').find('input').should('have.length.greaterThan', 0);

      cy.get('#__next')
        .find('input[name="checked_by_default_checkbox"]')
        .should('be.checked');
      cy.get('#__next')
        .find(
          'input[name="composite_basic_address_with_some_default_values[address]"]',
        )
        .should('exist')
        .should('be.empty');
    });

    it('custom message can be provided', () => {
      cy.visit(
        'http://localhost:3000/webform/default_test_form?confirmation_type=message&confirmation_message=Custom%20message',
      );
      fillWithValidValues();

      cy.get('#__next').find('input').should('have.length.greaterThan', 0);
      cy.get('button[type="submit"]').contains('Submit').click();

      cy.get('#__next').should('contain.text', 'Custom message');
      cy.get('#__next').find('input').should('have.length.greaterThan', 0);
    });
  });
});
export {};
