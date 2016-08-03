var models = require('../../models');
var Tags = models.Tags;
var Tag = models.Tag;
var Entity = models.Entity;
var Person = models.Person;
var Group = models.Group;
var fs = require('fs');
var path = require('path');
var jsonld = require('jsonld');




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
                cb(null, myJSONLD);
            }
    } // end cursorTaskComplete 
    
    
    function doStuff(cb) {
        
        //loop over array of JSONLD objects
        for (var index = 0; index < arrayJSONLD.length; ++index) {
            var content = arrayJSONLD[index];
            
            var jsonld = content;
            //console.log('jsonld: ', jsonld);
    
            var objId = jsonld['@id'];
            //console.log('objId', objId);
            myID = objId;
           
            
            var objGraph = jsonld['@graph'];
            //console.log('objGraph', objGraph)

            for (var g = 0; g < objGraph.length; ++g) {
                var objItem = objGraph[g];
                //console.log(objItem)
                 
                if ( objectPropInArray( myGraph, '@id', objItem['@id'] ) ) { 
                    
                    //console.log('myGraph: ', myGraph)
                    //
                    // if item alread exists, need to merge objects
                    //
                    var newId = objItem['@id']
                    var newItem = objItem;
                    console.log(' Item exists with new ID', newId)
                    
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
                    
                    console.log('  Looping though properties of new and old items')
                    for(var key in listProps) { 

                        var myProp = listProps[key];
                        console.log('  ', myProp)
                        
                        // get old and new property value objects
                        var oldObj = oldItem[myProp] || null;
                        var newObj = newItem[myProp] || null;
                        //console.log('  oldObj ', oldObj)
                        //console.log('  newObj ', newObj)
                        
                        // compare old and new propery value objects
                        if (oldObj == newObj) {
                            // if the obejcts are the same use old object in merge
                            console.log('   property value same in old and new ')
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
                                console.log('   property exists in old and new ')
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
                                console.log('   property exists in old ')
                                mergeItem[myProp] = oldItem[myProp]; 

                              
                            } else if (inNew) {
                                // if objectsd are different and new exists use it
                                console.log('   property exists in new ')
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
                    console.log('merged objItem', mergeItem['@id'])
                    
                } else {
                    // if item does not current exist in graph, add item
                    console.log('new objItem', objItem['@id'])
                    myGraph.push(objItem)
                };
            };
            
            
            var objContext = jsonld['@context'];
            //console.log('objContext', objContext.length)
            
            // NEED TO ADD MERGE LOGIC !!
            
            for (var key in objContext) {
                if (objContext.hasOwnProperty(key)) {
                    var objElement = {};
                    //console.log(key);
                    objElement[key] = objContext[key] ;
                    //console.log(objElement)
                    myContext.push(objElement)
                        
                } // end hasOwnProperty 
            } // end for key

     
     
     
     
            // var stringConstructor = "test".constructor;
            // var arrayConstructor = [].constructor;
            // var objectConstructor = {}.constructor;
    
            // console.log(whatIsIt(jsonld))
            // function whatIsIt(object) {
            //     if (object === null) {
            //         return "null";
            //     }
            //     else if (object === undefined) {
            //         return "undefined";
            //     }
            //     else if (object.constructor === stringConstructor) {
            //         return "String";
            //     }
            //     else if (object.constructor === arrayConstructor) {
            //         return "Array";
            //     }
            //     else if (object.constructor === objectConstructor) {
            //         return "Object";
            //     }
            //     else {
            //         return "don't know";
            //     }
            // };
            
            //...when async operation is complete call
            cursorTaskComplete() 
        };
 
    }; 
    
    //call do stuff
    doStuff(cb)
    
    //if (cb) cb(null, myJSONLD);
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
    var showTags = true;
    var showLocations = true;
    
    var edges = [];
    var nodes = [];
    var manifest = {}
    var nodes_edges = { 
        'nodes' : nodes,
        'edges' : edges,
    };
          
    var IMGDIR = '../../img/';
    
    var jsonld = objContent
    var objId = jsonld['@id'];
    //console.log('objId', objId);
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
                          myNode.title = myGraph['@type'] + ' ' + graphId + ' ' + myGraph['foaf:name'];
                          myNode.name = myGraph['foaf:name'] || null;
                          myNode.group = 'person';
                          addNode = true;
                          break;
                       case 'foaf:Group':
                         console.log("case 'foaf:Group'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['name'];
                          myNode.title = myGraph['@type'] + ' ' + graphId + ' ' + myGraph['foaf:name'];
                          myNode.name = myGraph['name'] || null;
                          myNode.group = 'group';
                          addNode = true;
                          break;
                      case 'foaf:Organization':
                        console.log("case 'foaf:Organization'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['rdfs:label'];
                          myNode.title = myGraph['@type'] + ' ' + graphId + ' ' + myGraph['rdfs:label'];
                          myNode.name = myGraph['foaf:name'] || null;
                          var dbotype = myGraph['dbo:type'] || null;
                          console.log('dbotype', dbotype )
                          if ( dbotype === 'dbo:City' ) {
                              myNode.group = 'orgcity';
                          } else if ( dbotype === 'dbo:Village' ) {
                              myNode.group = 'orgvillage';
                          } else if ( dbotype === 'dbo:Company' ) {
                              myNode.group = 'industry';
                          } else if ( dbotype === 'dbo:GovernmentAgency' ) {
                              myNode.group = 'orggov';
                          } else if ( dbotype === 'dbo:Municipality' ) {
                              myNode.group = 'map';
                          } else if ( dbotype === 'dbo:Legislature' ) {
                              myNode.group = 'orglegi';
                          } else if ( dbotype === 'dbo:Non-ProfitOrganisation' ) {
                              myNode.group = 'orgnonprofit';
                          } else if ( dbotype === 'dbo:ReligiousOrganisation' ) {
                              myNode.group = 'orgfaith';
                          } else {
                              myNode.group = 'organization';
                          }
                            
                          //myNode.group = 'group';
                          addNode = true;
                          break;
                      case 'org:Role':
                        console.log("case 'org:Role'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['rdfs:label'];
                          myNode.title = myGraph['@type'] + ' ' + graphId + ' ' + myGraph['rdfs:label'];
                          myNode.name = myGraph['foaf:topic'] || null;
                          myNode.group = 'role';
                          addNode = true;
                          break;
                      case 'dbo:Place':
                         console.log("case 'dbo: Place'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['rdfs:label'];
                          myNode.title = myGraph['@type'] + ' ' + graphId + ' ' + myGraph['rdfs:label'];
                          myNode.name = myGraph['name'] || null;
                          myNode.group = 'globe';
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
                          myNode.group = 'projects';
                          addNode = true;
                          break;
                       case 'pmbok:Project':
                         console.log("case 'pmbok:Project'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['shortname'];
                          myNode.title = myGraph['@type'] + ': ' + myGraph['project'] || '';
                          myNode.name = myGraph['description'] || null;
                          myNode.group = 'project';
                          addNode = true;
                          break;

                       case 'foafiaf:initiative':
                         console.log("case 'foafiaf:initiative'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['@id'];
                          myNode.title = myGraph['@type'] + ' ' + myGraph['@id'];
                          myNode.name = myGraph['description'] || null;
                          myNode.group = 'cube';
                          addNode = true;
                          break;
                       case 'foafiaf:objective':
                         console.log("case 'foafiaf:objective'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['label'];
                          myNode.title = graphId + ': ' + myGraph['description'] || '';
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
                          myNode.title = myGraph['@type'] + ' ' + graphId + ' ' + myGraph['rdfs:label'] ;
                          myNode.group = 'cubes';
                          addNode = true;
                         break;
                       case 'skos:Concept':
                         console.log("case 'skos:Concept'", graphId)
                          myNode.id = graphId;
                          myNode.label = myGraph['foaf:topic'] || null;
                          myNode.title = myGraph['@type'] + ' ' + graphId + ' ' + myGraph['foaf:topic'];
                          //myNode.name = = myGraph['rdfs:label'] || null;
                          myNode.group = 'tag';
                          addNode = true;
                         break;     
                         
                       case 'foaf:topic':
                          console.log("case 'foaf:topic'", graphId)
                        if (showTags) {
                          myNode.id = graphId;
                          myNode.label = myGraph['rdfs:label'] ;
                          myNode.title = myGraph['@type'] + ' ' + graphId + ' ' + myGraph['rdfs:label']  ;
                          myNode.group = 'tags';
                          addNode = true;
                        }
                          break;
                       case 'sioc:topic':
                          console.log("case 'sioc:topic'", graphId)
                        if (showTags) {
                          myNode.id = graphId;
                          myNode.label = myGraph['label'] || '';
                          myNode.title = myGraph['name'] || '';
                          myNode.group = 'tag';
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
                       case '':
                          console.log('case: ', graphId)
                          myNode.id = graphId;
                          myNode.type = myGraph['@type'] || '';
                          if (myNode.type.length > 0) {
                              myNode.type = myNode.type[0] + ' more...';
                          }
                          myNode.name = myGraph['name'] || null;
                          if (myNode.name.length > 0) {
                              myNode.name = myNode.name[0] + ' more...';
                          }
                          myNode.label = myGraph['label'] || null;
                          if (myNode.label.length > 0) {
                              myNode.label = myNode.label[0] + ' more...';
                          }
                          myNode.title = myGraph['title'] || null;
                          if (myNode.title.length > 0) {
                              myNode.title = myNode.title[0] + ' more...';
                          }
                          addNode = true;
                        default:
                          console.log('default case ', graphId)
                          addNode = false;
                  } // end switch
                  
                } // if myGraph has @type


                // if node with appropriate @type was found
                // then boolean true so process and push node in nodes and add edges
                if (addNode) {
                    console.log('addNode', addNode)
                    console.log('myNode', myNode)
                    
                    if (objectPropInArray(nodes, 'id', myNode.id)) { 
                        console.log('myNode exists', myNode.id)
                        var oldNode = nodes.node.id = myNode.id
                        console.log('oldNode: ', oldNode)
                        
                        
                    } else if (myNode['id'] === '') {
                        // do not adx with blank id  
                        console.log('do not add blank id', myNode['id'] )
                    } else {
                        //console.log('not a blank id', myNode['id'] )
                        nodes.push(myNode);
                    };

                    // check for properties and collections to process
                    if (showProperties) {
                      // // if key 'name' exists
                      // // if key 'title' exists
                      // // if key 'motto' exists
                      // // if key 'label' exists
                      // // if key 'enddate' exists
                      // // if key 'status' exists
                      // // if key 'language' exists
                      // // if key 'birthDate' exists
                      // // if key 'birthYear' exists
                      // // if key 'depiction' exists
                      // // if key 'homepage' exists
                      // // if key 'workplaceHomepage' exists
                      // // if key 'family_name' exists
                      // // if key 'givenname' exists
                      // // if key 'nick' exists
                      // // if key 'phone' exists
                      // // if key 'email' exists
                      // // if key 'mbox_sha1sum' exists
                      // // if key 'state' exists
                      // // if key 'region' exists
                      // // if key 'geometry' exists
                      // // if key 'geo:lat' exists
                      // var key = 'geo:lat';
                      // // if key 'geo:long' exists
                      // var key = 'geo:long';
                      for (var key in myGraph) {
                        if (myGraph.hasOwnProperty(key)) {
                        
                          //console.log(key);
                          //if (myGraph[key]) {
                          var myNode = {};
                          //myNode.id = graphId + '_' + myGraph[key];
                          myNode.id = '_' + myGraph[key];
                          myNode.typeOf = 'http://schema.org/' + key;
                          myNode.title = key + ': ' + myGraph[key];
                          //myNode.label = myGraph[key];
                          myNode.group = 'property';
                          if (objectPropInArray(nodes, 'id', myNode.id)) { 
                            //console.log('myNode exists', myNode.id) 
                          } else if (myNode['@id'] === '') {
                              // do not adx with blank @id  
                              console.log('do not add blank @id', myNode['@id'] )
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
                      // // Edges
                      // // process collections of nodes to make edges to
                      //   // // if key 'knows' exists loop over items    
                      //   // // if key 'member' exists loop over items
                      //   // // if key 'interest' exists loop over items
                      //   // // if key 'skill' exists loop over items
                      //   // // if key 'employedBy' exists loop over items
                      //   // // if key 'employerOf' exists loop over items
                      //   // // if key 'owner' exists loop over items
                      //   // // if key 'stakeholder' exists loop over items
                      //   // // if key 'container_of' exists loop over items
                      //   // // if key 'has_container' exists loop over items
                      //   // // if key 'based_near' exists loop over items
                      //   // // if key 'birthPlace' exists loop over items
                      //console.log('myGraph', myGraph)
                      for (var key in myGraph) {
                        
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
                        //console.log('myElement', myElement)

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




// taken from arcmytwits
exports.tags = function (searchFor, cb) {

    var twitTags = [];
    var hashTags = {};

    var folder = path.join(__dirname, '../../public/json/.');

    var bConcept = true;
    var bEntity = true;
    var filter = null;
    
    if (searchFor != '') {
        filter = searchFor;
        if (searchFor == 'entity') {
            bConcept = false
            filter = null
        } 
        if (searchFor == 'concept') {
            bEntity = false
            filter = null
        }
    };
    
    console.log('filter:', filter)
    console.log('bConcept:', bConcept)
    console.log('bEntity:', bEntity)
    
    fs.readdir(folder, function (err, files) {
        if (err) {
            console.log('error', err);
            cb(err);
        }


        var cursorTasks = files.length; // This will decrement for each file then callback
        function cursorTaskComplete() {
            cursorTasks--;
            //console.log(cursorTasks)
            if (cursorTasks <= 0) {

                //twitTags.sort(function(obj1, obj2) {
                	// Ascending: first ocj less than the previous
                //	return obj1.subject - obj2.subject;
                //});
                // Sort twits   https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
                twitTags.sort(function (a, b) {
                  if (a.subject > b.subject) {
                    return 1;
                  }
                  if (a.subject < b.subject) {
                    return -1;
                  }
                  // a must be equal to b
                  return 0;
                });
                //console.log(twitTags);
                
                for (var i = 0; i < twitTags.length; i++) {
                    var tag = twitTags[i];
                    var hashed = hashTags[tag.guid] || null;
                    if (hashed) { 
                        tag.count = parseInt(hashed.count) + parseInt(tag.count);
                    }
                    hashTags[tag.guid] = tag;
                }
                //console.log(hashTags);
                twitTags = [];
                for (var key in hashTags) {
                    //console.log(hashTags[key])
                    twitTags.push(hashTags[key]);
                }
                
                cb(null, twitTags);
            }
        } // end cursorTaskComplete


        /*
        * Process files
        */
        for (var i = 0; i < files.length; i++) {

            //console.log(i)
            var file = files[i];
            var filepath = path.join(folder, file);

            getFileContent(filepath, function (err, fileContent) {
                if (err) {
                    console.log('error', err);
                    cb(err);
                }

                var objContent = JSON.parse(fileContent);

                if (objContent != undefined) {

                    var objId = objContent.id;
                    var objTitle = objContent.title;
                    if (objContent.concepts) { var objConcepts = objContent.concepts.concepts };
                    if (objContent.entities) { var objEntities = objContent.entities.entities };
                    if (objContent.taxonomies) { var objTaxonomies = objContent.taxonomies.taxonomy };
                }
               

                /*
                * Process Concepts
                */
                
                if ( (bConcept) && (objConcepts != undefined) ) {

                    for (var j = 0; j < objConcepts.length; j++) {

                        var myConcept = new Concept();
                        myConcept = objConcepts[j];

                        if (myConcept != undefined) {

                            //console.log('myConcept:', myConcept)
                            
                            var subject = myConcept.text;
                            var typeHierarchy = '';
                            if (myConcept.knowledgeGraph) { typeHierarchy == myConcept.knowledgeGraph.typeHierarchy };
                            var guid = 'c' + j ;
                            if (typeHierarchy != '') { guid = typeHierarchy; } else if (subject != '') { guid = subject; } ;
                            var count = 1;
                            //var contained = '<a href="/twitearchive/list/' + objId + '" title="' + '">' + objTitle + '</>';
                            var link = '/twitarchives/list/' + subject
                            var refs = []
                            refs.push(myConcept.freebase);
                            refs.push(myConcept.dbpedia);
                            
                            var myTag = new Tag({
                                kind: 'rdf/tag',
                                references: refs,
                                link: link,
                                count: count,
                                
                                subject: subject,
                                predicate: ' is a ',
                                object: 'Concept: ' + guid,
                                
                                guid: guid
                            });
                            //console.log(myTag);
                            
                            //twitTags[myTag.guid] = myTag;
                            if ( (myConcept.relevance < 0.5) || (myConcept.text == 'Quantity') )  {
                                    //console.log('myConcept has:', myConcept.relevance, myConcept.text)
                            } else {
                                
                                if (filter) {
                                    if ( myTag.subject.search(filter) > -1 ) {
                                        //console.log('filter:', filter)
                                        twitTags.push(myTag);
                                    } else {
                                        //console.log('subject', subject)
                                    };
                                } else {
                                    twitTags.push(myTag);
                                };
                                
                            }


                        } //end if
                    } // end for
                } //end if


                /*
                * Process Entities
                */
                if ( ( bEntity) && (objEntities != undefined) ) {

                    for (var k = 0; k < objEntities.length; k++) {

                        var myEntity = new Entity();
                        myEntity = objEntities[k];

                        if (myEntity != undefined) {

                            //console.log('myEntity:',myEntity)
                            
                            var subject = myEntity.text || '';
                            var typeHierarchy = '';
                            if (myEntity.knowledgeGraph) { typeHierarchy = myEntity.knowledgeGraph.typeHierarchy };

                            var guid = 'e' + k ;
                            if (typeHierarchy != '') { guid = typeHierarchy; } else if (subject != '') { guid = subject; } ;
                                
                            var count = myEntity.count || 1;
                            count = 1   //set to one so count is of files entity found in
                            //var contained = '<a href="/twitearchive/list/' + objId + '" title="' + '">' + objTitle + '</>';
                            var link = '/twitarchives/list/' + subject
                            var refs = []
                            if (myEntity.freebase) { refs.push(myEntity.freebase) };
                            refs.push(myEntity.dbpedia);
                            
                            var myTag = new Tag({
                                kind: 'rdf/tag',
                                references: refs,
                                link: link,
                                count: count,
                                
                                subject: subject,
                                predicate: ' is a ',
                                object: 'Entity: ' + myEntity.type,
                                
                                guid: guid
                            });
                            //console.log('myTag:', myTag);
                            //if (twitTags[myTag.guid]) myTag.count + twitTags[myTag.guid].count
                            //console.log(myTag.contained);
                            
                            if ( (myEntity.relevance < 0.33) || (myEntity.type == 'Quantity') )  {
                                    //console.log('entity has:', myEntity.relevance, myEntity.type)
                            } else {
                                
                                if (filter) {
                                    if ( myTag.subject.search(filter) > -1 ) {
                                        //console.log('filter:', filter)
                                        twitTags.push(myTag);
                                    } else {
                                        //console.log('subject', subject)
                                    };
                                } else {
                                    twitTags.push(myTag);
                                };
                                
                            }
  
                        } //end if
                    } //end for
                } //end if

                //...when async operation is complete call
                //console.log(twitTags.length)
                cursorTaskComplete()
            });

        }

    });

};
