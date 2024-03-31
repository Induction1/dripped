import {amazonMessage} from './helpers.js';

// chrome.action.onClicked.addListener((tab) => {
//     chrome.scripting.executeScript({
//       target: {tabId: tab.id},
//       files: ['content.js']
//     });
//   });

  chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "background") {

      console.log("WE ARE HERE!");

      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.scripting.executeScript({
          target: {tabId: tabs[0].id},
          files: ['content.js']
        });
      });
    }
});

chrome.runtime.onMessage.addListener((message) => {
    if (message.action === "log") {

      console.log("HEREEEEEEEEE!");

      if (message.containsAmazon) {
          console.log(amazonMessage(message.html, "Sponsored", "Products related to this item"));
      } else {
          console.log(message.html);
      }

      chrome.storage.local.set({counter: message.html}, function() {
          console.log("Message saved to local storage.");
      });
    }
});