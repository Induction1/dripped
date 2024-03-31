function ScrapeHTML() {
    const htmlcontent = document.body.innerText;

    const url = document.location.href;
    
    const containsAmazon = url.includes("amazon.com/");

    chrome.runtime.sendMessage({
        url: url,
        html: htmlcontent,
        containsAmazon: containsAmazon,
        action: "log"
    });
}


ScrapeHTML();