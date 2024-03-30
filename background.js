// background.js

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['content.js']
    });
  });

chrome.runtime.onMessage.addListener((message) => {
    chrome.storage.local.set({"scrapedHTML": message.html}, function() {
        console.log(message.html);
    });
});