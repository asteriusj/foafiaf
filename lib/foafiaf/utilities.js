var models = require('../../models');
var Tags = models.Tags;
var Tag = models.Tag;
var Entity = models.Entity;
var Person = models.Person;
var Group = models.Group;
var fs = require('fs');
var path = require('path');
var jsonld = require('jsonld');
//var rdflib = require('rdflib');
var utils = require('./utilities.js');

exports.getRDF = function(cb) {
    console.log('getRDF start')
    //var fs = require('fs'),
    $rdf = require('rdflib');
var rdflib = require('rdflib');

var kb = new rdflib.Formula();
    
// var jQuery = require('jquery');

// var $rdf = require('../../node_modules/rdflib/dist/rdflib.js');
// //var $rdf = require('../../dist/node-rdflib.js');
// var util = require('util');
// var print = util.print;
// var k = $rdf.graph()
// var f = $rdf.fetcher(k);
// var z = $rdf.Serializer(k);
// z.writeStore(print);
    
    var folder = path.join(__dirname, '../../public/things/jsonld');
    var file1 = 'Persons-TransformRockford.jsonld';
    var filepath1 = path.join(folder, file1);
    //var rdfData=fs.readFileSync(__dirname+'/1.xml').toString();
    var rdfData = fs.readFileSync(filepath1).toString();
    
    var store=$rdf.graph();
    var contentType='application/rdf+xml';
    var baseUrl="http://IoFTriples.com";
    try{
        $rdf.parse(rdfData,store,baseUrl,contentType);
        console.log($rdf)
        var stms = store.statementsMatching(undefined, undefined , undefined);
        for (var i=0; i<stms.length;i++) {
            var stm = stms[i]
            console.log(stm) // the WebID of a friend
    
        }
    } catch(err){
        console.log(err);
    }
}



exports.resolveDataset = function (jsonld, cb) {
    console.log('resolveDataset')
    
    var myJSONLD = {} ;
    var myGraph = []
    var myContext = []
    var myID = null;
        
    var objGraph = jsonld['@graph'];
    var objContext = jsonld['@context'];
    var objId = jsonld['@id']; 

    
    var cursorTasks = 1 //objGraph.length                         //files.length; // This will decrement for each file then callback
    function cursorTaskComplete() {
            cursorTasks--;
            //console.log(cursorTasks)
            if (cursorTasks <= 0) {

                var myJSONLD = { 
                    '@graph' : myGraph,
                    '@id' : myID,
                    '@context' : myContext
                };
                //console.log('myJSONLD', myJSONLD)
                cb(null, myJSONLD);
            }
    } // end cursorTaskComplete 
    
    function doResolve(cb) { 
        console.log('doResolve')
     
        //var objGraph = jsonld['@graph'];
        //var objContext = jsonld['@context'];
        //console.log('objContext ', objContext)
       
        // loop over items in graph
        console.log('objGraph.length ', objGraph.length)
        for (var g = 0; g < objGraph.length; ++g) {
            //console.log('g ', g)
            var objItem = objGraph[g];
            //console.log('objItem ', objItem)
            var objId = objItem['@id'];
            
            // look for properies with Inverse partner property
            for(var property in objItem) {
                //console.log("property ", property)
                
                if (property === 'org:postIn') {
                    //console.log('property ', property)
                    var inverse = 'org:hasPost'
                    // call function passing in property, inverse and objItem
                    processEntities (property, inverse, objItem)
                } // end if 'org:postIn' 
            
                if (property === 'org:hasPost') {
                    //console.log('property ', property)
                    var inverse = 'org:postIn'
                    // call function passing in property, inverse and objItem
                    processEntities (property, inverse, objItem)
                } // end if 'org:hasPost'
                
                if (property === 'org:holds') {
                    //console.log('property ', property)
                    var inverse = 'org:heldBy'
                    // call function passing in property, inverse and objItem
                    processEntities (property, inverse, objItem)
                } // end if 'org:postIn' 
            
                if (property === 'org:heldBy') {
                    //console.log('property ', property)
                    var inverse = 'org:holds'
                    // call function passing in property, inverse and objItem
                    processEntities (property, inverse, objItem)
                } // end if 'org:hasPost'
                
                if (property === 'org:hasUnit') {
                    //console.log('property ', property)
                    var inverse = 'org:unitOf'
                    // call function passing in property, inverse and objItem
                    processEntities (property, inverse, objItem)
                } // end if 'org:postIn' 
            
                if (property === 'org:unitOf') {
                    console.log('property ', property)
                    var inverse = 'org:hasUnit'
                    // call function passing in property, inverse and objItem
                    processEntities (property, inverse, objItem)
                } // end if 'org:hasPost'
                
            } // look for properies with Inverse
            
            
            function processEntities (property, inverse, _objItem) {
                var _objId = _objItem['@id'];
                // select or loop though foafiaf entities of property
                if ( (typeof _objItem[property]) === 'string') {		// check if property value is a string ie. a single entry
			        var propVal = _objItem[property] || null ;
			        //console.log('propVal', propVal)
			        if (propVal != null) {
				        //if foafiaf entity shown in post in then update with inverse
				        if ( propVal.indexOf('foafiaf:') !== -1 ) {
				            //console.log('entity property entity', objId, property, propVal)
				            updateEntity(propVal, inverse, objId)
				        }
			        }
                } //end if 'string'
			    if ( Array.isArray(objItem[property]) ) {           // check if property value is array
				    for (var k = 0; k < objItem[property].length; k++) {
				        //console.log('k ', k)
                        
                        var propVal = objItem[property][k] || null ;
                        //console.log('k propVal', propVal)
                        if ( (propVal != null) && ((typeof _objItem[property]) === 'string') ) {
				            //if foafiaf entity shown in property then update with inverse
				            if ( propVal.indexOf('foafiaf:') !== -1 ) {
				                //console.log('entity property entity', objId, property, propVal)
				                updateEntity(propVal, inverse, objId)
				            }
			            }
				    }
				} // end if array
            
                return 
            } // end of process entities function
            
            
            
        } // end loop over items in graph
        
        
        
        function updateEntity(source, property, target) {  
            //console.log('updateEntity')
           // console.log('source, property, target:', source, property, target)
        	
        	// find item in objGraph with the doutvr entity id
        	for (var q = 0; q < objGraph.length; ++q) {
        	    //console.log('q ', q)
                var objEntity = objGraph[q];
                var objId = objEntity['@id'];
                if (objId === source) {	            
                    //console.log('objEntity', objEntity)
                    objGraph[q] = spliceProperty(q, objEntity, property, target) ;
                    //console.log('objGraph[q]', objGraph[q])
                }
        	}
        }              
        function spliceProperty(num, entity, property, value) {
           // console.log('spliceProperty')
            //console.log("num, entity, property, value:", num, entity['@id'], property, value)
            
            for(var prop in entity) {
                //console.log("prop ", prop)
                
                // check for Inverse property in entity item
                // if it does check for array or string value then added new value
                // if does not add property with collection array
                var newProp = []
                if (prop === property) {
                    //console.log("prop ", prop)
                    
                    if ( Array.isArray(objItem[property]) ) {           // check if property value is array
					    newProp = objItem[property] ;
					
                    } else {
                        var propVal = entity[prop] || null ;
                        newProp = [ propVal ] ;
                    }
                    
                    // add obejct entity id to other entity property array
                    newProp.push(value)

                } else {
                    var newProp = [ value ] ;
                    
                }
                
                entity[property] = newProp ;
                //console.log("num, entity['@id'] entity[property] : ", num, entity['@id'], entity[property])
                return entity           
                
            }
        }       
        
        //console.log('objGraph', objGraph)
        
        myID = objId;
        myGraph = objGraph;
        myContext = objContext;
        //...when async operation is complete call
        cursorTaskComplete()
    
    }; 
    
    //call do resolve
    doResolve(cb)
    
    //if (cb) cb(null, myJSONLD);
}



