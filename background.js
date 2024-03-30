// background.js
import {amazonMessage} from './helpers.js';

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['content.js']
    });
  });

  chrome.runtime.onMessage.addListener((message) => {
    const containsAmazon = message.containsAmazon;
    const text = message.html;

    if (containsAmazon) {
        console.log(amazonMessage(text, "Sponsored", "Products related to this item"));
    } else {
        console.log(text);
    }

    chrome.storage.local.set({counter: text}, function() {
        console.log("Message saved to local storage.");
    });
});