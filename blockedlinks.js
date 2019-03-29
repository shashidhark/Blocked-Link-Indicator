chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      chrome.declarativeContent.onPageChanged.addRules(
      	[{
	        	conditions: [
	        		new chrome.declarativeContent.PageStateMatcher({
	          		pageUrl: {hostEquals: 'www.google.com'},
	        		})
        		],
            actions: [new chrome.declarativeContent.ShowPageAction()]
      	}]
      );
  });
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	if(sender.tab){
      chrome.storage.local.get([request.domain], function(result) {
        if(request.domain in result){
          //console.log('Saved data', result);
          sendResponse(result[request.domain].res);
        }
        else{
          var x = new ( window.ActiveXObject || XMLHttpRequest )( "Microsoft.XMLHTTP" );
          var url = request.url;
          var domain = request.domain;
          x.open("GET", url, true);
          try {
            x.send();
            x.onreadystatechange = function() {
              if (x.readyState === 4) {
                var res =  ( x.status >= 200 && x.status < 300) || x.status === 304 || x.status == 405;
                sendResponse(res);

                chrome.storage.local.set({[domain] : {res, url}}, function() {
                  //console.log('Saved', {[domain] : {res, url}});
                });
              }
            }
          } catch (e) {
            sendResponse(false);
          }
        }
      });
    } 
    return true;
});