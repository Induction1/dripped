import {amazonMessage} from './helpers.js';

// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//       target: {tabId: tab.id},
//       files: ['content.js']
//     });
//   });

let currurl = "";

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "background") {

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          files: ['content.js']
        });
      });
    }
});

chrome.runtime.onMessage.addListener(async(message) => {
    if (message.action === "log") {
      if (message.url && currurl != message.url) {
        chrome.runtime.sendMessage({action: "request", html: message.html});
        currurl = message.url;
      }
    }
});