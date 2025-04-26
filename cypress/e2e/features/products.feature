@Products
Feature: Products
    I want to be able to verify the Swag Lab Products page and its functionalities;
    I should be able to verify the appropriate valid and invalid scenarios.

    Background:
        Given User is at the login page
        When User enters the "validUser" credentials
        Then User should be on the Products page

    @Positive
    Scenario: Verify Product List
        Then User should verify the product list is visible
        And User should verify every product has a name, description and price

    @Positive
    Scenario: Sort Products by Name (A to Z)
        When User sorts products by "Name (A to Z)"
        Then User should verify the products are sorted alphabetically in ascending order

    @Positive
    Scenario: Sort Products by Price (Low to High)
        When User sorts products by "Price (low to high)"
        Then User should verify the products are sorted by price in ascending order

    @Positive
    Scenario: Add Products to the Cart
        When User adds the "Backpack" to the cart
        And User adds the "Jacket" to the cart
        Then User should verify the cart badge displays the number "2"

    @Positive
    Scenario: Remove Product from the Cart
        Given User adds the "Backpack" to the cart
        When User removes the "Backpack" from the cart
        Then User should verify the cart badge isn't visible

    @Positive
    Scenario: Logout
        When User clicks "Logout" in the hamburger menu
        Then User should be on the login page