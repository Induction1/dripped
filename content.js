function ScrapeHTML() {
    const htmlcontent = document.body.innerText;

    chrome.runtime.sendMessage({html: htmlcontent });
}

ScrapeHTML();