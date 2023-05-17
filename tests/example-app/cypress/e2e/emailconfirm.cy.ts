import { fillWithValidValues } from '../utils';

describe('Email confirm', () => {
  it('error message visible when non-matching emails entered', () => {
    fillWithValidValues();
    cy.get('[data-cy-selector="email-confirm"] .invalid-feedback').should(
      'not.exist',
    );
    cy.get(
      '[data-cy-selector="email-confirm"] [id="edit-email-confirm-mail-1"]',
    ).clear();
    cy.get(
      '[data-cy-selector="email-confirm"] [id="edit-email-confirm-mail-2"]',
    ).clear();
    cy.get(
      '[data-cy-selector="email-confirm"] [id="edit-email-confirm-mail-1"]',
    ).type('hello@example.com');
    cy.get('[data-cy-selector="email-confirm"] .invalid-feedback').should(
      'not.exist',
    );
    cy.get(
      '[data-cy-selector="email-confirm"] [id="edit-email-confirm-mail-2"]',
    ).type('invalid-email@example.com');
    cy.get('[data-cy-selector="email-confirm"] .invalid-feedback').should(
      'not.exist',
    );
    cy.get('button[type="submit"]').contains('Submit').click();
    cy.get('[data-cy-selector="email-confirm"] .invalid-feedback').should(
      'exist',
    );
  });
  it('both labels for email confirm have correct text', () => {
    cy.get('label[for="edit-email-confirm-mail-1').should(
      'have.text',
      'Email confirm',
    );
    cy.get('label[for="edit-email-confirm-mail-2').should(
      'have.text',
      'Confirm email',
    );
  });
});
