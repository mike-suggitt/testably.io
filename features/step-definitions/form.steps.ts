import { Given } from '@cucumber/cucumber';

Given(/^I set the "([^"]*)" input value to "([^"]*)"$/, async function (this: any, cssSelector: string, textValue: string) {
  let value: any = textValue;
  const selector = this.getSelector(cssSelector);
  if (value.match(/{{.*}}/)) {
    // eslint-disable-next-line no-eval
    value = eval(value);
  }
  await (await $(selector)).setValue(value);
});

Given(/^I select the "([^"]*)" option for "([^"]*)"$/, async function (this: any, fieldValue: string, cssSelector: string) {
  const selector = this.getSelector(cssSelector);
  await (await $(selector)).selectByAttribute('value', fieldValue);
});
