import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

When('User clicks {string} in the hamburger menu', (menuOption: string) => {
  cy.get('#react-burger-menu-btn').click();
  cy.get('.bm-menu').contains(menuOption).click();
});

When('User sorts products by {string}', (sortOption: string) => {
  cy.get('.product_sort_container').select(sortOption);
});

When('User adds the {string} to the cart', (productName: string) => {
  cy.fixture('products').then((products) => {
    const product = products.products.find((p) => p.name.includes(productName));
    cy.contains('.inventory_item', product.name).find('button.btn_inventory').as('btn').click();
    cy.get('@btn').should('have.text', 'Remove');
  });
});

When('User removes the {string} from the cart', (productName: string) => {
  cy.fixture('products').then((products) => {
    const product = products.products.find((p) => p.name.includes(productName));
    cy.contains('.inventory_item', product.name).find('button.btn_inventory').as('btn').click();
    cy.get('@btn').should('have.text', 'Add to cart');
  });
});

Then('User should be on the Products page', () => {
  cy.url().should('include', '/inventory.html');
});

Then('User should be redirected to the Products page within {int} seconds', (seconds: number) => {
  const startTime = Date.now();
  cy.url()
    .should('include', '/inventory.html')
    .then(() => {
      const endTime = Date.now();
      const duration = (endTime - startTime) / 1000;
      expect(duration).to.be.lessThan(seconds, `Page took too long to load: ${duration} seconds`);
    });
});

Then('User should verify the product list is visible', () => {
  cy.get('.inventory_list').should('be.visible');
});

Then('User should verify every product has a name, description and price', () => {
  cy.fixture('products').then((products) => {
    products.products.forEach((product, index) => {
      cy.get('.inventory_item')
        .eq(index)
        .within(() => {
          cy.get('.inventory_item_name').should('have.text', product.name);
          cy.get('.inventory_item_desc').should('have.text', product.description);
          cy.get('.inventory_item_price').should('have.text', `$${product.price.toFixed(2)}`);
        });
    });
  });
});

Then('User should verify the products are sorted alphabetically in ascending order', () => {
  cy.fixture('products').then((products) => {
    const sortedProducts = [...products.products].sort((a, b) => a.name.localeCompare(b.name));
    cy.get('.inventory_item_name').each((item, index) => {
      expect(item.text().trim()).to.equal(sortedProducts[index].name);
    });
  });
});

Then('User should verify the products are sorted by price in ascending order', () => {
  cy.fixture('products').then((products) => {
    const sortedProducts = [...products.products].sort((a, b) => a.price - b.price);
    cy.get('.inventory_item_price').each((item, index) => {
      expect(item.text().trim()).to.equal(`$${sortedProducts[index].price.toFixed(2)}`);
    });
  });
});

Then('User should verify the cart badge displays the number {string}', (itemCount: string) => {
  cy.get('.shopping_cart_badge').should('have.text', itemCount);
});

Then("User should verify the cart badge isn't visible", () => {
  cy.get('.shopping_cart_badge').should('not.exist');
});
