/* pungle revealing module pattern */
var pungle = (function ($) {
	
	// namespace variables
	
	var imagePath = 'stores/'; // set path for images (can swap with CDN)
	var imagePathCDN = 'http://c27885.r85.cf1.rackcdn.com/images/stores/'; // set path for images (can swap with CDN)
	
	// set up pungle & overview for use
	function init() {
		
		// use CSS for image properties.. background and object sizes image_props.png, one object for all properties (handle, deal, no deal, normal i, social good i)
		    	
		// we're going to handle the all store list during the ajax call
		$.ajax({url: 'pungle.json', dataType: 'json', success: function(data){
			
			var htmlStore = ''; // blank variable to hold HTML
			var todaysDate = new Date(); // we'll need to check for expiring deals
			
			$('#container').empty(); // clear overview (just in case)
			
			// parse the database
			$.each(data.store, function(entryIndex, entry) {
				
				// setup the list object
				htmlStore = '<div><img src="' + imagePath + entry['img'] + '"/ height="84" width="136" /><img src="' + imagePathCDN + entry['img'] + '"/ height="84" width="136" /><a href="' + entry['link'] + '" target="_blank" title="' + entry['desc'] + '">' + entry['name'] + '</a>';
				
				// check if live
				if (entry['live']) htmlStore += ' Live: ' + entry['live'];
				else htmlStore += ' Live: <span style="color: #FF0000; font-weight: bold;">' + entry['live'] + '</span>';
								
				// check if affiliate
				if (entry['aff']) htmlStore += ' Affiliate: ' + entry['aff'];
				else htmlStore += ' Affiliate: <span style="color: #FF0000; font-weight: bold;">' + entry['aff'] + '</span>';
				

				// check if there are any deals
				if(entry['deals'] && (entry['deals'] != '')){
					$.each(entry['deals'], function(dealsIndex, deals){
						var startsDate = new Date(deals['starts']);
						var expiresDate = new Date(deals['expires']);
						
						// check if the deal is current
						if(startsDate <= todaysDate && expiresDate > todaysDate) htmlStore += ' <a href="' + deals['link'] + '" title="' + deals['what'] + '" target="_blank">DEAL</a>';							
					});
				}
				
				htmlStore += '</div>';
								
				// add store to accordion
				$('#container').append(htmlStore);
				
			});			
			
		}}); // end ajax call
		
	}
	
	return {
		init:init,		
	}
}(jQuery));