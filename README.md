# breakCaptcha

<h2>Starting chrome without cross-origin resource sharing is necessary to interact with the reCAPTCHA iframe using JS.</h2>

<i>Ideally a future version will be implemented in pure Javascript and the flask app won't be needed</i>

## How to Run

```console
foo@bar:~$ chromium-browser --disable-web-security -user-data-dir=~/ & python app.py
```

In Chrome, navigate to "chrome://extensions" and drag the ~/extensions/ directory into the browser window.


