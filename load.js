"use strict";

// append blocked urls to ul in html file
window.onload = function() {
    chrome.storage.sync.get(["urls"], function(result) {
        result["urls"].sort()
        let ul = document.getElementById("list")
        for (let i = 0; i < result["urls"].length; i++) {
            if (result["urls"][i] !== "*://wizikal.website/*") {
                let button = document.createElement("button")
                button.classList.add("settingsButton")
                button.onclick = function() { removeUrl(result["urls"][i]) }
                button.innerHTML = "X"
                button.style.visibility = "hidden"
                let li = document.createElement("li")
                li.onmouseover = function() { showButton(button) }
                li.onmouseleave = function() { hideButton(button) }
                li.appendChild(document.createTextNode(changeUrl(result["urls"][i])))
                li.appendChild(button)
                ul.appendChild(li)
            }     
        }
      })
}

// removes first four characters and last two characters
function changeUrl(url) {
    let newUrl = url.substring(4)
    if (newUrl.indexOf("www") > -1) {
        newUrl = newUrl.substring(4)
    }
    if (newUrl.indexOf("/") > -1) {
        newUrl = newUrl.split('/')[0]
    }
    return newUrl
}

// remove url from chrome storage on button click
function removeUrl(url) {
    chrome.storage.sync.get(["urls"], function(result) {
        let index = result["urls"].indexOf(url)
        if (index !== -1) {
            result["urls"].splice(index, 1)
            chrome.storage.sync.set({urls: result["urls"]}, function() {
                chrome.tabs.reload()
            })
        }
    })
}

// show button
function showButton(button) {
    button.style.visibility = "visible"
}

// hide button
function hideButton(button) {
    button.style.visibility = "hidden"
}