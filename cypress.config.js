const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { defineConfig } = require('cypress');

async function setupNodeEvents(on, config) {
  await addCucumberPreprocessorPlugin(on, config);

  on(
    'file:preprocessor',
    createBundler({
      plugins: [createEsbuildPlugin(config)]
    })
  );

  setupBaseUrl(config);
  return config;
}

function setupBaseUrl(config) {
  const environment = config.expose.environment;

  switch (environment) {
    case 'dev':
      config.baseUrl = 'https://www.saucedemo.com/'; // Example Test URL
      break;
    case 'preprod':
      config.baseUrl = 'https://preprod.example.com';
      break;
    case 'prod':
      config.baseUrl = 'https://prod.example.com';
      break;
    default:
      throw new Error(`Unknown Environment: ${environment}`);
  }
}

module.exports = defineConfig({
  filterSpecs: true,
  chromeWebSecurity: true,
  omitFilteredSpecs: true,
  watchForFileChanges: false,
  e2e: {
    specPattern: '**/*.feature',
    setupNodeEvents
  }
});
