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
		"title": "Flickr",
		"parser":"flickr",
		"url":"https://www.flickr.com/",
		"subtitle": "Picture galleries available with social networking, chat, groups, and photo ratings.",
		"categories": ["image","video"]
	},
	{
		"title": "Internet Archive",
		"parser":"internetarchive",
		"url":"https://archive.org",
		"subtitle": "A non-profit digital library of just about anything.",
		"categories": ["video", "image", "audio", "affiliated","document"]
	},
	{
		"title": "Critical Commons",
		"parser":"criticalcommons",
		"url":"http://criticalcommons.org",
		"subtitle": "For Fair &amp; Critical Participation in Media Culture",
		"categories": ["video", "image", "affiliated"]
	},
	{
		"title": "TriArte Art and Artifacts Database",
		"parser":"triarte",
		"url":"http://triarte.brynmawr.edu",
		"subtitle": "TriArte features over 33,500 art and artifacts from Bryn Mawr, Haverford, and Swarthmore Colleges.",
		"categories": ["image"],
	},
	{
		"title": "Complex TV",
		"parser":"scalar",
		"url":"http://scalar.usc.edu/works/complex-television",
		"subtitle": "Scalar book complementing Jason Mittell's Complex TV: The Poetics of Contemporary Television Storytelling (NYU Press, 2015).",
		"categories": ["video", "affiliated"],
		"thumbnail": "http://scalar.usc.edu/works/complex-television/media/book_thumbnail.jpg"
	},
	{
		"title": "History 355 collaboration with Moore Lab",
		"parser":"crossroads",
		"url":"https://crossroads.oxy.edu/projects/300",
		"subtitle": "Crossroads project on what can we learn about Nahua ('Aztec') knowledge, culture, society, and economy using ethnohistorical and biological evidence?",
		"categories": ["image"]
	},
	{
		"title": "Histories of the National Mall",
		"parser":"omeka-classic",
		"url":"http://mallhistory.org",
		"subtitle": "Historical maps, stories, people and historical events related to the Mall's past.",
		"categories": ["image"]
	},
	{
		"title": "Miss Pink's Wildflowers",
		"parser":"omeka-s",
		"url":"https://exhibit.utas.edu.au/",
		"subtitle": "Unique watercolour and pencil sketches of Central Australia arid lands' flora by Olive Pink (1884-1975)",
		"categories": ["image"]
	},
	{
		"title": "USC Digital Library",
		"parser":"contentdm",
		"url":"http://digitallibrary.usc.edu",
		"subtitle": "Spanning a wide range of visual media, the USC Digital Library offers digital images of drawings, illuminated manuscripts, maps, photographs, posters, prints, rare illustrated books, as well as audio and video recordings.",
		"categories": ["image"],
                "thumbnail": "https://rossier.usc.edu/files/2011/11/usc-square-white.jpg"
	},
	{
		"title": "The Metropolitan Museum of Art",
		"parser":"themet",
		"url":"http://www.metmuseum.org",
		"subtitle": "Works of art spanning five thousand years of world culture, from prehistory to the present and from every part of the globe.",
		"categories": ["image"]
	},
	{
		"title": "iNaturalist",
		"parser":"inaturalist",
		"url":"https://www.inaturalist.org",
		"subtitle": "Whether you have a PhD or just love the outdoors, iNaturalist will bring you closer to nature and many fellow naturalists.",
		"categories": ["image"]
	},
	{
		"title": "Digital Access to Scholarship at Harvard",
		"parser":"dspace-6",
		"url":"https://dash.harvard.edu",
		"subtitle": "A central, open-access repository of research by members of the Harvard community.",
		"categories": ["image","document"],
		"thumbnail": "https://muninetworks.org/sites/www.muninetworks.org/files/dash_COLOR.jpg"
	}
	],
        "collections":[
	{
		"title":"Starter profile imports",
		"description":"Items from starter profile archives",
		"color":"#5cb85c"
	}
        ]
});
