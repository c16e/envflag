
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
	changeView(tab.url);
}); 

chrome.tabs.onActivated.addListener(function (info){
	chrome.tabs.get(info.tabId, function(tab) {
		changeView(tab.url);
	});
});

chrome.storage.onChanged.addListener(function (data){
	updateDefinition(data.config.newValue);
});

chrome.browserAction.onClicked.addListener(function() {
    chrome.tabs.create({'url': "preferences.html"});
});

chrome.storage.sync.get(null, function(data) {
	updateDefinition(data.config);
});
