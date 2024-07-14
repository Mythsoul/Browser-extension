const api = typeof browser !== 'undefined' ? browser : chrome;

api.tabs.onActivated.addListener((activeInfo) => {
  api.tabs.get(activeInfo.tabId, (tab) => {
    if (tab.url.includes("youtube.com") || tab.url.includes("vimeo.com") || tab.url.includes("dailymotion.com") || tab.url.includes("udemy.com")) {
      api.tabs.sendMessage(activeInfo.tabId, { action: "resumeVideo" });
    }
  });
});
