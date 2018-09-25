
console.log('loading network.js ...')


var Network
var History = [];
var RelPath = [];


function HandleSearchResult(id) {
	console.log('HandleSearchResult', id)
	var el = document.getElementById('nextId')
	el.style.display='none';
	// Set element value
	el.value = id;
	// Create a new 'change' event
	var change_nextId = new Event('change_nextId');
		console.log('change_nextId',change_nextId)
	// Dispatch it.
	el.dispatchEvent(change_nextId);
}

function HandlePreviousCall() {
  console.log('HandlePreviousCall')
  console.log('History',History)
  var len = History.length
  if (len > 1) {
  	var nodeid = History[len-2]
  	console.log(nodeid)
  	var el = document.getElementById('nextId')
	  el.style.display='none';
	  // Set element value
	  el.value = nodeid;
	  // Create a new 'change' event
	  var change_nextId = new Event('change_nextId');
			console.log('change_nextId',change_nextId)
	  // Dispatch it.
	  el.dispatchEvent(change_nextId);
  }
}


function HandleRelPathResult(path) {
	console.log('HandleRelPathResult', path)
	var el = document.getElementById('pathIds')

	el.style.display='none';
	// Set element value
	el.value = JSON.stringify(path);

	// Create a new 'change' event
	var change_pathIds = new Event('change_pathIds');
		console.log('change_pathIds',change_pathIds)
	// Dispatch it.
	el.dispatchEvent(change_pathIds);
		console.log('el',el)
}

function gotoId (id) {
	console.log('gotoId', id)
	doNetwork.gotoNode(id)
}

function getRawNodes (data) {
	console.log('getRawNodes', data)
	return doNetwork.buildRawNodes(data)
}


function getDataWithTypes (_data, typeList) {
	console.log('getDataWithTypes data typeList', _data, typeList)
	
	try {
	    
		var _oldNodes = _data['@graph'];
		var _newNodes = [];
		
		// loop over nodes to determine if should be in filtered list
		for (var i = 0; i < _oldNodes.length; i++) {
			var _id = _oldNodes[i]['@id'];

			var _type = _oldNodes[i]['@type'] || "";	
			if (typeList.indexOf(_type) >= 0) {
				_newNodes.push(_oldNodes[i])
			}
		}  // end for
		// console.log('_newNodes',_newNodes)
		
		_data['@graph'] = _newNodes
		console.log('_data',_data)
		return _data;
	}
	catch(e) {
	    //catchCode - Block of code to handle errors
	    console.error(e)
	} 
	finally {
	    //finallyCode - Block of code to be executed regardless of the try / catch result

	}

} // end getDataWithTypes



//  when the graph data upload is compvare, process data
function dataReceived(data) {
	console.log('dataReceived')
	doNetwork(data)
} // end dataRecieved


