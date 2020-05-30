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

        // [x] TODO: To get people and places, we'd need to do an object query and a people subsection query on each record
        // https://github.com/harvardartmuseums/api-docs/blob/master/sections/object.md
        // [x] TODO: Would be nice to have a lower res thumbnails to load faster, maybe use IIIF?
        // [] TODO: fix detail view
        // [] TODO: better search (in different fields?)
        // [x] TODO: fix stretching of images
        // [x] TODO: there's a bug when displaying title in "Tile" view - renders as [object HTMLCollection]
        // [] TODO: fix bug of results not clearing when swapping collections
        // [] TODO: figure out why ternary expression break things ...
        // [] TODO: see if there is a better way to format dcterms:date, as Scalar doesn't seem to fully respect a range (using slash) as defined here https://www.dublincore.org/specifications/dublin-core/dcmi-terms/

        data.records.forEach(function(record){
            var id = record.id;
            var permalink = `https://hvrd.art/o/${id}`;
            var uri = record.url;

            if(record.images && record.images.length>0){
                var iiifbaseuri = record.images[0].iiifbaseuri;
                var iiif_thumb = `${iiifbaseuri}/full/!225,225/0/default.jpg`
                var iiif_full = `${iiifbaseuri}/full/full/0/default.jpg`
            }

            var title = record.title;
            var desc = record.description;
            var primaryimageurl = record.primaryimageurl;
            var accession = record.accessionmethod;
            var accessionyear = record.accessionyear;
            var period = record.period;
            var dated = record.dated;
            var datebegin = record.datebegin;
            var dateend = record.dateend;
            var medium = record.medium;
            var dimensions = record.dimensions;
            var provenance = record.provenance;
            var copyright = record.copyright;
            var classification = record.classification;
            var creditline = record.creditline;

            var placesArr = record.places;
            if(placesArr){
                places = '';
                placesArr.forEach(function(place){
                    str = `${place.displayname} (${place.type})`;
                    if(places.length > 0){
                        places += `; ${str}`
                    } else {
                        places = str;
                    }
                })
            }

            var creatorRoles = ["Artist", "Painter", "Designer"];
            creators = '';
            contributors = '';
            if(record.people){
                record.people.forEach(function(person){
                    var str = '';
                    if(person.displayname) str += `${person.displayname} `;
                    if(person.displaydate) str += `(${person.displaydate}) `;
                    if(person.role) str += `Role: ${person.role} `;
                    if(person.personid) str += `[HAM_id ${person.personid}] `;

                    // TODO figure out how to have multiple DC terms for people

                    if(creatorRoles.includes(person.role)){
                        if(creators.length ==0){
                            creators += str;
                        } else {
                            creators += `; ${str}`;
                        }
                    } else {
                        if(contributors.length == 0){
                            contributors += str;
                        } else {
                            contributors += `; ${str}`;
                        }
                    }
                });
            }

            if(record.culture) var culture = `Culture: ${record.culture}`;

            var created = '';
            var date = '';
            if(dated){
                created += `Dated ${dated}. `;
            }
            if(datebegin){
                created += `Date begin ${datebegin}. `;
                date += `${datebegin}`;
            }
            if(dateend){
                created += `Date end ${dateend}. `;
                if(datebegin){
                    date += `/${dateend}`
                } else { date += `${dateend}`}
            }


            var access = '';
            if(record.accesslevel){
                switch(record.accesslevel){
                    case 0:
                        access += "Record access level 0 - restricted. Object record is restricted to certain API keys. "
                        break;
                    case 1:
                        access += "Record access level 1 - public. Object record is available to all API keys. "
                        break;
                }
            }
            if(record.imagepermissionlevel){
                switch(record.imagepermissionlevel){
                    case 0:
                        access += "Image access level 0 - display images at any size. "
                        break;
                    case 1:
                        access += "Image access level 1 - restricted. Display at a maximum dimension of 256px. "
                        break;
                    case 2:
                        access += "Image access level 2 - blocked. No images available. "
                        break;
                }
            }
            if(record.lendingpermissionlevel){
                switch(record.lendingpermissionlevel){
                    case 0:
                        access += "Lending permission level 0 - ok to lend."
                        break;
                    case 1:
                        access += "Lending permission level 1 - partial restrictions on lending."
                        break;
                    case 2:
                        access += "Lending permission level 2 - unable to lend."
                        break;
                }
            }

            // Properties that always exist here
            results[uri] = {
                'http://purl.org/dc/terms/title':[{type:'literal',value:title}],
                'http://purl.org/dc/terms/identifier':[{type:'uri',value:id}],
                'http://purl.org/dc/terms/source':[{type:'literal',value: "Harvard Art Museum"}],
                'http://simile.mit.edu/2003/10/ontologies/artstor#sourceLocation': [{type:'uri', value:uri}]
            }
            // Optional / inconsistent properties here
            if('undefined'!=typeof(iiif_full)) results[uri]['http://simile.mit.edu/2003/10/ontologies/artstor#url'] = [{type:'uri',value:iiif_full}];
            if('undefined'!=typeof(iiif_thumb)) results[uri]['http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail'] = [{type:'uri',value:iiif_thumb}];
            if('undefined'!=typeof(accession)) results[uri]['http://purl.org/dc/terms/accrualMethod'] = [{type:'literal', value:accession}];
            if('undefined'!=typeof(accessionyear)) results[uri]['http://purl.org/dc/terms/available'] = [{type:'literal', value:accessionyear}];
            if(access.length > 0) results[uri]['http://purl.org/dc/terms/accessRights'] = [{type:'literal', value:access}];
            if('undefined'!=typeof(culture)) results[uri]['http://purl.org/dc/terms/coverage'] = [{type:'literal', value:culture}];
            if('undefined'!=typeof(created)) results[uri]['http://purl.org/dc/terms/created'] = [{type:'literal', value:created}];
            if('undefined'!=typeof(date) && date.length>0) results[uri]['http://purl.org/dc/terms/date'] = [{type:'literal', value:date}];
            if('undefined'!=typeof(medium)) results[uri]['http://purl.org/dc/terms/medium'] = [{type:'literal', value:medium}];
            if('undefined'!=typeof(dimensions)) results[uri]['http://purl.org/dc/terms/format'] = [{type:'literal', value:dimensions}];
            if('undefined'!=typeof(provenance)) results[uri]['http://purl.org/dc/terms/provenance'] = [{type:'literal', value:provenance}];
            if('undefined'!=typeof(copyright)) results[uri]['http://purl.org/dc/terms/rights'] = [{type:'literal', value:copyright}];
            if('undefined'!=typeof(creditline)) results[uri]['http://purl.org/dc/terms/rightsHolder'] = [{type:'literal', value:creditline}];
            if('undefined'!=typeof(classification)) results[uri]['http://purl.org/dc/terms/type'] = [{type:'literal', value:classification}];
            if(creators.length > 0) results[uri]['http://purl.org/dc/elements/1.1/creator'] = [{type:'literal', value:creators}];
            if(contributors.length>0) results[uri]['http://purl.org/dc/elements/1.1/contributor'] = [{type:'literal', value:contributors}];
            if('undefined'!=typeof(places) && places.length>0) results[uri]['http://purl.org/dc/terms/spatial'] = [{type:'literal', value:places}];

            if (desc && desc.length) results[uri]['http://purl.org/dc/terms/description'] = [{type:'literal',value:desc}];
        })

        console.log(results);
        this.opts.complete_callback(results, archive);
    }

}( jQuery ));
