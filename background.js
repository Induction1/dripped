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
        currurl = message.url;
        /*
        let response = await fetch('http://localhost:3000/log', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({message: message.html}),
        });

        let data = await response.json();

        console.log(message.html);
        */
      }
    }
});