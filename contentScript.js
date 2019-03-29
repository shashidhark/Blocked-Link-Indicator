var linkDiv = $('#search').find('.g'); 
linkDiv.each((e, i)=>{  
	var mainA = $(i).find('a:first');	
    var url = $(mainA)[0].href;

    if(url != ''){
        var parsed = url.split("/");
    	chrome.runtime.sendMessage({url: url, domain: parsed[2]}, function(response) {
          	if(!response){ 
            	$(mainA).append($('<font color="red">&#10060;</font>'))	
            	//$(i).hide();						
            }	
            else{
            	$(mainA).append($('<font color="green">&#10004;</font>'))	
            }
    	});
    }
});