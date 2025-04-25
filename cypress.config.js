const { defineConfig } = require('cypress');
const createBundler = require('@bahmutov/cypress-esbuild-preprocessor');
const { createEsbuildPlugin } = require('@badeball/cypress-cucumber-preprocessor/esbuild');
const { addCucumberPreprocessorPlugin } = require('@badeball/cypress-cucumber-preprocessor');

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
  const stage = config.env.stage;

  switch (stage) {
    case 'env1':
      config.baseUrl = 'https://the-internet.herokuapp.com';
      break;
    case 'env2':
      config.baseUrl = 'https://env2.example.com';
      break;
    case 'env3':
      config.baseUrl = 'https://env3.example.com';
      break;
    default:
      throw new Error(`Unknown stage: ${stage}`);
  }
}

module.exports = defineConfig({
  reporter: 'junit',
  reporterOptions: {
    toConsole: true
  },
  video: false,
  filterSpecs: true,
  omitFilteredSpecs: true,
  e2e: {
    env: {},
    specPattern: '**/*.feature',
    setupNodeEvents,
    watchForFileChanges: true
  },
  retries: {
    runMode: 1,
    openMode: 0
  },
  chromeWebSecurity: false
});