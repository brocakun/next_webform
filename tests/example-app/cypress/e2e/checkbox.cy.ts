describe('Checkboxes and radios', () => {
  it('"checkboxes custom value with default" can be checked and unchecked', () => {
    const appleSelector = 'input[id="edit-checkboxes-custom-value-apple"]';
    const bananaSelector = 'input[id="edit-checkboxes-custom-value-banana"]';
    const cherrySelector = 'input[id="edit-checkboxes-custom-value-cherry"]';
    cy.get(bananaSelector).should('be.checked');
    cy.get(appleSelector).click().should('be.checked');
    cy.get(cherrySelector).click().should('be.checked');
    cy.get(bananaSelector).click().should('be.not.checked');
    cy.get(appleSelector).click().should('be.not.checked');
    cy.get(cherrySelector).click().should('be.not.checked');
  });

  it('"radios_other_predefined_options" can be checked and unchecked', () => {
    const retiredSelector =
      'input[id="edit-radios-other-predefined-options-radios-retired"]';
    const unemployedSelector =
      'input[id="edit-radios-other-predefined-options-radios-unemployed"]';
    const otherSelector =
      'input[id="edit-radios-other-predefined-options-radios-other-"]';
    const otherInput =
      'textarea[id="edit-radios-other-predefined-options-other-input"]';
    cy.get(retiredSelector).click().should('be.checked');
    cy.get(unemployedSelector).click().should('be.checked');
    cy.get(retiredSelector).should('not.be.checked');
    cy.get(otherInput).should('not.exist');
    cy.get(otherSelector).click().should('be.checked');
    cy.get(unemployedSelector).should('not.be.checked');
    cy.get(otherInput).should('exist');
    cy.get(otherInput).type('foo');
  });

  it('"radio group" can be checked and unchecked', () => {
    const englishSelector = 'input[id="edit-radio-group-english"]';
    const mathSelector = 'input[id="edit-radio-group-math"]';
    const scienceSelector = 'input[id="edit-radio-group-science"]';
    cy.get(englishSelector).click().should('be.checked');
    cy.get(mathSelector).should('be.not.checked');
    cy.get(scienceSelector).should('be.not.checked');
    cy.get(scienceSelector).click().should('be.checked');
    cy.get(englishSelector).should('be.not.checked');
    cy.get(mathSelector).should('be.not.checked');
  });

  it('"checkboxes other" can be checked and unchecked', () => {
    const orangeSelector =
      'input[id="edit-checkboxes-other-checkboxes-orange"]';
    const peachSelector = 'input[id="edit-checkboxes-other-checkboxes-peach"]';
    const otherSelector = 'input[id="edit-checkboxes-other-checkboxes-other-"]';
    const otherInput = 'input[id="edit-checkboxes-other-other-input"]';
    cy.get(orangeSelector).click().should('be.checked');
    cy.get(peachSelector).should('not.be.checked');
    cy.get(otherInput).should('not.exist');
    cy.get(otherSelector).click().should('be.checked');
    cy.get(otherInput).should('exist');
    cy.get(otherInput).type('foo');
  });

  it('"entity checkbox group" can be checked and unchecked', () => {
    const managementSelector = 'input[id="edit-entity-checkbox-group-3"]';
    const salesSelector = 'input[id="edit-entity-checkbox-group-5"]';
    cy.get(managementSelector).click().should('be.checked');
    cy.get(salesSelector).click().should('be.checked');
    cy.get(managementSelector).click().should('be.not.checked');
    cy.get(salesSelector).click().should('be.not.checked');
  });

  it('"entity radio group" can be checked and unchecked', () => {
    const bostonSelector = 'input[id="edit-entity-radio-group-10003"]';
    const brightonSelector = 'input[id="edit-entity-radio-group-10027"]';
    const londonSelector = 'input[id="edit-entity-radio-group-10028"]';
    cy.get(bostonSelector).click().should('be.checked');
    cy.get(brightonSelector).should('be.not.checked');
    cy.get(londonSelector).should('be.not.checked');
    cy.get(londonSelector).click().should('be.checked');
    cy.get(bostonSelector).should('be.not.checked');
    cy.get(brightonSelector).should('be.not.checked');
  });
});
