

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
		

		 var speechform = '<form><input id="main-input" type="text" speech x-webkit-speech /></form>';
		 
		z = document.createElement('iframe');
		z.id = 'mainIframe';
		z.className = "wrapper";
		z.src = realsource;
		 
		$(z).insertBefore($('body :first'));
	
		x = document.createElement('div');
		x.className = "divwrapper";
		x.innerHTML = "<input type='button' value='open' id='openButton'/>";
		$(x).insertBefore($('body :first'));		

		$('.divwrapper').append(speechform);

        $('#main-input').bind('webkitspeechchange', function() { logWords(this.value) });
        $('#main-input').bind('speechchange', function() { logWords(this.value) });			
		
		$('input[id=openButton]').click(openIframe);
	};

	
	var openIframe = function(e) {
		console.log($('input[id=mainIframe]'));
		$('iframe[id=mainIframe]').css('height','1500px');
		//$('iframe[id=mainIframe]').attr('height','100%');
	};
	
	var closeIframe = function(e) {
		$('iframe[id=mainIframe]').css('height','1');
	};
	
	var fetchRandom = function(pageArray) {
		
		rnd = (pageArray.length - 1) * Math.random();
		rounded = Math.round(rnd);
		console.log(rounded);
		return pageArray[rounded];
	};
	
	var logWords = function(spoken)
	  {
		console.log(prefs);
	        var words = spoken;
	        switch(words) {
	        	case prefs.safeWord:
	        		openIframe({});
	        		break;
	        	case 'beer':
	        		closeIframe({});
	        		break;
	        }
	  };	
	
	chrome.extension.sendRequest(
			{reqKey: "fetchPrefs"}, 
			function(response) {
				 prefs = response.preferences;
				 kickoff(prefs);
				 
			});	
}
);