import { Given, Then } from '@badeball/cypress-cucumber-preprocessor';

Given('I open the homepage', () => {
    cy.visit('/');
});

Then('I should see the title {string}', (title: string) => {
    cy.get('.login_logo').should('have.text', title);
});
