// popup.js

document.body.onload = function() {
  chrome.storage.sync.get("data", function(items) {
    if (!chrome.runtime.error) {
      console.log(items);
      document.getElementById("data").innerText = items.data;
    }
  });
}

document.getElementById("set").onclick = function() {
  var d = document.getElementById("text").value;
  chrome.storage.sync.set({ "data" : d }, function() {
    if (chrome.runtime.error) {
      console.log("Runtime error.");
    }
  });
  window.close();
}
