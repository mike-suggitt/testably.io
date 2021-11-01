import { Given } from '@cucumber/cucumber';

Given(/^I visit the app$/, async function (this: any) {
  await this.client.url(this.config.serverUrls[this.config.targetEnv]);
  await this.client.deleteCookies();
});

Given(/^I navigate to "(.*)"/, async function (this: any, url: string) {
  await this.client.url(`${this.config.serverUrls[this.config.targetEnv]}${url}`);
});

Given(/^I hit the back button$/, async function (this: any) {
  await this.client.back();
});

Given(/^I hit the forward button$/, async function (this: any) {
  await this.client.forward();
});
