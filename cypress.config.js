const { defineConfig } = require('cypress')

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  defaultCommandTimeout: 20000,
  requestTimeout: 10000,
  chromeWebSecurity: false,
  env: {
    allure: true,
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('@shelex/cypress-allure-plugin/writer')(on, config)
    },
    baseUrl: 'https://infinite-savannah-93746.herokuapp.com/',
  },
})
