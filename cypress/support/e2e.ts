import './commands';

Cypress.on('uncaught:exception', (err, runnable) => {
    if (err.message.includes('WRITE AN ERROR TO IGNORE')) {
        return false;
    }
});