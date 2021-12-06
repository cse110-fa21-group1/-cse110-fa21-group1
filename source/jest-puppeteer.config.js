// jest-puppeteer.config.js
const port = process.env.TEST_SERVER_PORT ?
  Number(process.env.TEST_SERVER_PORT) :
  8080;

process.env.TEST_SERVER_PORT = port;

module.exports = {
  launch: {
    headless: false,
    slowMo: 25,
  },
  browserContext: process.env.INCOGNITO ? 'incognito' : 'default',
  server: {
    command: `node server.js`,
    port,
    launchTimeout: 60000,
  },
};
