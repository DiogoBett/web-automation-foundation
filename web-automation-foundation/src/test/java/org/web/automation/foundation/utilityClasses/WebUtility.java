package org.web.automation.foundation.utilityClasses;

import io.appium.java_client.MobileElement;
import io.appium.java_client.TouchAction;
import io.appium.java_client.ios.IOSDriver;
import org.apache.commons.io.FileUtils;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.WebDriverWait;
import sun.management.BaseOperatingSystemImpl;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.List;
import java.util.Properties;

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

            case "Chrome":
                driver = new ChromeDriver();
                break;

            case "Firefox":
                driver = new FirefoxDriver();
                break;

            default:
                driver = new ChromeDriver();
                System.out.println("Default Browser is being used");

        }

        wait = new WebDriverWait(driver, 60);
        driver.manage().deleteAllCookies(); // Clear Browser Cookies
        driver.manage().window().maximize(); // Maximize Browser Window


    }

    // Web Utility Methods
    public static WebElement findElementByClassAndText(String elementClass, String elementText) {

        List<WebElement> elements;
        WebElement foundElement = null;
            elements = driver.findElements(By.className(elementClass));

            for (WebElement element : elements) {
                if (element.getAttribute("name").contains(elementText)) {
                    foundElement = element;
                    break;
                }
            }

            return foundElement;
    }

    public static String randomNumber() {

        int randomNumber = (int) (Math.random() * 999999);
        return Integer.toString(randomNumber);
    }

    public static void takeScreenshot() {

        File sourceFile;
        File destinationFile;

        // Takes Screenshot of Web Browser & Saves
        try {
            sourceFile = ((TakesScreenshot) WebUtility.getDriver()).getScreenshotAs(OutputType.FILE);
            destinationFile = new File(WebUtility.getValue("web.screenshots") + WebUtility.randomNumber() + ".png");
            FileUtils.copyFile(sourceFile, destinationFile);
        } catch (IOException ex) {
            System.out.println("Unable to Take Screenshot of Android Simulator");
        }

    }

    private static void setupDriverPaths() {

        String operatingSystem = getValue("web.system");

        if (operatingSystem.equals("WINDOWS")) {
            System.setProperty("webdriver.chrome.driver","src/test/resources/org/web/automation/foundation/browserDrivers/chromeDriverWindows.exe");
            System.setProperty("webdriver.gecko.driver", "src/test/resources/org/web/automation/foundation/browserDrivers/firefoxDriverWindows.exe");
        }

        if (operatingSystem.equals("MACOS")) {
            System.setProperty("webdriver.chrome.driver","src/test/resources/org/web/automation/foundation/browserDrivers/chromeDriverMac");
            System.setProperty("webdriver.gecko.driver", "src/test/resources/org/web/automation/foundation/browserDrivers/firefoxDriverMac");
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
