jQuery(function () {
	chrome.storage.sync.get(null, function(data) {
		updateDefinition(data.config);
		chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
			var environment = getEnvironment(tabs[0].url);
			$("#environment_type").text(environment.environment.text);
			if (environment.matched === null) {
				var definition = "no definition";
			} else {
				var definition = '"' + environment.matched.environmentType + " " + environment.matched.url + '"';				
			}

			$("#definition_line").text(definition);
			$("#environment_container").css("background-color", environment.environment.backgroundColor);
		});
	});
});


