(function( $ ) {
	
    $.fn.parse = function(options) {
    	if (!options.query.length) throw "YouTube requires at least one search term to be entered into the search field.";
    	var model = new $.fn.spreadsheet_model(options);
    	model.parse = parse;
    	model.fetch('json');
    };
    
	function parse(data, archive) {
		var results = {};
		for (var j = 0; j < data.items.length; j++) {
			var identifier = ('object'==typeof(data.items[j].id)) ? data.items[j].id.videoId : data.items[j].id;
			var uri = 'http://www.youtube.com/v/'+identifier;
			var thumb = data.items[j].snippet.thumbnails.high.url;
			var title = data.items[j].snippet.title;
			var desc = data.items[j].snippet.description;	
			var sourceLocation = 'https://www.youtube.com/watch?v='+identifier;
			var format = 'youtube#video';
			var date = data.items[j].snippet.publishedAt;
			var creator = data.items[j].snippet.channelTitle;
        	results[uri] = {
            		'http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail':[{type:'uri',value:thumb}],
            		'http://simile.mit.edu/2003/10/ontologies/artstor#url':[{type:'uri',value:uri}],
            		'http://purl.org/dc/terms/title':[{type:'literal',value:title}],
            		'http://purl.org/dc/terms/source':[{type:'literal',value:archive.title}],
            		'http://simile.mit.edu/2003/10/ontologies/artstor#sourceLocation':[{type:'uri',value:sourceLocation}],
            		'http://purl.org/dc/terms/format':[{type:'uri',value:format}],
            		'http://purl.org/dc/terms/identifier':[{type:'uri',value:identifier}],
            		'http://purl.org/dc/terms/date':[{type:'uri',value:date}],
            		'http://purl.org/dc/terms/creator':[{type:'uri',value:creator}],
            };
        	if (desc && desc.length) results[uri]['http://purl.org/dc/terms/description'] = [{type:'literal',value:desc}];
		}
		console.log(results);
		this.opts.complete_callback(results, archive);
	}    
    
}( jQuery ));