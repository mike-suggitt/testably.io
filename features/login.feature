Feature: Login to Beta App

  Scenario: User cannot log in with incorrect details
    Given I visit the beta app
    And I set the "user-login-email" input value to "a"
    And I set the "user-login-password" input value to "a"
    And I click "user-login-submit"
    Then I should wait for "AUTHENTICATION_ERROR" to be visible

  Scenario: User can log in with correct details
    Given A user exists with id "login_user"
    And I visit the beta app
    And I login as user with id "login_user"
    Then I should wait for "view:dashboard:skill-list" to be visible

  Scenario: User can log out
    Given A user exists with id "login_user"
    And I visit the beta app
    And I login as user with id "login_user"
    And I should wait for "view:dashboard:skill-list" to be visible
    When I click the "logOutButton"
    Then I should wait for "user-login-email" to be visible
