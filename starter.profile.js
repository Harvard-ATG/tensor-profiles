profile({
	"name":"Starter Profile",
	"uri":"https://raw.githubusercontent.com/craigdietrich/tensor-profiles/master/starter.profile.js",
	"archives": [
	{
    	  "title": "YouTube",
    	  "parser":"youtube",
    	  "url":"https://www.googleapis.com/youtube/v3",
    	  "subtitle": "Hosts user-generated videos. Includes network and professional content.",
    	  "categories": ["video"]
	}, 
	{
		"title": "Vimeo",
		"parser":"vimeo",
		"url":"https://api.vimeo.com",
		"subtitle": "Upload, store, share and manage HD videos.",
		"categories": ["video"]
	}, 
	{
		"title": "Internet Archive",
		"parser":"internetarchive",
		"url":"https://archive.org",
		"subtitle": "The Internet Archive is a non-profit digital library of just about anything.",
		"categories": ["video", "image", "audio", "affiliated"]
	},
	{
		"title": "Critical Commons",
		"parser":"criticalcommons",
		"url":"http://criticalcommons.org",
		"subtitle": "For Fair &amp; Critical Participation in Media Culture",
		"categories": ["video", "image", "affiliated"]
	},
	{
		"title": "Scalar 2 User's Guide",
		"parser":"scalar",
		"url":"http://scalar.usc.edu/works/guide2",
		"subtitle": "This user's guide includes introductions to Scalar's features as well as more in-depth material to explore as your get to know the tools.",
		"categories": ["video", "image", "affiliated", "audio"]
	},
	{
		"title": "Complex TV",
		"parser":"scalar",
		"url":"http://scalar.usc.edu/works/complex-television",
		"subtitle": "Video clips complementing Jason Mittell's Complex TV: The Poetics of Contemporary Television Storytelling (NYU Press, 2015).",
		"categories": ["video", "affiliated"],
		"thumbnail": "http://scalar.usc.edu/works/complex-television/media/book_thumbnail.jpg"
	}
	]
});
