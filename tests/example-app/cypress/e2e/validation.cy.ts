import { fillWithValidValues } from '../utils';

describe('datelist with day, month, year, hour, minute, second', () => {
  it('input is valid when every field is filled out', () => {
    cy.visit(
      'http://localhost:3000/webform/default_test_form?confirmation_type=debug',
    );
    fillWithValidValues();
    cy.get('select[id="edit-date-list-day"]').select('4');
    cy.get('select[id="edit-date-list-month"]').select('May');
    cy.get('select[id="edit-date-list-year"]').select('2010');
    cy.get('select[id="edit-date-list-hour"]').select('9');
    cy.get('select[id="edit-date-list-minute"]').select('05');
    cy.get('select[id="edit-date-list-second"]').select('30');
    //,"date_list":"05/04/2010-09:05:30"
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('code[id="submitted-data"]').should(($data) => {
      const text = $data.text();
      const obj = JSON.parse(text);
      expect(obj['date_list']).to.equal('2010-05-04T09:05:30');
    });
  });

  it('incomplete datelist submission throws error on submit', () => {
    cy.visit('http://localhost:3000/webform/default_test_form');
    fillWithValidValues();
    cy.get('select[id="edit-date-list-day"]').select('4');
    cy.get('select[id="edit-date-list-month"]').select('May');

    cy.get('#__next').find('input').should('have.length.greaterThan', 0);
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('#__next').should(
      'contain.text',
      'An error occurred. Please try again.',
    );
    cy.get('div[id="edit-date-list"]')
      .next()
      .should(
        'contain.text',
        'The value is invalid. Please fill out every field.',
      );
    cy.get('#__next').find('input').should('have.length.greaterThan', 0);
  });
});

describe('datelist with month and AM/PM', () => {
  it('input is valid with fallback values added for fields that do not exist in element', () => {
    cy.visit(
      'http://localhost:3000/webform/default_test_form?confirmation_type=debug',
    );
    fillWithValidValues();
    cy.get('select[id="edit-date-list-with-month-and-am-pm-month"]').select(
      'May',
    );
    cy.get('select[id="edit-date-list-with-month-and-am-pm-ampm"]').select(
      'pm',
    );
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('code[id="submitted-data"]').should(($data) => {
      const currentYear = new Date().getFullYear();
      const text = $data.text();
      const obj = JSON.parse(text);
      expect(obj['date_list_with_month_and_am_pm']).to.equal(
        `${currentYear}-05-01T12:00`,
      );
    });
  });

  it('incomplete datelist submission throws error on submit', () => {
    cy.visit('http://localhost:3000/webform/default_test_form');
    fillWithValidValues();
    cy.get('select[id="edit-date-list-with-month-and-am-pm-month"]').select(
      'May',
    );
    cy.get('#__next').find('input').should('have.length.greaterThan', 0);
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('#__next').should(
      'contain.text',
      'An error occurred. Please try again.',
    );
    cy.get('div[id="edit-date-list-with-month-and-am-pm"]')
      .next()
      .should(
        'contain.text',
        'The value is invalid. Please fill out every field.',
      );
    cy.get('#__next').find('input').should('have.length.greaterThan', 0);
  });
});

describe('datetime', () => {
  it('input is valid when both date and time is filled out', () => {
    cy.visit(
      'http://localhost:3000/webform/default_test_form?confirmation_type=debug',
    );
    fillWithValidValues();
    cy.get('input[id="edit-date-and-time-date"]').type('2009-05-10');
    cy.get('input[id="edit-date-and-time-time"]').type('01:26:05');
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('code[id="submitted-data"]').should(($data) => {
      const text = $data.text();
      const obj = JSON.parse(text);
      expect(obj['date_and_time']).to.equal('2009-05-10T01:26:05');
    });
  });

  it('incomplete datelist submission throws error on submit', () => {
    cy.visit('http://localhost:3000/webform/default_test_form');
    fillWithValidValues();
    cy.get('input[id="edit-date-and-time-date"]').type('2009-05-10');
    cy.get('#__next').find('input').should('have.length.greaterThan', 0);
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('#__next').should(
      'contain.text',
      'An error occurred. Please try again.',
    );
    cy.get('div[id="edit-date-and-time"]')
      .next()
      .should(
        'contain.text',
        'The value is invalid. Please fill out every field.',
      );
    cy.get('#__next').find('input').should('have.length.greaterThan', 0);
  });
});

describe('min and max of date validation', () => {
  it('date displays error message when input is out of min max constraints', () => {
    cy.visit(
      'http://localhost:3000/webform/default_test_form?confirmation_type=debug',
    );
    fillWithValidValues();
    cy.get('input[id="edit-date"]').type('1999-05-10');
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('#__next').should(
      'contain.text',
      'An error occurred. Please try again.',
    );
    cy.get('input[id="edit-date"]')
      .next()
      .should('contain.text', 'Date must be on or after 2000-01-01.')
      .should('have.class', 'invalid-feedback');
    cy.get('input[id="edit-date"]').clear().type('2038-01-01');
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('input[id="edit-date"]')
      .next()
      .should('contain.text', 'Date must be on or before 2037-12-31.')
      .should('have.class', 'invalid-feedback');
    cy.get('input[id="edit-date"]').clear().type('2022-05-10');
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('code[id="submitted-data"]').should(($data) => {
      const text = $data.text();
      const obj = JSON.parse(text);
      expect(obj['date']).to.equal('2022-05-10');
    });
  });

  it('datelist displays error message when input is out of min max constraints', () => {
    cy.visit(
      'http://localhost:3000/webform/default_test_form?confirmation_type=debug',
    );
    fillWithValidValues();
    cy.get('select[id="edit-date-list-day"]').select('4');
    cy.get('select[id="edit-date-list-month"]').select('May');
    cy.get('select[id="edit-date-list-year"]').select('2000');
    cy.get('select[id="edit-date-list-hour"]').select('9');
    cy.get('select[id="edit-date-list-minute"]').select('05');
    cy.get('select[id="edit-date-list-second"]').select('30');
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('#__next').should(
      'contain.text',
      'An error occurred. Please try again.',
    );
    cy.get('div[id="edit-date-list"]')
      .next()
      .should('contain.text', 'Date must be on or after 2004-12-09.')
      .should('have.class', 'invalid-feedback');
    cy.get('select[id="edit-date-list-day"]').select('4');
    cy.get('select[id="edit-date-list-month"]').select('May');
    cy.get('select[id="edit-date-list-year"]').select('2037');
    cy.get('select[id="edit-date-list-hour"]').select('9');
    cy.get('select[id="edit-date-list-minute"]').select('05');
    cy.get('select[id="edit-date-list-second"]').select('30');
    cy.get('button[type="submit"]').contains('Submit').click();
    const todayDate = new Date().toISOString().substring(0, 10);
    cy.get('div[id="edit-date-list"]')
      .next()
      .should('contain.text', `Date must be on or before ${todayDate}.`)
      .should('have.class', 'invalid-feedback');
    cy.get('select[id="edit-date-list-day"]').select('4');
    cy.get('select[id="edit-date-list-month"]').select('May');
    cy.get('select[id="edit-date-list-year"]').select('2022');
    cy.get('select[id="edit-date-list-hour"]').select('9');
    cy.get('select[id="edit-date-list-minute"]').select('05');
    cy.get('select[id="edit-date-list-second"]').select('30');
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('code[id="submitted-data"]').should(($data) => {
      const text = $data.text();
      const obj = JSON.parse(text);
      expect(obj['date_list']).to.equal('2022-05-04T09:05:30');
    });
  });
});
