const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://trezor.io",
    scraping: false,
    viewportWidth: 1920,
    viewportHeight: 1080,
    requestTimeout: 20000,
    defaultCommandTimeout: 100000,
    collectResponse: 'https://sgtm.trezor.io/g/collect**',
    setupNodeEvents(on, config) {
      // implement node event listeners here
      e2e: {
        on('before:browser:launch', (browser, launchOptions) => {
          if (browser.name === 'chrome' && browser.isHeadless) {
            // fullPage screenshot size is 1400x1200 on non-retina screens
            // and 2800x2400 on retina screens
            launchOptions.args.push('--window-size=1920,1080')
  
            // force screen to be non-retina (1400x1200 size)
            launchOptions.args.push('--force-device-scale-factor=1')
  
            // force screen to be retina (2800x2400 size)
            // launchOptions.args.push('--force-device-scale-factor=2')
          }
  
          if (browser.name === 'electron' && browser.isHeadless) {
            // fullPage screenshot size is 1400x1200
            launchOptions.preferences.width = 1920
            launchOptions.preferences.height = 1080
          }
  
          if (browser.name === 'firefox' && browser.isHeadless) {
            // menubars take up height on the screen
            // so fullPage screenshot size is 1400x1126
            launchOptions.args.push('--width=1920')
            launchOptions.args.push('--height=1080')
          }
  
          return launchOptions
        })
      }
    },
  },
})
