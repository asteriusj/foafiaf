"use strict";
const colours = ["#FF0000","#FFFF00","#008000","#0000FF","#800080"]
let wheelRoot = [
//   {
//     "label": "SEGMENTS",
//     "id": "foafiaf:Segments",
//     "dbotype": "foafiaf:Segment",
//     "name": "SEGMENTS",
//     "description": "",
//     "children": [
//       {
//         "label": "SPOKES",
//         "id": "foafiaf:Spokes",
//         "dbotype": "foafiaf:Spoke",
//         "name": "SPOKES",
//         "description": "",
//         "children": [
//          {
//             "label": "2017 Milestones",
//             "id": "foafiaf:Measures_2017",
//             "dbotype": "foafiaf:Measure",
//             "name": "2017 ",
//             "description": "",
//             "children": [
//               {
//                 "lqbel": "2018 Milestones",
//                 "id": "foafiaf:Measures_2018",
//                 "dbotype": "foafiaf:Measure",
//                 "name": "2018",
//                 "description": "",
//                 "children": [
//                   {
//                     "label": "2019 Milestones",
//                     "id": "foafiaf:Measures_2019",
//                     "dbotype": "foafiaf:Measure",
//                     "name": "2019",
//                     "description": "",
//                     "children": [
//                       {
//                         "label": "2020 Milestones",
//                         "id": "foafiaf:Measures_2020",
//                         "dbotype": "foafiaf:Measure",
//                         "name": "2020",
//                         "description": "",
//                         "children": [
                          
//                         ]
//                       } 
//                     ]
//                   }
//                 ]
//               }
//             ]
//           }
//         ]
//       }
//     ]
//   }
]
    
function getWheelJS(cb) {
	console.log('getWheelJS')
	let wheelJS = wheelRoot;
	//console.log(wheelJS)
	console.log(JSON.stringify(wheelJS))
	if (cb) cb(null, wheelJS)
	//return wheelJS
}

function saveProjectWheel(wheel) {
    console.log('saveProjectWheel')
    
    let _json = JSON.stringify(wheel)
    //console.log(_json)
}
    
Array.prototype.insert = function (index, item) {
  this.splice(index, 0, item);
};



function dataReceived(data, cb) {
	console.log('dataReceived')

	// Get node data from graph
	const graph = data['@graph'];
	
    //let wheelRoot = getWheelJS();
    let wheelRoot = [];                 // blank out wheelroot placeholders
    console.log('wheelRoot')
    //
    // Do Append Segments to tree 
    //
    let dsg = doSegments(graph, function(err, results) {
        if (err) {
            console.log('doSements error', err);
            cb(err);
        } 
        console.log('doSements', results)
    
        
        
        //
        // Do append Spokes to tree 
        //
        let dsp = doSpokes(graph, function(err, results) {
            if (err) {
                console.log('doSpokes error', err);
                cb(err);
            } 
            console.log('doSpokes', results)
       
            
            
            //
            // Do append Measures2017 to tree 
            //
            let dm2017 = doMeasures2017(graph, function(err, results) {
                if (err) {
                    console.log('doMeasures2017 error', err);
                    cb(err);
                } 
                console.log('doMeasures2017', results)
       
       
       
                //
                // Do append Measures2018 to tree 
                //
                let dm2018 = doMeasures2018(graph, function(err, results) {
                if (err) {
                        console.log('doMeasures2018 error', err);
                        cb(err);
                    } 
                    console.log('doMeasures2018', results)
       
       
       
                    //
                    // Do append Measures2019 to tree 
                    //
                    let dm2019 = doMeasures2019(graph, function(err, results) {
                    if (err) {
                            console.log('doMeasures2019 error', err);
                            cb(err);
                        } 
                        console.log('doMeasures2019', results)
           
           
             
                    }); //end doMeasures2018 varible
       
                }); //end doMeasures2018 varible
                
            }); //end doMeasures2017 varible
            
        }); //end doSements varible
        
    }); //end doSements varible
 
    //console.log(JSON.stringify(wheelRoot))
	if (cb) cb(wheelRoot)
	//return wheelRoot
}; //end function dataReceived



