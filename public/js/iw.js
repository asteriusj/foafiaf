
var colours = ["#FF0000","#FFFF00","#008000","#0000FF","#800080"]
var wheelJS = [
  {
    "name": "SEGMENTS",
    "id": "foafiaf:Segments",
    "dbotype": "foafiaf:Segment",
    "label": "SEGMENTS",
    "name": "SEGMENTS",
    "description": "",
    "children": [
      {
        "name": "SPOKES",
        "id": "foafiaf:Spokes",
        "dbotype": "foafiaf:Spoke",
        "label": "SPOKES",
        "description": "",
        "children": [
          {
            "name": "STRATEGIES",
            "id": "foafiaf:Strategys",
            "dbotype": "foafiaf:Stategy",
            "label": "STRATEGIES",
            "description": "",
            "children": [
              {
                "name": "PROJECTS",
                "id": "foafiaf:Projects",
                "dbotype": "foafiaf:Project",
                "label": "PROJECTS",
                "description": ""
              }
            ]
          }
        ]
      }
    ]
  }
]
    
function getWheelJS(cb) {
	console.log('getWheelJS')
	//console.log(wheelJS)
	console.log(JSON.stringify(wheelJS))
	if (cb) cb(null, wheelJS)
	//return wheelJS
}

//  when the graph data upload is complete, process data
function dataReceived(data, cb) {
	console.log('dataReceived')
	
	//if (spinner) spinner.spin() ;
    //console.log('data', JSON.stringify(data))
    
// 	var defaultNodeId = data['@id'] || null;						
// 	console.log("defaultNodeId - > ", defaultNodeId )
	
// 	if (startid) {
// 		var selectedNodeID = startid;		// ADDED check for default @id in jsonld
// 	} else if (defaultNodeId) {
// 		var selectedNodeID = defaultNodeId;						// ADDED check for default @id in jsonld
// 	} else {
// 		//var selectedNodeID = "foafiaf:transform-rockford";		// CHANGED from 'Transform_Rockford'
// 		//var selectedNodeID = "foafiaf:Strategy_0";
// 		var selectedNodeID = "foafiaf:Mission_Vision_0";
// 	}
// 	console.log('selectedNodeID - > ', selectedNodeID)
	

	var graph = data['@graph'];

	//var segmentNodes = getSegmentNodes(graph)
	//var segmentNodes = getNodes(graph, 'foafiaf:Segment', null)
	var segmentNodes = getNodes(graph, 'foafiaf:Segment', null)
	console.log('segmentNodes', segmentNodes)
    console.log('segmentNodes.length', segmentNodes.length)
    
    var segmentChilds= getChildNodes(segmentNodes);
    console.log('segmentChilds', segmentChilds)
    //wheelJS = segmentChilds;
    console.log(wheelJS)
    
	for (var i = 0; i < segmentNodes.length; i++) {
        //var segmentNode = segmentNodes[i]
        var segmentChild = segmentChilds[i]
        wheelJS[i+1] = segmentChild;

	    var _spokeid = segmentNodes[i]['@id'];
	    var spokeNodes = getNodes(graph, 'foafiaf:Spoke', _spokeid)
	    var spokeChilds = getChildNodes(spokeNodes);
        if (spokeChilds.length > 0) wheelJS[i+1].children = spokeChilds;
        
	    for (var k = 0; k < spokeNodes.length; k++) {

	        var _strategyid = spokeNodes[k]['@id'];
	        var strategyNodes = getNodes(graph, 'foafiaf:Strategy', _strategyid)
	        var strategyChilds = getChildNodes(strategyNodes);
	        if (strategyChilds.length > 0) wheelJS[i+1].children[k].children = strategyChilds;
	        
	        for (var g = 0; g < strategyNodes.length; g++) {

    	        var _projectid = strategyNodes[g]['@id'];
    	        var projectNodes = getNodes(graph, 'foafiaf:Project', _projectid)
    	        var projectChilds = getChildNodes(projectNodes);
	            if (projectChilds.length > 0) wheelJS[i+1].children[k].children[g].children = projectChilds;

	        }
	    }
	}

    
    function getChildNodes(theNodes) {
        //console.log('getChildNodes')
        
        var children = []
        for (var i = 0; i < theNodes.length; i++) {
        	var _id = theNodes[i]['@id'];
            var _type = theNodes[i]['@type'];
        	var _dbotype = theNodes[i]['dbo:type'] || null;
        	var _label = theNodes[i]['rdfs:label'] || null;
        	var _shortname = theNodes[i]['foafiaf:shortname'] || null;
        	var _description = theNodes[i]['dc:description'] || null;
        	//var _definition = theNodes[i]['skos:definition'] || null;
        	
            var _status = theNodes[i]['foafiaf:status'] || null;
            var _priority = theNodes[i]['foafiaf:priority'] || null;
            var _percent = theNodes[i]['foafiaf:percent'] || null;
            var _startdate = theNodes[i]['foafiaf:startdate'] || null;
            var _startdate = theNodes[i]['foafiaf:startdate'] || null;
            var _enddate = theNodes[i]['foafiaf:enddate'] || null;
            var _projectoutputs = theNodes[i]['foafiaf:projectoutputs'] || null;
            
            
            var _team = theNodes[i]['foafiaf:group'] || null;
            var _strategy = theNodes[i]['foafiaf:Strategy'] || null;
            var _measure = theNodes[i]['foafiaf:Measure'] || null;
            var _project = theNodes[i]['foafiaf:Project'] || null;
            var _broader = theNodes[i]['skos:broader'] || null;
            
            //console.log('_description', _description)
            // var language = _description['@language'] || null;
            // //console.log('language', language)
            // var value = _description['@value'] ;
            // //console.log('value', value)
            // if (language || value) {
            //     console.log('value', value)
            //     _description = value;
            // }
            
        	var newChild = {};
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
        	newChild.enddate = _enddate;
        	newChild.projectoutputs = _projectoutputs;
        	newChild.team = _team;
        	newChild.strategy = _strategy;
        	newChild.measure = _measure;
        	newChild.project = _project;
        	newChild.broader = _broader;
        	
        	//if (_dbotype === 'foafiaf:Segment') newChild.colour = colours[i];
        	//newChild.colour = colours[i];
        	
            //console.log(newChild)
        	children.push(newChild);
        }
        return children
    } // end getChildNodes
    
    
      
    // FUNCTIONS
    function getNodes(graph, type, broader) {
        //console.log('getNodes')
    
        var dboType = type || "";
        //console.log('dboType', type)
        var skosBroader = broader || null;
        //console.log('skosBroader', skosBroader)
        
        var Nodes = []
        // loop over nodes to determine and add id, group, title, label
    	for (var i = 0; i < graph.length; i++) {
    		var _id = graph[i]['@id'];
    		var _type = graph[i]['@type'];
    		var _dbotype = graph[i]['dbo:type'] || null;
            var _broader = graph[i]['skos:broader'] || null;
            var _strategy = graph[i]['foafiaf:Strategy'] || null;
            var _priority = graph[i]['foafiaf:priority'] || null;
            
            var addNode = false;
            if ( (_dbotype === dboType) && (_type === 'skos:Concept') ) {
                
                if (_dbotype === 'foafiaf:Segment') {
                    addNode = true;
                    //console.log(_dbotype, skosBroader, addNode)
                } // end Segment
                
                if (_dbotype === 'foafiaf:Spoke') {
                    if ( (skosBroader === _broader) ) {
                        addNode = true;
                        //console.log(_dbotype, skosBroader, addNode)
                    }
                } // end Spoke
                
                if (_dbotype === 'foafiaf:Strategy') {
                    if ( (skosBroader === _broader) ) {
                        addNode = true;
                        //console.log(_dbotype, skosBroader, addNode)
                    }
                } // end Strategy
                
                if (_dbotype === 'foafiaf:Project') {
                    if ( (skosBroader === _strategy) ) {
                        if ( (_priority === "Yes" ) || (_priority === "yes" )  || (_priority === "YES" ) ) {
                            addNode = true;
                            //console.log(_dbotype, skosBroader, addNode)
                        }
                    }
                } // end Project
                   
            } // end Concept
            
            if ( addNode ) {
                //console.log('_id ', _id)
                Nodes.push(graph[i])
            }
            
    	} // end for
    	//console.log('Nodes', Nodes)
    	return Nodes;
    }
    
    
    function saveProjectWheel(wheel) {
        console.log('saveProjectWheel')
        
        var _json = JSON.stringify(wheel)
        //console.log(_json)
    }


    //console.log(JSON.stringify(wheelJS))
	if (cb) cb(wheelJS)
	return wheelJS
} //end dataReceived
