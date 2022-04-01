package org.web.automation.foundation.apiDefs;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import io.restassured.RestAssured;
import io.restassured.internal.RequestSpecificationImpl;
import io.restassured.response.Response;
import io.restassured.specification.RequestSpecification;
import org.junit.Assert;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.web.automation.foundation.utilityClasses.WebUtility;

public class apiExampleDefs {

    // Basic Required Variables
    private RequestSpecification exampleRequest;
    private Response exampleResponse;

    @Given("I build the Request Header")
    public void something1() {
        // Cucumber Given Method Implementation

        // Setup Example Request
        exampleRequest.baseUri("https://reqres.in/api/register");
        exampleRequest.header("Content-Type",  "application/json");
    }

    @Given("I build the Request Body with Valid Information")
    public void something2() {
        exampleRequest.body("{\n" +
                "    \"email\": \"eve.holt@reqres.in\",\n" +
                "    \"password\": \"pistol\"\n" +
                "}");
    }

    @Given("I build the Request Body with Invalid Information")
    public void something3() {
        exampleRequest.body("{\n" +
                "    \"email\": \"sydney@fife\"\n" +
                "}");
    }

    @When("The Request is made with the {string} Method")
    public void something4(String requestType) {
        // Cucumber When Method Implementation

        switch(requestType) {
            case "POST":
                exampleResponse = exampleRequest.post();
                break;
            case "PUT":
                exampleResponse = exampleRequest.put();
                break;
            case "DELETE":
                exampleResponse = exampleRequest.delete();
                break;
            default:
                exampleResponse = exampleRequest.get();
        }
    }

    @Then("The Request should return the Status Code {int}")
    public void something5(int statusCode) {
        // Cucumber Then Method Implementation

        // Verify Status Code from the Response
        Assert.assertEquals(statusCode, exampleResponse.getStatusCode());
    }

}
