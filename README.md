# outCaptcha
## Solving reCAPTCHA 2.0 Without Human Interaction (Python & Javascript)

<i>Ideally a future version will be implemented in pure Javascript and the flask app won't be needed</i>

## How to Run

```console
foo@bar:~$ chromium-browser --disable-web-security -user-data-dir=~/ & python app.py
```

<i>Note: Starting chrome without cross-origin resource sharing is necessary to interact with the reCAPTCHA iframe using JS.</i>

In Chrome, navigate to "chrome://extensions" and drag the ~/extensions/ directory into the browser window.

Configure the Chrome extension with a valid Google Cloud Speech-To-Text API key (Pictured)

<p align="center">
  <img src="src/keyInput.png" width="250"/>
</p>

## Testing

Check out https://patrickhlauke.github.io/recaptcha/ to test the functionality.

## Technological Overview

The extension uses chrome.webRequest with the following URL pattern to detect the presence of a captcha on the web page:

```
https://www.google.com/recaptcha/api2/bframe?*
```

<p align="center">
  <img src="src/unsolvedCaptcha.png" width="250"/>
</p>
<p align="center">After detecting a Captcha, the extension uses the following Javascript code to "Click" the checkbox indicating a human is present:</p>

```javascript
// This code snippet can be found in extension/background.js
chrome.tabs.executeScript({ code: `document.querySelector('[role="presentation"]').contentWindow.document.getElementById("recaptcha-anchor").click()` });
```



