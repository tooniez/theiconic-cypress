const { defineConfig } = require("cypress");

module.exports = defineConfig({
  fixturesFolder: "cypress/fixtures",
  screenshotsFolder: "cypress/screenshots",
  videosFolder: "cypress/videos",
  chromeWebSecurity: false,
  failonStatusCode: false,

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here

      //Print out the browser name and the number of specs before the run
      on('before:run', (details) => {
        if (details.specs && details.browser) {
          // details.specs and details.browser will be undefined in interactive mode
          console.log(
            'Running',
            details.specs.length,
            'specs in',
            details.browser.name
          )
        }
        return details;
      });

      //Print out the browser name and the number of specs after the run
      on('after:run', (results) => {
        console.log(results);
      });
      

      on('before:browser:launch', (browser = {}, launchOptions) => {
        launchOptions.args.push('--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0');

        return launchOptions;
      });

      return config;
    },
  },
});
