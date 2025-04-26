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

Then('User should be on the login page', () => {
    cy.url().should('eq', `${Cypress.config('baseUrl')}`);
});

Then('User should see a {string} login error message', (errorMessage: string) => {
    cy.get('[data-test="error"]').should('be.visible').and('contain', errorMessage);
});