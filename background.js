// background.js

chrome.action.onClicked.addListener((tab) => {
    chrome.scripting.executeScript({
      target: {tabId: tab.id},
      files: ['content.js']
    });
  });  

chrome.runtime.onMessage.addListener((message) => {
    // Store the scraped HTML content in local storage
    chrome.storage.local.set({ 'scrapedHTML': message.html }, function() {
        // Log a message to indicate successful storage
        console.log('Scraped HTML content stored in local storage.');
    });
});