function doSegments(graph, cb) {
    console.log('doSements')
    // foafiaf:Segments
    //
    // INSERT SEGEMNTS as children of root
    console.log('// INSERT Segments next to wheelRoot')
    //
    
    var gnot = getNodesOfType(graph, 'foafiaf:Segment', null, function(err, segmentNodes) {
        if (err) {
            console.log('getNodesOfType error', err);
            cb(err);
        } 
        console.log('segmentNodes.length', segmentNodes.length, null)
            
        var gcn = getChildNodes(segmentNodes, function(err, segmentChilds) {         // convert node into child node to be added to wheel struct
            if (err) {
                    console.log('getChildNodes error', err);
                    cb(err);
            }                
            console.log('segmentChilds.length', segmentChilds.length)
            
            for (let j = 0; j < segmentChilds.length; j++) {  
                
                // INSERT segments into wheel[0] structure next to 'SEGMENTS' placeholder element
                console.log('// INSERT segments into wheel[0] structure next to SEGMENTS placeholder element')
                let child = segmentChilds[j];
                child.j = j;
                child.colour = colours[j]
                console.log('JSON.stringify(child)', JSON.stringify(child))
                console.log('wheelRoot.insert(0, child);', child)
                wheelRoot.insert(0, child);
    
            }
        
            console.log('wheelRoot after', wheelRoot)
        }); // end getChildNodes
        
    }); //end gnot varible       
    
        
    if (cb) cb(null, true)
};




function doSpokes(graph, cb) {
    console.log('doSpokes')
    // foafiaf:spokes
    //
    console.log('// INSERT SPOKES as children of segments')
    //
    
    var gnot = getNodesOfType(graph, 'foafiaf:Spoke', null, function(err, spokeNodes) {
        if (err) {
            console.log('getNodesOfType error', err);
            cb(err);
        } 
        console.log('spokeNodes.length', spokeNodes.length, null)
      
        var gcn = getChildNodes(spokeNodes, function(err, spokeChilds) {         // convert node into child node to be added to wheel struct
            if (err) {
                    console.log('getChildNodes error', err);
                    cb(err);
            }                
            console.log('spokeChilds.length', spokeChilds.length)
            
            for (let k = 0; k < spokeChilds.length; k++) {  

                console.log('// INSERT SPOKES into wheel structure using SEGMENT placeholder element')
                let child = spokeChilds[k];
                child.k = k;
                console.log('child', child)
                let _id = child.id
                let _broader = child.broader
                
                let wheelNode = findById( wheelRoot, _broader )
                if (!wheelNode.children) wheelNode.children = [];
                wheelNode.children.insert(0, child);

            }

        }); // end getChildNodes
      
      
      
    }); // end of gnot      
             
    if (cb) cb(null, true)
};



function doMeasures2017(graph, cb) {
    console.log('doMeasures2017')
    // foafiaf:Measure
    //
    console.log('// INSERT MEASURES as children of SPOKES')
    //

    var gnot = getYearNodes(graph, 'foafiaf:Measure', 2017, function(err, measureNodes) {
        if (err) {
            console.log('getNodesOfType error', err);
            cb(err);
        } 
        console.log('measureNodes.length', measureNodes.length, null)
      
        var gcn = getChildNodes(measureNodes, function(err, measureChilds) {         // convert node into child node to be added to wheel struct
            if (err) {
                    console.log('getChildNodes error', err);
                    cb(err);
            }                
            console.log('measureChilds.length', measureChilds.length)
            
            for (let m = 0;  m<measureChilds.length; m++) {  

                console.log('// INSERT MEASURES into wheel structure using SPOKE placeholder element')
                let child = measureChilds[m];
                child.m = m;
                console.log('child', child)
                let _id = child.id
                let _strategy = child.strategy
                
                let wheelNode = findById( wheelRoot, _strategy )
                if (!wheelNode.children) wheelNode.children = [];
                wheelNode.children.insert(0, child);

            }

        }); // end getChildNodes
      
    }); // end of gnot      
             
    if (cb) cb(null, true)
};