exports.combineDatasets = function (arrayJSONLD, cb) {
    console.log('combineDatasets')
    
    var myJSONLD = {} ;
    var myGraph = []
    var myContext = []
    var myID = null;
    
    
    var cursorTasks = arrayJSONLD.length                         //files.length; // This will decrement for each file then callback
    function cursorTaskComplete() {
            cursorTasks--;
            //console.log(cursorTasks)
            if (cursorTasks <= 0) {

                var myJSONLD = { 
                    '@graph' : myGraph,
                    '@id' : myID,
                    '@context' : myContext
                };
                //console.log('myJSONLD', myJSONLD)
                
                // now call resolve before sending back
                utils.resolveDataset(myJSONLD, function (err, data) {
                    if (err) {
                      console.log('error', err);
                      cb(err);
                    }
                            
                    //console.log('DATA', data)
                 
                }); 
                
                  
                cb(null, myJSONLD);
            }
    } // end cursorTaskComplete 
    
    
    function doCombine(cb) {
        console.log('doCombine')
        
        //loop over array of JSONLD objects
        for (var index = 0; index < arrayJSONLD.length; ++index) {
            var content = arrayJSONLD[index];
            
            var jsonld = content;
            //console.log('jsonld: ', jsonld);
    
            var objId = jsonld['@id'];
            console.log('objId', objId);
            if (objId != 'urn:x-arq:DefaultGraphNode') {
                myID = objId;
            }
           
            
            var objGraph = jsonld['@graph'];
            //console.log('objGraph ', objGraph)

            for (var g = 0; g < objGraph.length; ++g) {
                var objItem = objGraph[g];
                //console.log('objItem ', objItem)
                 
                if ( objectPropInArray( myGraph, '@id', objItem['@id'] ) ) { 
                    
                    //console.log('myGraph: ', myGraph)
                    //
                    // if item alread exists, need to merge objects
                    //
                    var newId = objItem['@id']
                    var newItem = objItem;
                    //console.log(' Item exists with new ID', newId)
                    
                    // get old item
                    var oldItem = {};
                    var idx = 0;
                    for(idx = 0, m = null; idx < myGraph.length; ++idx) {
                        //console.log(myGraph[idx])
                        if (myGraph[idx]) {
                            if(myGraph[idx]['@id'] == newId) {
                                oldItem = myGraph[idx];
                                break;
                            }
                        }
                    };
                    //console.log(' existing Item ID: ', oldItem['@id']) 
                      
                    // get list of properties from old and new objects
                    var keys = [];
                    for(var key in oldItem) { keys[key] = key };   
                    for(var key in newItem) { keys[key] = key }; 
                    //console.log(keys)
                    
                    //
                    // compare and merge old and new items 
                    //
                    var listProps = keys;
                    var mergeItem = {}; 
                    
                    //console.log('  Looping though properties of new and old items')
                    for(var key in listProps) { 

                        var myProp = listProps[key];
                        //console.log('  ', myProp)
                        
                        // get old and new property value objects
                        var oldObj = oldItem[myProp] || null;
                        var newObj = newItem[myProp] || null;
                        //console.log('  oldObj ', oldObj)
                        //console.log('  newObj ', newObj)
                        
                        // compare old and new propery value objects
                        if (oldObj == newObj) {
                            // if the obejcts are the same use old object in merge
                            //console.log('   property value same in old and new ')
                            mergeItem[myProp] = oldItem[myProp];
                                
                        } else {
                            // if they are different need pick which one to use
                            
                            var inOld = (myProp in oldItem);
                            var inNew = (myProp in newItem);
                            //console.log('inOld ', inOld)
                            //console.log('inNew ', inNew)
                            // NEED TO ADD LOGIC FOR ARRAYS
                            if ( inOld && inNew ) {
                                // if both exists then ccompare details
                                //console.log('   property exists in old and new ')
                                //console.log('oldObj ', oldObj)
                                //console.log('newObj ', newObj)
                                
                                var oldnewVal = [];
                                // check for prop val not null then concat to merged
                                if (oldItem[myProp]) {
                                    oldnewVal = oldnewVal.concat(oldObj);
                                }
                                if (newItem[myProp]) {
                                    oldnewVal = oldnewVal.concat(newObj);
                                }
                                // if (oldObj instanceof Array) {
                                //     console.log("oldObj is array")
                                //     oldnewVal.push.apply(oldnewVal, oldObj)
                                // } else {
                                //     // check if exists in list else add it
                                //     oldnewVal.push(oldObj);
                                // }
                                // if (newObj instanceof Array) {
                                //     console.log("newObj is array")
                                //     //oldnewVal.push.apply(oldnewVal, newObj)
                                //     oldnewVal = oldnewVal.concat(newObj);
                                // } else {
                                //     //oldnewVal.push(newObj);
                                //     oldnewVal = oldnewVal.concat(newObj);
                                // }
                                
                                mergeItem[myProp] = oldnewVal;
                                
                                
                            } else if (inOld) {
                                // if objectsd are different and old exists use it
                                //console.log('   property exists in old ')
                                mergeItem[myProp] = oldItem[myProp]; 

                              
                            } else if (inNew) {
                                // if objectsd are different and new exists use it
                                //console.log('   property exists in new ')
                                mergeItem[myProp] = newItem[myProp];
 
                            }
                        };

                    } //end for
                    //console.log(' mergeItem: ', mergeItem)
                    
                    //
                    //change item in combined graph to merged item
                    //
                    //delete myGraph[idx];
                    //myGraph.push(mergeItem);
                    myGraph.splice( idx, mergeItem );
                    //console.log('merged objItem', mergeItem['@id'])
                    
                } else {
                    // if item does not currently exist in graph, add item
                    //console.log('new objItem', objItem['@id'])
                    myGraph.push(objItem)
                };
            };
            
            
            var objContext = jsonld['@context'];
            //console.log('objContext ', objContext)
           
            for (var key in objContext) {
                if (objContext.hasOwnProperty(key)) {
                    var objElement = {};
                    //console.log(key);
                    objElement[key] = objContext[key] ;
                    //console.log('objElement ', objElement)
                    
                    
                    if ( objectPropInArray( myContext, key, objElement[key] ) ) { 
                        //console.log('element with key exists -> ', key)
                
                    } else {
                        // if element does not current exist in content, add element
                        //console.log('element with key is new -> ', key)
                        myContext.push(objElement)
                    };
                
                    //myContext.push(objElement)
                        
                } // end hasOwnProperty 
            } // end for key

     
            //...when async operation is complete call
            cursorTaskComplete() 
        };
 
    }; 
    
    //call do combine
    doCombine(cb)
    
    //if (cb) cb(null, myJSONLD);
}

