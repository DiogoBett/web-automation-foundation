import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('User is at the login page', () => {
    cy.visit('/');
});

When('User enters the {string} credentials', (userType: string) => {
    cy.fixture('users').then((users) => {
        const user = users[userType];
        cy.get('#user-name').type(user.username);
        cy.get('#password').type(user.password);
        cy.get('#login-button').click();
    });
});

Then('User should be redirected to the Products page', () => {
    cy.url().should('include', '/inventory.html');
});

Then('User should remain on the login page', () => {
    cy.url().should('eq', `${Cypress.config('baseUrl')}`);
});

Then('User should see a {string} login error message', (errorMessage: string) => {
    cy.get('[data-test="error"]').should('be.visible').and('contain', errorMessage);
});

Then('User should be redirected to the Products page within {int} seconds', (seconds: number) => {
    const startTime = Date.now();

    cy.url().should('include', '/inventory.html').then(() => {
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        expect(duration).to.be.lessThan(seconds, `Page took too long to load: ${duration} seconds`);
    });
});