import { config as baseConfig } from './wdio.conf';

if (!process.env.BS_USER) {
  throw new Error('You need to set your Browserstack username in the BS_USER environment variable');
}
if (!process.env.BS_KEY) {
  throw new Error('You need to set your Browserstack key in the BS_KEY environment variable');
}

const config = Object.assign(baseConfig, {
  remote: true,
  user: process.env.BS_USER,
  key: process.env.BS_KEY,
  host: 'hub.browserstack.com',
  services: [
    'selenium-standalone',
    'browserstack',
  ],
  capabilities: [{
    browser: 'Chrome',
    name: 'single_test',
    build: 'first-webdriverio-browserstack-build',
  }],
  maxInstances: 2,
});

export { config };