exports.convertJSONLD2CSV = function (filepath, cb) {
    
}

exports.convertCSV2JSONLD = function (filepath, cb) {
    var myJSONLD = {} ;
    
    //Converter Class 
    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});
  
    //read from file into converter pipe
    require("fs").createReadStream(filepath).pipe(converter);
  
    //end_parsed will be emitted once parsing finished 
    converter.on("end_parsed", function (jsonArray) {
        //console.log('jsonArray: ', jsonArray); //here is your result jsonarray 
     
     
        // now convert to jsonld
        myJSONLD = toJSONLD(jsonArray);
     
        //console.log('myJSONLD: ', JSON.stringify(myJSONLD));
        if (cb) cb(null, myJSONLD);
    
    });

    
}

function toJSONLD (jsonArray) {
    var myJSONLD = {} ;
    
    var myJSONLD = { "@graph": [] };
    var myGraphs = [];
    
    
    // **
    // ** Process ExportInitiatives.csv
    //**
    for (var j = 0; j < jsonArray.length; j++) {
        var myRow = jsonArray[j];
        //console.log(j, myRow)
        
        // Name,Description,PrefixName,StartDate,EndDate,Status,ColorName,AssignedToOwnerID,AssignedByOwnerID
        // Create/Implement Communication Strategy,,Communications,,,On-Track,,,74
        
        //   {
        //     "@id" : "_:b3",
        //     "@type" : "pmbok:Project",
        //     "finishes" : "9/30/2016",
        //     "project" : "Provide technical guidance on selecting / developing Project Management tool(s)",
        //     "shortname" : "Project Management Technical Guidence",
        //     "status" : "On-Track",
        //     "has_container": [
        //         "_projects_0"
        //       ]
        //   }
        
        var myInitiative = { "@id": "", "@type": "", "label": "", "name": "", "title": "", "status": "", "starts": "", "finishes": "" };
        var myPerson = { "@id": "", "@type": "", "label": "", "name": "", "title": "", "email": "" , "entity": "" };

        
        // process entity
        myInitiative['@type'] = 'foafiaf:initiative' ;
        myInitiative['@id'] = "foafiaf:initiative_" + j;
        myInitiative['shortname'] =  myRow['Name'] || null ;
        myInitiative['name'] = myRow['Name'] || null ;
        myInitiative['project'] = myRow['Description'] || null ;
        myInitiative['description'] = myRow['Description'] || null ;
        myInitiative['status'] = myRow['Status'] || null ;
        myInitiative['starts'] = myRow['StartDate'] || null ;
        myInitiative['finishes'] = myRow['EndDate'] || null ;
        myInitiative['parentId'] = myRow['AssignedToOwnerID'] || null ;
        
        //console.log('myInitiative', myInitiative)
        myJSONLD['@graph'].push(myInitiative); 
    } //end for
    
    //console.log('myJSONLD', myJSONLD)
    return myJSONLD
}




// exports.convertCSVFile = function () {
//   //Converter Class 
//   var Converter = require("csvtojson").Converter;
//   var converter = new Converter({});
  
//   //read from file 
//   var folder = path.join(__dirname, '../../public/things/csv/.');
//   var file = 'contacts.csv';
//   var filepath = path.join(folder, file);
//   require("fs").createReadStream(filepath).pipe(converter);
  
//   //end_parsed will be emitted once parsing finished 
//   converter.on("end_parsed", function (jsonArray) {
//      //console.log('jsonArray: ', jsonArray); //here is your result jsonarray 
     
//      // now convert to jsonld
//      toJSONLD(jsonArray);
     
//   });
 
//   function toJSONLD(jsonArray) {
    
//     var myJSONLD = { "@graph": [] };
//     var myGraphs = [];
    
//     for (var j = 0; j < jsonArray.length; j++) {
//         var myRow = jsonArray[j];
//         //console.log(j, myRow)
        
//         var myEntity = { "@id": "", "@type": "", "label": "", "name": "", "positions": [] };
//         var myPerson = { "@id": "", "@type": "", "label": "", "name": "", "title": "", "email": "" , "entity": "" };
//         var myPosition =  { "@id": "", "title": "", "name": "" };
//         var myPositions = [];
        
//         // process entity
//         var myOrganization = myRow['Organization'] || null; 
//         myEntity['@id'] = "_entity_" + j;
//         myEntity['@type'] = "ttp://dbpedia.org/ontology/city";
//         myEntity['name'] = myOrganization;
        
