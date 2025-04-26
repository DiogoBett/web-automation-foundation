![Web Automation](/assets/banner.png)

## web-automation-foundation

### Overview:

- This project serves as a foundation for web automation, designed to validate the functionality and user experience of web applications through automated testing of various workflows and scenarios;
- Currently, it uses the 'www.saucedemo.com' as an example for demonstration and development of test scenarios.

### Requirements

- Node Version Manager (1.2.2 or above);
- Node.js (22.15.0 or above).

### Guidelines:

- How to run:

  1. Setup the project:
     - `nvm use lts` (Set 'nvm' to use latest stable version of Node.js);
     - `npm install` (Installs all project dependencies).
  2. Run the automated tests:
     - `npm run cy:open:env` (Runs tests with Cypress GUI);
     - `npm run cy:run:env` (Runs tests in headless mode);
     - Replace 'env' by the environment name.

- Tags
  ```Gherkin
    @Login
      # Validates the Login feature with several different credentials;
    @Products
      # Validates the Product List feature with several page features like menus, buttons, information, filters and cart;
    @Checkout
      # Validates the Checkout feature with several different items, user information and order completion.
  ```

### Key Components

- Cypress - A modern end-to-end testing framework built for the web, offering fast, reliable, and easy-to-write tests for web applications;
- Cucumber - A tool that supports Behavior-Driven Development (BDD), allowing tests to be written in plain language for better collaboration between technical and non-technical stakeholders.
- Node.js - A runtime environment that simplifies the build process and dependency management enabling efficient development.

### Documentation

- Cypress - https://docs.cypress.io/
- Cucumber - https://cucumber.io/docs/cucumber/
- Node.js - https://nodejs.org/docs/latest-v22.x/api/

### FAQ / Troubleshooting

- A;
- B;
- C.
