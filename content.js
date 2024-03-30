function ScrapeHTML() {
    const htmlcontent = document.body.innerText;

    const url = document.location.href;
    
    const containsAmazon = url.includes("amazon.com/");

    chrome.runtime.sendMessage({
        html: htmlcontent,
        containsAmazon: containsAmazon
    });
}


ScrapeHTML();