//         // process contact 1
//         var myContactPerson1 = myRow['Contact Person 1'] || null; 
//         var myTitle1 = myRow['Title 1'] || null; 
//         var myEmailAddress1 = myRow['Email Address 1'] || null; 
//         if (myContactPerson1) {
//               var myPerson1 = { "@id": "", "@type": "", "label": "", "name": "", "title": "", "email": "" , "entity": "" };
//               myPerson1['@id'] = "_person_" + j + "_" + "1";
//               myPerson1['@type'] = "foaf:Person";
//               myPerson1['label'] = "Person: " + myContactPerson1 ;
//               myPerson1['name'] = myContactPerson1;
//               myPerson1['title'] = myTitle1;
//               myPerson1['entity'] = myEntity['@id'];
//               myPerson1['email'] = myEmailAddress1;
//               //add person to graph
//               //console.log('myPerson1: ', myPerson1)
//               //myJSONLD['@graph'].push(myPerson1);
//               myGraphs.push(myPerson1);
              
//               //console.log('myGraphs: ', myGraphs.length)
//               // add person to list of positions
//               var myPosition1 = { "@id": "", "title": "", "name": "" };
//               myPosition1['@id'] = myPerson1['@id'];
//               myPosition1.title = myPerson1['title'];
//               myPosition1.name = myPerson1['name'];
//               //console.log('myPosition1 ',myPosition1)
//               myEntity.positions.push(myPosition1);
//         }
        
//         // process contact 2
//         var myContactPerson2 = myRow['Contact Person 2'] || null; 
//         var myTitle2 = myRow['Title 2'] || null; 
//         var myEmailAddress2 = myRow['Email Address 2'] || null; 
//         if (myContactPerson2) {
//               var myPerson2 = { "@id": "", "@type": "", "label": "", "name": "", "title": "", "email": "" , "entity": "" };
//               myPerson2['@id'] = "_person_" + j + "_" + "2";
//               myPerson2['@type'] = "foaf:Person";
//               myPerson2['label'] = "Person: " + myContactPerson2 ;
//               myPerson2['name'] = myContactPerson2;
//               myPerson2['title'] = myTitle2;
//               myPerson2['entity'] = myEntity['@id'];
//               myPerson2['email'] = myEmailAddress2;
//               //add person to graph
//               //console.log('myPerson2: ', myPerson2)
//               //myJSONLD['@graph'].push(myPerson2);
//               myGraphs.push(myPerson2);
              
//               //console.log('myGraphs: ', myGraphs.length)
//               // add person to list of positions
//               var myPosition2 = { "@id": "", "title": "", "name": "" };
//               myPosition2['@id'] = myPerson2['@id'];
//               myPosition2.title = myPerson2['title'];
//               myPosition2.name = myPerson2['name'];
//               //console.log('myPosition2 ',myPosition2)
//               myEntity.positions.push(myPosition2);
//         }
        
        
//         //process contact 3
//         var myContactPerson3 = myRow['Contact Person 3'] || null; 
//         var myTitle3 = myRow['Title 3'] || null; 
//         var myEmailAddress3 = myRow['Email Address 3'] || null; 
//         if (myContactPerson3) {
//               var myPerson3 = { "@id": "", "@type": "", "label": "", "name": "", "title": "", "email": "" , "entity": "" };
//               myPerson3['@id'] = "_person_" + j + "_" + "3";
//               myPerson3['@type'] = "foaf:Person";
//               myPerson3['label'] = "Person: " + myContactPerson3 ;
//               myPerson3['name'] = myContactPerson3;
//               myPerson3['title'] = myTitle3;
//               myPerson3['entity'] = myEntity['@id'];
//               myPerson3['email'] = myEmailAddress3;
//               //add person to graph
//               //console.log('myPerson3: ', myPerson3)
//               //myJSONLD['@graph'].push(myPerson3);
//               myGraphs.push(myPerson3);
              
//               // add person to list of positions
//               var myPosition3 = { "@id": "", "title": "", "name": "" };
//               myPosition3['@id'] = myPerson3['@id'];
//               myPosition3.title = myPerson3['title'];
//               myPosition3.name = myPerson3['name'];
//               //console.log('myPosition3 ',myPosition3)
//               myEntity.positions.push(myPosition3);
//         }  
        
        
//         // process contact 4
//         var myContactPerson4 = myRow['Contact Person 4'] || null; 
//         var myTitle4 = myRow['Title 4'] || null; 
//         var myEmailAddress4 = myRow['Email Address 4'] || null; 
//         if (myContactPerson4) {
//               var myPerson4 = { "@id": "", "@type": "", "label": "", "name": "", "title": "", "email": "" , "entity": "" };
//               myPerson4['@id'] = "_person_" + j + "_" + "4";
//               myPerson4['@type'] = "foaf:Person";
//               myPerson4['label'] = "Person: " + myContactPerson4 ;
//               myPerson4['name'] = myContactPerson4;
//               myPerson4['title'] = myTitle4;
//               myPerson4['entity'] = myEntity['@id'];
//               myPerson4['email'] = myEmailAddress4;
//               //add person to graph
//               //console.log('myPerson4: ', myPerson4)
//               //myJSONLD['@graph'].push(myPerson4);
//               myGraphs.push(myPerson4);
              
//               // add person to list of positions
//               var myPosition4 = { "@id": "", "title": "", "name": "" };
//               myPosition4['@id'] = myPerson4['@id'];
//               myPosition4.title = myPerson4['title'];
//               myPosition4.name = myPerson4['name'];
//               //console.log('myPosition4 ',myPosition4)
//               myEntity.positions.push(myPosition4);
//         }  
        
       
      
//       myJSONLD['@graph'].push(myEntity); 
//     }
    
//     myJSONLD['@graph'].push(myGraphs);
//     console.log('myJSONLD: ', JSON.stringify(myJSONLD));
//   }

//   //console.log('saveLinkedDataFile:', JSON.stringify(content))
//   //cb(null);
// }


