import { Given } from '@cucumber/cucumber';

Given(/^I skip com-b questions"$/, async function (this: any) {
  const form = this.getSelector('view:comb-questions');
  const nextButton = this.getSelector('btn:comb-next');
  const option = this.getSelector('likert-options-1');

  await (await $(form)).waitForDisplayed({
    timeout: this.EXPECTATION_TIMEOUT,
  });
  //Proceed
  await (await $(nextButton)).click();

  const questions = new Array(12);
  for await (const question of questions) {
    await (await $(option)).click();
    await (await $(nextButton)).click();
    await this.client.pause(500);
  }
  await (await $(nextButton)).click();
});
