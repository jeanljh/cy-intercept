const { defineConfig } = require('cypress')

module.exports = defineConfig({
    viewportWidth: 1920,
    viewportHeight: 1080,
    defaultCommandTimeout: 20000,
    requestTimeout: 10000,
    chromeWebSecurity: false,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      charts: true,
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
      debug: false
    },
    e2e: {
        setupNodeEvents(on, config) {
          require('cypress-mochawesome-reporter/plugin')(on)
        },
        baseUrl: 'https://wlsf82-hacker-stories.web.app/',
    },
})