function doMeasures2018(graph, cb) {
    console.log('doMeasures2018')
    // foafiaf:Measure
    //
    console.log('// INSERT MEASURES as children of SPOKES')
    //

    var gnot = getYearNodes(graph, 'foafiaf:Measure', 2018, function(err, measureNodes) {
        if (err) {
            console.log('getNodesOfType error', err);
            cb(err);
        } 
        console.log('measureNodes.length', measureNodes.length, null)
      
        var gcn = getChildNodes(measureNodes, function(err, measureChilds) {         // convert node into child node to be added to wheel struct
            if (err) {
                    console.log('getChildNodes error', err);
                    cb(err);
            }                
            console.log('measureChilds.length', measureChilds.length)
            
            for (let n=0;  n<measureChilds.length; n++) {  

                console.log('// INSERT MEASURES into wheel structure using SPOKE placeholder element')
                let child = measureChilds[n];
                child.n = n;
                console.log('child', child)
                let _id = child.id
                let _strategy = child.strategy
                
                // add a blank placeholder child at 2017 for strategy
                let blankNode = {};
                blankNode['@id'] = '_2017_'; /// removed n index
                blankNode['foafiaf:shortname'] = ' 2017 '
                var mnc = makeNewChild(blankNode, function(err, newChild) {   
                    if (err) {
                            console.log('makeNewChild error', err);
                            cb(err);
                    }                
                    console.log('newChild', newChild)
                    let _newid = newChild.id;
                
                    let wheelNode = findById( wheelRoot, _strategy )
                    if (!wheelNode.children) wheelNode.children = [];
                    wheelNode.children.insert(0, newChild);
                    
                    // now add children to be new blank node
                    let wheelBlank = findById( wheelRoot, _newid )
                    if (!wheelBlank.children) wheelBlank.children = [];
                    wheelBlank.children.insert(0, child);
                    
                });

            }

        }); // end getChildNodes
      
    }); // end of gnot  
    
    if (cb) cb(null, true)
};


function doMeasures2019(graph, cb) {
    console.log('doMeasures2019')
    // foafiaf:Measure
    //
    console.log('// INSERT MEASURES as children of SPOKES')
    //

    var gnot = getYearNodes(graph, 'foafiaf:Measure', 2019, function(err, measureNodes) {
        if (err) {
            console.log('getNodesOfType error', err);
            cb(err);
        } 
        console.log('measureNodes.length', measureNodes.length, null)
      
        var gcn = getChildNodes(measureNodes, function(err, measureChilds) {         // convert node into child node to be added to wheel struct
            if (err) {
                    console.log('getChildNodes error', err);
                    cb(err);
            }                
            console.log('measureChilds.length', measureChilds.length)
            
            for (let o=0;  o<measureChilds.length; o++) {  

                console.log('// INSERT MEASURES into wheel structure using SPOKE placeholder element')
                let child = measureChilds[o];
                child.o = o;
                console.log('child', child)
                let _id = child.id
                let _strategy = child.strategy
                
                // add a blank placeholder child at 2018 for strategy
                let blankNode = {};
                blankNode['@id'] = '_2018_' ; // removed m index
                blankNode['foafiaf:shortname'] = ' 2018 '
                var mnc = makeNewChild(blankNode, function(err, newChild) {   
                    if (err) {
                            console.log('makeNewChild error', err);
                            cb(err);
                    }                
                    console.log('newChild', newChild)
                    let _newid = newChild.id;
                
                    let wheelNode = findById( wheelRoot, '_2017_' )
                    if (!wheelNode.children) wheelNode.children = [];
                    wheelNode.children.insert(0, newChild);
                    
                    // now add children to be new blank node
                    let wheelBlank = findById( wheelRoot, _newid )
                    if (!wheelBlank.children) wheelBlank.children = [];
                    wheelBlank.children.insert(0, child);
                    
                });

            }

        }); // end getChildNodes
      
    }); // end of gnot  
    
    if (cb) cb(null, true)
};


function findById(source, id) {                         // NEEDS TO BE FOR ALL LEVELS
  console.log('findById source id', source, id)
  //console.log(JSON.stringify(source))
  
  for (let i = 0; i < source.length; i++) {
    let isource = source[i];
    if (isource.id === id) {
      return isource;
    } else {
        let ichildren = isource.children
        for (let j = 0; j < ichildren.length; j++) {
            let jsource = ichildren[j];
            if (jsource.id === id) {
                return jsource;
            } else {
                let jchildren = jsource.children
                for (let k = 0; k < jchildren.length; k++) {
                    let ksource = jchildren[k];
                    if (ksource.id === id) {
                        return ksource;
                    } else {
                        let kchildren = ksource.children
                        for (let l = 0; l < kchildren.length; l++) {
                            let lsource = kchildren[l];
                            if (lsource.id === id) {
                                return lsource;
                            } 
                        }
                    }
                }
            }
        }
    }
  }
  throw "Couldn't find object with id: " + id;
}; // end function findById


