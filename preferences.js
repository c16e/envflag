jQuery(function () {
	$("#config").on('keyup', function(event){
		var config = $("#config").val();
		chrome.storage.sync.set({'config': config}, function() {
		});
	});
});

chrome.storage.sync.get(null, function(data) {
	$("#config").val(data.config);
});
