(function( $ ) {

    $.fn.parse = function(options) {
    	if (!options.query.length) throw "Enter at least one term into the search field.";
    	var model = new $.fn.spreadsheet_model(options);
    	model.parse = parse;
    	model.fetch('json');
    };

    function parse(data, archive) {
        console.log(data);
        console.log(archive);

        var results = {};

        // TODO: To get people and places, we'd need to do an object query and a people subsection query on each record
        // https://github.com/harvardartmuseums/api-docs/blob/master/sections/object.md

        // TODO: Would be nice to have a lower res thumbnails to load faster, maybe use IIIF?
        // TODO: fix detail view

        // TODO: better search (in different fields?)

        // TODO: fix stretching of images

        // TODO: there's a bug when displaying title in "Tile" view - renders as [object HTMLCollection]

        // TODO: fix bug of results not clearing when swapping collections

        data.records.forEach(function(record){
            var id = record.id;
            var permalink = `https://hvrd.art/o/${id}`;
            var uri = record.url;
            var title = record.title;
            var desc = record.description;
            var primaryimageurl = record.primaryimageurl;
            var accession = record.accessionmethod;
            var accessionyear = record.accessionyear;
            var period = record.period;
            var culture = `Culture: ${record.culture}`;
            var dated = record.dated;
            var datebegin = record.datebegin;
            var dateend = record.dateend;
            var medium = record.medium;
            var dimensions = record.dimensions;
            var provenance = record.provenance;
            var copyright = record.copyright;
            var classification = record.classification;
            var creditline = record.creditline;

            var created = '';
            if(dated){
                created += `Dated ${dated}. `;
            }
            if(datebegin){
                created += `Date begin ${datebegin}. `;
            }
            if(dateend){
                created += `Date end ${dateend}. `;
            }

            // var access = '';
            // if(record.accesslevel){
            //     switch(record.accesslevel){
            //         case 0:
            //             access += "Record access level 0 - Resricted. Object record is restricted to certain API keys. "
            //             break;
            //         case 1:
            //             access += "Record access level 1 - Public. Object record is available to all API keys. "
            //             break;
            //     }
            // }
            // if(record.imagepermissionlevel){
            //     switch(record.imagepermissionlevel){
            //         case 0:
            //             access += "Image access level 0 - display images at any size. "
            //             break;
            //         case 1:
            //             access += "Image access level 1 - restricted. Display at a maximum dimension of 256px. "
            //             break;
            //         case 2:
            //             access += "Image access level 2 - blocked. No images available. "
            //             break;
            //     }
            // }
            // if(record.lendingpermissionlevel){
            //     switch(record.lendingpermissionlevel){
            //         case 0:
            //             access += "Lending permission level 0 - ok to lend."
            //             break;
            //         case 1:
            //             access += "Lending permission level 1 - partial restrictions on lending."
            //             break;
            //         case 2:
            //             access += "Lending permission level 2 - unable to lend."
            //             break;
            //     }
            // }

            results[uri] = {
                'http://simile.mit.edu/2003/10/ontologies/artstor#url':[{type:'uri',value:primaryimageurl}],
                'http://purl.org/dc/terms/title':[{type:'literal',value:title}],
                'http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail':[{type:'uri',value:primaryimageurl}],
                'http://purl.org/dc/terms/accrualMethod': [{type:'literal', value:accession}],
                // 'http://purl.org/dc/terms/accessRights': [{type:'literal', value:access}],
                'http://purl.org/dc/terms/available': [{type:'literal', value: accessionyear}],
                'http://purl.org/dc/terms/coverage': [{type:'literal', value: culture}],
                'http://purl.org/dc/terms/created': [{type:'literal', value: created}],
                'http://purl.org/dc/terms/medium': [{type:'literal', value: medium}],
                'http://purl.org/dc/terms/format': [{type:'literal', value: dimensions}], // May need this for type parsing?
                'http://purl.org/dc/terms/provenance': [{type:'literal', value:provenance}],
                'http://purl.org/dc/terms/rights': [{type:'literal', value:copyright}],
                'http://purl.org/dc/terms/rightsHolder': [{type:'literal', value:creditline}],
                'http://purl.org/dc/terms/type': [{type:'literal', value:classification}],
                'http://purl.org/dc/terms/identifier':[{type:'uri',value:id}],
                'http://purl.org/dc/terms/source':[{type:'literal',value: "Harvard Art Museum"}],
                'http://simile.mit.edu/2003/10/ontologies/artstor#sourceLocation': [{type:'uri', value:uri}]

            }
            if (desc && desc.length) results[uri]['http://purl.org/dc/terms/description'] = [{type:'literal',value:desc}];
        })

        console.log(results);
        this.opts.complete_callback(results, archive);
    }

}( jQuery ));