function getNodesOfType(graph, type, broader, cb) {
    console.log('getNodesOfType', type)

    let dboType = type || "";
    //console.log('dboType', type)
    
    let skosBroader = broader || null;
    //console.log('skosBroader', skosBroader)
    
    let Nodes = []
    // loop over nodes to determine and add id, group, title, label
	for (let i = 0; i < graph.length; i++) {
	    let _node = graph[i];
	    
		let _id = graph[i]['@id'];
		let _type = graph[i]['@type'];
		let _dbotype = graph[i]['dbo:type'] || null;
        let _broader = graph[i]['skos:broader'] || null;
        let _spoke = graph[i]['foafiaf:Spoke'] || null;
        let _strategy = graph[i]['foafiaf:Strategy'] || null;
        let _priority = graph[i]['foafiaf:priority'] || null;
        let _startdate = graph[i]['foafiaf:startdate'] || '';
        
        let addNode = false;
        if ( (_dbotype === dboType) && (_type === 'skos:Concept') ) {           // check if dbotype matches
                
            if (_dbotype === 'foafiaf:Segment') {
                addNode = true;
                //console.log(_dbotype, addNode)
            } // end Segment
            
            if (_dbotype === 'foafiaf:Spoke') {                                 // add if Spoke and broader matches
                
                if (skosBroader) {
                    if ( (skosBroader === _broader) ) {
                        addNode = true;
                        console.log(_dbotype, skosBroader, addNode)
                    }
                } else {
                    addNode = true;
                    console.log(_dbotype, addNode)
                }
                
            } // end Spoke
            
            if (_dbotype === 'foafiaf:Strategy') {                              // add if Strategy and broader matches
                if ( (skosBroader === _broader) ) {
                    addNode = true;
                    //console.log(_dbotype, skosBroader, addNode)
                }
            } // end Strategy
            
            if (_dbotype === 'foafiaf:Project') {                               // add if Project and broader matches
                if ( (skosBroader === _strategy) ) {
                    if ( (_priority === "Yes" ) || (_priority === "yes" ) ) {
                        addNode = true;
                        //console.log(_dbotype, skosBroader, addNode)
                    }
                }
            } // end Project
            
            if (_dbotype === 'foafiaf:Measure') {                              // add if Measure and broader matches
                if ( (skosBroader === _broader) ) {
                    addNode = true;
                    //console.log(_dbotype, skosBroader, addNode)
                }
                if ( (skosBroader === _spoke ) ) {
                    addNode = true;
                    //console.log(_dbotype, skosBroader, addNode)                // or add if Measure and spoke matches
                }
            } // end Strategy
                   
        } // end Concept
            

        if ( addNode ) {
            //console.log('_id ', _id)
            Nodes.push(graph[i])
        }
        
	} // end for
	
	console.log('Nodes', Nodes)
	
	if (cb) cb(null, Nodes);
	//return Nodes;
}; //end function getNodesOfType


function makeNewChild(Node, cb) {
    console.log('makeNewChild', Node['@id'])              // get all child elements from Node, flatten into properties

	let _id = Node['@id'];
    let _type = Node['@type'];
	let _dbotype = Node['dbo:type'] || null;
	
	let _label = Node['rdfs:label'] || null;
	_label = Node['skos:prefLabel'] || _label;
	let _shortname = Node['foafiaf:shortname'] || null;
	let _description = Node['dc:description'] || null;
	//let _definition = Node['skos:definition'] || null;
	
    let _status = Node['foafiaf:status'] || null;
    let _priority = Node['foafiaf:priority'] || null;
    let _percent = Node['foafiaf:percent'] || null;
    let _color = Node['foafiaf:color'] || null;
    let _startdate = Node['foafiaf:startdate'] || null;
    let _enddate = Node['foafiaf:enddate'] || null;
    
    let _categories = Node['foafiaf:categories'] || null;
    let _keywords = Node['foafiaf:keywords'] || null;
    
    let _team = Node['foafiaf:group'] || null;
    let _segment = Node['foafiaf:Segment'] || null;
    let _spoke = Node['foafiaf:Spoke'] || null;
    let _strategy = Node['foafiaf:Strategy'] || null;
    let _measure = Node['foafiaf:Measure'] || null;
    let _project = Node['foafiaf:Project'] || null;
    let _broader = Node['skos:broader'] || null;
        
	let newChild = {};

	newChild.id = _id;
	newChild.dbotype = _dbotype;
	newChild.label = _label;
	newChild.name = _shortname || _label;
	newChild.description = _description;
	//newChild.definition = _definition;
	newChild.status = _status;
	newChild.priority = _priority;
	newChild.percent = _percent;
	newChild.startdate = _startdate;
	newChild.team = _team;
	newChild.strategy = _strategy;
	newChild.measure = _measure;
	newChild.project = _project;
	newChild.broader = _broader;
    newChild.children = [];
    
    //console.log('newChild', newChild)
    
    if (cb) cb(null, newChild);
    //return newChild
}; // end function makeNewChild


