// content.js

// Function to scrape HTML and send it to background script
function scrapeHTML() {
    // Get the HTML content of the current webpage
    const htmlContent = document.documentElement.outerHTML;
    
    // Send the HTML content to background script
    chrome.runtime.sendMessage({ html: htmlContent });
}

// Execute the scrapeHTML function when the extension button is clicked
scrapeHTML();
