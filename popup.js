// popup.js

// Retrieve the scraped HTML content from storage
chrome.storage.local.get(['scrapedHTML'], function(result) {
    const scrapedHTML = result.scrapedHTML;
    console.log("HIIII");
    console.log(scrapedHTML);
    if (scrapedHTML) {
        // Update the pre element with the scraped HTML content
        document.getElementById('scraped-html').textContent = scrapedHTML;
        
    }
});
