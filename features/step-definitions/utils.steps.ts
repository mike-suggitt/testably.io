import { Given } from '@cucumber/cucumber';

let index = 0;

Given(/^I wait (\d+) seconds?$/, async function (this: any, seconds: number) {
  await this.client.pause(seconds * 1000);
});

Given(/^I refresh the page$/, async function (this: any) {
  await this.client.refresh();
});

Given(/^I take a screenshot$/, async function (this: any) {
  this.client.saveScreenshot(`./test/screenshots/${index}.png`);
  index += 1;
});

Given(/^I dump the logs$/, function (this: any) {
  const logs = this.client.log('browser');
  console.log(logs);
});

Given(/^I clear cookies$/, async function (this: any) {
  await this.client.deleteCookie();
});

Given(/^I store the text of "(.*)" as id "(.*)"$/, async function (this: any, cssSelector: string, id: string) {
  const selector = this.getSelector(cssSelector);
  const text = await (await $(selector)).getText();
  this.state.textStore = this.state.textStore || {};
  this.state.textStore[id] = text;
});
