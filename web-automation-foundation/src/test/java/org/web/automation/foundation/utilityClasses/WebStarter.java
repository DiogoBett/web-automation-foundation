package org.web.automation.foundation.utilityClasses;

import io.cucumber.core.api.Scenario;
import io.cucumber.java.After;
import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.OutputType;
import org.openqa.selenium.TakesScreenshot;
import java.io.File;
import java.io.IOException;

public class WebStarter {

    // Cucumber Methods
    @Given("I have opened the Browser")
    public void openWebBrowser() {

        // Starts the Web Browser
        WebUtility.startWebBrowser(WebUtility.getValue("web.browser"));
    }

    @Then("^I should close the Browser$")
    public void closeWebBrowser() {

        // Close the Web Browser
        WebUtility.getDriver().quit();
    }

    @After
    public void checkIfFailed(Scenario scenario) {

        if (scenario.isFailed()) {
            WebUtility.takeScreenshot();
        }
    }

}
