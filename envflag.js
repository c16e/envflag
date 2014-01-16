var environments = {

	dev: {
		text: "Development",
		icon: "icons/icon_dev.png",
		backgroundColor: "#e63b7a",
	},
	stage: {
		text: "Staging",
		icon: "icons/icon_stage.png",
		backgroundColor: "#ffaa01",
	},
	prod: {
		text: "Production",
		icon: "icons/icon_prod.png",
		backgroundColor: "#77bb41",
	},
	unknown: {
		text: "Unknown",
		icon: "icons/icon_unknown.png",
		backgroundColor: "#606060",
	}
};

var environmentKeywords = {
	dev: ["dev", "development"],
	stage: ["stag", "stage", "staging"],
	prod: ["prod", "production"],
};

var commentKeyword = "#";

var definition = [];

var changeView = function (url) {
	var environment = getEnvironment(url);
	chrome.browserAction.setIcon({path: environment.environment.icon});
};

var getEnvironment = function(url) {
	for (var i = 0; i < definition.length; i += 1) {
		var site = definition[i];
		if (url.indexOf(site.url) >= 0) {
			return {
				matched: site,
				environment: environments[site.environmentType]
			};
		}
	}

	return {
		matched: null,
		environment: environments.unknown
	};
};

var environmentKeywordToType = function(keyword) {
	for (var environmentType in environmentKeywords) {
		var keywords = environmentKeywords[environmentType];
		if (keywords.indexOf(keyword) >= 0) {
			return environmentType;
		}
	}

	return null;
};

var updateDefinition = function(config) {
	if (!config) {
		return;
	}

	var newDefinition = [];
	var lines = config.split(/[\n\r]+/);
	lines = lines.map(function(line){return line.trim();});
	lines = lines.filter(function(line){return line.length;});

	lines.forEach(function(line, index){
		if (line.indexOf(commentKeyword) === 0) {
			return;
		}

		var lineNumber = index + 1;
		var tokens = line.split(/[\t\s]+/);

		if (tokens.length === 2) {
			var environmentKeyword = tokens[0];
			var url = tokens[1];
			var environmentType = environmentKeywordToType(environmentKeyword);

			if (environmentType === null) {
				console.log("unknown environment keyword:", line, "line:", lineNumber);
			} else {
				newDefinition.push({
					environmentType: environmentType,
					url: url,
				});
			}
		} else {
			console.log("parse error", line, "line:", lineNumber);
		}
	});

	newDefinition.sort(function(a, b){
		if (a.url.length > b.url.length) {
			return -1;
		}

		if (a.url.length < b.url.length) {
			return 1;
		}

		return 0;
	});

	definition = newDefinition;
};
