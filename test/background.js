chrome.webRequest.onCompleted.addListener(function(details) {
	chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        // and use that tab to fill in out title and url
        var tab = tabs[0];
        if ((String(details.type) == "media") && (String(tab.url) != String(details.url))){
            var xhr = new XMLHttpRequest();
            formData = new FormData();
            xhr.open('post', 'http://localhost:5000/', false);
            formData.append("url", details.url);
            xhr.send(formData);
            var returnVal = xhr.responseText;
            chrome.tabs.executeScript({
          code: `
          document.querySelector('[title="recaptcha challenge"]').contentWindow.document.getElementById("audio-response").value = "'
          ` + returnVal + '"'
            });
            chrome.tabs.executeScript({
            code: 'document.querySelector("[title="recaptcha challenge"]").contentWindow.document.getElementById("recaptcha-verify-button").click()'
            });
	}
    });


},{urls:["https://translate.google.com/translate_tts?*", "https://www.google.com/recaptcha/api2/payload?*"]});
