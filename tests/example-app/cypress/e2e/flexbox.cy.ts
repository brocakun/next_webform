describe('Flexbox layout', () => {
  it('Should have justify-content', () => {
    cy.get('[data-cy-selector="flexbox-layout"]').should('exist');
    cy.get('[data-cy-selector="flexbox-layout"]').should(
      'have.css',
      'justify-content',
      'flex-end',
    );
  });

  it('Should have flex-grow', () => {
    cy.get('[data-cy-selector="flexbox-layout"]').should('exist');
    cy.get('[data-cy-selector="flexbox-layout"] > div').should(
      'have.css',
      'flex-grow',
      '1',
    );
  });
});
