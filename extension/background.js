function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function demo() {
  console.log('Taking a break...');
  await sleep(1500);
  console.log('Two second later');
}

chrome.webRequest.onCompleted.addListener(function(details) {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        // and use that tab to fill in out title and url
        var tab = tabs[0];
        chrome.storage.sync.get("data", function (ob) {
            if ((String(details.type) == "media") && (String(tab.url) != String(details.url))){
                apiKey = String(ob.data);
                var xhr = new XMLHttpRequest();
                formData = new FormData();
                xhr.open('post', 'http://localhost:5000/', false);
                formData.append("url", details.url);
                formData.append("apiKey", apiKey);
                xhr.send(formData);
                var returnVal = xhr.responseText;
                chrome.tabs.executeScript({
              code: `
              document.querySelector('[title="recaptcha challenge"]').contentWindow.document.getElementById('audio-response').value = "` + returnVal + '"'
                });
                chrome.tabs.executeScript({
                code: `
                document.querySelector('[title="recaptcha challenge"]').contentWindow.document.getElementById("recaptcha-verify-button").click()
                `
                });
        }
        else {
            chrome.tabs.executeScript({code: `document.querySelector('[title="recaptcha challenge"]').contentWindow.document.getElementById("recaptcha-audio-button").click()`});
        }
});
    });


},{urls:["https://translate.google.com/translate_tts?*", "https://www.google.com/recaptcha/api2/payload?*"]});

chrome.webRequest.onCompleted.addListener(function(details) {
    chrome.tabs.query({
        active: true,
        lastFocusedWindow: true
    }, function(tabs) {
        chrome.storage.sync.get("data", function (obj) {
            apiKey = String(obj.data);
            if (apiKey == "undefined"){
                alert("No API Key Set - Please input API key")
            }
            else {
            var tab = tabs[0];
            if (String(tab.url) != String(details.url)){
                chrome.tabs.executeScript({code: `document.querySelector('[role="presentation"]').contentWindow.document.getElementById("recaptcha-anchor").click()`});
        }
            }
        });

    });


},{urls:["https://www.google.com/recaptcha/api2/bframe?*"]});
