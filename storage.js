"use strict";

let block = document.getElementById("block")

// adds url to chrome storage array
block.onclick = function() {
    chrome.tabs.query({"active": true, "lastFocusedWindow": true}, function(tabs) {
        let url = tabs[0].url
        chrome.storage.sync.get(["urls"], function(result) {
            if (!isDuplicate(result["urls"], changeUrl(url))) {
                result["urls"].push(changeUrl(url))
                chrome.storage.sync.set({urls: result["urls"]}, function() {
                    chrome.tabs.reload()
                })
            }
        })
    })
}

// check if array has duplicate url
function isDuplicate(array, url) {
    return (array.indexOf(url) > -1)
}

// change url to fit blocking requirements
// "http://kissmanga.com/" => "*://kissmanga.com/*"
function changeUrl(url) {
    let newUrl = "*" + url.substring(url.indexOf(":")) + "*"
    return newUrl
}