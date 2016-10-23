var utils = require('./utilities.js');
var models = require('../../models');
//var importexport = require('./importexport.js');
var fs = require('fs');
var path = require('path');
var jsonld = require('jsonld');
var json2csv = require('json2csv');

exports.importexport = function (id, cb) {
    console.log('importexport entry')
    
    try {

        var entityTypes = ['Place', 'Person', 'Organization', 'Role', 'Measure','Project','Strategy', 'Concept', 'ConceptScheme'];
        var entityTypes = ['Strategy'];
        
        for (var key in entityTypes) {
            var _type = entityTypes[key];
            console.log('type ', _type)
            
            exportType(_type, function (err, _csv) {
                    if (err) {
                        console.log('error exportType', err);
                        cb(err);
                    }
                    //console.log(_csv)
            });
            
            importType(_type, function (err, _jsonld) {
                    if (err) {
                        console.log('error importType', err);
                        cb(err);
                    }
                    //console.log(_jsonld)
            });
            

        }
        
    }
    catch(e) {
        console.log('catch error importexport', e);
        cb(e);
       //return 
    }
    
};
function importType(type, cb) {
    console.log('importType entry')
    
    try {

        _type = type;

        readCSVfile(_type, function (err, _csv) {
            if (err) {
                console.log('error', err);
                cb(err);
            }
            console.log('importing type ', _type)
            //console.log('_csv ', _csv);  
                
            CSVtoJSONLD(_csv, function (err, _jsonld) {
                if (err) {
                    console.log('error', err);
                    cb(err);
                }
                //console.log('_jsonld', _jsonld)
                readContextMasterfile(function (err, _context) {
                    if (err) {
                        console.log('error', err);
                        cb(err);
                    }
                    _context = JSON.parse(_context);
                    //console.log('_context', _context)
                    var ctx = _context["@context"] || null;
                    //console.log('ctx', ctx)
                    _jsonld['@context'] = ctx;
                    
                    jsonld.compact(_jsonld, ctx, function(err, compacted) {
                        if (err) {
                              console.log('error', err);
                              cb(err);
                        }
                        //console.log("compacted: ",  JSON.stringify(compacted))
                        _jsonld = compacted;
                        //console.log('_jsonld', JSON.stringify(_jsonld) )
                    
                        writeJSONLDfile(JSON.stringify(_jsonld), _type);
                        
                        //writeN3file(JSON.stringify(_jsonld), _type);
                        
                        //writeTTLfile(JSON.stringify(_jsonld), _type);
                        
                        //writeRDFfile(JSON.stringify(_jsonld), _type);
                        
                        
                        if (cb) cb(null, _jsonld);
                    
                    });
                    
                });
                
            });   
                
        });
 
    }
    catch(e) {
        console.log('catch error import', e);
        cb(e);
       //return 
    }
    
};
function exportType(type, cb) {
    console.log('exportType entry')
    
    try {

        _type = type;
        
        readJSONLDfile(_type, function (err, _jsonld) {
            if (err) {
                console.log('error', err);
                cb(err);
            }
            //console.log('_jsonld ', _jsonld);
            
            JSONLDtoCSV(_jsonld, function (err, _csv) {
                if (err) {
                    console.log('error', err);
                    cb(err);
                }
                console.log('exporting type ', _type)
                //console.log('_csv', _csv)
                writeCSVfile(_csv, _type);
                
                if (cb) cb(null, _csv);
            });
        });
        
    }
    catch(e) {
        console.log('catch error export', e);
        cb(e);
       //return 
    }
    
};
function readContextMasterfile(cb) {
    console.log('readJSONLDfile ')
    var folder = path.join(__dirname, '../../public/things/jsonld/.');
    var file = 'contextMaster.jsonld';
    var filepath = path.join(folder, file);
    console.log('filepath ', filepath);
    fs.readFile(filepath, {encoding: 'utf-8'}, function(err, data){
        if (err) throw err;
        //console.log('data ', data);
        if (cb) cb(null, data);
    });
};

function readJSONLDfile(_type, cb) {
    console.log('readJSONLDfile ')
    var folder = path.join(__dirname, '../../public/things/jsonld/.');
    var file = '_' + _type + '_' +  '.jsonld';
    var filepath = path.join(folder, file);
    console.log('filepath ', filepath);
    fs.readFile(filepath, {encoding: 'utf-8'}, function(err, data){
        if (err) throw err;
        //console.log('data ', data);
        if (cb) cb(null, data);
    });
};
function writeJSONLDfile(_JSONLD, _type) {
    console.log('writeJSONLDfile ')
    var folder = path.join(__dirname, '../../public/things/jsonld/.');
    var file = '_' + _type + '_' +  '.jsonld';
    var filepath = path.join(folder, file);
    console.log('filepath ', filepath);
    fs.writeFile(filepath, _JSONLD, function(err) {
        if (err) throw err;
        console.log('file saved ', file);
    });
};
function readCSVfile(_type, cb) {
    console.log('readCSVfile ')
    var folder = path.join(__dirname, '../../public/things/csv/.');
    var file = '_' + _type + '_' +  '.csv';
    var filepath = path.join(folder, file);
    console.log('filepath ', filepath);
    fs.readFile(filepath, {encoding: 'utf-8'}, function(err, data){
        if (err) throw err;
        //console.log('data ', data);
        if (cb) cb(null, data);
    });
};
function writeCSVfile(_CSV, _type) {
    console.log('writeCSVfile ')
    var folder = path.join(__dirname, '../../public/things/csv/.');
    var file = '' + _type + '' + '.csv';
    var filepath = path.join(folder, file);
    console.log('filepath ', filepath);
    fs.writeFile(filepath, _CSV, function(err) {
        if (err) throw err;
        console.log('file saved ', file);
    });
};

