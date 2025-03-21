let activeTabId = null;
let domainTimes = {};
let activeDomain = null;
let startTime = null;
let blockedSites = ["https://www.facebook.com/"];

function getDomain(url) {
  try {
    const { hostname } = new URL(url);
    return hostname;
  } catch (e) {
    return null;
  }
}

function updateTimes() {
  if (activeDomain && startTime) {
    const currentTime = Date.now();
    if (!domainTimes[activeDomain]) {
      domainTimes[activeDomain] = 0;
    }
    domainTimes[activeDomain] += currentTime - startTime;
    startTime = currentTime;
    chrome.storage.local.set({ domainTimes });
  }
}

chrome.tabs.onActivated.addListener(({ tabId }) => {
  chrome.tabs.get(tabId, (tab) => {
    if (tab.url && blockedSites.includes(tab.url)) {
      chrome.tabs.update(tabId, { url: "chrome://newtab" });
      alert("This site is blocked!");
      return;
    }
    updateTimes();
    activeTabId = tabId;
    activeDomain = getDomain(tab.url);
    startTime = Date.now();
  });
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "complete") {
    if (blockedSites.includes(tab.url)) {
      chrome.tabs.update(tabId, { url: "chrome://newtab" });
      alert("This site is blocked!");
      return;
    }
    if (tabId === activeTabId) {
      updateTimes();
      activeDomain = getDomain(tab.url);
      startTime = Date.now();
    }
  }
});

chrome.tabs.onRemoved.addListener((tabId) => {
  if (tabId === activeTabId) {
    updateTimes();
    activeTabId = null;
    activeDomain = null;
    startTime = null;
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "getTimes") {
    updateTimes();
    sendResponse(domainTimes);
  } else if (message.type === "addBlockedSite") {
    if (!blockedSites.includes(message.site)) {
      blockedSites.push(message.site);
      chrome.storage.local.set({ blockedSites });
    }
  }
});
