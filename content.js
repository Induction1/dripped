function ScrapeHTML() {
    const htmlcontent = document.documentElement.innerHTML;

    chrome.runtime.sendMessage({html: htmlcontent });
}

ScrapeHTML();