function writeTTLfile(_JSONLD, _type) {
    console.log('writeTTLfile ')
    jsonld.toRDF(_JSONLD, {format: 'application/nquads'}, function(err, _rdf) {
            if (err) {
                  console.log('error', err);
                  //cb(err);
            }
                        
            var folder = path.join(__dirname, '../../public/things/ttl/.');
            var file = '_' + _type + '_' +  '.ttl';
            var filepath = path.join(folder, file);
            console.log('filepath ', filepath);
            fs.writeFile(filepath, _rdf, function(err) {
                if (err) throw err;
                console.log('file saved ', file);
            });
            
    });
};
function writeN3file(_JSONLD, _type) {
    console.log('writeN3file ')
    jsonld.toRDF(_JSONLD, {format: 'application/nquads'}, function(err, _rdf) {
            if (err) {
                  console.log('error', err);
                  //cb(err);
            }
                        
            var folder = path.join(__dirname, '../../public/things/n3/.');
            var file = '_' + _type + '_' +  '.n3';
            var filepath = path.join(folder, file);
            console.log('filepath ', filepath);
            fs.writeFile(filepath, _rdf, function(err) {
                if (err) throw err;
                console.log('file saved ', file);
            });
            
    });
};
function writeRDFfile(_JSONLD, _type) {
    console.log('writeRDFfile ')
    jsonld.toRDF(_JSONLD, {format: 'application/xml+rdf'}, function(err, _rdf) {
            if (err) {
                  console.log('error', err);
                  //cb(err);
            }
                        
            var folder = path.join(__dirname, '../../public/things/rfd/.');
            var file = '_' + _type + '_' +  '.rfd';
            var filepath = path.join(folder, file);
            console.log('filepath ', filepath);
            fs.writeFile(filepath, _rdf, function(err) {
                if (err) throw err;
                console.log('file saved ', file);
            });
            
    });
};


function filterJSONLDbyType(_JSONLD, _type) {
    console.log('filterJSONLDbyType entry')
    var graph = _JSONLD['@graph'];
    var newgraph = [];
    
    for (var j=0; j<graph.length; j++) {
        var item = graph[j];
        var type = item['@type'];
        type = type.substring(type.indexOf(":") + 1);
        //console.log(type)
        if (type === _type) {
            newgraph.push(item)
        }
    }
    _JSONLD['@graph'] = newgraph;
    
    return _JSONLD;
};


function CSVtoJSONLD(_CSV, cb) {
  console.log('CSVtoJSONLD entry' )
  var json_ld = require('jsonld');

  var _JSON = {}
  var _JSONLD = {}
  
  try {
    
    var Converter = require("csvtojson").Converter;
    
    var converter = new Converter({});
    converter.fromString(_CSV, function (err, _JSON) {
        if (err) {
                console.log('error', err);
                cb(err);
          }
        //console.log('_JSON: ', _JSON); //here is your result jsonarray
        
        // now convert to jsonld
        JSONtoJSONLD(_JSON, function(err, _JSONLD) {
            if (err) {
                console.log('error', err);
                cb(err);
            }
            //console.log('_JSONLD: ', JSON.stringify(_JSONLD));
            if (cb) cb(null, _JSONLD);
        });
     
    });
    
  } catch(e) {
	  console.log(e);
  }
}

function JSONtoJSONLD(_JSON, cb) {
  console.log('JSONtoJSONLD entry' )
  var json_ld = require('jsonld');
  
  try {
     var objStr = '{   "@graph": ' + JSON.stringify(_JSON) + ' }'
     //var objStr = { "@graph": _JSON };
     var objLD = JSON.parse(objStr)
     //console.log("objLD: ",  JSON.stringify(objLD))
     
     jsonld.flatten(objLD, function(err, flattened) {
        if (err) {
              console.log('error', err);
              cb(err);
        }
        //console.log("flattened: ",  JSON.stringify(flattened))
        //if (cb) cb(null, flattened);
        
        jsonld.expand(flattened, function(err, expanded) {
            if (err) {
                  console.log('error', err);
                  cb(err);
            }
            //console.log("expanded: ",  JSON.stringify(expanded))
            // if (cb) cb(null, expanded);
            
            var context = {"schema": "http://schema.org/"};
            jsonld.compact(expanded, context, function(err, compacted) {
                if (err) {
                      console.log('error', err);
                      cb(err);
                }
                //console.log("compacted: ",  JSON.stringify(compacted))
                
                if (cb) cb(null, compacted);
            
            });
            
        });
        
     });
     
      
  } catch(e) {
        console.log('catch e error in JSONtoJSONLD ', e);
        cb(e);
       //return 
  }
};  

