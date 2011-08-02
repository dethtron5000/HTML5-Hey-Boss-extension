

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
	
		x = $('<div class="divwrapper">');
/*		x.className = "divwrapper";
		x.innerHTML = "<input type='button' value='open' id='openButton'/><input type='button' value='close' id='closeButton'/>";*/

        var openButton = $("<input type='button' value='open' id='openButton'/>");
        var closeButton = $("<input type='button' value='close' id='closeButton'/>");
        
        x.append(openButton);
        x.append(closeButton);                
        
        x.css('height', '50px');
        x.css('width', '100%');        
        x.css('zIndex','9999');		
        x.css('position','absolute');	        
        closeButton.css('zIndex','9999');		
        closeButton.css('position','absolute');	        

        var thisbody = $('body');
        var temp = 42;
		$('body').prepend(x);		

        var divwrapper = $('.divwrapper');
		divwrapper.append(speechform);

        $('#main-input').bind('webkitspeechchange', function() { logWords(this.value) });
        $('#main-input').bind('speechchange', function() { logWords(this.value) });			
		
		$('input[id=openButton]').click(openIframe);
		$('input[id=closeButton]').click(closeIframe);

	};

	
	var openIframe = function(e) {
		console.log($('input[id=mainIframe]'));
		$('iframe[id=mainIframe]').css('height','1500px');
		$('iframe[id=mainIframe]').css('backgroundColor','white');
		$('iframe[id=mainIframe]').css('zIndex','9998');		
		$('iframe[id=mainIframe]').css('display','block');						
		$('iframe[id=mainIframe]').css('position','absolute');										
		$('iframe[id=mainIframe]').css('top','0');										
		$('iframe[id=mainIframe]').css('left','0');			
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