declare global {
  namespace Cypress {
    interface Chainable<Subject = any> {
      openSameTab(selector: string): Chainable<JQuery<HTMLElement>>;
      ifExists(selector: string, callback: () => void | Chainable, wait?: number): Chainable<Subject>;
    }
  }
}

Cypress.Commands.add('openSameTab', (selector) => {
  return cy.get(selector).then(($link) => {
    $link.removeAttr('target');
    return cy.wrap($link).click();
  });
});

Cypress.Commands.add('ifExists', (selector: string, callback: () => void, wait = 250) => {
  const checkForElement = (retriesRemaining: number): Cypress.Chainable =>
    cy.get('body').then(($body) => {
      if ($body.find(selector).length > 0) {
        return callback();
      } else if (retriesRemaining > 0) {
        return cy.wait(wait).then(() => checkForElement(retriesRemaining - 1));
      }
    });
  return checkForElement(3);
});

Cypress.Commands.overwrite('log', (originalFn, message) => {
  const timestamp = new Date().toISOString();
  return originalFn(`[${timestamp}] ${message}`);
});