function JSONLDtoCSV(_JSONLD, cb) {
  console.log('JSONLDtoCSV entry' )
  var json_ld = require('jsonld');
  
  var _JSON = {};
  var _CSV = "";
  
  try {
     
//      JSONLDtoJSON(_JSONLD, function(err, _json) {
//            if (err) {
//                console.log('error', err);
//                cb(err);
//            }
            //console.log('_json', JSON.stringify(_json))
            
            _JSONLD = JSON.parse(_JSONLD) ;
        //console.log("_JSONLD: ",  JSON.stringify(_JSONLD))
        //console.log("_JSONLD: ",  _JSONLD)
        var graph = _JSONLD["@graph"] || null;
        //console.log("graph: ",  graph)
        if (graph) {
            _JSON = graph;
            console.log("graph: ",  graph)
        } else {
            if(_JSONLD instanceof Array){
                _JSON =  _JSONLD ; 
            } else {
                _JSON = "[ " + JSON.stringify(_JSONLD) + " ]" ;
                _JSON = JSON.parse(_JSON) ;
            }
        }
        //console.log("_JSON: ",  _JSON )
            
            
            // var _first = _json[0];
            // var graph = _first['@graph'] || null;
            // if (graph) {
            //     _JSON = graph;
            // } else {
            //     _JSON = _first; 
            // }
            
            var _Fields = getFields(_JSON);
            //console.log('_Fields ', _Fields)
            
            var _CSV = json2csv({ data: _JSON, fields: _Fields });
              
            //console.log('_CSV', _CSV)  
            
            if (cb) cb(null, _CSV);  
          
//        });


        function getFields(json) {
            var fields = [];
            console.log('json.length ', json.length)
            
            for (var j=0; j<json.length; j++) {
                var _item = json[j];
                //console.log('_item ', _item)
                for (var key in _item) {
                  //console.log('key ', key)
                  //console.log('key? ', fields.indexOf(key))
                  if ( fields.indexOf(key) === -1) {
                    fields.push(key);
                  }
                };
            }
            
            //console.log('fields ', fields)
            return fields
        };
  } catch(e) {
	  console.log(e);
  };
}

function JSONLDtoJSON(_JSONLD, cb) {
  console.log('JSONLDtoJSON' )
  var json_ld = require('jsonld');
  
  var _JSON = {};
  
  try {
     
        //console.log("_JSONLD: ",  JSON.stringify(_JSONLD))
        var graph = _JSONLD['@graph'] || null;
        if (graph) {
            _JSON = graph;
        } else {
            _JSON = _JSONLD; 
        }
        //console.log("_JSON: ",  JSON.stringify(_JSON))
        
        if (cb) cb(null, _JSON); 
        
    //  jsonld.flatten(_JSONLD, function(err, flattened) {
    //     if (err) {
    //           console.log('error', err);
    //           cb(err);
    //     }
        //console.log("flattened: ",  JSON.stringify(flattened))
        
        // var graph = flattened['@graph'] || null;
        // if (graph) {
        //     _JSON = graph;
        // } else {
        //     _JSON = flattened; 
        // }
        // console.log("_JSON: ",  JSON.stringify(_JSON))
        
        // if (cb) cb(null, _JSON);
          
    //  });
     
  } catch(e) {
        console.log('catch e error in JSONLDtoJSON ', e);
        cb(e);
       //return 
  }
}; 


// function JSONLDtototoCSV(_JSONLD, cb) {
//   console.log('JSONLDtoCSV entry' )
//   var json_ld = require('jsonld');
  
//   var _JSON = {};
//   var _CSV = "";
  
//   try {
     
//     // translate JSON-LD data into normalied triples
//     json_ld.normalize(_JSONLD, null, function(err, _normalized) {
//           if (err) {
//                 console.log('error', err);
//                 cb(err);
//           }
//           //console.log('_normalized', JSON.stringify(_normalized))
                
//           // submit normalized triples to group into types and ids
//           fillTypeArray(_normalized, function(err, myJSON) {
//             if (err) {
//                   console.log('error', err);
//                   cb(err);
//             }
//             myJSON = JSON.stringify(myJSON);
//             myJSON = JSON.parse(myJSON);
//             console.log('filled ', myJSON)
          
//               // save type arrays as csv files
//               var folder = path.join(__dirname, '../../public/things/csv/.');
        