exports.convertJSONLDtoNodesEdges = function (objContent, cb) {

    //console.log('objContent', objContent)
    
    // booleans that show or hide elements
    var showRelationships = true;
    var showProperties = false;
    var showMeGraph = true;
    var showTags = true;
    var showLocations = true;
    
    var edges = [];
    var nodes = [];
    var manifest = { graphName: '', defaultNode: null };
    var nodes_edges = { 
        'manifest': manifest,
        'nodes' : nodes,
        'edges' : edges,
    };
          
    var IMGDIR = '../../img/';
    
    var jsonld = objContent
    var objId = jsonld['@id'];
    //console.log('objId', objId);
    nodes_edges.manifest.defaultNode = objId;
    var objGraph = jsonld['@graph'];
    //console.log('objGraph', objGraph)

    // loop across objects in @graph
    for (var j = 0; j < objGraph.length; j++) {

                var myGraph = objGraph[j];
                var graphId = myGraph['@id'];
                //console.log('graphId', graphId)
                
                  
                // prep nodes for main graph elements
                var addNode = false;
                var myNode = {};
                  
                // if graph element has @type then process and add nodes / edges
                if (myGraph['@type']) {

                  myNode.typeOf = myGraph['@type'];
                  //console.log('@type', myNode.typeOf)
                  switch (myNode.typeOf) {
                    //   case 'foaf:PersonalProfileDocument':
                    //      console.log("case 'foaf:PersonalProfileDocument'")
                    //      manifest.label = myGraph['label'] || null;
                    //      manifest.maker = myGraph['maker'] || null;
                    //      manifest.primaryTopic = myGraph['primaryTopic'] || null;
                    //      break;
                       case 'foaf:Person':
                         console.log("case 'foaf:Person' ", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['rdfs:label'];
                          myNode.title = 'Person:' + ' ' + graphId + ' ' + myGraph['foaf:name'];
                          myNode.name = myGraph['foaf:name'] || null;
                          myNode.group = 'Person';
                          addNode = true;
                          break;
                       case 'foaf:Group':
                         console.log("case 'foaf:Group'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['name'];
                          myNode.title = 'Group:' + ' ' + graphId + ' ' + myGraph['foaf:name'];
                          myNode.name = myGraph['name'] || null;
                          myNode.group = 'Group';
                          addNode = true;
                          break;
                      case 'foaf:Organization':
                        console.log("case 'foaf:Organization'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['rdfs:label'];
                          //myNode.title = myGraph['@type'] + ' ' + graphId + ' ' + myGraph['rdfs:label'];
                          myNode.name = myGraph['foaf:name'] || null;
                          var dbotype = myGraph['dbo:type'] || null;
                          console.log('dbotype', dbotype )
                          if ( dbotype === 'dbo:City' ) {
                              myNode.title = 'City:' + ' ' + myGraph['rdfs:label'];
                              myNode.group = 'City';
                          } else if ( dbotype === 'dbo:Village' ) {
                              myNode.title = 'Village:' + ' ' + myGraph['rdfs:label'];
                              myNode.group = 'Village';
                          } else if ( dbotype === 'dbo:Town' ) {
                              myNode.title = 'Town:' + ' ' + myGraph['rdfs:label'];
                              myNode.group = 'Town';
                          } else if ( dbotype === 'dbo:Company' ) {
                              myNode.title = 'Company:' + ' ' + myGraph['rdfs:label'];
                              myNode.group = 'Company';
                          } else if ( dbotype === 'dbo:GovernmentAgency' ) {
                              myNode.title = 'Government' + ' gov agency ' + myGraph['rdfs:label'];
                              myNode.group = 'Government';
                          } else if ( dbotype === 'dbo:Municipality' ) {
                              myNode.title = 'Municipality:' + ' ' + myGraph['rdfs:label'];
                              myNode.group = 'Municipality';
                          } else if ( dbotype === 'dbo:Legislature' ) {
                              myNode.title = 'Legislature:' + ' ' + myGraph['rdfs:label'];
                              myNode.group = 'Legislature';
                          } else if ( dbotype === 'dbo:Non-ProfitOrganisation' ) {
                              myNode.title = 'NonProfit:' + ' ' + myGraph['rdfs:label'];
                              myNode.group = 'NonProfit';
                          } else if ( dbotype === 'dbo:ReligiousOrganisation' ) {
                              myNode.title = 'Faith:' + ' ' + myGraph['rdfs:label'];
                              myNode.group = 'Faith';
                          } else {
                              myNode.title = 'Organization:' + ' ' + myGraph['rdfs:label'];
                              myNode.group = 'Organization';
                          }
                            
                          //myNode.group = 'group';
                          addNode = true;
                          break;
                      case 'org:Role':
                        console.log("case 'org:Role' is", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['rdfs:label'];
                          myNode.title = 'Role:' + ' ' + graphId + ' ' + myGraph['rdfs:label'];
                          myNode.name = myGraph['foaf:topic'] || null;
                          myNode.group = 'Role';
                          addNode = true;
                          break;
                      case 'dbo:Place':
                         console.log("case 'dbo:Place'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['rdfs:label'];
                          myNode.title = 'Place' + ' ' + graphId + ' ' + myGraph['rdfs:label'];
                          myNode.name = myGraph['name'] || null;
                          myNode.group = 'Place';
                          addNode = true;
                          break;
                          
                      case 'schema:Twits':
                         console.log("case 'schema:Twits'", graphId)
                          myNode.id = graphId;
                          myNode.label = "Twits";
                          myNode.group = 'documents';
                          addNode = true;
                          break;
                       case 'schema:Twit':
                         console.log("case 'schema:Twit'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['title'];
                          myNode.title = myGraph['@type'] + ': ' + myGraph['title'] || '';
                          myNode.name = myGraph['summary'] || null;
                          myNode.group = 'project';
                          addNode = true;
                          break;
                          
                      case 'schema:Projects':
                         console.log("case 'schema:Projects'", graphId)
                          myNode.id = graphId;
                          myNode.label = "Projects";
                          myNode.group = 'Projects';
                          addNode = true;
                          break;
                       case 'pmbok:Project':
                         console.log("case 'pmbok:Project'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['shortname'];
                          myNode.title = 'Project' + ': ' + myGraph['project'] || '';
                          myNode.name = myGraph['description'] || null;
                          myNode.group = 'Project';
                          addNode = true;
                          break;

                       case 'foafiaf:initiative':
                         console.log("case 'foafiaf:initiative'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['@id'];
                          myNode.title = 'Initiative' + ' ' + myGraph['@id'];
                          myNode.name = myGraph['description'] || null;
                          myNode.group = 'Initiative';
                          addNode = true;
                          break;
                       case 'foafiaf:objective':
                         console.log("case 'foafiaf:objective'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['label'];
                          myNode.title = 'objective' + graphId + ': ' + myGraph['description'] || '';
                          myNode.name = myGraph['name'] || null;
                          if (myGraph['image']) {
                            myNode.image =  IMGDIR + myGraph['image'] || ''; 
                            myNode.shape = 'image';
                          } else {
                            myNode.group = 'puzzle'; 
                          }
                          addNode = true;
                          break;
                          
                       case 'skos:ConceptScheme':
                         console.log("case 'skos:ConceptScheme'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['rdfs:label'] || null;
                          myNode.title = 'ConceptScheme'  + ' ' + graphId + ' ' + myGraph['rdfs:label'] ;
                          myNode.group = 'Tags';
                          addNode = true;
                         break;
                       case 'skos:Concept':
                         console.log("case 'skos:Concept'", graphId)
                          myNode.id = graphId;
                          var prefLabel = myGraph['skos:prefLabel'] || null ;
                          myNode.label = myGraph['rdfs:label'] || null;
                          myNode.title = 'Concept'  + ' ' + graphId + ' ' + myGraph['rdfs:label'] ;
                          myNode.group = 'Tag';
                          addNode = true;
                         break;     
                        
                        case 'perse:Perse':
                         console.log("case 'perse:Perse'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['rdfs:label'] || null;
                          myNode.title = 'Perse Profile'  + ' ' + graphId + ' ' + myGraph['rdfs:label'] ;
                          myNode.group = 'Tags';
                          addNode = true;
                         break;
                       case 'perse:Interest':
                       case 'perse:Skill':
                       case 'perse:Knowledge':
                           
                       case 'perse:Experience':
                       case 'perse:Personality':
                         console.log("case 'perse:", myNode.typeOf, graphId)
                          myNode.id = graphId;
                          var Label = myGraph['rdfs:label']  || null ;
                          var prefLabel = myGraph['skos:prefLabel']  || null ;
                          myNode.label = prefLabel || Label ;
                          myNode.title = 'Perse Type'  + ' ' + graphId + ' ' + myGraph['rdfs:label'] ;
                          myNode.group = 'Tag';
                          addNode = true;
                         break; 
                       case 'perse:Education':
                          console.log("case 'perse:v'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['rdfs:label'] ;
                          myNode.title = myGraph['@type'] + ' ' + graphId + ' ' + myGraph['rdfs:label']  ;
                          myNode.group = 'Education';
                          addNode = true;
                          break;
                       case 'perse:WorkHistory':
                          console.log("case 'perse:WorkHistory'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['rdfs:label'] ;
                          myNode.title = myGraph['@type'] + ' ' + graphId + ' ' + myGraph['rdfs:label']  ;
                          myNode.group = 'Job';
                          addNode = true;
                          break;
                          
                          
                       case 'foaf:topic':
                          console.log("case 'foaf:topic'", graphId)
                        if (showTags) {
                          myNode.id = graphId;
                          myNode.label = myGraph['rdfs:label'] ;
                          myNode.title = myGraph['@type'] + ' ' + graphId + ' ' + myGraph['rdfs:label']  ;
                          myNode.group = 'Tags';
                          addNode = true;
                        }
                          break;
                       case 'sioc:topic':
                          console.log("case 'sioc:topic'", graphId)
                        if (showTags) {
                          myNode.id = graphId;
                          myNode.label = myGraph['label'] || '';
                          myNode.title = myGraph['name'] || '';
                          myNode.group = 'Tag';
                          addNode = true;
                        }
                          break;
                       case 'movie:film':
                          console.log("case 'movie:film'", graphId)
                          myNode.id = graphId;
                          myNode.name = myGraph['name'] || '';
                          myNode.title = myGraph['title'] || '';
                          myNode.label = myGraph['label'] || '';
                          myNode.group = 'film';
                          addNode = true;
                          break;
 
                       default:
                          console.log('case: ', graphId)
                          myNode.id = graphId;
                        //   myNode.type = myGraph['@type'] || '';
                        //   if (myNode.type.length > 0) {
                        //       myNode.type = myNode.type[0] + ' more...';
                        //   }
                        //   myNode.name = myGraph['name'] || null;
                        //   if (myNode.name.length > 0) {
                        //       myNode.name = myNode.name[0] + ' more...';
                        //   }
                        //   myNode.label = myGraph['label'] || Label;
                        //   if (myNode.label.length > 0) {
                        //       myNode.label = myNode.label[0] + ' more...';
                        //   }
                        //   myNode.title = myGraph['title'] || null;
                        //   if (myNode.title.length > 0) {
                        //       myNode.title = myNode.title[0] + ' more...';
                        //   }
                          myNode.label = myGraph['rdfs:label'] || null;
                          myNode.title = graphId + ' ' + myGraph['rdfs:label'] ;

                          addNode = true;
                        //default:
                          //console.log('default case ', graphId)
                          //addNode = false;
                  } // end switch
                  
                } // if myGraph has @type

                //add properies to myNode for display detail
                for (var key in myGraph) {
                    if (myGraph.hasOwnProperty(key)) {
                        //console.log('prop key ', key);
                        myNode[key] = myGraph[key];
                    } // end hasOwnProperty 
                } // end for key
                
                // if node with appropriate @type was found
                // then boolean true so process and push node in nodes and add edges
                if (addNode) {
                    //console.log('addNode', addNode)
                    //console.log('myNode', myNode)
                    
                    if (objectPropInArray(nodes, 'id', myNode.id)) { 
                        console.log('myNode exists', myNode.id)
                        // need to make two nodes same
                        //var oldNode = nodes.node.id = myNode.id
                        //console.log('oldNode: ', oldNode)
                        
                        
                    } else if (myNode['id'] === '') {
                        // do not adx with blank id  
                        console.log('do not add blank myNode id', myNode['id'] )
                    } else {
                        console.log('not a blank id so add myNode', myNode['id'] )
                        nodes.push(myNode);
                    };



                    // //
                    // // MEGRAPH
                    // //
                    // // check for collections to process
                    if (showMeGraph) {
                        for (var key in myGraph) {
                          
                            var myElement = myGraph[key];
                            //console.log('myElement', myElement)

                            if (myElement instanceof Array) {       // check to find array to process
                                //console.log('myElement isArray is true')
                                //console.log('myElement', myElement)
                                
                               
                                var myItems = myElement;
                                for (var idx in myItems) {
                                    //console.log('myItems[idx]', myItems[idx])
                                    var myItem = myItems[idx] ;
                                    //console.log('myItem', myItem)
                                    
                                    
                                    var myNode = {};
                                    myNode.id = myItem['@id'];
                                    myNode.typeOf = myItem['@type'];
                                    // myNode.label = myGraph['label'];
                                    // myNode.title = graphId + ': ' + myGraph['description'] || '';
 
                                    myNode.label = myItem['rdfs:label'];
                                    myNode.title = myItem['@type'] + ': ' + myItem['rdfs:label'] || '';
 
                                    
                                    switch (myNode.typeOf) {
                                      
                                      case 'dbo:Organization':
                                          console.log("case 'dbo:Organization'", myNode.id)
                                        myNode.title = 'Organization:' + ' ' + myNode.label;
                                        myNode.group = 'Organization';
                                        break;
                                        
                                      case 'dbo:Company':
                                          console.log("case 'dbo:Company'", myNode.id)
                                        myNode.title = 'Company:' + ' ' + myNode.label;
                                        myNode.group = 'Company';
                                        break;
                                        
                                      case 'linkedin:Education':
                                        console.log("case 'linkedin:Education'", myNode.id)
                            
                                        myNode.title = 'Education:' + ' ' + myNode.label;
                                        myNode.group = 'Legislature';
                                        break;
                                      case 'org:Role':
                                        console.log("sub case 'org:Role'", myNode.id)
                                        
                                        myNode.title = 'Role:' + ' ' + myNode.label;
                                        myNode.group = 'Role';
                                        break;
                                      case 'org:hasRole':
                                        console.log("case 'org:hasRole'", myNode.id)
                                        
                                        myNode.title = 'Role:' + ' ' + myNode.label;
                                        myNode.group = 'Role';
                                        break;
                                      case 'org:hasPost':
                                        console.log("case 'org:hasPost'", myNode.id)
                                        
                                        myNode.title = 'Role:' + ' ' + myNode.label;
                                        myNode.group = 'Role';
                                        break;
                                      case 'skos:Concept':
                                        console.log("case 'skos:Concept'", myNode.id)
                                        myNode.group = 'Tag';
                                        break;
                                      case 'sioc:topic':
                                        console.log("case 'sioc:topic'", myNode.id)
                                        myNode.group = 'Tag';
                                        break;
                                      case 'based_near':
                                        console.log("case 'based_near'", myNode.id)
                                        myNode.group = 'Place';
                                        break;

                                      default:
                                          //console.log('case default ', myNode.typeOf, myNode.id)
                                          //addNode = false;
                                    } // end switch
                                  
                                  if (objectPropInArray(nodes, 'id', myNode.id)) { 
                                        console.log('sub myNode exists', myNode.id) 
                                  } else if (myNode['@id'] === '') {
                                        console.log('sub do not add blank @id', myNode['@id'] )
                                  } else {
                                        console.log('sub add myNode', myNode.id) 
                                      nodes.push(myNode);
                                  };
                                  
                                    //add edge to node
                                    var myEdge = {};
                                    myEdge.from = graphId   //id of current graph item
                                    myEdge.to = myNode.id;
                                    myEdge.arrows = { 'to' : 'true' };
                                    myEdge.label = myNode.typeOf;
                                    console.log('add myEdge', myEdge)
                                    edges.push(myEdge);
                                

                                    // if subelemet has next level array process edge
                                    for (var key in myItem) {
                                        var myE = myItem[key];
                                        //console.log('myE', myE)
                                        if (myE instanceof Array) {       // check to find array to process
                                            console.log('myE isArray is true')
                                            console.log('myE', myE)
                                            for (var i in myE) {
                                                var myP = myE[i];
                                                console.log('myP', myP)
                                                var myEdge = {};
                                                myEdge.from = myNode.id   //id of current graph item
                                                myEdge.to = myP;
                                                myEdge.arrows = { 'to' : 'true' };
                                                myEdge.label = ' < ' + key +' >';
                                                //console.log('edge: ', myEdge)
                                                edges.push(myEdge);
                                            } // end for idx
                                        }
                                    }
                                
                                } // end idx   
                        

                        
                        
                        
                            } // end if array
                        } // end key
                    } // end if show MeGraph
                    
                    
                    
                    
                    //
                    // PROPERTIES
                    // check for properties and collections to process
                    if (showProperties) {
                    
                        for (var key in myGraph) {
                            
                            if (myGraph.hasOwnProperty(key)) {
                                //console.log(key);
                          
                                //if (myGraph[key]) {
                                var myNode = {};
                                //myNode.id = graphId + '_' + myGraph[key];
                                myNode.id = '_' + myGraph[key];
                                myNode.typeOf = 'http://schema.org/' + key;
                                myNode.title = key + ': ' + myGraph[key];
                                myNode.label = myGraph[key];
                                myNode.group = 'property';
                                if (objectPropInArray(nodes, 'id', myNode.id)) { 
                                //console.log('myNode exists', myNode.id) 
                                } else if (myNode['@id'] === '') {
                                  // do not adx with blank @id  
                                  //console.log('do not add blank @id', myNode['@id'] )
                                } else {
                                  
                                  nodes.push(myNode);
                                  
                                  var myEdge = {};
                                  myEdge.from = graphId   //id of current graph item
                                  myEdge.to = myNode.id;
                                  myEdge.arrows = { 'to' : 'true' };
                                  myEdge.label = key;
                                  edges.push(myEdge);
                                };
                        
                            } // end hasOwnProperty 
                            
                        } // end for key
                        
                    } // end if show Properties  
                    
                    
                    
                    if (showRelationships) {
                        
                        
                        // // DO ALL OF THEM AS EDGES of foafiaf:
                        // for (var key in myGraph) {
                            
                        //     if (myGraph.hasOwnProperty(key)) {
                        //         //console.log(key);
                        //         //if (myGraph[key]) {
                        //         var myNode = {};
                        //         //myNode.id = graphId + '_' + myGraph[key];
                        //         myNode.id = myGraph[key] || null;

                        //         if (myNode.id) {
                        //             //if (myNode.id.indexOf("foafiaf:") == 0) {
                        //                 console.log('THINGY', myNode.id )
                        //             //}
                        //         }
                                
                        //         //var Things = Thingy.substring(Thingy.indexOf("foafiaf:") + 1);
                        //     } // end hasOwnProperty 
                            
                        // } // end for key      
                        
                        
                      // // Edges
                      // // process collections of nodes to make edges to
                      //console.log('myGraph', myGraph)
                      for (var key in myGraph) {

                        if (key === 'foafiaf:') {
                            var myParentId = myGraph[key];
                            //console.log('myParentId', myParentId)
                            var myEdge = {};
                            myEdge.from = graphId   //id of current graph item
                            myEdge.to = myParentId;
                            myEdge.arrows = { 'to' : 'true' };
                            myEdge.label = ' < ' + key +' >';
                            edges.push(myEdge);
                            
                        }
                        
                        //console.log('key', key)
                        if (key === 'broader') {
                            var myBroaderId = myGraph[key];
                            console.log('myBroaderId', myBroaderId)
                            var myEdge = {};
                            myEdge.from = graphId   //id of current graph item
                            myEdge.to = myBroaderId;
                            myEdge.arrows = { 'to' : 'true' };
                            myEdge.label = ' < ' + key +' >';
                            edges.push(myEdge);
                            
                        }

                        //console.log('key', key)
                        if (key === 'parentId') {
                            var myParentId = myGraph[key];
                            //console.log('myParentId', myParentId)
                            var myEdge = {};
                            myEdge.from = graphId   //id of current graph item
                            myEdge.to = myParentId;
                            myEdge.arrows = { 'to' : 'true' };
                            myEdge.label = ' < ' + key +' >';
                            edges.push(myEdge);
                            
                        }

                        var myElement = myGraph[key];


                        // if element is type of string and foafiaf entity
                        if ( (typeof myElement) === 'string') {
        					var strProp = myElement || ""
        					
        					if ( strProp.indexOf("foafiaf:") != -1 ) {
        						console.log("[property]", strProp)
        						
        						myEdge = {};
        						myEdge.arrows = {"to":"true"};
        						myEdge.from = graphId   //id of current graph item
        						myEdge.to = strProp;
        						myEdge.label = ' < ' + key +' >';
        						//console.log('edge: ', myEdge)
                                edges.push(myEdge);
        					}	
        				}
                        
                        // if element is an arrary
                        if (myElement instanceof Array) {
                          //console.log('isArray is true')

                          for (var idx in myElement) {
                          
                            var myProp = myElement[idx];
                            //console.log('myProp', myProp)
                            var myEdge = {};
                            myEdge.from = graphId   //id of current graph item
                            myEdge.to = myProp;
                            myEdge.arrows = { 'to' : 'true' };
                            myEdge.label = ' < ' + key +' >';
                            //console.log('edge: ', myEdge)
                            edges.push(myEdge);
                            
                          } // end for idx
                        
                        } // end if array
                        
                      } // end for 
                      
                    } // end if show Relationships
 
                } // end if addNode
                  
            } // end for objGraph.length

    //console.log(nodes_edges)
    
    if (cb) cb(null, nodes_edges);
}


exports.saveLinkedDataFile = function (filePath, content, format, cb) {
    var jsonld = require('jsonld');
    
    var folder = path.join(__dirname, '../../public/things/jsonld/.');
    var file = 'LinkedDataFile.jsonld';
    var filepath = path.join(folder, file);
    
  switch(format) {
    case 'compact':
        jsonld.compact(content, content, function(err, compacted) {
          if (err) {
                console.log('error', err);
                cb(err);
          }
          console.log('compacted', JSON.stringify(compacted, null, 2));
          content = compacted;
        });
        break;
    case 'flatten':
        jsonld.flatten(content, function(err, flattened) {
          if (err) {
                console.log('error', err);
                cb(err);
          }
          console.log('flattened', JSON.stringify(flattened))
          // all deep-level trees flattened to the top-level
          content = flattened;
        });
    case 'normalize':
        jsonld.normalize(content, { algorithm: 'URDNA2015', format: 'application/nquads' }, function(err, normalized) {
          if (err) {
                console.log('error', err);
                cb(err);
          }
          console.log('normalized', JSON.stringify(normalized))
          // normalized is a string that is a canonical representation of the document
          // that can be used for hashing, comparison, etc.
          content = normalized;
        });
        break;
    case 'toRDF':
        //jsonld.toRDF(content, {format: 'application/nquads'}, function(err, nquads) {
        jsonld.toRDF(content, '', function(err, nquads) {
          if (err) {
                console.log('error', err);
                cb(err);
          }
          console.log('nquads', JSON.stringify(nquads))
          // nquads is a string of nquads
          content = nquads;
        });
        break;
    case 'Turtle':
        
        break;
    default:
      content = jsonld;
  }
  
  console.log('filepath:', filepath)
  //putFileContent(filepath, JSON.stringify(content))
  //console.log('saveLinkedDataFile:', JSON.stringify(content))
  
  cb(null);
}


exports.files = function (archiveId, cb) {

    //var fldName = "../../public/";
    var folder = path.join(__dirname, '../../public/html/.');

    fs.readdir(folder, function (err, files) {
        if (err) {
            console.log('error', err);
            cb(err);
        }
        var twits = [];
        for (var i = 0; i < files.length; i++) {
            var file = files[i];
            
            var twit = {
                "id": file,
                "title": file
            };
            twits[i] = twit;
        }
        //console.log(twits);
        cb(null, twits);
    });

};




exports.getFileContent = function(filePath, cb) {
    
  try {
    
    fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
        
        if (err) {
            console.log('error', err);
            if (cb) cb(err);
		    return;
        }
        
        //console.log(data);
        if (cb) cb(null, data);
    });
    
  } catch(e) {
	  console.log(e);
  }
}


exports.putFileContent = function (content, filePath, cb) {
    
  try {
    
    fs.writeFile(filePath, content, {encoding: 'utf-8'}, function(err,data){
        
        if (err) {
            console.log('error', err);
            if (cb) cb(err);
		    return;
        }
        
        //console.log('putFileContent', filePath + ' <- ' + data);
        if (cb) cb(null, data);
    });
    
  } catch(e) {
	  console.log(e);
  }
}


function objectPropInArray(list, prop, val) {
  if (list.length > 0 ) {
    for (i in list) {
      if (list[i][prop] === val) {
        return true;
      }
    }
  }
  return false;  
}
