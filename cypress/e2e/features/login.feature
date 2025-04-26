@Login
Feature: Login
  I want to be able to login to the Swag Lab application;
  I should be able to verify the appropriate valid and invalid scenarios.

  Background:
    Given User is at the login page

  @Positive
  Scenario: Standard User
    When User enters the "validUser" credentials
    Then User should be on the Products page

  @Negative
  Scenario: Locked Out User
    When User enters the "lockedUser" credentials
    Then User should be on the login page
    And User should see a "user has been locked out" login error message

  @Negative
  Scenario: Performance User
    When User enters the "performanceUser" credentials
    Then User should be redirected to the Products page within 2 seconds