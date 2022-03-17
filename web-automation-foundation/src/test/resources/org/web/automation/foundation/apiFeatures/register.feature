Feature: API [Insert Feature Name Here]
  Everybody wants to know if I can:
  -> Do Something
  -> Do Something

  Scenario: [Scenario Name] Example: Register API Success
    Given I build the Request Header
    And I build the Request Body with Valid Information
    When The Request is made with the "POST" Method
    Then The Request should return the Status Code 200

  Scenario: [Scenario Name] Example: Register API Fail
    Given I build the Request Header
    And I build the Request Body with Invalid Information
    When The Request is made with the "POST" Method
    Then The Request should return the Status Code 400