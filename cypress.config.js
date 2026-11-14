import { addCucumberPreprocessorPlugin } from '@badeball/cypress-cucumber-preprocessor';
import { createEsbuildPlugin } from '@badeball/cypress-cucumber-preprocessor/esbuild';
import createBundler from '@bahmutov/cypress-esbuild-preprocessor';
import { defineConfig } from 'cypress';

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

export default defineConfig({
  filterSpecs: true,
  chromeWebSecurity: true,
  omitFilteredSpecs: true,
  watchForFileChanges: false,
  e2e: {
    specPattern: '**/*.feature',
    setupNodeEvents
  }
});
