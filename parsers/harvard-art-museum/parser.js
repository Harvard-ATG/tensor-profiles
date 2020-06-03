(function( $ ) {

    $.fn.parse = function(options) {
    	if (!options.query.length) throw "Enter at least one term into the search field.";
    	var model = new $.fn.spreadsheet_model(options);
        console.log("OPTIONS");
        console.log(options);
        // if(options.single){
        //     let item = options.query;
        //     let id = item.split("/").pop();
        //     console.log("Single");
        // }
    	model.parse = parse;
    	model.fetch('json');
    };

    // if (!$("link[href='https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css']").length){
    //   $.getScript('https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js', function(){
    //       var bootstrapToggleCss = $("<link>", {
    //           rel: "stylesheet",
    //           type: "text/css",
    //           href: "https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"
    //       })
    //       bootstrapToggleCss.appendTo("head");
    //     });
    //     addIIIFToggle();
    // } else {
    //     addIIIFToggle();
    // }
    //
    // function addIIIFToggle(){
    //   $("#ham-search").remove();
    //   var hamSearchHtml = '<div class="row" id="ham-search"><div class="form-check"><input type="checkbox" checked class="form-check-input" id="use-iiif" data-toggle="toggle" data-results="false"></div></div>';
    //   $('#search_results').before(hamSearchHtml);
    //   $(function(){
    //       $('#use-iiif').bootstrapToggle({
    //           on:"Use IIIF",
    //           off:"Use Image"
    //       });
    //   })
    //   $('#use-iiif').change(function(){
    //       if($(this).data("results") == "true"){
    //           $(".glyphicon-search").click();
    //       }
    //   })
    // }

    $.getScript('https://gitcdn.github.io/bootstrap-toggle/2.2.2/js/bootstrap-toggle.min.js', function(){
        var bootstrapToggleCss = $("<link>", {
            rel: "stylesheet",
            type: "text/css",
            href: "https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css"
        })
        if (!$("link[href='https://gitcdn.github.io/bootstrap-toggle/2.2.2/css/bootstrap-toggle.min.css']").length){
            bootstrapToggleCss.appendTo("head");
        }
        $("#ham-search").remove();
        var hamSearchHtml = '<div class="row" id="ham-search"><div class="form-check"><input type="checkbox" checked class="form-check-input" id="use-iiif" data-toggle="toggle" data-results="false"></div></div>';
        $('#search_results').before(hamSearchHtml);
        $(function(){
            $('#use-iiif').bootstrapToggle({
                on:"Use IIIF",
                off:"Use Image"
            });
        })
        $('#use-iiif').change(function(){
            if($(this).data("results") == "true"){
                $(".glyphicon-search").click();
            }
        })
        $('#search_close').click(function(){
            $("#ham-search").remove();
        })
    })



    function parse(data, archive) {
        console.log(data);
        console.log(archive);
        console.log("opts");
        console.log(this);
        console.log(this.opts);

        $('#use-iiif').data("results", "true");
        var useIIIF = $('#use-iiif').is(":checked");

        var results = {};

        // [x] TODO: To get people and places, we'd need to do an object query and a people subsection query on each record
        // https://github.com/harvardartmuseums/api-docs/blob/master/sections/object.md
        // [x] TODO: Would be nice to have a lower res thumbnails to load faster, maybe use IIIF?
        // [] TODO: fix detail view
        // [] TODO: better search (in different fields?)
        // [] TODO: fix stretching of images
        // [x] TODO: there's a bug when displaying title in "Tile" view - renders as [object HTMLCollection]
        // [] TODO: fix bug of results not clearing when swapping collections
        // [] TODO: figure out why ternary expression break things ...
        // [] TODO: see if there is a better way to format dcterms:date, as Scalar doesn't seem to fully respect a range (using slash) as defined here https://www.dublincore.org/specifications/dublin-core/dcmi-terms/
        // [X] TODO: fix 'single'
        // [X] TODO: fix 'next'

        data.records.forEach(function(record){
            var id = record.id;
            var permalink = `https://hvrd.art/o/${id}`;
            var uri = record.url;

            if(record.images && record.images.length>0){
                var iiifbaseuri = record.images[0].iiifbaseuri;
                var iiif_thumb = `${iiifbaseuri}/full/!225,225/0/default.jpg`
                var iiif_full = `${iiifbaseuri}/full/full/0/default.jpg`
            }

            var iiif_manifest_url = '';
            if('seeAlso' in record){
                record.seeAlso.forEach(function(item){
                    if(item.type=="IIIF Manifest"){
                        iiif_manifest_url = `${item.id}?iiif-manifest=1`;
                    }
                })
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
            places = [];
            if(placesArr){
                placesArr.forEach(function(place){
                    str = `${place.displayname} (${place.type})`;
                    places.push({
                        type: "literal",
                        value: str
                    });
                })
            }

            var creatorRoles = ["Artist", "Painter", "Designer"];
            creators = [];
            contributors = [];
            if(record.people){
                record.people.forEach(function(person){
                    var str = '';
                    if(person.displayname) str += `${person.displayname} `;
                    if(person.displaydate) str += `(${person.displaydate}) `;
                    if(person.role) str += `Role: ${person.role} `;
                    if(person.personid) str += `[HAM_id ${person.personid}] `;

                    if(creatorRoles.includes(person.role)){
                        creators.push({
                            type: "literal",
                            value: str
                        });
                    } else {
                        contributors.push({
                            type: "literal",
                            value: str
                        });
                    }
                });
            }
            if(creators.length > 1 || contributors.length > 1){
                console.log(record.title);
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
            // IIIF or image
            if(useIIIF && iiif_manifest_url.length > 0){
                results[uri]['http://simile.mit.edu/2003/10/ontologies/artstor#url'] = [{type:'uri',value:iiif_manifest_url}];
            } else if ('undefined' != typeof(iiif_full)) {
                results[uri]['http://simile.mit.edu/2003/10/ontologies/artstor#url'] = [{type:'uri',value:iiif_full}];
            }


            // Optional / inconsistent properties here
            if(iiif_thumb != null) results[uri]['http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail'] = [{type:'uri',value:iiif_thumb}];
            if(accession != null) results[uri]['http://purl.org/dc/terms/accrualMethod'] = [{type:'literal', value:accession}];
            if(accessionyear != null) results[uri]['http://purl.org/dc/terms/available'] = [{type:'literal', value:accessionyear}];
            if(access != null && access.length > 0) results[uri]['http://purl.org/dc/terms/accessRights'] = [{type:'literal', value:access}];
            if(culture != null) results[uri]['http://purl.org/dc/terms/coverage'] = [{type:'literal', value:culture}];
            if(created != null) results[uri]['http://purl.org/dc/terms/created'] = [{type:'literal', value:created}];
            if(date != null && date.length>0) results[uri]['http://purl.org/dc/terms/date'] = [{type:'literal', value:date}];
            if(medium != null) results[uri]['http://purl.org/dc/terms/medium'] = [{type:'literal', value:medium}];
            if(dimensions != null) results[uri]['http://purl.org/dc/terms/format'] = [{type:'literal', value:dimensions}];
            if(provenance != null) results[uri]['http://purl.org/dc/terms/provenance'] = [{type:'literal', value:provenance}];
            if(copyright != null) results[uri]['http://purl.org/dc/terms/rights'] = [{type:'literal', value:copyright}];
            if(creditline != null) results[uri]['http://purl.org/dc/terms/rightsHolder'] = [{type:'literal', value:creditline}];
            if(classification != null) results[uri]['http://purl.org/dc/terms/type'] = [{type:'literal', value:classification}];
            if(desc != null && desc.length) results[uri]['http://purl.org/dc/terms/description'] = [{type:'literal',value:desc}];
            if(places.length>0) results[uri]['http://purl.org/dc/terms/spatial'] = places;
            if(creators.length > 0) results[uri]['http://purl.org/dc/elements/1.1/creator'] = creators;
            if(contributors.length>0) results[uri]['http://purl.org/dc/elements/1.1/contributor'] = contributors;
        })

        console.log(results);
        this.opts.complete_callback(results, archive);
    }

}( jQuery ));
