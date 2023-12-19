
module.exports = (on, config) => {
    // implement node event listeners here
    // require('@cypress/code-coverage/task')(on, config);
    on('before:browser:launch', (browser = {}, launchOptions) => {
      launchOptions.args.push('--user-agent=Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:120.0) Gecko/20100101 Firefox/120.0');
      return launchOptions;
    });
  
    return config;
  };