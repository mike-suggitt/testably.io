import { Given } from '@cucumber/cucumber';

Given(/^I set the viewport to "(.*)" by "(.*)"$/, async function (this: any, w: string, h: string) {
  await this.client.setWindowSize({
    width: parseInt(w, 10),
    height: parseInt(h, 10),
  });
});

Given(/^I scroll down "(.*)" px in "(.*)"$/, async function (this: any, yOffset: string, cssSelector: string) {
  this.client.execute(
    (selector: string, yOffsetVal: number) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      document.querySelector(selector).scrollTop = yOffsetVal;
    },
    this.getSelector(cssSelector),
    parseInt(yOffset, 10),
  );
});

Given(/^I scroll to "(.*)" in "(.*)"$/, async function (this: any, targetCssSelector: string, cssSelector: string) {
  await browser.waitUntil(async () => {
    const containerSelector = this.getSelector(cssSelector);
    const targetSelector = this.getSelector(targetCssSelector);
    await browser.execute(
      async (container, target) => {
        const scrollElement = document.querySelector(container);
        const targetElement = document.querySelector(target);
        scrollElement.scrollTop = targetElement.offsetTop;
        scrollElement.scrollLeft = targetElement.offsetLeft;
      },
      containerSelector,
      targetSelector,
    );
    const isDisplayed = await (await $(targetSelector)).isDisplayed();
    return isDisplayed;
  }, this.EXPECTATION_TIMEOUT);
});