//               var myFields = getFields(myJSON);
//               var csv = json2csv({ data: myJSON, fields: myFields });
              
              
//               var file = 'myJSON.csv';
//               var filepath = path.join(folder, file);
//               console.log('filepath ', filepath)
//               fs.writeFile(filepath, csv, function(err) {
//                 if (err) throw err;
//                 console.log('file saved ', file);
//               });
              
//               // var csv = json2csv({ data: myJSON.Person, fields: fields });
//               // var file1 = 'Person.csv';
//               // //var filepath = filepath.join(folder, file);
//               // fs.writeFile(file1, csv, function(err) {
//               //   if (err) throw err;
//               //   console.log('file saved ', file);
//               // }); 
              
//               // var csv = json2csv({ data: myJSON.Place, fields: fields });
//               // var file2 = 'Place.csv';
//               // //var filepath = filepath.join(folder, file);
//               // fs.writeFile(file2, csv, function(err) {
//               //   if (err) throw err;
//               //   console.log('file saved ', file);
//               // }); 
              
//               // var csv = json2csv({ data: myJSON.Organization, fields: fields });
//               // var file3 = 'Organization.csv';
//               // //var filepath = filepath.join(folder, file);
//               // fs.writeFile(file3, csv, function(err) {
//               //   if (err) throw err;
//               //   console.log('file saved ', file);
//               // });
          
          
//           });
//         });
    
    
//         function getFields(json) {
//             var fields = [];
//             console.log('json.length ', json.length)
//             var _item = json[0];
//             console.log('_item ', _item)
//             for (var key in _item) {
//               console.log('key ', key)
//               fields.push(key);
//             };
//             console.log('fields ', fields)
//             return fields
//         };
        
        
//         function fillTypeArray(normalized, cb) {
//             console.log('fillTypeArray')
//             //console.log('normalized', JSON.stringify(normalized))
            
//             //FROM [ {"@default":[{"subject":{"type":"IRI","value":"foafiaf:Chicago,_Illinois"},"predicate":{"type":"IRI","value":"dbo:country"},"object":{"type":"literal","datatype":"http://www.w3.org/2001/XMLSchema#string","value":"http://dbpedia.org/resource/United_States"}},{"subject":{"type":"IRI","value":"foafiaf:Chicago,_Illinois"},"predicate":{"type":"IRI","value":"dbo:name"},"object":{"type":"literal","datatype":"http://www.w3.org/2001/XMLSchema#string","value":"Chicago, Illinois"}},{"subject":{"type":"IRI","value":"foafiaf:Chicago,_Illinois"},"predicate":{"type":"IRI","value":"dbo:state"},"object":{"type":"literal","datatype":"http://www.w3.org/2001/XMLSchema#string","value":"http://dbpedia.org/resource/Illinois"}},{"subject":{"type":"IRI","value":"foafiaf:Chicago,_Illinois"},"predicate":{"type":"IRI","value":"http://www.w3.org/1999/02/22-rdf-syntax-ns#type"},"object":{"type":"IRI","value":"dbo:Place"}},{"subject":{"type":"IRI","value":"foafiaf:Chicago,_Illinois"},"predicate":{"type":"IRI","value":"owl:sameAs"},"object":{"type":"literal","datatype":"http://www.w3.org/2001/XMLSchema#string","value":"dbr:Chicago,_Illinois"}},{"subject":{"type":"IRI","value":"foafiaf:Chicago,_Illinois"},"predicate":{"type":"IRI","value":"rdf: type"},"object":{"type":"literal","datatype":"http://www.w3.org/2001/XMLSchema#string","value":"dbo:Location"}},{"subject":{"type":"IRI","value":"foafiaf:Chicago,_Illinois"},"predicate":{"type":"IRI","value":"rdf: type"},"object":{"type":"literal","datatype":"http://www.w3.org/2001/XMLSchema#string","value":"dbo:Place"}},{"subject":{"type":"IRI","value":"foafiaf:Chicago,_Illinois"},"predicate":{"type":"IRI","value":"rdf: type"},"object":{"type":"literal","datatype":"http://www.w3.org/2001/XMLSchema#string","value":"dbo:PopulatedPlace"}},{"subject":{"type":"IRI","value":"foafiaf:Chicago,_Illinois"},"predicate":{"type":"IRI","value":"rdf: type"},"object":{"type":"literal","datatype":"http://www.w3.org/2001/XMLSchema#string","value":"geo:SpatialThing"}},{"subject":{"type":"IRI","value":"foafiaf:Chicago,_Illinois"},"predicate":{"type":"IRI","value":"rdf: type"},"object":{"type":"literal","datatype":"http://www.w3.org/2001/XMLSchema#string","value":"owl:Thing"}},{"subject":{"type":"IRI","value":"foafiaf:Chicago,_Illinois"},"predicate":{"type":"IRI","value":"rdf: type"},"object":{"type":"literal","datatype":"http://www.w3.org/2001/XMLSchema#string","value":"schema:Place"}},{"subject":{"type":"IRI","value":"foafiaf:Chicago,_Illinois"},"predicate":{"type":"IRI","value":"rdfs:label"},"object":{"type":"literal","datatype":"http://www.w3.org/2001/XMLSchema#string","value":"Chicago, Illinois"}},{"subject":{"type":"IRI","value":"foafiaf:Chicago,_Illinois"},"predicate":{"type":"IRI","value":"sioc:has_container"},"object":{"type":"literal","datatype":"http://www.w3.org/2001/XMLSchema#string","value":"foafiaf:Illinois"}}]} ]
//             //TO {'@id':'foafiaf:Chicago,_Illinois','@type':'dbo:Place','rdf:type':'schema:Place','owl:sameAs':'dbr:Chicago,_Illinois','rdfs:label':'Chicago, Illinois','dbo:name':'Chicago, Illinois','dbo:state':'http://dbpedia.org/resource/Illinois','dbo:country':'http://dbpedia.org/resource/United_States','sioc:has_container':'foafiaf:Illinois'}      
                        
