declare namespace Cypress {
  interface Chainable {
    dataCy(value: string): Chainable;
    getIframeBody(selector: string): Chainable;
    openLinkInSamePage(selector: string): Chainable;
    optional(selector: string, callback: () => void): Chainable;
  }
}

Cypress.Commands.add('getIframeBody', (selector) => {
  cy.log('getIframeBody');

  return cy
    .get(selector, { log: false })
    .its('0.contentDocument.body', { log: false })
    .should('not.be.empty')
    .then((body) => cy.wrap(body, { log: false }));
});

Cypress.Commands.add('openLinkInSamePage', (selector) => {
  cy.log('openLinkInSamePage');

  cy.get(selector)
    .click()
    .then(($link) => {
      $link.removeAttr('target');
      cy.wrap($link).click();
    });
});

Cypress.Commands.add('optional', (selector, callback) => {
  cy.get('body').then(($body) => {
    if ($body.find(selector).length > 0) {
      callback();
    }
  });
});

Cypress.Commands.overwrite('log', (originalFn, message) => {
  const timestamp = new Date().toISOString();
  return originalFn(`[${timestamp}] ${message}`);
});
