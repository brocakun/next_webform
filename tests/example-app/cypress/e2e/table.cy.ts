describe('Table', () => {
  it('headers are rendered', () => {
    cy.get('table[data-cy-selector="webform-table"] th')
      .should('have.length', 2)
      .first()
      .should('have.text', 'Header 1');
  });
});
