function removeItem(e){
	var self = this;							
	chrome.storage.local.remove($(this).data('url'), function() {
		$(self).parent().remove();
	});
}

function copyUrl(e){
	navigator.clipboard.writeText($(this).data('url')).then(function() {
  	//lert('Async: Copying to clipboard was successful!');
	});
}

function clearStorage(e){
	chrome.storage.local.clear(function() {
		$('#urls').empty();
		$('#details').hide();
		$('#clear').hide();
	});
}

$(function() {
	$('#details').hide();
	$('#clear').hide();

	$('#load').on('click', function(){ 
		$('#details').show();
		chrome.storage.local.get(function(result) {
			$('#urls').empty();

			if(Object.keys(result).length>0){
				$('#clear').show();

				for(var url in result){
					if(!result[url].res){
						var remove = $('<font />')
							.data('url', url)
							.css('padding', '10px').css('cursor', 'pointer')
							.attr('color', 'red')
							.html('&#10060;');
						$(remove).on('click', removeItem);

						var copy = $('<font />')
							.data('url', url)
							.css('padding', '10px').css('cursor', 'pointer')
							.html('Copy');
						$(copy).on('click', copyUrl);

						var linkText = $('<p />').html(url);
						$(linkText).append(remove);
						$(linkText).append(copy);
						$('#urls').append(linkText);
					}
				}
			}
			else{
				$('#urls').text('Storage doesn\'t have blocked url list.');
			}
		}); 
	});

	$('#clear').on('click', function(){
		chrome.storage.local.clear(clearStorage);
	});

	$('#load').click();
});