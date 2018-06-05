'use strict';

/**
  * Get the header from the list of headers for a given name.
  * @param {Array} headers responseHeaders of webRequest.onHeadersReceived
  * @return {undefined|{name: string, value: string}} The header, if found.
  */
function getHeaderFromHeaders(headers, headerName) {
  for (var i = 0; i < headers.length; ++i) {
    var header = headers[i];
    if (header.name.toLowerCase() === headerName) {
      return header;
    }
  }
}

/**
  * Check if the request is a PDF file.
  * @param {Object} details First argument of the webRequest.onHeadersReceived
  *                         event. The properties "responseHeaders" and "url"
  *                         are read.
  * @return {boolean} True if the resource is a PDF file.
  */
function isPdfFile(details) {
  var header = getHeaderFromHeaders(details.responseHeaders, 'content-type');
  if (header) {
    var headerValue = header.value.toLowerCase().split(';', 1)[0].trim();
    return (headerValue === 'application/pdf' ||
            headerValue === 'application/octet-stream' &&
            details.url.toLowerCase().indexOf('.pdf') > 0);
  }
}

chrome.webRequest.onHeadersReceived.addListener(
  function callback(details) {
    if (isPdfFile(details)) {
      chrome.browserAction.setBadgeText({text: 'PDF'});
    } else {
      chrome.browserAction.setBadgeText({text: 'HTML'});
    }
  },
  {urls: ['<all_urls>'], types: ['main_frame']},
  ['responseHeaders']
);
