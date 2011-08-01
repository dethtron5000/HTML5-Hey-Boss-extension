

$(document).ready(function() {
	pages = ['bar-graph.html','pie-graph.html']
	
	         

	
	var kickoff = function(prefs) {
		console.log('inserted');
		console.log(prefs);
		if(prefs.defaultScreen =='random') {
		 docSrc = fetchRandom(pages);
		} else {
			docSrc = prefs.defaultScreen;
		}
		realsource = chrome.extension.getURL('bosspages/'+docSrc);
		
		z = document.createElement('iframe');
		z.className = "wrapper";
		z.src = realsource;

		$(z).insertBefore($('body :first'));			
	};

	
	
	var fetchRandom = function(pageArray) {
		console.log()
		rnd = (pageArray.length - 1) * Math.random();
		rounded = Math.round(rnd);
		console.log(rounded);
		return pageArray[rounded];
	};
	
	chrome.extension.sendRequest(
			{reqKey: "fetchPrefs"}, 
			function(response) {
				 prefs = response.preferences;
				 kickoff(prefs);
			});	
}
);