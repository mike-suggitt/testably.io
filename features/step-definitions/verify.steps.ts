import { Then } from '@cucumber/cucumber';

Then(/^I (?:can|should) see "(.*)" at least "(\d+)" times?$/, async function (this: any, cssSelector: string, count: string) {
  const selector = this.getSelector(cssSelector);
  const result = await $$(selector);
  this.expect(result.values.length).to.be.at.least(parseInt(count, 10));
});

Then(/^I (?:can|should) see "(.*)" exactly "(\d+)" times?$/, async function (this: any, cssSelector: string, count: string) {
  const selector = this.getSelector(cssSelector);
  const result = await $$(selector);
  this.expect(result.values.length).to.equal(parseInt(count, 10));
});

Then(/^I (?:can|should) expect "(.*)" text to( not)? "(.*)" stored text of id "(.*)"$/, async function (this: any, cssSelector: string, not: boolean, matchString: any, id: string) {
  const selector = this.getSelector(cssSelector);
  const matchers = matchString.split(',');
  const operator = matchers[0];
  const modifier = matchers[1] || '';
  let text: any = this.state.textStore[id];
  const elementText = await (await $(selector)).getText();
  if (operator === 'match') {
    text = new RegExp(text, modifier);
  }
  let expect = this.expect(elementText).to;
  if (not) {
    expect = expect.not;
  }
  expect[operator](text);
});

Then(/^I (?:can|should) expect "(.*)" text to( not)? "(.*)" "(.*)"$/, async function (this: any, cssSelector: string, not: boolean, matchString: any, textString: string) {
  const selector = this.getSelector(cssSelector);
  const matchers = matchString.split(',');
  const operator = matchers[0];
  const modifier = matchers[1] || '';
  let text: any = textString;
  const elementText = await (await $(selector)).getText();
  if (operator === 'match') {
    text = new RegExp(text, modifier);
  }
  let expect = this.expect(elementText).to;
  if (not) {
    expect = expect.not;
  }
  expect[operator](text);
});

const invert = (should: any, not: boolean) => (not ? should.not : should);

Then(/^I (?:can|should) wait for the url to( not)? "(.*)" "(.*)"$/, function (this: any, not: boolean, matchString: any, textString: string) {
  const matchers = matchString.split(',');
  const operator = matchers[0];
  const modifier = matchers[1] || '';
  let text: any = textString;
  browser.waitUntil(
    async () => {
      try {
        const url = await browser.getUrl();
        if (operator === 'match') {
          text = new RegExp(text, modifier);
        }
        invert(this.expect(url).to, not)[operator](text);
        return true;
      } catch (err) {
        return false;
      }
    }, {
      timeout: this.EXPECTATION_TIMEOUT,
      timeoutMsg: `Browser url did not ${matchers} ${text} after ${this.EXPECTATION_TIMEOUT} ms`,
    },
  );
});

Then(/^I (?:can|should) expect the url to( not)? "(.*)" "(.*)"$/, async function (this: any, not: boolean, matchString: any, textString: string) {
  const matchers = matchString.split(',');
  const operator = matchers[0];
  const modifier = matchers[1] || '';
  let text: any = textString;
  const url = await browser.getUrl();
  if (operator === 'match') {
    text = new RegExp(text, modifier);
  }
  invert(this.expect(url).to, not)[operator](text);
});

Then(/^I should expect the title to( not)? "(.*)" "(.*)"$/, async function (this: any, not: boolean, matchString: any, textString: string) {
  const matchers = matchString.split(',');
  const operator = matchers[0];
  const modifier = matchers[1] || '';
  let text: any = textString;
  const titleText = await browser.getTitle();
  if (operator === 'match') {
    text = new RegExp(text, modifier);
  }
  let expect = this.expect(titleText).to;
  if (not) {
    expect = expect.not;
  }
  expect[operator](text);
});

Then(/^I should expect "(.*)" to( not)? be visible$/, async function (this: any, cssSelector: string, not: boolean) {
  const selector = this.getSelector(cssSelector);

  const isExisting = await (await $(selector)).waitForExist();
  if (!isExisting && not) {
    return this.expect(1).to.equal(1);
  }
  if (isExisting) {
    const isVisible = await (await $(selector)).waitForDisplayed();
    return this.expect(isVisible).to.equal(!not);
  }
  return this.assert(
    false,
    'Expected element to exist but it does not.',
  );
});

Then(/^I should expect "(.*)" to( not)? be visible within viewport$/, async function (this: any, cssSelector: string, not: boolean) {
  const selector = this.getSelector(cssSelector);

  const isExisting = await (await $(selector)).isExisting();
  if (!isExisting && not) {
    return this.expect(1).to.equal(1);
  } if (isExisting) {
    const isVisible = await (await $(selector)).isDisplayedInViewport();
    return this.expect(isVisible).to.equal(!not);
  }
  return this.assert(
    false,
    'Expected element to exist but it does not.',
  );
});

Then(/^I should expect "(.*)" to( not)? exist$/, async function (this: any, cssSelector: string, not: boolean) {
  const selector = this.getSelector(cssSelector);
  const isExisting = await (await $(selector)).isExisting();
  this.expect(isExisting).to.equal(!not);
});

Then(/^I should wait for "(.*)" to( not)? be visible$/, async function (this: any, cssSelector: string, not: boolean) {
  const selector = this.getSelector(cssSelector);
  await (await $(selector)).waitForDisplayed({
    timeout: this.EXPECTATION_TIMEOUT,
    reverse: !!not,
  });
});

Then(/^I should wait for "(.*)" to( not)? exist$/, async function (this: any, cssSelector: string, not: string) {
  const selector = this.getSelector(cssSelector);
  await (await $(selector)).waitForExist({
    timeout: this.EXPECTATION_TIMEOUT,
    reverse: !!not,
  });
});

Then(/^I should expect "(.*)" to( not)? be enabled$/, async function (this: any, cssSelector: string, not: boolean) {
  const selector = this.getSelector(cssSelector);
  const ariaDisabled = await (await $(selector)).getAttribute('aria-disabled');
  if (ariaDisabled != null) {
    const isEnabled = ariaDisabled !== 'true';
    this.expect(isEnabled).to.equal(!not);
  } else {
    const isEnabled = await (await $(selector)).isEnabled();
    this.expect(isEnabled).to.equal(!not);
  }
});
