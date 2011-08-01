

$(document).ready(function() {
	pages = ['bar-graph.html','pie-graph.html','rhino.html']
	
	         

	
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
		z.id = 'mainIframe';
		z.className = "wrapper";
		z.src = realsource;

		$(z).insertBefore($('body :first'));
		
		x = document.createElement('div');
		x.innerHTML = "<input type='button' value='open' id='openButton'/>";
		$(x).insertBefore($('body :first'));		
		
		$('input[id=openButton]').click(openIframe);
	};

	
	var openIframe = function(e) {
		console.log($('input[id=mainIframe]'));
		$('iframe[id=mainIframe]').css('height','1500px');
		//$('iframe[id=mainIframe]').attr('height','100%');
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