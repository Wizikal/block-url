"use strict";

// first time installed code
chrome.runtime.onInstalled.addListener(function() {
    chrome.storage.sync.set({urls: ["*://wizikal.website/*"]}, function() {
      getUrls() 
    })
})

// cancels website request
function requestHandler(details) {
  return {cancel: true}
}

// chrome listener to block urls
function blockUrls(blockedUrls) {
  chrome.webRequest.onBeforeRequest.removeListener(requestHandler)
  chrome.webRequest.onBeforeRequest.addListener(
    requestHandler, 
    { urls: blockedUrls },
    ["blocking"]
  )
}

// gets list of urls from storage
function getUrls() {
  chrome.storage.sync.get(["urls"], function(result) {
    blockUrls(result["urls"])
  })
}

// add listener for storage change
chrome.storage.onChanged.addListener(function() {
  getUrls()
})

// add listener for webrequest change
chrome.webRequest.onBeforeRequest.addListener(function(details) {
  getUrls()
}, 
  {urls: []},
  ["blocking"]
)