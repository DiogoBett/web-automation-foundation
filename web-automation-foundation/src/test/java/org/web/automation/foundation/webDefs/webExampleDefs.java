package org.web.automation.foundation.webDefs;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.junit.Assert;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.web.automation.foundation.utilityClasses.WebUtility;

public class webExampleDefs {

    // Basic Required Variables
    private final WebDriver driver = WebUtility.getDriver();
    private final WebDriverWait wait = WebUtility.getWait();

    @Given("^I am in this Website - Define Context$")
    public void something1() {
        // Cucumber Given Method Implementation
    }

    @When("^I do this in the Website - Action / Input$")
    public void something2() {
        // Cucumber When Method Implementation
    }

    @Then("^This should happen - Result / Output$")
    public void something3() {
        // Cucumber Then Method Implementation
    }

}
