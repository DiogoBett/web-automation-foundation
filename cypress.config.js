const { defineConfig } = require('cypress');
const { createBundler } = require('@bahmutov/cypress-esbuild-preprocessor');
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

  return config;
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
    setupNodeEvents,
    baseUrl: getBaseUrl(),
    watchForFileChanges: true,
    specPattern: '**/*.feature'
  },
  retries: {
    runMode: 1,
    openMode: 0
  },
  chromeWebSecurity: false,
  clientCertificates: [
    {
      url: 'https://env1.com',
      ca: [],
      certs: [
        {
          pfx: 'certs/certificate.p12',
          passphrase: 'certs/password.txt'
        }
      ]
    },
    {
      url: 'https://env2.com',
      ca: [],
      certs: [
        {
          pfx: 'certs/certificate.p12',
          passphrase: 'certs/password.txt'
        }
      ]
    },
    {
      url: 'https://env3.com',
      ca: [],
      certs: [
        {
          pfx: 'certs/certificate.p12',
          passphrase: 'certs/password.txt'
        }
      ]
    }
  ]
});

function getBaseUrl() {
  const stage = process.env.CYPRESS_stage;

  switch (stage) {
    case 'env1':
      return 'https://the-internet.herokuapp.com';
    case 'env2':
      return 'https://env2.example.com';
    case 'env3':
      return 'https://env3.example.com';
    default:
      throw new Error(`Unknown stage: ${stage}`);
  }
}
