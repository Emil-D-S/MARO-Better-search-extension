/*"default_icon": {
    "16": "iconMaro.png"
}*/




/*let isEnabled = false;

chrome.action.onClicked.addListener((tab) => {
    isEnabled = !isEnabled;
    chrome.storage.local.set({ isEnabled });

    if (isEnabled) {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            files: ['Content.js']
        });
    } else {
        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: () => {
                const asideElement = document.querySelector('section.SroKb > aside.tJH3Q');
                if (asideElement) {
                    asideElement.style.display = '';
                    const mainElement = document.querySelector('section.SroKb > main.kNDFw');
                    if (mainElement) {
                        mainElement.style.width = '';
                    }
                }
            }
        });
    }
});
*/