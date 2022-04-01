package org.web.automation.foundation.utilityClasses;

import org.apache.commons.io.FileUtils;
import org.junit.Assert;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;
import java.util.concurrent.TimeUnit;

public class WebUtility {

    // Project-wide Properties File
    private static Properties properties;

    // Basic Required Variables
    private static WebDriver driver;
    private static WebDriverWait wait;

    // Selenium Driver Method
    static void startWebBrowser(String browser) {

        setupDriverPaths();

        switch(browser) {

            case "CHROME":
                driver = new ChromeDriver();
                break;

            case "FIREFOX":
                driver = new FirefoxDriver();
                break;

            case "EXAMPLE":
                // driver = new ExampleDriver();
                break;

            default:
                driver = new ChromeDriver();
                System.out.println("Default Browser is being used");

        }

        wait = new WebDriverWait(driver, 60); // Creates a Web Driver Wait
        driver.manage().timeouts().implicitlyWait(15, TimeUnit.SECONDS); // Set Find Element Timeout
        driver.manage().deleteAllCookies(); // Clear Browser Cookies
        driver.manage().window().maximize(); // Maximize Browser Window

    }

    // Web Utility Methods

    public static void validatePageUrl(String pageUrl) {

        Assert.assertTrue(driver.getCurrentUrl().contains(pageUrl));
    }

    public static void validateElementTextEquals(WebElement element, String elementText) {

        Assert.assertEquals(element.getText(), elementText);
    }

    public static void validateElementTextContains(WebElement element, String elementText) {

        Assert.assertTrue(element.getText().contains(elementText));
    }

    public static WebElement findElementByText(String elementText) {

        return driver.findElement(By.xpath("//*[contains(text(),'" + elementText + "')]"));
    }

    public static WebElement findElementByAttribute(String attributeName, String attributeValue) {

        return driver.findElement(By.xpath("//*[@" + attributeName + "='" + attributeValue + "']"));
    }

    public static void takeScreenshot(String scenarioId) {

        File sourceFile;
        File destinationFile;

        // Takes Screenshot of Web Browser & Saves
        try {
            sourceFile = ((TakesScreenshot) WebUtility.getDriver()).getScreenshotAs(OutputType.FILE);
            destinationFile = new File(WebUtility.getValue("web.screenshots") + scenarioId + ".png");
            FileUtils.copyFile(sourceFile, destinationFile);
        } catch (IOException ex) {
            System.out.println("Unable to Take Screenshot of Web Browser");
        }

    }

    private static void setupDriverPaths() {

        String operatingSystem = getValue("web.system");

        if (operatingSystem.equals("WINDOWS")) {
            System.setProperty("webdriver.chrome.driver","src/resources/org/web/automation/foundation/browserDrivers/chromeDriverWindows.exe");
            System.setProperty("webdriver.gecko.driver", "src/resources/org/web/automation/foundation/browserDrivers/firefoxDriverWindows.exe");
        }

        if (operatingSystem.equals("MACOS")) {
            System.setProperty("webdriver.chrome.driver","src/resources/org/web/automation/foundation/browserDrivers/chromeDriverMac");
            System.setProperty("webdriver.gecko.driver", "src/resources/org/web/automation/foundation/browserDrivers/firefoxDriverMac");
        }

    }

    // Mobile Utility Getters
    public static WebDriver getDriver() {
        return driver;
    }

    public static WebDriverWait getWait() {
        return wait;
    }

    // Access Project-wide Properties
    static String getValue(String key) {

        try {
            properties = new Properties();
            properties.load(new FileInputStream("automation.properties"));
        } catch (IOException ex ) {
            System.out.println(ex.getMessage());
        }

        return properties.getProperty(key);
    }

}