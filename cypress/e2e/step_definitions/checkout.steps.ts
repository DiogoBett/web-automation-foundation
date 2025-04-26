import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { faker } from '@faker-js/faker';

Given('User adds {string} products to the cart', (productCount: string) => {
  const count = parseInt(productCount, 10);
  cy.fixture('products').then((products) => {
    const shuffledProducts = Cypress._.shuffle(products.products);
    const addedProducts = shuffledProducts.slice(0, count);
    Cypress.env('addedProducts', addedProducts);
    addedProducts.forEach((product) => {
      cy.contains('.inventory_item', product.name).find('button.btn_inventory').as('btn').click();
      cy.get('@btn').should('have.text', 'Remove');
    });
  });
});

Given('User proceeds to the Your Information page', () => {
  cy.get('.shopping_cart_link').click();
  cy.url().should('include', '/cart.html');

  cy.get('[data-test="checkout"]').click();
  cy.url().should('include', '/checkout-step-one.html');
});

Given('User provides the user details information', () => {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postalCode = faker.location.zipCode();

  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get('[data-test="postalCode"]').type(postalCode);

  cy.log(`Generated User Details: ${firstName} ${lastName}, ${postalCode}`);
});

When('User clicks on the cart icon', () => {
  cy.get('.shopping_cart_link').click();
});

When('User continues to the Overview page', () => {
  cy.get('[data-test="continue"]').click();
  cy.url().should('include', '/checkout-step-two.html');
});

Then('User should be on the Checkout page', () => {
  cy.url().should('include', '/cart.html');
});

Then('User should verify the checkout items match the ones that were added to the cart', () => {
  const addedProducts = Cypress.env('addedProducts');
  cy.get('.cart_item')
    .should('have.length', addedProducts.length)
    .each((item, index) => {
      const product = addedProducts[index];
      cy.wrap(item).within(() => {
        cy.get('.inventory_item_name').should('have.text', product.name);
        cy.get('.inventory_item_desc').should('have.text', product.description);
        cy.get('.inventory_item_price').should('have.text', `$${product.price.toFixed(2)}`);
      });
    });
});

Then('User should verify the overview items match and have the proper total amount', () => {
  const addedProducts = Cypress.env('addedProducts');
  let calculatedTotal = 0;

  cy.get('.cart_item')
    .should('have.length', addedProducts.length)
    .each((item, index) => {
      const product = addedProducts[index];
      calculatedTotal += product.price;
      cy.wrap(item).within(() => {
        cy.get('.inventory_item_name').should('have.text', product.name);
        cy.get('.inventory_item_desc').should('have.text', product.description);
        cy.get('.inventory_item_price').should('have.text', `$${product.price.toFixed(2)}`);
      });
    })
    .then(() => {
      cy.get('.summary_subtotal_label')
        .invoke('text')
        .then((subtotalText) => {
          const displayedSubtotal = parseFloat(subtotalText.replace('Item total: $', ''));
          expect(displayedSubtotal).to.equal(calculatedTotal);
        });
    });
});

Then('User completes the checkout process', () => {
  cy.get('[data-test="finish"]').click();
});

Then('User should be on the Checkout Complete page', () => {
  cy.url().should('include', '/checkout-complete.html');

  cy.get('.pony_express').should('be.visible');
  cy.get('.complete-header').should('have.text', 'Thank you for your order!');
});
