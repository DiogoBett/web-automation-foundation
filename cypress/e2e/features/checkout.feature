@Checkout
Feature: Checkout
    I want to be able to verify the Swag Lab Checkout page and its functionalities;
    I should be able to verify the appropriate valid and invalid scenarios.

    Background:
        Given User is at the login page
        When User enters the "validUser" credentials
        Then User should be on the Products page

    @Positive
    Scenario: Verify Checkout Item List
        Given User adds "2" products to the cart
        When User clicks on the cart icon
        Then User should be on the Checkout page
        And User should verify the checkout items match the ones that were added to the cart

    @Positive
    Scenario: Complete Checkout Process
        Given User adds "5" products to the cart
        And User proceeds to the Your Information page
        And User provides the user details information
        When User continues to the Overview page
        Then User should verify the overview items match and have the proper total amount
        And User completes the checkout process
        And User should be on the Checkout Complete page