//
// do network setup and event handling
//
function doNetwork(_data, _entityTypes) {
	console.log('start doNetwork')
	console.log('_data',_data)
	
	// set spinner control
	const target = document.getElementById('canvasArea')
	console.log('target',target)
	var spinner = new Spinner().spin(target);
	console.log(Math.floor(Date.now() / 1000), 'new spinner control', spinner)
	// // spinner.stop();
    
  try {
  	   
  	var data = [];
    if (_entityTypes) {
		// get entity types
		// var typeList = ["skos:ConceptScheme","foaf:Group","foaf:Organization","org:Role","schema:Service"]
		//  typeList = ["skos:ConceptScheme","foaf:Group"]
	    
	    // update data with only seelcted types
	    data = getDataWithTypes(_data, _entityTypes)
    } else if (_data) {
    	data = _data
    }

	var defaultNodeId = data['@id'] || null;						
	console.log("defaultNodeId - > ", defaultNodeId )

	if (startid) {
		var selectedNodeID = startid;		// ADDED check for default @id in jsonld
	} else if (defaultNodeId) {
		var selectedNodeID = defaultNodeId;						// ADDED check for default @id in jsonld
	} else {
		//var selectedNodeID = "foafiaf:transform-rockford";		// CHANGED from 'Transform_Rockford'
		//var selectedNodeID = "foafiaf:Strategy_0";
		var selectedNodeID = "foafiaf:Mission_Vision_0";
	}
	console.log('selectedNodeID - > ', selectedNodeID)
	
	if (showall) {
		showAll = true
	}
	console.log('showAll - > ', showAll)
	

	
			
	// //
	// // create placeholder for Next Id and fill wih query param if available
	// // sets input element inside selectorContainer in HTML doc
	// // useed by search.js to put result of entity search
	// //
	// // create placeholder for Next Id and fill wih query param if available
	// // var nextId = nextid || null ;
	// // console.log('nextId - > ', nextId)
	// document.getElementById('selectorContainer').innerHTML += "<input id='searchId' type='text' value=''  style='display:none'/><br />";
	// // handle id seelcted as result of a search
	// document.getElementById("searchId").addEventListener("change_searchId", function(){
	// 	var selectedId = document.getElementById('searchId').value;
	//     console.log('searchId change:', selectedId);
	//     gotoNode(getSelectedNode(selectedId));
	// 	// alert('selectedId',selectedId)
	// });
	// // end nextId id from search plug in
	
	
	// //
	// // create placeholder for Previous Id 
	// // sets input element inside selectorContainer in HTML doc
	// // useed by network.js to put result of previous History id
	// //
	// document.getElementById('selectorContainer').innerHTML += "<input id='prevId' type='text' value=''  style='display:none'/><br />";
	// // handle id seelcted as result of a search
	// document.getElementById("prevId").addEventListener("change_prevId", function(){
	// 	var selectedId = document.getElementById('prevId').value;
	//     console.log('prevId change:', selectedId);
	    
	//     gotoNode(getSelectedNode(selectedId));
	// 	// alert('selectedId',selectedId)
	// });
	// // end previous id from icon plug in
	
	
	//
	// create placeholder for Next Id and fill wih query param if available
	// sets input element inside selectorContainer in HTML doc
	// useed by search.js to put result of entity search
	//
	// create placeholder for Next Id and fill wih query param if available
	// var nextId = nextid || null ;
	// console.log('nextId - > ', nextId)
	var inputNextId = document.createElement("input");            
 
	var att0 = document.createAttribute("id");  
	att0.value = "nextId";  
	inputNextId.setAttributeNode(att0);
	var att1 = document.createAttribute("type");  
	att1.value = "text"; 
	inputNextId.setAttributeNode(att1);
	var att2 = document.createAttribute("style");  
	att2.value = "display:none";
	inputNextId.setAttributeNode(att2);
	
	document.getElementById("selectorContainer").appendChild(inputNextId); 
	
	
	// document.getElementById('selectorContainer').innerHTML += 
	// 	document.getElementById('selectorContainer').innerHTML +
	// 	"<input id='nextId' type='text' value=''  style='display:none'/><br />";
	console.log("document.getElementById('selectorContainer').innerHTML",document.getElementById('selectorContainer').innerHTML)
	// handle id seelcted as result of a search
	document.getElementById("nextId").addEventListener("change_nextId", function(){
		var selectedId = document.getElementById('nextId').value;
	    console.log('nextId change:', selectedId);
	    gotoNode(getSelectedNode(selectedId));
		// alert('selectedId',selectedId)
	});
	// end nextId id from search and previous plug in


	//
	// create placeholder for relationship path steps
	// sets input element inside selectorContainer in HTML doc
	// useed by refinder.js to put result of entity path finder
	//
	var inputPathIds = document.createElement("input");            
 
	var att0 = document.createAttribute("id");  
	att0.value = "pathIds";  
	inputPathIds.setAttributeNode(att0);
	var att1 = document.createAttribute("type");  
	att1.value = "text"; 
	inputPathIds.setAttributeNode(att1);
	var att2 = document.createAttribute("style");  
	att2.value = "display:none";
	inputPathIds.setAttributeNode(att2);
	
	document.getElementById("selectorContainer").appendChild(inputPathIds); 
	// document.getElementById('selectorContainer').innerHTML += 
	// 	document.getElementById('selectorContainer').innerHTML +
	// 	"<input id='pathIds' type='text' value=''  style='display:none'/><br />";
	console.log("document.getElementById('selectorContainer').innerHTML",document.getElementById('selectorContainer').innerHTML)
	// handle ids selcted as result of a rel finder
	document.getElementById("pathIds").addEventListener("change_pathIds", function(){
		console.log('gogo pathIds')
		var jsonPathIds = document.getElementById('pathIds').value;
	    console.log('pathIds change:', jsonPathIds);
	    
	    var idList = JSON.parse(jsonPathIds);
	    console.log('idList:', idList);
	    
	    gotoPath(rawNodes,idList)
	    
	    // var selectedId = idList[0] || "" ;
	    // console.log('selectedId:', selectedId);
	    
	    // gotoNode(getSelectedNode(selectedId));

	});
	// end relationship path from relfinder plug in

	
	
	//
	var rawNodes = [];
	var rawEdges = [];
	var visibleNodes = [];
	var visibleEdges = [];
	
	//	Build Raw Nodes and Edges from Raw Data
	rawNodes = buildRawNodes(data)
	rawEdges = buildRawEdges(rawNodes)
	// console.log('rawNodes', JSON.stringify(rawNodes))
	// console.log('rawEdges', JSON.stringify(rawEdges))
	
	
	
	//
	// Find selected node, display details and determine nodes within n degrees
	//
	var selectedNode = getNodeById(rawNodes, selectedNodeID) || null ;
	//selectedNode = null
	console.log('selectedNode',selectedNode)
	
	if (selectedNode != null) {
		visibleNodes = getVisibleNodes(rawNodes, rawEdges, selectedNodeID)
	} else {
		var showAll = true
		console.log('showAll',showAll)
		visibleNodes = rawNodes
	}
	
	
	visibleEdges = getConnectedEdges(selectedNode)		// kludge to get edge count
	visibleEdges = rawEdges;
	
	
	if (selectedNode) {
		displayData(selectedNode);
		updatePropSheet(selectedNode);
	}
	

	// console.log('visibleNodes', JSON.stringify(visibleNodes) )
	// console.log('visibleEdges', JSON.stringify(visibleEdges) )
	var network = setNetwork(visibleNodes, visibleEdges)
	
	network.once("afterDrawing", function(){
		console.log(Math.floor(Date.now() / 1000), 'start network.once')
		
		try {
			// const target = document.getElementById('canvasArea')
			// console.log('target',target)
			// var spinner = new Spinner().spin(target);
			// if (spinner) spinner.spin() ; 
			// console.log('spinner spin on doNetwork',spinner)
			
			zoomToSelectedNode(selectedNodeID, network);
			// stop spinner
			// if (spinner) spinner.stop() ; 
			// console.log('spinner stop afterDrawing',spinner)
		} 
		catch(e) {
		    console.error(Math.floor(Date.now() / 1000), e)
		} 
		finally {
			console.log(Math.floor(Date.now() / 1000), 'finish network.once')
		}
	});
	
	
	

	// //
	// //  network graph click events
	// //
	// var doubleClickTime = 0;
	// var threshold = 200;
	
	// //  network graph click event
	// network.on("click", function(selected){
	// 		console.log('')
	// 		console.log('network.on click')
	// 		console.log('')
			
			
			
	// 		console.log('selected', selected)
			
	// 		// var t0 = new Date();
	// 	 //   if (t0 - doubleClickTime > threshold) {
	// 	 //       setTimeout(function () {
	// 	 //           if (t0 - doubleClickTime > threshold) {
	// 	 //           	console.log('t0 - doubleClickTime',t0 - doubleClickTime)
	// 	 //               doOnClick();
		                
	// 	 //           }
	// 	 //       },threshold);
	// 	 //   }
	// 		doOnClick(); // bypass dbl click timer
	// 		function doOnClick() {
	// 		    console.log("execute onClick function");
			    
				
	// 			var selectedNode = getSelectedNode(selected)
	// 			var nodeId =  selectedNode.id
					
	// 			if (selectedNode) {
	// 					// displayData(selectedNode);
	// 					updatePropSheet(selectedNode);
	// 			}
					
	// 			//  if a node is selected, hide any nodes outside the selected number N degrees
	// 			console.log('nodeId',nodeId)
	// 			if(nodeId) {

	// 				// start spinner
	// 					var target = document.getElementById('mainArea')
	// 					var spinner = new Spinner().spin(target);
	// 					console.log('spinner',spinner)
						
	// 				visibleNodes = getVisibleNodes(rawNodes, rawEdges, nodeId)
	// 				visibleEdges = rawEdges
	// 				//console.log('new visibleNodes',visibleNodes)
	// 				//console.log('new visibleEdges',visibleEdges)
					
	// 				network.setData({nodes:new vis.DataSet(visibleNodes), edges:new vis.DataSet(visibleEdges)});
	// 				//network = setNetwork(visibleNodes, visibleEdges)
					
	// 				network.once("afterDrawing", function(){
						
	// 					zoomToSelectedNode(nodeId, network);
	// 					// stop spinner
	// 					if (spinner) spinner.stop() ; 
	// 					console.log('spinner',spinner)
	// 				});
	// 			}
				
	// 		}
			
			
	// }); // end on click

	// FUNCTIONS	
	function setNetwork(visibleNodes, visibleEdges ){
		console.log(Math.floor(Date.now() / 1000), 'start setNetwork');
	    
		try {

			// start spinner
			// if (spinner) spinner.spin() ; 
			// console.log('spinner spin on doNetwork',spinner)
			
			var nodes = new vis.DataSet(visibleNodes);
			//console.log('nodes', JSON.stringify(nodes))
			var edges = new vis.DataSet(visibleEdges);
			//console.log('edges', JSON.stringify(edges))
				
				
			// create a network from nodes and edges
			var container = document.getElementById('mynetwork');
			var nodesedges = {
		        manifest: '',
		        nodes: nodes,
		        edges: edges
		      };
			//console.log(JSON.stringify(nodesedges))
			
			/// SET NETWORK !!!
			var options = getOptions();
			
	
			var network = new vis.Network(container, nodesedges, options);
			Network = network
			
			// stop spinner
			// if (spinner) spinner.stop() ; 
			// console.log('spinner stop afterDrawing',spinner)
			
			return network
		} 
		catch(e) {
		    console.error(Math.floor(Date.now() / 1000), e)
		} 
		finally {
			console.log(Math.floor(Date.now() / 1000), 'finish setNetwork')
		}
	}
	
	function getSelectedNode(selected) {
		console.log(Math.floor(Date.now() / 1000), 'start getSelectedNode', selected)
	  
	  try {
	  	
		if ( typeof selected === "string") {
			var nodeId = selected
		} else if ( typeof selected.node === "string") {
			var nodeId = selected.node;
		} else {
			var nodeId = selected.nodes.toString();
		}
		console.log('nodeId', nodeId)
		// console.log('nodeId', nodeId)

		var selectedNode = getNodeById(rawNodes, nodeId) || null ;
		console.log(Math.floor(Date.now() / 1000), 'selectedNode', selectedNode)
		
		return selectedNode
	  } 
	  catch(e) {
	    	console.error(Math.floor(Date.now() / 1000), e)
	  } 
	  finally {
			console.log(Math.floor(Date.now() / 1000), 'finish getSelectedNode')
	  }
	}
	

	function getSelection(params) {
		console.log('getSelection',params)
		var sel = null;
		if (params.node) {	
			sel = params.node
		
		} else if (params.nodes[0]) {	
			sel = params.nodes[0]
			
		} else {
			
		}
		console.log('sel', sel)
		return sel;
	}
	
	

	
    network.on("click", function (params) {
        console.log('click Event:', params);
        // getSelectedNode(getSelection(params));
    });
    network.on("doubleClick", function (params) {
        console.log('doubleClick Event:', params);
        gotoNode(getSelectedNode(getSelection(params)));
    });
    
    network.on("oncontext", function (params) {
        console.log('oncontext Event:', params);
        updateEditForm(getSelectedNode(getSelection(params)));
    });
    
    network.on("hold", function (params) {
        console.log('hold Event:', params);
        updateEditForm(getSelectedNode(getSelection(params)));
    });
    
    network.on("dragStart", function (params) {
        console.log('dragStart Event:', params);
    });
    network.on("dragging", function (params) {
        console.log('dragging Event:', params);
    });
    network.on("dragEnd", function (params) {
        console.log('dragEnd Event:', params);
    });
    network.on("zoom", function (params) {
    	console.log('zoom Event:', params);
    });
    network.on("showPopup", function (params) {
    	console.log('showPopup Event:', params);
    });
    network.on("hidePopup", function (params) {
        console.log('hidePopup Event:', params);
    });
    
    network.on("select", function (params) {
        console.log('select Event:', params);
        updatePropSheet(getSelectedNode(getSelection(params)));
    });
    
    network.on("selectNode", function (params) {
        console.log('selectNode Event:', params);
        getSelection(params);
    });
    network.on("selectEdge", function (params) {
        console.log('selectEdge Event:', params);
    });
    network.on("deselectNode", function (params) {
        console.log('deselectNode Event:', params);
    });
    network.on("deselectEdge", function (params) {
        console.log('deselectEdge Event:', params);
    });
    network.on("hoverNode", function (params) {
        console.log('hoverNode Event:', params);
        getSelection(params);
    });
    network.on("hoverEdge", function (params) {
        console.log('hoverEdge Event:', params);
    });
    network.on("blurNode", function (params) {
        console.log('blurNode Event:', params);
    });
    network.on("blurEdge", function (params) {
        console.log('blurEdge Event:', params);
    });
    
    
    //
    // use pathids list to set new nodes and edges then got to first node
    //
	function gotoPath(rawNodes, pathList) {
	    console.log(Math.floor(Date.now() / 1000), "start gotoPath", rawNodes, pathList);
	    
	    try {
	    
	      if (pathList) {

			// use list to to generate new node graph
			var pathNodes = []
			for (var n=0; n<pathList.length; n++) {
				var _id = pathList[n] ;
				// console.log('_id',_id)
				var _node = getNodeById(rawNodes,_id) ;
				// console.log('_node',_node)
				pathNodes.push(_node) ;
			}
			console.log('pathNodes',pathNodes,pathNodes.length)
			
			
			// // create edges between path nodes - NEED TO MAKE MORE COMPLETE BY LOOP THROUGH PROPERTIES OF NODES
			// var pathEdges = []
			// if (pathNodes.length>0) {
			//   for (var p=0; p<pathNodes.length-1; p++) {						// only loop length - 1 
			// 	var _nd1 = pathNodes[p] ;					console.log('_nd1',_nd1)
			// 	var _id1 = _nd1['@id']; ;					console.log('_id1',_id1)
			// 	var _nd2 = pathNodes[p+1] ;					console.log('_nd2',_nd2)
			// 	var _id2 = _nd2['@id'] ;					console.log('_id2',_id2)
				
			// 	var pathEdge = {};
			// 	pathEdge.arrows = {"to":"true"};
			// 	pathEdge.from = _id1;
			// 	pathEdge.to = _id2;
			// 	pathEdge.label = 'related to';
						
			// 	pathEdges.push(pathEdge);
			//   }
			// }
			// console.log('pathEdges',pathEdges)

			// redrawn with path nodes and edges
			// setNetwork(pathNodes, pathEdges)
			var startId = pathNodes[0] ;
			
			gotoNode(startId,pathNodes)

	      }
	      
	    }
		catch(e) {
		    console.error(Math.floor(Date.now() / 1000), e)
		} 
		finally {
			// stop spinner
			// if (spinner) spinner.stop() ; 
			// console.log(Math.floor(Date.now() / 1000), 'spinner stop',spinner)
			
			console.log(Math.floor(Date.now() / 1000), 'finish gotoPath')
		}
	} // end gotoPath


	
	function gotoNode(selectedNode, pathNodes) {
	    console.log(Math.floor(Date.now() / 1000), "start gotoNode",  selectedNode, pathNodes);
	    
	    // start spinner
		// var target = document.getElementById('mainArea')
		// var spinner = new Spinner().spin(target);
		// if (spinner) { spinner.spin(); console.log('spinner', spinner) }; 
		// console.log(Math.floor(Date.now() / 1000), 'spinner spin',spinner)
			
	    try {
	    
	      if (selectedNode) {
	      	console.log('selectedNode',selectedNode)
	      	showAll = false;							// trun off show all nodes
	      	
			var nodeId =  selectedNode.id

			//  if a node is selected, hide any nodes outside the selected number N degrees
			//  or show nodes in path
			
			if(nodeId) {
				console.log('nodeId',nodeId)
				
				// // start spinner
				// var target = document.getElementById('mainArea')
				// var spinner = new Spinner().spin(target);
				// console.log('spinner',spinner)
				
				// if pathNodes defined use instead of rawNoode
				if (pathNodes) {
					console.log('pathNodes',pathNodes)
					visibleNodes = pathNodes
				} else {
					visibleNodes = getVisibleNodes(rawNodes, rawEdges, nodeId)
				}
				visibleEdges = rawEdges
				console.log('new visibleNodes',visibleNodes)
				console.log('new visibleEdges',visibleEdges)
				
				network.setData({nodes:new vis.DataSet(visibleNodes), edges:new vis.DataSet(visibleEdges)});
				//network = setNetwork(visibleNodes, visibleEdges)
				
				network.once("afterDrawing", function(){
					
					zoomToSelectedNode(nodeId, network);
					// // stop spinner
					// if (spinner) spinner.stop() ; 
					// console.log('spinner',spinner)
				});
			} else {
				console.log('note nodeId')
			} // end if nodeId
	      } else {
	      	console.log('not selectedNode')
	      } // end if selectedNode	    
	      
	    }
		catch(e) {
		    console.error(Math.floor(Date.now() / 1000), e)
		} 
		finally {
			// stop spinner
			// if (spinner) spinner.stop() ; 
			// console.log(Math.floor(Date.now() / 1000), 'spinner stop',spinner)
			
			console.log(Math.floor(Date.now() / 1000), 'finish gotoNode')
		}
	} // end gotoNode
	exports = gotoNode()
	
	
	

	function zoomToSelectedNode(_selectedNodeId, _network) {
		console.log(Math.floor(Date.now() / 1000), 'start zoomToSelectedNode')
		
		// start spinner
		// var target = document.getElementById('mainArea')
		// var spinner = new Spinner().spin(target);
		if (spinner) { console.log('before spinner spin', spinner); spinner.spin();  };   
		console.log(Math.floor(Date.now() / 1000), 'spinner spin',spinner)
			
		try {
			
			var moveToOptions = {
				scale: 1.10,              // scale to animate to  (Number)
				offset: {x:0, y:0},      // offset from the center in DOM pixels (Numbers)
				animation: {             // animation object, can also be Boolean
				  duration: 1000,                 // animation duration in milliseconds (Number)
				  easingFunction: "linear" // Animation easing function, available are:  linear, easeInQuad, easeOutQuad, easeInOutQuad,
				}                                   // easeInCubic, easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart,
			}                                       // easeInQuint, easeOutQuint, easeInOutQuint
			//console.log('zoom to ',_selectedNodeId)
			//console.log('moveToOptions',moveToOptions)
			if(_selectedNodeId) _network.focus(_selectedNodeId, moveToOptions);	

		}
		catch(e) {
		    console.error(Math.floor(Date.now() / 1000), e)
		} 
		finally {
			
			// post to history
			History.push(_selectedNodeId)
			console.log('History',History)
			
			// stop spinner
			if (spinner) { console.log('before spinner stop', spinner); spinner.stop(); };   
			console.log(Math.floor(Date.now() / 1000), 'spinner stop',spinner)
			
			console.log(Math.floor(Date.now() / 1000), 'finish zoomToSelectedNode')
		}
	} // zoozoomToSelectedNode




	
	function updateEditForm(d) {
        // if (!d.children) return;
        console.log('updateEditForm', d)

        var header = document.getElementsByClassName('editform-header');
        header[0].innerHTML = "Entity Editor";
        //$(header).hide()
        
        var body = document.getElementsByClassName('editform-body');
        body[0].innerHTML = htmlForm(d)								//get html form for entity
        
        var footer = document.getElementsByClassName('editform-footer');
        footer[0].innerHTML = getIdentifer(d);
        
    }
    
        
	function updatePropSheet(d) {
        // if (!d.children) return;
        console.log('updatePropSheet', d)

        var header = document.getElementsByClassName('propsheet-header');
        header[0].innerHTML = getGroup(d)
        
        var body = document.getElementsByClassName('propsheet-body');
        body[0].innerHTML = htmlPreview(d)
        
        var footer = document.getElementsByClassName('propsheet-footer');
        footer[0].innerHTML = getIdentifer(d);
        
    }

    



function getVisibleNodes(rawNodes, rawEdges, _selectedNodeId, _pathNodes) {	
	console.log('getVisibleNodes')
	//console.log(' _selectedNodeId',_selectedNodeId)
	//console.log('rawNodes.length',rawNodes.length)
	
	var allNodes = false;
	if (typeof showAll !== "undefined") {
		if (showAll === true) {
			allNodes = true;
			// console.log('allNodes', allNodes)
		}
	}
	console.log('allNodes', allNodes)
	
	var _visibleNodes = []
	var _id = _selectedNodeId;
	var nd = getNodeById(rawNodes, _id) || null ;
	if (_visibleNodes.indexOf(nd) < 0 ) _visibleNodes.push(nd) ;
	  		
	// loop over nodes, onky us selected if chosen
	for (var i = 0; i < rawNodes.length; i++) {
		var _nd = rawNodes[i];
		
		if (allNodes) {
	  		var _id = _nd['@id'];    // if all nodes set selected to item, else do nothing  ??? WHAT ???
		} else {
	  		
		}
		//console.log('_id', _id)

		// select visible edges and visible nodes
		// loop over edges, add edges that have from selected node, add to node 
		// in otherwords directly connected, 1 degree of seperation
		//
		//console.log('rawEdges.length',rawEdges.length)
		for (var v = 0; v < rawEdges.length; v++) {
			var eg = rawEdges[v];
			//console.log('eg',eg)
			
			// if fromId is selectedID, then select toId as visibleNode (add edge as well)
			var fromId = eg.from;
			if (fromId === _id) {
				var toId = eg.to;
				//console.log('fromId',fromId)
				//console.log('toId',toId)
				var nd = getNodeById(rawNodes, toId) || null ;
				if (nd) {
					if (_visibleNodes.indexOf(nd) < 0 )  {
						//console.log('fromId',fromId)
						//console.log('toId',toId)
						//console.log('nd', nd.id)
						_visibleNodes.push(nd) ;
						
					}
				}
			} // end if fromId
			// if toId is selectedID, then select fromId as visibleNode (add edge as well)
			var toId = eg.to;
			if (toId === _id) {
				var fromId = eg.from;
				//console.log('toId',toId)
				//console.log('fromId',fromId)
				//if ( toId.indexOf("foafiaf:") != -1 ) {		// check to see of value starts with foafiaf: therefoe an entity reltionship
				var nd = getNodeById(rawNodes, fromId) || null ;
				if (nd) {
					if (_visibleNodes.indexOf(nd) < 0 )  {
						//console.log('toId',toId)
						//console.log('fromId',fromId)
						//console.log('nd', nd.id)
						_visibleNodes.push(nd) ;
					}
				}
				//}
			} // end if fromId
		} // end for edges

	} // end for nodes
			
			
		// document.getElementById('nodeCount').innerHTML = _visibleNodes.length + "/" + nodeCount;
	//console.log('_visibleNodes.length',_visibleNodes.length)
	return _visibleNodes
} // set visibles






function getPropertyNodes(rawNode) {
	console.log('getPropertyNodes')
	var propertyNodes = [];
	
	for (var property in rawNode) {
		if ( (typeof rawNode[property]) === 'string') {		// check if property value is a string ie. a single entry
			//console.log("property", property)
			var _id = rawNode.id + '_' + property;
			var strProp = rawNode[property] || ""
			//console.log("strProp", strProp)
			var relLabel = property.substring(property.indexOf(":") + 1);
			  
			if ( strProp.indexOf("foafiaf:") === -1 ) {		// check to see of value does not start with foafiaf: therefore NOT an entity relationship
				var newProperty = {};
				newProperty.id = _id;
				newProperty.value = strProp;
				newProperty.label = relLabel;
				newProperty.title = '';
				newProperty.group = 'property';
				
				//console.log('newProperty', newProperty)	
				propertyNodes.push(newProperty);
			} // end if foafiaf
		} // end if string
	} // end for property	
	
		//console.log('propertyNodes', propertyNodes)
	return propertyNodes;
} // end get property nodes





function hideNodesByDegree(nodeId) {
		//  find the connected nodes within N degrees
		var connectedNodes = [];
		connectedNodes.push(nodeId);
		var degrees = document.getElementById('degreesOfSelectedNode').value;
		for(var i = 0; i < degrees; i++) {
			var nextDegreeNodes = [];
			for(var j = 0; j < connectedNodes.length; j++) {
				var nextDegreeEdges = getConnectedEdges(connectedNodes[j]);
				for(var x = 0; x < nextDegreeEdges.length; x++) {
					nextDegreeNodes.push(getConnectedNodes(nextDegreeEdges[x]));
				}
			}
			if (nextDegreeNodes[0] != "") {
				for(var k = 0; k < nextDegreeNodes.length; k++) {
					for(var l = 0; l < nextDegreeNodes[k].length; l++) {
						if(connectedNodes.indexOf(nextDegreeNodes[k][l]) === -1) connectedNodes.push(nextDegreeNodes[k][l]);
					}
				}
			}
		}
		//  hide all nodes outside N degrees and their connected edges
		try {
			for (var i = 0; i < rawNodes.length; i++) {
				if (connectedNodes.indexOf(rawNodes[i].id) !== -1) {
					if (document.getElementById(rawNodes[i].group).checked === true) {
						rawNodes[i].hiddenByDegree = false;
						rawNodes[i].hidden = false;
					}
				}
				else {
					rawNodes[i].hiddenByDegree = true;
					rawNodes[i].hidden = true;
				}
			}
		} catch(e) {
			console.log('e',e)
		}
		setVisibleNodes();
		determineConnectedEdges();
}
function getConnectedEdges(theNode) {
	console.log('getConnectedEdges')
		var indexesOfEdgesConnectedToNode = [];
		for (var x = 0; x < rawEdges.length; x++) {
			if (rawEdges[x].to === theNode || rawEdges[x].from === theNode) {
				indexesOfEdgesConnectedToNode.push(x);
			}
		}
				
		// 		console.log('edgeCount', indexesOfEdgesConnectedToNode.length, edgeCount)
		// document.getElementById('edgeCount').innerHTML = indexesOfEdgesConnectedToNode.length + "/" + edgeCount;
		
		return indexesOfEdgesConnectedToNode;
}
function getConnectedNodes(theEdgeIndex) {
	console.log('getConnectedNodes')
		var nodesConnectedToEdge = [rawEdges[theEdgeIndex].to, rawEdges[theEdgeIndex].from];
		return nodesConnectedToEdge;
}
function getNodeById(_rawNodes, _id) {
	// console.log('start getNodeById', _id)
	
	try {
		var theNode = null;
		for (var z = 0; z < _rawNodes.length; z++) {
			if (_rawNodes[z].id === _id ) {
				theNode = _rawNodes[z];
			}
		}
		// console.log('theNode',theNode)
		return theNode;
	}
	catch(e) {
	    console.error(Math.floor(Date.now() / 1000), e)
	} 
	finally {
		// finally
		// console.log(Math.floor(Date.now() / 1000), 'finish getNodeById')
	}
}
function determineConnectedEdges() {
	console.log('determineConnectedEdges')
		var hiddenEdgesIndexes = [];
		var visibleEdgesIndexes = [];
		visibleEdges = [];
		for (var x = 0; x < rawEdges.length; x++) {
			var toNode = findObjectById(rawEdges[x].to, rawNodes) || false;
			var fromNode = findObjectById(rawEdges[x].from, rawNodes) || false;
			if (toNode.hidden === true || fromNode.hidden === true) {
				if (rawEdges[x].hidden !== true) hiddenEdgesIndexes.push(x);
				rawEdges[x].hidden = true;
			}
			else {
				if (rawEdges[x].hidden === true) visibleEdgesIndexes.push(x);
				rawEdges[x].hidden = false;
			}
			if (rawEdges[x].hidden !== true) visibleEdges.push(rawEdges[x]);
		}

}
	
function setVisibleNodes() {
		visibleNodes = [];
		for (var x = 0; x < rawNodes.length; x++) {
			if (rawNodes[x].hidden !== true) visibleNodes.push(rawNodes[x]);
		}

}	
	
function displayData(focalPoint) {
		console.log('displayData')
		console.log('focalPoint', focalPoint)
		var details = "";
		
		if (focalPoint) {
			for(var property in focalPoint) {
				if (focalPoint.hasOwnProperty(property) && property !== 'hidden' && property !== 'hiddenByDegree' ) {
					
					// control what properties get dislayed
					//console.log('property', property)
					if (property !== "@type" && property !== "rdf:type" && property !== "rdfs:subClassOf:" ) {
						var prefix = property.substring(0, property.indexOf(":"));
						//console.log('prefix', prefix)
						if ( prefix != "foafiaf" && prefix != "perse"){
							
							if ( focalPoint[property] != "" ) {
								//console.log('property', property)
								if (property != "html") {
									var shortProp = property.substring(property.indexOf(":") + 1);
									details += (shortProp + "::  " + focalPoint[property] + "<br><br>");
								}
							}
						
						}
					}
					
				}
			}
		}
		//console.log(details)
	
		// document.getElementById('propDetails').innerHTML = details;	
		// document.getElementById('popupDetails').innerHTML = htmlDetails(focalPoint);
}
	



// function htmlDetails (_entity) {
// 	//console.log('htmlDetails')
	
// 	var _html
	
// 	var _id = _entity.id || null;
// 	var _group = _entity.group || null;
// 	var _label = _entity.label || null;
	
// 	var _topic = _entity['foaf:topic'] || null;
// 	var _profile = _entity['linkedin:Profile'] || null;
// 	var _sameas = _entity['owl:sameAs'] || null;
// 	var _seealso = _entity['owl:seeAlso'] || null;
// 	var _prefLabel = _entity['skos:prefLabel'] || null;
	
// 	var _description = _entity['dc:description'] || null;

// 	var _title = _entity['dc:title'] || null;
// 	var _dcabstract = _entity['dc:abstract'] || null;
// 	var _dboabstract = _entity['dbo:abstract'] || null;
		
	
// 	var _name = _entity['foaf:name'] || null;
// 	var _givenName = _entity['foaf:givenName'] || null;
// 	var _surname = _entity['foaf:surname'] || null;
// 	var _nick = _entity['foaf:nick'] || null;
// 	var _mbox = _entity['foaf:mbox'] || null;
// 	var _phone = _entity['foaf:phone'] || null;
// 	var _motto = _entity['foaf:motto'] || null;
// 	var _homepage = _entity['foaf:homepage'] || null;
// 	var _depiction = _entity['foaf:depiction'] || null;
// 	var _knows = _entity['foaf:knows'] || null;
// 	var _member = _entity['foaf:member'] || null;
// 	var _based_near = _entity['foaf:based_near'] || null;
	
// 	var _locationCity = _entity['dbo:locationCity'] || null;
// 	var _state = _entity['dbo:state'] || null;
// 	var _country = _entity['dbo:country'] || null;
// 	var _georss = _entity['georss:point'] || null;

// 	var _has_container = _entity['sioc:has_container'] || null;
// 	var _hasPost = _entity['org:hasPost'] || null;
// 	var _unitOf = _entity['org:unitOf'] || null;
// 	var _hasUnit = _entity['org:hasUnit'] || null;
// 	var _linkedin = _entity['linkedin:Profile'] || null;	
// 	var _comment = _entity['rdfs:comment'] || null;

// 	var _aboutPerson = _entity['perse:aboutPerson'] || null;
// 	var _hasGeography = _entity['perse:hasGeography'] || null;
// 	var _hasDemography = _entity['perse:hasDemography'] || null;
// 	var _hasKnowledge= _entity['perse:hasKnowledge'] || null;
// 	var _hasExperience  = _entity['perse:hasExperience'] || null;
// 	var _hasSkill = _entity['perse:hasSkill'] || null;
// 	var _hasInterest = _entity['perse:hasInterest'] || null;
// 	var _hasPersonality  = _entity['perse:hasPersonality'] || null;

	
// 	switch(_entity.group) {
		
// 	    case "Note":

// 			var _timestamp = _entity['foafoaf:timestamp'] || null;
// 			var _Person = _entity['foafiaf:Person'] || null;
// 			var _Role = _entity['foafiaf:Role'] || null;
// 			var _assignedBy = _entity['foafiaf:assignedBy'] || null;
// 			var _assignedTo = _entity['foafiaf:assignedTo'] || null;
// 			var _dueDate = _entity['foafiaf:dueDate'] || null;

// 			var _html = '<div>'
// 			_html = _html + ' ' + _group + ' '
// 			_html = _html + ' <b>' + _prefLabel + '</b>'  + '</br>'
// 			_html = _html + '</br>'

// 			if (_Role) _html = _html + 	' role: '     + _Role + '</br>'			
// 			if (_Person) _html = _html + 	' person: '     + _Person + '</br>'
// 			_html = _html + '</br>'
			
// 			if (_title) _html = _html + 	' title: '     + _title + '</br></br>' 
			
// 			if (_description) _html = _html + 	' description: ' + _description + '</br></br>' 
			
// 			if (_dueDate) _html = _html + 	' due: '     + _dueDate + '</br></br>'
			
// 			if (_assignedTo) _html = _html + 	' assigned: '     + _assignedTo + '</br></br>'
			
// 			if (_assignedBy) _html = _html + 	' by: '     + _assignedBy + '</br></br>'
			
// 			if (_timestamp) _html = _html + 	' timestamp:    <em>' +  _timestamp   + '</em></br>' 
			
// 			_html = _html + '</div>'

// 	        break;
	        
	        
// 	    case "Strategy":
// 	    case "Project":
// 	    case "Measure":
	    	
// 			var _strategy = _entity['foafiaf:Strategy'] || null;
// 			var _project = _entity['foafiaf:Project'] || null;
// 			var _measure = _entity['foafiaf:Measure'] || null;
// 			var _status = _entity['foafiaf:status'] || null;
// 			var _color = _entity['foafiaf:color'] || null;
			
// 			var _html = '<div>'
// 			_html = _html + ' ' + _group + ' '
// 			_html = _html + ' <b>' + _label + '</b></br></br>' 
			
// 			if (_topic) _html = _html + 	' topic: '     + _topic + '</br></br>' 
			
// 			if (_description) _html = _html + 	' description: ' + _description + '</br></br>' 
			
// 			if (_strategy) _html = _html +  ' strategy: ' + _strategy + '</br></br>' 
			
// 			if (_project) _html = _html +  ' project: ' + _project + '</br></br>' 
			
// 			if (_measure) _html = _html +  ' measure: ' + _measure + '</br></br>' 
			
// 			if (_status) _html = _html +  ' status: ' + _status + '</br></br>' 
			
// 			if (_color) {
// 				_html = _html + ' color: <b><font color="' + _color + '">' + _color + '</font></b></br>'
// 			}
			
// 			if (_profile) {
// 				_html = _html + ' profile: <a href="' + _profile + '">' + _profile + '</a></br>'
// 			}
			
// 			if (_sameas) _html = _html +   ' _sameas: ' + _sameas + '</a></br>'
			
// 			if (_seealso) _html = _html +  ' seeAlso: ' + _seealso + '</br>'
			
// 			_html = _html + 	' id:    <em>' +  _id   + '</em></br>' 
			
// 			_html = _html + '</div>'	

// 	        break;
	        
// 	    default:
	        
// 	        var _html = '<div>'
// 			_html = _html + ' ' + _group + ' '
			
// 			var _header = null;
// 			if (_prefLabel) {
// 				_header = _prefLabel;
// 			} else if (_title) {
// 				_header = _title;
// 			} else {
// 				_header = _label;
// 			}
// 			if (_header) _html = _html + ' <b>' + _header + '</b>'  + '</br></br>'
			
			
// 			if (_title) _html = _html + 	' title: '     + _title + '</br></br>' 
			
// 			if (_description) _html = _html + 	' description: ' + _description + '</br></br>' 
			
// 			if (_based_near) _html = _html + 	' based near: ' + _based_near + '</br></br>'
// 			if (_locationCity) _html = _html + 	' location City: ' + _locationCity + '</br></br>'
// 			if (_state) _html = _html + 	' state: ' + _state + '</br></br>'
// 			if (_country) _html = _html + 	' country: ' + _country + '</br></br>'
// 			if (_georss) _html = _html + 	' georss: ' + _georss + '</br></br>'
			
// 			if (_name) _html = _html + 	' name:  ' + _name + '</br>'
// 			if (_givenName) _html = _html + 	' givenName:  ' + _givenName + '</br>'
// 			if (_surname) _html = _html + 	' surname: ' + _surname + '</br>'
// 			if (_nick) _html = _html + 	' nick:  ' + _nick + '</br>'
// 			if (_mbox) _html = _html + 	' mbox:  ' + _mbox + '</br>'
// 			if (_phone) _html = _html + 	' phone:  ' + _phone + '</br>'
// 			if (_motto) _html = _html + 	' motto:  ' + _motto + '</br>'
// 			if (_homepage) _html = _html + 	' homepage:  ' + _homepage + '</br>'
// 			if (_depiction) _html = _html + 	' depiction:  ' + '<img src="' + _depiction + '" >' + '</br>'
// 			if (_member) _html = _html + 	' member:  ' + _member + '</br>'
// 			if (_knows) _html = _html + 	' knows:  ' + _knows + '</br>'
// 			if (_motto) _html = _html + 	' motto:  ' + _motto + '</br>'
	
// 			if (_has_container) _html = _html +   ' has container: ' + _has_container + '</a></br></br>'
// 			if (_hasUnit) _html = _html +   ' has Unit: ' + _hasUnit + '</a></br></br>'
// 			if (_unitOf) _html = _html +   ' unit Of: ' + _unitOf + '</a></br></br>'
// 			if (_hasPost) _html = _html +   ' has Post: ' + _hasPost + '</a></br></br>'
			
// 			if (_sameas) _html = _html +   ' same As: ' + _sameas + '</a></br></br>'
// 			if (_seealso) _html = _html +  ' see Also: ' +'<a href="' + _seealso + '"  target="_blank" >' + _seealso + '</a>' + '</br></br>'
// 			if (_profile) _html = _html +  ' profile: '+ '<a href="' + _profile + '"  target="_blank" >' + _profile + '</a>' + '</br></br>'
			
// 			if (_comment) _html = _html +  ' comment: ' + _comment + '</br></br>'
// 			if (_dcabstract) _html = _html +  ' _dcabstract: ' + _dcabstract + '</br></br>'
			
// 			if (_aboutPerson) _html = _html +  ' _aboutPerson: ' + _aboutPerson + '</br></br>'
// 			if (_hasGeography) _html = _html +  ' _hasGeography: ' + _hasGeography + '</br></br>'
// 			if (_hasDemography) _html = _html +  ' _hasDemography: ' + _hasDemography + '</br></br>'
// 			if (_hasKnowledge) _html = _html +  ' _hasKnowledge: ' + _hasKnowledge + '</br></br>'
// 			if (_hasExperience) _html = _html +  ' _hasExperience: ' + _hasExperience + '</br></br>'
// 			if (_hasSkill) _html = _html +  ' _hasSkill: ' + _hasSkill + '</br></br>'
// 			if (_hasInterest) _html = _html +  ' _hasInterest: ' + _hasInterest + '</br></br>'
// 			if (_hasPersonality) _html = _html +  ' _hasPersonality: ' + _hasPersonality + '</br></br>'
			
			
	
	
// 			_html = _html + 	' id:    <em>' +  _id   + '</em></br>' 
		
// 			_html = _html + '</div>'
			
// 	} // end switch

// 	return _html ;

// }



  }
  catch(e) {
    console.error(Math.floor(Date.now() / 1000), e)
  } 
  finally {
	// stop spinner
	// if (spinner) { console.log('spinner before stop', spinner); spinner.stop(); };   
	// console.log(Math.floor(Date.now() / 1000), 'spinner stopped',spinner)
	// finally
	console.log(Math.floor(Date.now() / 1000), 'finish doNetwork')
  }
} // end doNetwork
exports = doNetwork()


