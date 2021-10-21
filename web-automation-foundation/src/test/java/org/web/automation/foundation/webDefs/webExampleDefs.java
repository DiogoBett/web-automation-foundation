package org.web.automation.foundation.webDefs;

import io.cucumber.java.en.Given;
import io.cucumber.java.en.Then;
import io.cucumber.java.en.When;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.web.automation.foundation.utilityClasses.WebUtility;

public class webExampleDefs {

    // Basic Required Variables
    private final WebDriver driver = WebUtility.getDriver();
    private final WebDriverWait wait = WebUtility.getWait();

    @Given("I am in this Example Website")
    public void something1() {
        // Cucumber Given Method Implementation

        // Go to the Example Website
        driver.get("https://demoqa.com/");
    }

    @When("I go to the Example Form")
    public void something2() {
        // Cucumber When Method Implementation

        // Click "Elements" Option
        WebUtility.findElementByText("Elements").click();
        WebUtility.validatePageUrl("elements");

        // Click "Text Box" Option
        WebUtility.findElementByText("Text Box").click();
        WebUtility.validatePageUrl("text-box");
    }

    @When("I fill the Example Form with {string} Name and {string} Email")
    public void something3(String name, String email) {
        // Cucumber When Method Implementation

        // Write Full Name and Email
        driver.findElement(By.id("userName")).sendKeys(name);
        driver.findElement(By.id("userEmail")).sendKeys(email);
    }

    @Then("I submit the Example Form")
    public void something4() {
        // Cucumber Then Method Implementation

        // Click "Submit" Button
        driver.findElement(By.id("submit")).click();
    }

    @Then("I validate the Example Form")
    public void something5() {
        // Cucumber Then Method Implementation

        // Validate Example Form Elements Text
        WebUtility.validateElementTextContains(driver.findElement(By.id("name")), "Name:");
        WebUtility.validateElementTextContains(driver.findElement(By.id("email")), "Email:");
    }

}