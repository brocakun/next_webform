import { findDuplicateValues } from '../utils';
import strtotime from 'strtotime';

describe('Date list element', () => {
  it('Date list options are all unique', () => {
    const yearOptions = [];
    const monthOptions = [];
    const dayOptions = [];
    const hourOptions = [];
    const minuteOptions = [];
    const selAndOptionsObj = {
      'select[id="edit-date-list-year"]': yearOptions,
      'select[id="edit-date-list-month"]': monthOptions,
      'select[id="edit-date-list-day"]': dayOptions,
      'select[id="edit-date-list-hour"]': hourOptions,
      'select[id="edit-date-list-minute"]': minuteOptions,
    };
    Object.keys(selAndOptionsObj).forEach((sel) => {
      cy.get(sel)
        .children('option')
        .each((item) => {
          selAndOptionsObj[sel].push(item.text());
        })
        .then(() => {
          expect(findDuplicateValues(selAndOptionsObj[sel])).to.deep.equal([]);
        });
    });
  });

  it('Initial value of the select elements is the time unit', () => {
    cy.get('select[id="edit-date-list-year"]').should('have.value', 'Year');
    cy.get('select[id="edit-date-list-month"]').should('have.value', 'Month');
    cy.get('select[id="edit-date-list-day"]').should('have.value', 'Day');
    cy.get('select[id="edit-date-list-hour"]').should('have.value', 'Hour');
    cy.get('select[id="edit-date-list-minute"]').should('have.value', 'Minute');
  });
});

describe('Date element', () => {
  it('Date has min of -1 month and max of +1 month', () => {
    const oneMonthAgo = strtotime('-1 month').toISOString().substring(0, 10);
    const oneMonthLater = strtotime('+1 month').toISOString().substring(0, 10);
    cy.get('input[id="edit-date-with-month-min-max"]')
      .invoke('attr', 'min')
      .should('eq', oneMonthAgo);
    cy.get('input[id="edit-date-with-month-min-max"]')
      .invoke('attr', 'max')
      .should('eq', oneMonthLater);
  });
});