//             try {
              
//                 var _default = normalized['@default'];
  
//                 var listArray = []                                   // array of json  elements lists
//                 var listoflists = ''

//                 var currentId = null                              // track current @id val
//                 var elementList = null
//                 for (var j = 0; j < _default.length; j++) {
//                     var _item = _default[j];
//                     //console.log('_item: ', _item)

//                     var _subject = null
//                     var _predicate = null
//                     var _object = null

//                     for (var _key in _item) {

//                         //console.log('_key ', _key)
//                         var _val = _item[_key].value;
//                         //console.log('_val ', _val)
                        
//                         if (_key === 'subject') _subject = _val;
//                         //console.log('_subject ', _subject)
                        
//                         if (_key === 'predicate') _predicate = _val;
//                         //console.log('_predicate ', _predicate)
                        
//                         if (_key === 'object') _object = _val;
//                         //console.log('_object ', _object)
 
//                     }; // end of for each item in list

//                     // check of subject is different then last loop
//                     // if so push element to elements array and start new element and id
//                     if (currentId != _subject) {
                      
//                       var _id = '"@id": "' + _subject + '"' ;              // create new id element
                      
//                       // NEW LIST
//                       elementList = newElementList(elementList, _id)                   // create new element and add id

//                       currentId = _subject ;                              // keep track of id until new one is detected
                  
//                     }
                    
//                     // test for type predicate and add as @type element 
//                     if ( _predicate === "http://www.w3.org/1999/02/22-rdf-syntax-ns#type" ) {
 
//                         // create element of @type
//                         var _element = '"@type": ' + '"' + _object   + '"'  ;                    
                        
//                     } else {
                      
//                         // create element of predicate type
//                         var _element = '"' + _predicate + '": "' + _object  + '"' ;
                        
//                     }
                    
//                     //ADD TO LIST
//                     elementList = addElementToList(elementList, _element)                         // sdd element to list and clear element
                    
//                 }; // end of default items loop
//                 elementList = closeElementList(elementList)
                

//                 function newElementList(_elementList, id) {                           //creates new element with @id
                    
//                     // CLOSE OLD 
//                     if (_elementList) closeElementList(_elementList) ;    // close elements list

//                     // OPEN NEW
//                     var _elementList = null
//                     _elementList = '{ ' ;                                 // new elements list
//                     _elementList += id ;
//                     _elementList += " , " ;
//                     //console.log('new elementList: ', _elementList)

//                     return _elementList
//                 }
                                
//                 function addElementToList(_elementList, element) {
                  
//                     //console.log('element ', element)
//                     _elementList += element ;                              // add new element to element list
//                     _elementList += " , " ;                                // add comma to seperate elements
//                     //console.log('added to elementList: ', _elementList)

//                     return _elementList
//                 }
                
//                 function closeElementList (_elementList) {
                  
//                     if (_elementList) _elementList += " }" ;              // close elements list
//                     //console.log('closed elementList: ', _elementList )
//                     //console.log('elementList: ', JSON.stringify(_elementList) )
                    
//                     listoflists += _elementList + ','

//                     //var elementList = null
//                     return _elementList;
//                 }



//                 //console.log('listoflists: ', listoflists)
//                 listArray = '[ ' + listoflists + ' ]' ;
//                 jsonAry = JSON.stringify(listArray)
//                 jsonAry = jsonAry.replace(/,  }/g, "}") ;
//                 jsonAry = jsonAry.replace(/, ]/g, " ]") ;
//                 jsonAry = jsonAry.replace(/rdf: type/g, "rdf:type") ;
//                 listArray = JSON.parse(jsonAry)
//                 //console.log('listArray: ', listArray)
                
//                 if (cb) cb(null, listArray); 
            
//             } catch(e) {
//           	  console.log(e);
//             };
            
