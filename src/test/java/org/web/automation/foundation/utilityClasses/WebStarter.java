package org.web.automation.foundation.utilityClasses;

import io.cucumber.core.api.Scenario;
import io.cucumber.java.After;
import io.cucumber.java.Before;

public class WebStarter {

    // Cucumber Methods
    @Before
    public void openWebBrowser() {

        // Starts the Web Browser
        WebUtility.startWebBrowser(WebUtility.getValue("web.browser"));
    }

    @After
    public void closeWebBrowser(Scenario scenario) {

        if (scenario.isFailed()) {
            WebUtility.takeScreenshot(scenario.getId());
        }

        // Close the Web Browser
        WebUtility.getDriver().quit();
    }

}
