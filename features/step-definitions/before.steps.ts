import { Before } from '@cucumber/cucumber';

// Asynchronous Promise
Before(async () => {
  await browser.reloadSession();
});