//         }; // end of function fillTypeArray


//   } catch(e) {
// 	  console.log(e);
//   };
// }

// function fillTypeArray(normalized, cb) {
//       console.log('fillTypeArray')
//       //console.log('normalized', JSON.stringify(normalized))
//       var _default = normalized['@default'];
//       // loop across objects in json
//       // create lists of property value for each id
//       var idArray = [];
//       var typeArray = [];
//       var subjectArray = [];
//       var predicateArray = [];
//       var cols = [];
//       var rows = [];
//       var recordArray = [];

//   var myPersonArray = [];
//   var myPlaceArray = [];
//   var myOrganizationArray = [];
//   var myConceptArray = [];
//   var myEventArray = [];
//   var myThingArray = [];
//   var myArrays = {
//     Person: myPersonArray ,
//     Place: myPlaceArray,
//     Organization: myOrganizationArray,
//     Concept: myConceptArray,
//     Event: myEventArray,
//     Thing: myThingArray,
//     records: recordArray
//   }
// //var subjectsStr = '{"subjects":[]}';
// //var subjectsArray = JSON.parse(subjectsStr);
      
//     // var subjectsArrays = [] ;
      
//       var objItems = [];
//       for (var j = 0; j < _default.length; j++) {
        
//         var _item = _default[j];
//         //console.log('_item: ', _item)
//         //
//         // Process normalize triples into type and id groups
//         //
//         var _subject = _item.subject.value;
//         var _predicate = _item.predicate.value;
//         var _object = _item.object.value;
//         //console.log('_subject: ', _subject)
//         //console.log('_predicate: ', _predicate)
//         //console.log('_object: ', _object)
        
//         // if predicate is type add id with type to array to use later
//         if (_predicate == "http://www.w3.org/1999/02/22-rdf-syntax-ns#type") {
//           var type = _object;
//           //console.log('@type: ', type);
//           type = type.substring(type.indexOf(":") + 1);
//           idArray[_subject] = type;
//           typeArray[type] = [];
//         }
        
//         subjectArray[_subject] = [];
//         predicateArray[_predicate] = [];
  
//         //var strSub = JSON.parse('{"' + _subject + '":[]' + '}') ;
//         //console.log(strSub)
//         // check to see if subjct exists else push to subjects array
//         // var subs = JSON.stringify(subjectsArray) ;
//         // console.log(subs)
//         // if ( subs.indexOf(JSON.stringify(strSub)) !== -1 ) {
//         //   console.log(true)
//         //   console.log(subs.indexOf(JSON.stringify(strSub)))
//         // } else {
//         //   console.log(false)
//         //   console.log(subs.indexOf(JSON.stringify(strSub)))
//         //   console.log(strSub)
//         //   subjectsArray['subjects'].push(strSub);
//         // }

//         var predicate = predicateArray[_predicate];
//         //record.push(_predicate)
        
//         // create object woth triple and store in array
//         var objItem = {
//           "subject": _subject,
//           "predicate": _predicate,
//           "object": _object
//         }

//         //console.log('objItem: ', objItem)
//         //objItems.push(objItem);
        
        
//       } // end _default loop
      
      
//       // console.log('idArray: ', idArray)
//       //console.log('typeArray: ', typeArray)
//       // console.log('subjectArray: ', subjectArray)
//       // console.log('predicateArray: ', predicateArray)
//       //console.log('objItems: ', objItems)
      
      
//       // loop to create subjects by type in predefine typeArray, result will be list of subjects (@id) for each @type 
//       for (var key in objItems) {
//         var _item = objItems[key];
//         var _subject = _item.subject;
//         var _predicate = _item.predicate;
//         var _object = _item.object;
        
//         if (_predicate == "http://www.w3.org/1999/02/22-rdf-syntax-ns#type") {
//           //console.log('_item ', _item)
//           var _type = _object.substring(_object.indexOf(":") + 1);
//           //console.log('_type ', _type)
//           var typeList = typeArray[_type];
//           var _obj = '{ ' + _subject + ': ' +'[]' + ' }' ;
//           typeList.push(_obj);
//           //console.log('typeList ', typeList)
//         }
        
//         //col = col 
//         var record = records[_subject];
//         record.push(_predicate)
          
//       }
//       //console.log('typeArray ', typeArray)
//       //console.log('records ', typeArray)
      
      
//       // add list of field values by ids
//       for (var key in objItems) {
//         var _item = objItems[key];
//         var _subject = _item.subject;
//         var _predicate = _item.predicate;
//         var _object = _item.object;

//       }
      
      
//       // 
//       for (var key in objItems) {
//         var _item = objItems[key];
//         var _subject = _item.subject;
//         var _predicate = _item.predicate;
//         var _object = _item.object;
        
