// eslint-disable-next-line import/no-extraneous-dependencies
import { setDefaultTimeout, setWorldConstructor } from '@cucumber/cucumber';
// eslint-disable-next-line import/no-extraneous-dependencies
import { expect, assert } from 'chai';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('./config');

setDefaultTimeout(60 * 1000);

const seconds = (n: number) => n * 1000;

class World {
  state: any;

  attach: any;

  assert: any;

  expect: any;

  client: any;

  EXPECTATION_TIMEOUT: number;

  config: any;

  constructor(params: any) {
    const { attach } = params;
    this.state = {};
    this.attach = attach;
    this.assert = assert;
    this.expect = expect;
    this.client = browser;
    this.EXPECTATION_TIMEOUT = seconds(10);

    const { serverUrls, targetEnv } = <any>browser.config;
    this.config = {
      ...config,
      serverUrls,
      targetEnv,
    };
  }

  private processSelector(selector: string) {
    if (selector.search(/\s/gi) !== -1) {
      throw new Error('selector cannot contain spaces');
    }
    return selector
      .split('|')
      .map((level) => level.split('.')
      // eslint-disable-next-line no-use-before-define
        .map((part) => this.processRecursive(part) || `[data-test~="${part}"]`)
        .join(''))
      .join(' ');
  }

  processRecursive(part: string): string {
    if (part in config.lookups) {
      if (config.lookups[part].indexOf('|') === -1) {
        return config.lookups[part];
      }
      return this.processSelector(config.lookups[part]);
    }
    return '';
  }

  getSelector(field: string) {
    return this.processSelector(field);
  }
}

setWorldConstructor(World);