// utility functions
function findObjectById(objectId, objectArray){
	  try {
		for (var i=0; i < objectArray.length; i++) {
			if (objectArray[i].id === objectId) {
				return objectArray[i];
			}
		}
	  } catch(e) {
	  	console.log('e', e)
	  	console.log('objectId', objectId )
	  	console.log('objectArray', objectArray )
	  }
}
exports = findObjectById()


//
// Sections for building nodes and edges
//
function buildRawNodes(data) {
	console.log('buildRawNodes',data)

	var propNodes = false;
	//
	//  Create an array of raw nodes
	//

	var rawNodes = data['@graph'] || [];
	
	// loop over nodes to determine and add id, group, title, label
	for (var i = 0; i < rawNodes.length; i++) {
		var _id = rawNodes[i]['@id'];
		
		if (_id != './') {
		
			rawNodes[i].id = _id;
				// console.log("rawNodes[i].id", rawNodes[i].id)
			
			var _type = rawNodes[i]['@type'] || "";	
			_type = _type.replace("-", "");
			rawNodes[i].type = _dbotype || _type;	
				//console.log("rawNodes[i].type", rawNodes[i].type
				
			var _dbotype = rawNodes[i]['dbo:type'] || "";
			if (  Array.isArray(_dbotype) ) {
					_dbotype = null
			} else {
					_dbotype = _dbotype.replace("-", "");
			}
			rawNodes[i].dbotype = _dbotype;
				//console.log("rawNodes[i].dbotype", rawNodes[i].dbotype)
				
				
			var _group = null;
			if 	(_dbotype) {
				_group = _dbotype.substring(_dbotype.indexOf(":") + 1);
			} else {
				_group = _type.substring(_type.indexOf(":") + 1);
			}
			rawNodes[i].group = _group;
				//console.log("rawNodes[i].group ", rawNodes[i].group)
			
			
			// check status and color and change to color specific icon
			var _status = rawNodes[i]['foafiaf:status'] || "";
			var _color = rawNodes[i]['foafiaf:color'] || "";
			if (_group === "Measure") {
				// console.log("")
				// console.log("rawNodes[i]", rawNodes[i])
				console.log("_group _status _color", _status, _group,_color)
				// console.log("")
				
				if ( (_color === "#FF0000") || (_status === "Red") ) {
					_group = _group + "Red"
					console.log("_group", _group)
					
				} else if ( (_color === "#FFA500") || (_status === "Orange") )  {
					_group = _group + "Orange"
					console.log("_group", _group)
					
				} else if ( (_color === "#FFFF00") || (_status === "Yellow") ) {
					_group = _group + "Yellow"
					console.log("_group", _group)
					
				} else if ( (_color === "#008000") || (_status === "Green") ) {
					_group = _group + "Green"
					console.log("_group", _group)
					
				}
				rawNodes[i].group = _group;
				
			}
			
			
			var _label = null;
			_label = rawNodes[i]['rdfs:label'];
			rawNodes[i].label = _label;
			
			var _prefLabel = null;
			_prefLabel = rawNodes[i]['skos:prefLabel'];
			rawNodes[i].prefLabel = _prefLabel;
			//console.log('rawNodes[i].prefLabel', rawNodes[i].prefLabel)
			
			var _topic = rawNodes[i]['foaf:topic'] || null;
			var _description = rawNodes[i]['dc:description'] || null;
			var _definition = rawNodes[i]['skos:definition'] || null;
			
			var _title = null;
			_title = _prefLabel || _label ;
			rawNodes[i].title = "<b>" + _group + ":</b> " + _title
			// call function to prepare html block for hover or popup
			// and overwrite plain title
			rawNodes[i].html = htmlDetails(rawNodes[i])
			//console.log('rawNodes[i].html', rawNodes[i].html)
			
			    //rawNodes[i].title = htmlDetails(rawNodes[i])
				//console.log('rawNodes[i].title', rawNodes[i].title)
		
			//  console.log(' rawNodes[i] ', JSON.stringify(rawNodes[i]) )	
			
			//
			// Now loop over properties of the node and add nodes of group 'property'
			//
			if (propNodes) {
				var propNodes = getPropertyNodes(rawNodes[i])
			}
		
		} // end if _id
		
	}; // end loop over nodes
		
		// var nodeCount = rawNodes.length
		// console.log('nodeCount', nodeCount)
		// document.getElementById('nodeCount').innerHTML = nodeCount;
	return rawNodes
} // end build raw nodes
exports = buildRawNodes()