//         // get type paramater for id from previously filled idArray
//         var _idType = idArray[_subject];
//         //console.log('_idType ', _idType)
//         var _typeItems = typeArray[_idType];
//         //console.log('_typeItems ', _typeItems)
//         var _idItems = _typeItems[_subject]
//         //console.log('_idItems ', _idItems)
 
 
//         //var obj = 
//         // push item into specific array by major types
//         if (_type == 'Person') {
//           //var obj = 
//           myArrays.Person.push(_item)   // changed myPersonArray to myArrays.Person
//         }
//         if (_type == 'Place') {
//           myPlaceArray.push(_item)
//         }
//         if (_type == 'Organization') {
//           myOrganizationArray.push(_item)
//         }
//         if (_type == 'Concept') {
//           myConceptArray.push(_item)
//         }
//         if (_type == 'Event') {
//           myEventArray.push(_item)
//         }
//         if (_type == 'Thing') {
//           myThingArray.push(_item)
//         }
//         //subjectArray[_subject].push(_item)
        
//       } // end for loop
//       //console.log(typeArray)
//       //console.log('myPersonArray: ', myPersonArray)
//       //console.log('myPlaceArray: ', myPlaceArray)
//       //console.log('myOrganizationArray: ', myOrganizationArray)
      
//       //console.log('subjectsArray: ', subjectsArray)
//       //console.log('objItems: ', objItems)
      
//       myJSON = typeArray || null
      
//       //
//       // test data for places json array
//       //
//       //myJSON = 
//       //console.log('myJSON: ', myJSON)
//       if (cb) cb(null, myJSON); 
      
// }



// function JSONLD2CSV(jsonld, cb) {
//   console.log('JSONLD2CSV' )
    
// // See also
// // https://www.w3.org/2013/csvw/wiki/CSV-LD
// // http://www.convertcsv.com/json-to-csv.htm
// //

// // example JSON 
// // {"Person":{"@id":"foafiaf:Jeffrey_A_Stewart","@type":"foaf:Person","rdfs:label":"Jeffrey Stewart","foaf:name":"Jeffrey Stewart","foaf:title":"","foaf:firstName":"Jeffrey","foaf:lastName":"Stewart","foaf:familyName":"Stewart","foaf:givenName":"Jeffrey","foaf:nick":"Jeff","foaf:gender":"M","foaf:age":"","foaf:mbox_sha1sum":"47af7e0b79ee24622a0543828a2eb51d7d75a407","foaf:mbox":"stewjeffrey@gmail.com","foaf:phone":"tel:8552783748","foaf:img":"","foaf:homepage":"","foaf:weblog":"","foaf:workplaceHomepage":"www.asteriusmedia.com","foaf:account":"https://www.linkedin.com/in/jeffreyastewart","foaf:depiction":"https://media.licdn.com/media/p/5/005/093/01e/0426a71.jpg","foaf:thumbnail":"https://media.licdn.com/media/p/5/005/093/01e/0426a71.jpg","birthPlace":"foafiafMoline,_Illinois","based_near":"foafiaf:Byron,_Illinois"},"Place":[{"@id":"foafiaf:Moline,_Illinois","@type":"dbo:Place","dbo:type":"dbo:PopulatedPlace","owl:sameAs":"dbr:Moline,_Illinois","rdfs:label":"Moline, Illinois","dbo:name":"Moline, Illinois","dbo:state":"http://dbpedia.org/resource/Illinois","dbo:country":"http://dbpedia.org/resource/United_States","sioc:has_container":"foafiaf:Illinois"},]}
// //
//   try {
     
//     var objGraph = jsonld['@graph'];

//     var typeArray = [];
//     // loop across object types in @graph
//     // create array of object types
//     for (var j = 0; j < objGraph.length; j++) {
//       var element = objGraph[j];
//       var type = element['@type'];
//       console.log('@type: ', type);
//       typeArray[type] = type;
//     }
//     console.log(typeArray)
    
//     var myCols = [];
//     var myRows = [];
//     // loop across objects in @graph
//     // create lists of columns namesand row data values
//     for (var j = 0; j < objGraph.length; j++) {
      
//       var myGraph = objGraph[j];
//       var graphType = myGraph['@type'];

//       // for each in graph process into fields and values for type

//       var myRow = [];
//       for (var key in myGraph) {
//         //console.log('key: ', key)
//         myCols[key] = key;
//         //console.log('val: ', myGraph[key])
        
//         // add key values fow a given row
//         //process based on type of val    TODO
//         myRow[key] = myGraph[key]
//       } // end for key
//       //console.log(myRow)
//       // add row to rows array
//       myRows.push(myRow);
      
//     }


//     //console.log('myCols: ', myCols)
//     //console.log('myRows: ', myRows)
    
//     // create list of headers from columns
//     var myFields = [];
//     for (var key in myCols) {
//         myFields.push(key);
//     } 
    
//     var headers = '';
//     var data = '';
//     var myCSV = '';
//     var numCol = myFields.length
//     //for (var i = 0; i < myFields.length; i++) {
//       //var field = myFields[i];
//       //console.log('field: ', field)
//   //headers += '"' + field + '"' ;
//   //if (i<numCol-1) headers += ',' ;
//         //}
         
