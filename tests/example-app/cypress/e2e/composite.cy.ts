import { fillWithValidValues } from '../utils';

describe('custom composite element', () => {
  it('custom composite element can be submitted', () => {
    cy.visit(
      'http://localhost:3000/webform/default_test_form?confirmation_type=debug',
    );
    fillWithValidValues();
    cy.get(
      'input[id="edit-custom-composite-items-0-radios-key-parent"]',
    ).click();
    cy.get('input[id="edit-custom-composite-items-0-date-key"]').type(
      '2009-05-10',
    );
    cy.get('textarea[id="edit-custom-composite-items-0-textarea-key"]').type(
      'hello',
    );
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('code[id="submitted-data"]').should(($data) => {
      const text = $data.text();
      const obj = JSON.parse(text);
      expect(obj['custom_composite'][0]).to.deep.equal({
        radios_key: 'Parent',
        date_key: '2009-05-10',
        textarea_key: 'hello',
      });
    });
  });

  it('multi value custom composite element has correct submit data for two values', () => {
    cy.visit(
      'http://localhost:3000/webform/default_test_form?confirmation_type=debug',
    );
    fillWithValidValues();
    cy.get(
      'input[id="edit-multi-value-custom-composite-items-0-textfield[0]"]',
    ).type('hello');
    cy.get(
      'input[id="edit-multi-value-custom-composite-items-0-marriage-radio-single[0]"]',
    ).click();
    cy.get(
      'input[id="edit-multi-value-custom-composite-items-0-date[0]"]',
    ).type('2009-05-10');
    const addBtnSelector = 'button[id="multi_value_custom_composite-add-btn"]';
    cy.get(addBtnSelector).click();
    cy.get(
      'input[id="edit-multi-value-custom-composite-items-0-textfield[1]"]',
    ).type('hi');
    cy.get(
      'input[id="edit-multi-value-custom-composite-items-0-marriage-radio-divorced[1]"]',
    ).click();
    cy.get(
      'input[id="edit-multi-value-custom-composite-items-0-date[1]"]',
    ).type('2009-06-07');
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('code[id="submitted-data"]').should(($data) => {
      const text = $data.text();
      const obj = JSON.parse(text);
      expect(obj['multi_value_custom_composite'][0]).to.deep.equal({
        textfield: 'hello',
        marriage_radio: 'Single',
        date: '2009-05-10',
      });
      expect(obj['multi_value_custom_composite'][1]).to.deep.equal({
        textfield: 'hi',
        marriage_radio: 'Divorced',
        date: '2009-06-07',
      });
    });
  });

  it('multi value custom composite element has correct submit data after removing the second value', () => {
    cy.visit(
      'http://localhost:3000/webform/default_test_form?confirmation_type=debug',
    );
    fillWithValidValues();
    cy.get(
      'input[id="edit-multi-value-custom-composite-items-0-textfield[0]"]',
    ).type('hello');
    cy.get(
      'input[id="edit-multi-value-custom-composite-items-0-marriage-radio-single[0]"]',
    ).click();
    cy.get(
      'input[id="edit-multi-value-custom-composite-items-0-date[0]"]',
    ).type('2009-05-10');
    const addBtnSelector = 'button[id="multi_value_custom_composite-add-btn"]';
    cy.get(addBtnSelector).click();
    cy.get(
      'input[id="edit-multi-value-custom-composite-items-0-textfield[1]"]',
    ).type('i will be removed');
    cy.get(
      'input[id="edit-multi-value-custom-composite-items-0-marriage-radio-single[1]"]',
    ).click();
    cy.get(
      'input[id="edit-multi-value-custom-composite-items-0-date[1]"]',
    ).type('2009-06-07');
    cy.get(addBtnSelector).click();
    cy.get(
      'input[id="edit-multi-value-custom-composite-items-0-textfield[2]"]',
    ).type('hi');
    cy.get(
      'input[id="edit-multi-value-custom-composite-items-0-marriage-radio-divorced[2]"]',
    ).click();
    cy.get(
      'input[id="edit-multi-value-custom-composite-items-0-date[2]"]',
    ).type('2009-06-07');
    const removeBtnSelector =
      'button[id="multi_value_custom_composite-remove-btn-1"]';
    cy.get(removeBtnSelector).click();
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('code[id="submitted-data"]').should(($data) => {
      const text = $data.text();
      const obj = JSON.parse(text);
      expect(obj['multi_value_custom_composite'][0]).to.deep.equal({
        textfield: 'hello',
        marriage_radio: 'Single',
        date: '2009-05-10',
      });
      expect(obj['multi_value_custom_composite'][1]).to.deep.equal({
        textfield: 'hi',
        marriage_radio: 'Divorced',
        date: '2009-06-07',
      });
    });
  });

  it('multi value custom composite with nested elements has correct submit data for two values', () => {
    cy.visit(
      'http://localhost:3000/webform/default_test_form?confirmation_type=debug',
    );
    fillWithValidValues();
    // radios other element
    cy.get(
      'input[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-radios-other-key-cc-radios-home[0]"]',
    ).click();
    // email confirm element
    cy.get(
      'input[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-email-confirm-cc-mail-1[0]"]',
    ).type('test@email.com');
    cy.get(
      'input[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-email-confirm-cc-mail-2[0]"]',
    ).type('test@email.com');
    // date time element
    cy.get(
      'input[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-date-time-cc-date[0]"]',
    ).type('2009-05-10');
    cy.get(
      'input[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-date-time-cc-time[0]"]',
    ).type('15:39:52');
    // date list element
    cy.get(
      'select[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-date-list-cc-year[0]"]',
    ).select('2010');
    cy.get(
      'select[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-date-list-cc-month[0]"]',
    ).select('May');
    cy.get(
      'select[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-date-list-cc-day[0]"]',
    ).select('12');
    cy.get(
      'select[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-date-list-cc-hour[0]"]',
    ).select('5');
    cy.get(
      'select[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-date-list-cc-minute[0]"]',
    ).select('03');
    const addBtnSelector =
      'button[id="multi_value_custom_composite_with_nested_elements-add-btn"]';
    cy.get(addBtnSelector).click();
    // radios other element
    cy.get(
      'input[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-radios-other-key-cc-radios-cell[1]"]',
    ).click();
    // email confirm element
    cy.get(
      'input[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-email-confirm-cc-mail-1[1]"]',
    ).type('test2@email.com');
    cy.get(
      'input[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-email-confirm-cc-mail-2[1]"]',
    ).type('test2@email.com');
    // date time element
    cy.get(
      'input[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-date-time-cc-date[1]"]',
    ).type('2010-05-10');
    cy.get(
      'input[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-date-time-cc-time[1]"]',
    ).type('18:39:52');
    // date list element
    cy.get(
      'select[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-date-list-cc-year[1]"]',
    ).select('2012');
    cy.get(
      'select[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-date-list-cc-month[1]"]',
    ).select('Jun');
    cy.get(
      'select[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-date-list-cc-day[1]"]',
    ).select('4');
    cy.get(
      'select[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-date-list-cc-hour[1]"]',
    ).select('8');
    cy.get(
      'select[id="edit-multi-value-custom-composite-with-nested-elements-items-0-item-date-list-cc-minute[1]"]',
    ).select('05');
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('code[id="submitted-data"]').should(($data) => {
      const text = $data.text();
      const obj = JSON.parse(text);
      expect(
        obj['multi_value_custom_composite_with_nested_elements'][0],
      ).to.deep.equal({
        radios_other_key_cc: 'Home',
        email_confirm_cc: 'test@email.com',
        date_time_cc: '2009-05-10T15:39:52',
        date_list_cc: '2010-05-12T05:03',
      });
      expect(
        obj['multi_value_custom_composite_with_nested_elements'][1],
      ).to.deep.equal({
        radios_other_key_cc: 'Cell',
        email_confirm_cc: 'test2@email.com',
        date_time_cc: '2010-05-10T18:39:52',
        date_list_cc: '2012-06-04T08:05',
      });
    });
  });
});