function buildRawEdges(rawNodes) {
	console.log('buildRawEdges',rawNodes)

	//
	// Create an array of raw edges
	//
	var rawEdges = []
	for (var j = 0; j < rawNodes.length; j++) {
		//if (rawNodes[j]['@id'] === 'perse:CampaignPersonalizationOptions') console.log(rawNodes[j])
		for (var property in rawNodes[j]) {

			// check if properity value is array but is quoted
			// if ( property == "sioc:has_container" ) console.log("rawNodes[j] ", rawNodes[j])
			var propval = rawNodes[j][property]
			
		 if (propval != "") {

			function isJSON(data) {
			   var ret = true;
			   try {
			      JSON.parse(data);
			   }catch(e) {
			      ret = false;
			   }
			   return ret;
			}

// if ( property == "sioc:has_container" ) {
	
// 	console.log ('typeof property', typeof property)

// 			if ( isJSON(propval) ) {
// 				var parsed = JSON.parse(propval);
// 				// console.log('propval is JSON', propval, parsed)
// 			} else {
// 				var stringified = JSON.stringify(propval)
// 				// console.log('propval is not JSON', propval, stringified)
// 			}
// }

			// if ( property == "sioc:has_container" ) console.log("propval ", propval)
			

			if ( property != "@id" && property != "id") {				// do not show edge for id property							// do not show @id relationship to self
				
				if ( (typeof rawNodes[j][property]) === 'string') {		// check if property value is a string ie. a single entry
					  var strProp = rawNodes[j][property] || "";
					  //if(strProp){
					  //	strProp = strProp.replace("['", "");
					  //	strProp = strProp.replace("']", "");
					  //}
					  //console.log("strProp", strProp)
					  
					  //if ( property == "sioc:has_container" ) console.log("strProp ", strProp)
					  
					  var relLabel = property.substring(property.indexOf(":") + 1);
					  
					  //if ( property == "sioc:has_container" ) console.log("relLabel ", relLabel)
					  
					  if ( strProp.indexOf("foafiaf:") != -1 ) {		// check to see of value starts with foafiaf: therefoe an entity relationship
						var newEdge = {};
						newEdge.arrows = {"to":"true"};
						newEdge.from = rawNodes[j].id;
						newEdge.to = strProp;
						newEdge.label = relLabel;
						
						// if ( property == "sioc:has_container" ) console.log("newEdge ", newEdge)
						
						rawEdges.push(newEdge);
					  } // end if foafiaf
				} // end if string
				
				if ( Array.isArray(rawNodes[j][property]) ) {
					
					// if ( property == "sioc:has_container" ) console.log("rawNodes[j][property] ", rawNodes[j][property])
					
					for (var k = 0; k < rawNodes[j][property].length; k++) {
						//console.log("[property][k]", rawNodes[j][property][k])
						
						if ( property == "sioc:has_container" ) console.log("rawNodes[j][property][k]", rawNodes[j][property][k])
						
						
						var relLabel = property.substring(property.indexOf(":") + 1);
						
						if ( property == "sioc:has_container" ) console.log("relLabel ", relLabel)
						
						var newEdge = {};
						newEdge.arrows = {"to":"true"};
						newEdge.from = rawNodes[j].id;
						newEdge.to = rawNodes[j][property][k];
						newEdge.label = relLabel;
						//console.log(newEdge)
						
						if ( property == "sioc:has_container" ) console.log("newEdge ", newEdge)
						
						rawEdges.push(newEdge);
					}
				} // end if array
				
			} // end if id
			
		 } // end if != ""
		 
		} // end for property
		
	}; // end of loop to create rawedges
	
		// edgeCount = rawEdges.length
		// console.log('edgeCount', edgeCount)
		// document.getElementById('edgeCount').innerHTML = edgeCount;
	// console.log('rawEdges',JSON.stringify(rawEdges))
	return rawEdges
} // end build edges
exports = buildRawEdges()