//     // loop over myRows to extract data values for col names
//     for (var j = 0; j < myRows.length; j++) {
//       var row = myRows[j];
//       for (var i = 0; i < myFields.length; i++) {
//         var field = myFields[i];
//         var item = row[field] ;
//         //console.log('item', item)
//         data += '"' + item + '"' ;
//         if (i<numCol-1) data += ',' ;
//       }
//       data += + '\r\n';
//     }
//     //
//     console.log('data ', data)
    

    
//     //console.log(headers)
//     myCSV  = headers + '\r\n';
//     //console.log(data)
//     myCSV += myCSV + data + '\r\n';

//     //console.log(myCSV)
    
    

    
    
//     if (cb) cb(null, myCSV);
      
//   } catch(e) {
// 	  console.log(e);
//   }
// };
// exports.JSONLD2CSV = JSONLD2CSV ;
  
exports.convertCSV2Concepts = function (filepath, cb) {
  console.log('convertCSV2Concepts', filepath)
  var myJSONLD = {} ;
    
  try {
      
    //Converter Class 
    var Converter = require("csvtojson").Converter;
    var converter = new Converter({});
  
    //read from file into converter pipe
    require("fs").createReadStream(filepath).pipe(converter);
  
    //end_parsed will be emitted once parsing finished 
    converter.on("end_parsed", function (jsonArray) {
        //console.log('jsonArray: ', jsonArray); //here is your result jsonarray 
        var myJSONLD = { };
        
        var conceptSchemeId = "topics:Competencies" ;
        var myConceptScheme = {
          "@id": conceptSchemeId,
          "@type": "skos:ConceptScheme",
          "HasTopConcept": [
            "Analytic_Skills",
            "Delivery_Skills",
            "Leadership_Skills",
            "Technology_Skills",
            "LinkedIn_Skills"
          ]
        };
        
        var myGraphs = [];
        myGraphs.push(myConceptScheme);
    
        for (var j = 0; j < jsonArray.length; j++) {
            var myRow = jsonArray[j];
            console.log(j, myRow)
            
            var myArea = myRow['Area'] || '' ; 
            var myDimension = myRow['Dimension'] || '' ; 
            var my3val = myRow['Category'] || '' ;   console.log('my3val', my3val)
            
            var myConcept = {
              "@id": "",
              "@type": "skos:Concept",
              "rdfs:label": "",
              "skos:inScheme": conceptSchemeId,
              "skos:broader": [],
              "skos:narrower": [],
              "skos:prefLabel": ""
            }
            var my1stLevel = myConcept ;
            var my2ndLevel = myConcept ;
            var my3rdLevel = myConcept ;
            

            var my1Id = myArea.replace(/ /g,"_") ;
            
            if ( objectPropInArray( myGraphs, '@id', my1Id ) ) {  // check if @id has already been added to graph
                console.log('// yes already added ', my1Id)
            } else {
                console.log('// not added yet ', my1Id)
                my1stLevel['@id'] = my1Id ;
                my1stLevel['rdfs:label'] = myArea ;
                my1stLevel['skos:prefLabel'] = myArea ;
                myGraphs.push(my1stLevel);
            };
            
            
            var my2Id = my1Id + '_' + myDimension.replace(/ /g,"_") ;
            
            if ( objectPropInArray( myGraphs, '@id', my2Id ) ) { // check if @id has already been added to graph
                console.log('// yes already added ', my2Id)
            } else {
                console.log('// not added yet ', my2Id)
                my2ndLevel['@id'] = my2Id ;
                my2ndLevel['rdfs:label'] = myDimension ;
                my2ndLevel['skos:prefLabel'] = myDimension ;
                my2ndLevel['skos:broader'] = [ my1Id ] ;
                // my2ndLevel['skos:narrower'] [ '' ],
                myGraphs.push(my2ndLevel);
            };
            
            
            var my3Id = my2Id + '_' + my3val.replace(/ /g,"_") ;
            
            if ( objectPropInArray( myGraphs, '@id', my3Id ) ) { // check if @id has already been added to graph
                console.log('// yes already added ', my3Id)
            } else {
                console.log('// not added yet ', my3Id)
                my3rdLevel['@id'] = my3Id ;
                my3rdLevel['rdfs:label'] = my3val ;
                my3rdLevel['skos:prefLabel'] = my3val ;
                my3rdLevel['skos:broader'] = [ my2Id ] ;
                // my2ndLevel['skos:narrower'] [ '' ],
                myGraphs.push(my3rdLevel);
            };
            
            
        
        }; // end for
        
        var myJSONLD = { '@graph': [] } ;
        myJSONLD['@graph'] = myGraphs ;
        
        if (cb) cb(null, myJSONLD);
        
    }); //end converter.on
    
  } catch(e) {
	  console.log(e);
  }
}



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
