import { config as baseConfig } from './wdio.conf';

const config = Object.assign(baseConfig, {
  defaultTags: baseConfig.defaultTags.concat(['not @headlessignore']),
  capabilities: [
    {
      maxInstances: 1,
      browserName: 'chrome',
      'goog:chromeOptions': {
        args: [
          '--no-sandbox',
          '--headless',
          // Use --disable-gpu to avoid an error from a missing Mesa
          // library, as per
          // https://chromium.googlesource.com/chromium/src/+/lkgr/headless/README.md
          '--disable-gpu',
        ],
      },
    },
  ],
});

export { config };
