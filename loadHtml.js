"use strict";

// loads url name into paragraph in html file
window.onload = function() {
    let para = document.getElementById("url")
    chrome.tabs.query({"active": true, "lastFocusedWindow": true}, function(tabs) {
        let url = alterUrl(tabs[0].url)
        para.innerHTML = url
    })
}

// change url to show name only.com
function alterUrl(url) {
    let newUrl = url
    if (newUrl.indexOf("https") > -1) {
        newUrl = newUrl.substring(8)
    } 
    else if (newUrl.indexOf("http") > -1) {
        newUrl = newUrl.substring(7)
    }
    if (newUrl.indexOf("www") > -1) {
        newUrl = newUrl.substring(4)
    }
    if (newUrl.indexOf("/") > -1) {
        newUrl = newUrl.split('/')[0]
    }
    return newUrl
}