import { Given } from '@cucumber/cucumber';

Given(/^I click( the)? "([^"]*)"$/, async function (this: any, ignore: any, cssSelector: string) {
  const selector = this.getSelector(cssSelector);
  await (await $(selector)).click();
});

Given(/^I type "(.*)" in "(.*)"$/, async function (this: any, string: string, cssSelector: string) {
  const selector = this.getSelector(cssSelector);
  await (await $(selector)).click();
  await browser.keys(string);
});

Given(/^I check( the)? "([^"]*)"$/, async function (this: any, ignore: any, cssSelector: string) {
  const selector = `${this.getSelector(cssSelector)} input[type=checkbox]`;
  await (await $(selector)).click();
});
