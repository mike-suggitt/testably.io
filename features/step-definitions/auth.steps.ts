import { Given } from '@cucumber/cucumber';
import { addUser } from '../../support/api/users';

const login = async function (this: any, username: string, password: string) {
  await (await $(this.getSelector('user-login-email'))).setValue(username);
  await (await $(this.getSelector('user-login-password'))).setValue(password);
  await (await $(this.getSelector('user-login-submit'))).click();
};

Given(/^A user exists with id "(.*)"$/, async function (this: any, id: any) {
  const user = await addUser();
  this.state.users = this.state.users || {};
  this.state.users[id] = user;
});

Given(/I login as user with id "(.*)"$/, async function (this: any, id: any) {
  const user = this.state.users[id];
  await login.call(this, this.state.users[id].email, this.state.users[id].password);
});

Given(/I login for the first time as user with id "(.*)"$/, async function (this: any, id: any) {
  await login.call(this, this.state.users[id].email, this.state.users[id].password);
});

Given(/^I login with (\w+) and (.+)$/, login);
