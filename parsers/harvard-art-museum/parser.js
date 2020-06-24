(function( $ ) {

    $.fn.parse = function(options) {
    	if (!options.query.length) throw "Enter at least one term into the search field.";
    	var model = new $.fn.spreadsheet_model(options);
        // console.log("OPTIONS");
        // console.log(options);
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

    // Good geocoding
    var googleMapsApiKey = '';
    var googleMapsLibrary = $("<script>", {
        type: "text/javascript",
        src: `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`
    })
    if (!$(`script[src='https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places']`).length){
        googleMapsLibrary.appendTo("head");
        $.getScript(`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`, function(){
            var geocoder = new google.maps.Geocoder();
        });
    }

    // $.getScript(`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`, function(){
    //     var geocoder = new google.maps.Geocoder();
    // }
    // var geocoder = new google.maps.Geocoder();
    // function geocode(place){
    //     return new Promise(function(resolve, reject){
    //         geocoder.geocode( { 'address': place}, function(results, status) {
    //             if(status == "OK"){
    //                 let lat = results[0].geometry.location.lat();
    //                 let lng = results[0].geometry.location.lng();
    //                 resolve({name: place, lat: lat, lng:lng});
    //             }
    //             else {
    //                 reject(Error(status));
    //             }
    //         })
    //     })
    // }



    // geocode_two("Boston, MA").then(function(loc){
    //     console.log(loc);
    // }, function(error){
    //     console.log("Failed to geolocate", error);
    // })

    // function initGeocoder(place){
    //     var geocoder = new google.maps.Geocoder();
    //     geoCode(place);
    // }

    // var geocoder = new google.maps.Geocoder();
    // $.getScript(`https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`, function(){
    //     var geocoder = new google.maps.Geocoder();
    // }
    // var coordinates = [];
    // function geocode(place){
    //     var googleMapsApiKey = 'AIzaSyBC5sOppg0EsI9g5-QA9H8UqK-NAhRk1Gw';
    //     var googleMapsLibrary = $("<link>", {
    //         rel: "stylesheet",
    //         type: "text/css",
    //         href: `https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places`
    //     })
    //     if (!$(`link[href='https://maps.googleapis.com/maps/api/js?key=${googleMapsApiKey}&libraries=places']`).length){
    //         googleMapsLibrary.appendTo("head");
    //     }
    //     geocoder.geocode( { 'address': place}, function(results, status) {
    //         let lat = results[0].geometry.location.lat();
    //         let lng = results[0].geometry.location.lng();
    //         console.log(place);
    //         coordinates.push({[place]: [lat,lng]});
    //     })
    // }

    function parse(data, archive) {
        // console.log(data);
        // console.log(archive);
        // console.log("opts");
        // console.log(this);
        // console.log(this.opts);
        // console.log("SCOPE", this);
        var spreadsheet_model_scope = this;

        $('#use-iiif').data("results", "true");
        var useIIIF = $('#use-iiif').is(":checked");

        var results = {};

        // [x] TODO: To get people and places, we'd need to do an object query and a people subsection query on each record
        // https://github.com/harvardartmuseums/api-docs/blob/master/sections/object.md
        // [x] TODO: Would be nice to have a lower res thumbnails to load faster, maybe use IIIF?
        // [X] TODO: fix detail view - this is caused by null properties
        // [x] TODO: there's a bug when displaying title in "Tile" view - renders as [object HTMLCollection]
        // [X] TODO: fix 'single'
        // [X] TODO: fix 'next'
        // [] TODO: better search (in different fields?)
        // [] TODO: fix stretching of images
        // [] TODO: fix bug of results not clearing when swapping collections
        // [] TODO: figure out why ternary expression break things ...
        // [] TODO: see if there is a better way to format dcterms:date, as Scalar doesn't seem to fully respect a range (using slash) as defined here https://www.dublincore.org/specifications/dublin-core/dcmi-terms/. Update: https://scalar.usc.edu/works/guide2/timeline-layout. Use a dash. But it still doesn't like YYYY - YYYY. YYYY by itself works fine.
        // TODO: add geospatial metadata

        // Each record resolves to a promise. Promise = { url: `http...`, obj: obj }
        // Each record has three promises which must resolve internally: mapProps().then(geocode).then(assignprops)
        // Promise.all then push all into results (or earlier?) and run the next thing
        var recordPromises = [];

        data.records.forEach(function(record){
            function mapProps(){
                console.log("Map props");
                return new Promise(function(resolve, reject){
                    // Generating Properties
                    // People
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
                                creators.push({type: "literal",value: str});
                            } else {
                                contributors.push({type: "literal",value: str});
                            }
                        });
                    }
                    // Dates
                    var created = '';
                    var date = '';
                    if(record.dated){
                        created += `Dated ${record.dated}. `;
                    }
                    if(record.datebegin){
                        created += `Date begin ${record.datebegin}. `;
                        date += `${record.datebegin}`;
                    }
                    if(record.dateend){
                        created += `Date end ${record.dateend}. `;
                        if(record.datebegin){
                            date += `-${record.dateend}`
                        } else { date += `${record.dateend}`}
                    }
                    // Access
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
                    // IIIF and images
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

                    // Map required properties
                    var result = {};
                    result.id = record.id;
                    result['http://purl.org/dc/terms/identifier'] = [{type:'uri',value:result.id}];
                    result['http://purl.org/dc/terms/title'] = [{type:'literal',value:record.title}];
                    result['http://purl.org/dc/terms/identifier'] = [{type:'uri',value:result.id}];
                    result['http://purl.org/dc/terms/source'] = [{type:'literal',value: "Harvard Art Museum"}];
                    result['http://simile.mit.edu/2003/10/ontologies/artstor#sourceLocation'] = [{type:'uri', value:record.url}];

                    // Map optional properties
                    if(record.accessionmethod != null) result['http://purl.org/dc/terms/accrualMethod'] = [{type:'literal', value:record.accessionmethod}];
                    if(record.accessionyear != null) result['http://purl.org/dc/terms/available'] = [{type:'literal', value:record.accessionyear}];
                    if(record.description != null && record.description.length) result['http://purl.org/dc/terms/description'] = [{type:'literal',value:record.description}];
                    if(record.medium != null) result['http://purl.org/dc/terms/medium'] = [{type:'literal', value:record.medium}];
                    if(record.dimensions != null) result['http://purl.org/dc/terms/format'] = [{type:'literal', value:record.dimensions}];
                    if(record.provenance != null) result['http://purl.org/dc/terms/provenance'] = [{type:'literal', value:record.provenance}];
                    if(record.copyright != null) result['http://purl.org/dc/terms/rights'] = [{type:'literal', value:record.copyright}];
                    if(record.creditline != null) result['http://purl.org/dc/terms/rightsHolder'] = [{type:'literal', value:record.creditline}];
                    if(record.classification != null) result['http://purl.org/dc/terms/type'] = [{type:'literal', value:record.classification}];

                    // Map generated properties
                    // IIIF or image
                    if(useIIIF && iiif_manifest_url.length > 0){
                        result['http://simile.mit.edu/2003/10/ontologies/artstor#url'] = [{type:'uri',value:iiif_manifest_url}];
                    } else if ('undefined' != typeof(iiif_full)) {
                        result['http://simile.mit.edu/2003/10/ontologies/artstor#url'] = [{type:'uri',value:iiif_full}];
                    }
                    if(iiif_thumb != null) result['http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail'] = [{type:'uri',value:iiif_thumb}];

                    if(access != null && access.length > 0) result['http://purl.org/dc/terms/accessRights'] = [{type:'literal', value:access}];
                    if(record.culture != null) result['http://purl.org/dc/terms/coverage'] = [{type:'literal', value:`Culture: ${record.culture}`}];
                    if(created != null) result['http://purl.org/dc/terms/created'] = [{type:'literal', value:created}];
                    if(creators.length > 0) result['http://purl.org/dc/elements/1.1/creator'] = creators;
                    if(contributors.length>0) result['http://purl.org/dc/elements/1.1/contributor'] = contributors;
                    if(date != null && date.length>0) result['http://purl.org/dc/terms/date'] = [{type:'literal', value:date}];

                    // Return promise
                    console.log("Mapped");
                    console.log(result);
                    resolve(result);
                });
            }


            // places
            // var placesArr = record.places;
            // places = [];
            // coordinates = [];

            // if(placesArr){
            //     placesArr.forEach(function(place){
            //         str = `${place.displayname} (${place.type})`;
            //         places.push({
            //             type: "literal",
            //             value: str
            //         });
            //     })
            // }

            function geocodePlaces(mapPropsObj){
                console.log(mapPropsObj);
                console.log("Geocode places");
                var geocoder = new google.maps.Geocoder();
                function geocode(place){
                    return new Promise(function(resolve, reject){
                        geocoder.geocode( { 'address': place}, function(results, status) {
                            if(status == "OK"){
                                let lat = results[0].geometry.location.lat();
                                let lng = results[0].geometry.location.lng();
                                resolve({name: place, lat: lat, lng:lng});
                            }
                            else {
                                reject(Error(status));
                            }
                        })
                    })
                }
                return new Promise(function(resolve, reject){
                    let placePromises = []
                    // var placesArr = [{displayname:"Dubuque, IA", type:"City"}, {displayname:"Glasgow",type:"City"}, {displayname:"FUFL", type: "shouldFail"}]
                    if(record.places){
                        record.places.forEach(function(place){
                            placePromises.push(
                                geocode(place.displayname).then(function(loc){
                                    str = `${place.displayname} (${place.type})`;
                                    obj = {
                                        type: "literal",
                                        value: str,
                                        coordinates: [loc.lat,loc.lng]
                                    }
                                    // places.push(obj);
                                    console.log(`geolocated ${place.displayname}`, obj)
                                    return obj;
                                }, function(error){
                                    console.log(`Failed to geolocate ${place.displayname}`);
                                    console.log(error);
                                    str = `${place.displayname} (${place.type})`;
                                    obj = {
                                        type: "literal",
                                        value: str,
                                    }
                                    // places.push(obj);
                                    return obj;
                                })
                            );
                        })
                    }
                    Promise.all(placePromises).then(function(results){
                        console.log("Places geocoded.");
                        resolve(results);
                    }, function(err){
                        console.log("Failure at geocoded")
                        console.log(err);
                    });
                });
            }


            // Properties that always exist here
            // function assignProps(){
            //     console.log("Assign props");
            //     return new Promise(function(resolve, reject){
            //         results[uri] = {
            //             'http://purl.org/dc/terms/title':[{type:'literal',value:title}],
            //             'http://purl.org/dc/terms/identifier':[{type:'uri',value:id}],
            //             'http://purl.org/dc/terms/source':[{type:'literal',value: "Harvard Art Museum"}],
            //             'http://simile.mit.edu/2003/10/ontologies/artstor#sourceLocation': [{type:'uri', value:uri}]
            //         }
            //
            //         // IIIF or image
            //         if(useIIIF && iiif_manifest_url.length > 0){
            //             results[uri]['http://simile.mit.edu/2003/10/ontologies/artstor#url'] = [{type:'uri',value:iiif_manifest_url}];
            //         } else if ('undefined' != typeof(iiif_full)) {
            //             results[uri]['http://simile.mit.edu/2003/10/ontologies/artstor#url'] = [{type:'uri',value:iiif_full}];
            //         }
            //
            //
            //         // Optional / inconsistent properties here
            //         if(iiif_thumb != null) results[uri]['http://simile.mit.edu/2003/10/ontologies/artstor#thumbnail'] = [{type:'uri',value:iiif_thumb}];
            //         if(accession != null) results[uri]['http://purl.org/dc/terms/accrualMethod'] = [{type:'literal', value:accession}];
            //         if(accessionyear != null) results[uri]['http://purl.org/dc/terms/available'] = [{type:'literal', value:accessionyear}];
            //         if(access != null && access.length > 0) results[uri]['http://purl.org/dc/terms/accessRights'] = [{type:'literal', value:access}];
            //         if(culture != null) results[uri]['http://purl.org/dc/terms/coverage'] = [{type:'literal', value:culture}];
            //         if(created != null) results[uri]['http://purl.org/dc/terms/created'] = [{type:'literal', value:created}];
            //         if(date != null && date.length>0) results[uri]['http://purl.org/dc/terms/date'] = [{type:'literal', value:date}];
            //         if(medium != null) results[uri]['http://purl.org/dc/terms/medium'] = [{type:'literal', value:medium}];
            //         if(dimensions != null) results[uri]['http://purl.org/dc/terms/format'] = [{type:'literal', value:dimensions}];
            //         if(provenance != null) results[uri]['http://purl.org/dc/terms/provenance'] = [{type:'literal', value:provenance}];
            //         if(copyright != null) results[uri]['http://purl.org/dc/terms/rights'] = [{type:'literal', value:copyright}];
            //         if(creditline != null) results[uri]['http://purl.org/dc/terms/rightsHolder'] = [{type:'literal', value:creditline}];
            //         if(classification != null) results[uri]['http://purl.org/dc/terms/type'] = [{type:'literal', value:classification}];
            //         if(desc != null && desc.length) results[uri]['http://purl.org/dc/terms/description'] = [{type:'literal',value:desc}];
            //         if(places.length>0) results[uri]['http://purl.org/dc/terms/spatial'] = places;
            //         if(creators.length > 0) results[uri]['http://purl.org/dc/elements/1.1/creator'] = creators;
            //         if(contributors.length>0) results[uri]['http://purl.org/dc/elements/1.1/contributor'] = contributors;
            //
            //         resolve(true);
            //     });
            // }

            recordPromises.push(
                mapProps()
                .then(geocodePlaces())
                // .then(assignProps())
            );

            // recordPromises.push(new Promise(function(resolve, reject){ resolve(true)}))

        })

        // console.log(results);
        // this.opts.complete_callback(results, archive);
        Promise.all(recordPromises).then(function(results){
            console.log("COMPLETED ALL");
            console.log("END SCOPE", this);
            console.log("SAVED SCOPE", spreadsheet_model_scope);
            console.log(results);

            remapped_results = {}
            results.forEach(function(result){
                var uri = result['http://simile.mit.edu/2003/10/ontologies/artstor#sourceLocation'][0].value;
                remapped_results[uri] = result;
            })
            spreadsheet_model_scope.opts.complete_callback(remapped_results, archive);

            // spreadsheet_model_scope.opts.complete_callback(results, archive);
        });
    }

}( jQuery ));
