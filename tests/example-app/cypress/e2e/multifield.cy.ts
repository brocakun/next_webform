import { fillWithValidValues } from '../utils';

describe('Multifield', () => {
  it('label doesn\'t have "for" attribute', () => {
    cy.get('label[data-cy-selector="multifield-label"]')
      .should(
        'have.text',
        'Multivalue unlimited predefined options autocomplete',
      )
      .should('not.have.attr', 'for');
  });
  it('label doesn\'t have "webform-remove-for-attribute" attribute', () => {
    cy.get('label[data-cy-selector="multifield-label"]')
      .should(
        'have.text',
        'Multivalue unlimited predefined options autocomplete',
      )
      .should('not.have.attr', 'webform-remove-for-attribute');
  });
  it('should add and remove an element', () => {
    const firstInputSelector =
      'input[id="multivalue_unlimited_predefined_options_autocomplete[0]"]';
    const secondInputSelector =
      'input[id="multivalue_unlimited_predefined_options_autocomplete[1]"]';
    const addBtnSelector =
      'button[id="multivalue_unlimited_predefined_options_autocomplete-add-btn"]';
    const removeBtnSelector =
      'button[id="multivalue_unlimited_predefined_options_autocomplete-remove-btn-1"]';
    cy.get(firstInputSelector).should('exist');
    cy.get(secondInputSelector).should('not.exist');
    cy.get(addBtnSelector).click();
    cy.get(firstInputSelector).should('exist');
    cy.get(secondInputSelector).should('exist');
    cy.get(removeBtnSelector).click();
    cy.get(firstInputSelector).should('exist');
    cy.get(secondInputSelector).should('not.exist');
  });

  it('should add and remove an element in a table', () => {
    const firstInputSelector =
      'input[id="multivalue_textfield_in_table_row_2[0]"]';
    const secondInputSelector =
      'input[id="multivalue_textfield_in_table_row_2[1]"]';
    const addBtnSelector =
      'button[id="multivalue_textfield_in_table_row_2-add-btn"]';
    const removeBtnSelector =
      'button[id="multivalue_textfield_in_table_row_2-remove-btn-1"]';
    cy.get(firstInputSelector).should('exist');
    cy.get(secondInputSelector).should('not.exist');
    cy.get(addBtnSelector).click();
    cy.get(firstInputSelector).should('exist');
    cy.get(secondInputSelector).should('exist');
    cy.get(removeBtnSelector).click();
    cy.get(firstInputSelector).should('exist');
    cy.get(secondInputSelector).should('not.exist');
  });

  it('should add and remove a composite element inside of a container', () => {
    const firstInputSelector =
      'input[id="edit-multivalue-basic-address-inside-of-a-container-items-0-item-address[0]"]';
    const secondInputSelector =
      'input[id="edit-multivalue-basic-address-inside-of-a-container-items-0-item-address[1]"]';
    const addBtnSelector =
      'button[id="multivalue_basic_address_inside_of_a_container-add-btn"]';
    const removeBtnSelector =
      'button[id="multivalue_basic_address_inside_of_a_container-remove-btn-1"]';
    cy.get(firstInputSelector).should('exist');
    cy.get(secondInputSelector).should('not.exist');
    cy.get(addBtnSelector).click();
    cy.get(firstInputSelector).should('exist');
    cy.get(secondInputSelector).should('exist');
    cy.get(removeBtnSelector).click();
    cy.get(firstInputSelector).should('exist');
    cy.get(secondInputSelector).should('not.exist');
  });

  it('multivalue unlimited predefined options autocomplete element can be submitted', () => {
    cy.visit(
      'http://localhost:3000/webform/default_test_form?confirmation_type=debug',
    );
    fillWithValidValues();
    const firstInputSelector =
      'input[id="multivalue_unlimited_predefined_options_autocomplete[0]"]';
    const secondInputSelector =
      'input[id="multivalue_unlimited_predefined_options_autocomplete[1]"]';
    const addBtnSelector =
      'button[id="multivalue_unlimited_predefined_options_autocomplete-add-btn"]';
    cy.get(addBtnSelector).click();
    cy.get(firstInputSelector).type('Full Time');
    cy.get(secondInputSelector).type('Part Time');
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('code[id="submitted-data"]').should(($data) => {
      const text = $data.text();
      const obj = JSON.parse(text);
      expect(
        obj['multivalue_unlimited_predefined_options_autocomplete'][0],
      ).equal('Full Time');
      expect(
        obj['multivalue_unlimited_predefined_options_autocomplete'][1],
      ).equal('Part Time');
    });
  });

  it('a basic composite multi-value element can be submitted', () => {
    cy.visit(
      'http://localhost:3000/webform/default_test_form?confirmation_type=debug',
    );
    fillWithValidValues();
    const addBtnSelector =
      'button[id="multivalue_basic_address_inside_of_a_container-add-btn"]';
    cy.get(addBtnSelector).click();
    cy.get(
      'input[id="edit-multivalue-basic-address-inside-of-a-container-items-0-item-address[0]"]',
    ).type('94 Shady Street');
    cy.get(
      'input[id="edit-multivalue-basic-address-inside-of-a-container-items-0-item-address-2[0]"]',
    ).type('Apt 2');
    cy.get(
      'input[id="edit-multivalue-basic-address-inside-of-a-container-items-0-item-city[0]"]',
    ).type('Westport');
    cy.get(
      'select[id="edit-multivalue-basic-address-inside-of-a-container-items-0-item-state-province[0]"]',
    ).select('Connecticut');
    cy.get(
      'input[id="edit-multivalue-basic-address-inside-of-a-container-items-0-item-postal-code[0]"]',
    ).type('06880');
    cy.get(
      'select[id="edit-multivalue-basic-address-inside-of-a-container-items-0-item-country[0]"]',
    ).select('United States');
    cy.get(
      'input[id="edit-multivalue-basic-address-inside-of-a-container-items-0-item-address[1]"]',
    ).type('805 Snake Hill Ave');
    cy.get(
      'input[id="edit-multivalue-basic-address-inside-of-a-container-items-0-item-address-2[1]"]',
    ).type('Apt 1');
    cy.get(
      'input[id="edit-multivalue-basic-address-inside-of-a-container-items-0-item-city[1]"]',
    ).type('Malibu');
    cy.get(
      'select[id="edit-multivalue-basic-address-inside-of-a-container-items-0-item-state-province[1]"]',
    ).select('California');
    cy.get(
      'input[id="edit-multivalue-basic-address-inside-of-a-container-items-0-item-postal-code[1]"]',
    ).type('90278');
    cy.get(
      'select[id="edit-multivalue-basic-address-inside-of-a-container-items-0-item-country[1]"]',
    ).select('United States');
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('code[id="submitted-data"]').should(($data) => {
      const text = $data.text();
      const obj = JSON.parse(text);
      expect(
        obj['multivalue_basic_address_inside_of_a_container'][0],
      ).to.deep.equal({
        address: '94 Shady Street',
        address_2: 'Apt 2',
        city: 'Westport',
        state_province: 'Connecticut',
        postal_code: '06880',
        country: 'United States',
      });
      expect(
        obj['multivalue_basic_address_inside_of_a_container'][1],
      ).to.deep.equal({
        address: '805 Snake Hill Ave',
        address_2: 'Apt 1',
        city: 'Malibu',
        state_province: 'California',
        postal_code: '90278',
        country: 'United States',
      });
    });
  });
});
