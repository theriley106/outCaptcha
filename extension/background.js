chrome.webRequest.onCompleted.addListener(function(details) {
    // Waits until window is completely loaded
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
        // Specifies which window to wait on
    }, function(tabs) {
        // tabs is an array of tab objects
        var tab = tabs[0];
        // Sets "tab" to the current active tab
        chrome.storage.sync.get("data", function(ob) {
            // Grabs the "data" var from the local dictionary
            if ((String(details.type) == "media") && (String(tab.url) != String(details.url))) {
                // This determines if the captca is playing audio (Instead of showing image)
                apiKey = String(ob.data);
                // This is the API key that is grabbed (All api keys are saved locally)
                var xhr = new XMLHttpRequest();
                // Starts a network request
                formData = new FormData();
                // This is the form data that is sent from a post request
                xhr.open('post', 'http://localhost:5000/', false);
                // Open up a post request to localhost
                formData.append("url", details.url);
                // This appends the url of the mp3 file from the captcha to form data
                formData.append("apiKey", apiKey);
                // Appends the apikey to the formdata
                xhr.send(formData);
                // Sends the form data
                var returnVal = xhr.responseText;
                // This is the response sent from the server
                if (returnVal == "INVALID_API_KEY") {
                    // The server will return specifics about errors
                    alert("Invalid API Key")
                    // Alerts to user about possible error
                } else if (returnVal == "UNKNOWN_ERROR") {
                    // The server will return specifics about errors
                    alert("An unknown error has occured")
                    // Alerts to user about possible error
                } else {
                    // This means the captcha was successfully solved
                    chrome.tabs.executeScript({
                        // Execute script allows you to interact with the current active window
                        code: `
                  document.querySelector('[title="recaptcha challenge"]').contentWindow.document.getElementById('audio-response').value = "` + returnVal + '"'
                        // Clicks the input box and types in the captcha solution
                    });
                    chrome.tabs.executeScript({
                        // Execute script allows you to interact with the current active window
                        code: `
                    document.querySelector('[title="recaptcha challenge"]').contentWindow.document.getElementById("recaptcha-verify-button").click()
                    `
                        // Clicks the verify button
                    });
                }
            } else {
                chrome.tabs.executeScript({ code: `document.querySelector('[title="recaptcha challenge"]').contentWindow.document.getElementById("recaptcha-audio-button").click()` });
                // This means it's currently showing a captcha image and it needs to click the audio button to switch over to audio captcha
            }
        });
    });


}, { urls: ["https://translate.google.com/translate_tts?*", "https://www.google.com/recaptcha/api2/payload?*"] });
// ^ These are the URL patterns that will trigger this function

chrome.webRequest.onCompleted.addListener(function(details) {
    // Waits until window is completely loaded
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
        // Specifies which window to wait on
    }, function(tabs) {
        chrome.storage.sync.get("data", function(obj) {
            // Grabs the "data" var from the local dictionary
            apiKey = String(obj.data);
            // This is the API key that is grabbed (All api keys are saved locally)
            if (apiKey == "undefined") {
                // This means the user has not inputted an API Key
                alert("No API Key Set - Please input API key")
                // Alerts the user
            } else {
                // This means the user has configured to extension with an API key
                var tab = tabs[0];
                // Current active tab
                if (String(tab.url) != String(details.url)) {
                    // This means the function is not running multiple times
                    chrome.tabs.executeScript({ code: `document.querySelector('[role="presentation"]').contentWindow.document.getElementById("recaptcha-anchor").click()` });
                    // Clicks that checkbox on the captcha
                }
            }
        });

    });


}, { urls: ["https://www.google.com/recaptcha/api2/bframe?*"] });
// ^ These are the URL patterns that will trigger this function