function getChildNodes(theNodes, cb) {
    console.log('getChildNodes')              // get all child elements from theNodes, flatten into properties
        
        let children = []
        for (let i = 0; i < theNodes.length; i++) {
        	let _id = theNodes[i]['@id'];
            let _type = theNodes[i]['@type'];
        	let _dbotype = theNodes[i]['dbo:type'] || null;
        	
        	let _label = theNodes[i]['rdfs:label'] || null;
        	_label = theNodes[i]['skos:prefLabel'] || _label;
        	let _shortname = theNodes[i]['foafiaf:shortname'] || null;
        	let _description = theNodes[i]['dc:description'] || null;
        	//let _definition = theNodes[i]['skos:definition'] || null;
        	
            let _status = theNodes[i]['foafiaf:status'] || null;
            let _priority = theNodes[i]['foafiaf:priority'] || null;
            let _percent = theNodes[i]['foafiaf:percent'] || null;
            let _color = theNodes[i]['foafiaf:color'] || null;
            let _startdate = theNodes[i]['foafiaf:startdate'] || null;
            let _enddate = theNodes[i]['foafiaf:enddate'] || null;
            
            let _categories = theNodes[i]['foafiaf:categories'] || null;
            let _keywords = theNodes[i]['foafiaf:keywords'] || null;
            
            let _team = theNodes[i]['foafiaf:group'] || null;
            let _segment = theNodes[i]['foafiaf:Segment'] || null;
            let _spoke = theNodes[i]['foafiaf:Spoke'] || null;
            let _strategy = theNodes[i]['foafiaf:Strategy'] || null;
            let _measure = theNodes[i]['foafiaf:Measure'] || null;
            let _project = theNodes[i]['foafiaf:Project'] || null;
            let _broader = theNodes[i]['skos:broader'] || null;
            
        	let newChild = {};
        	newChild.i = i;
        	newChild.id = _id;
        	newChild.dbotype = _dbotype;
        	newChild.label = _label;
        	newChild.name = _shortname || _label;
        	newChild.description = _description;
        	//newChild.definition = _definition;
        	newChild.status = _status;
        	newChild.priority = _priority;
        	newChild.percent = _percent;
        	newChild.startdate = _startdate;
        	newChild.team = _team;
        	newChild.strategy = _strategy;
        	newChild.measure = _measure;
        	newChild.project = _project;
        	newChild.broader = _broader;
        	newChild.children = [];
        	
        	//if (_dbotype === 'foafiaf:Segment') newChild.colour = colours[i];
        	//newChild.colour = colours[i];
        	
            //console.log(newChild)
        	children.push(newChild);
        }

    if (cb) cb(null, children);

}; // end function getChildNodes


function getYearNodes(graph, type, year, cb) {
    console.log('getYearNodes', type, year)

    let dboType = type || "";
    
    let Nodes = []
    // loop over nodes to determine and add id, group, title, label
	for (let i = 0; i < graph.length; i++) {
	    let _node = graph[i];
	    
		let _id = graph[i]['@id'];
		let _type = graph[i]['@type'];
		let _dbotype = graph[i]['dbo:type'] || null;
        let _broader = graph[i]['skos:broader'] || null;
        let _spoke = graph[i]['foafiaf:Spoke'] || null;
        let _strategy = graph[i]['foafiaf:Strategy'] || null;
        let _priority = graph[i]['foafiaf:priority'] || null;
        let _startdate = graph[i]['foafiaf:startdate'] || '';
        
        let addNode = false;
        if ( (_dbotype === dboType) && (_type === 'skos:Concept') ) {
            
            if (_dbotype === 'foafiaf:Project') {
                if ( year.toString() === _startdate.toString() ) {
                    if ( ( _priority.toUpperCase() === "YES" ) ) {
                        addNode = true;

                    }
                }
            } // end Project
            
            if (_dbotype === 'foafiaf:Measure') {
                if ( year.toString() === _startdate.toString() ) {
                        addNode = true;

                }
            } // end Project
               
        } // end Concept
        
        if ( addNode ) {
            //console.log('_id ', _id)
            Nodes.push(graph[i])
        }
        
	} // end for
	//console.log('Nodes', Nodes)
	
    if (cb) cb(null, Nodes);
    
} // end function getYearNodes