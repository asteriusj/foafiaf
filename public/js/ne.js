//  when the graph data upload is complete, process data
function dataReceived(data) {
	console.log('dataReceived')
	
	if (spinner) spinner.spin() ;
    //console.log('data', JSON.stringify(data))
    
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
	
	//
	var rawNodes = [];
	var rawEdges = [];
	var visibleNodes = [];
	var visibleEdges = [];
	
	//	Build Raw Nodes and Edges from Raw Data
	rawNodes = buildRawNodes(data)
	rawEdges = buildRawEdges(rawNodes)
	//console.log('rawNodes', JSON.stringify(rawNodes))
	//console.log('rawEdges', JSON.stringify(rawEdges))
	
	
	visibleNodes = getVisibleNodes(rawNodes, rawEdges, selectedNodeID)
	visibleEdges = rawEdges;
	
	//
	// Find selected node, display details and determine nodes within n degrees
	//
	var selectedNode = getNodeById(rawNodes, selectedNodeID) || null ;
	console.log('selectedNode',selectedNode)
	displayData(selectedNode);
	

	//console.log('visibleNodes', JSON.stringify(visibleNodes) )
	//console.log('visibleEdges', JSON.stringify(visibleEdges) )
	var network = setNetwork(visibleNodes, visibleEdges)
	network.once("afterDrawing", function(){
		console.log('network.once')
		zoomToSelectedNode(selectedNodeID, network);
		// stop spinner
		if (spinner) spinner.spin() ; 
		console.log('spinner',spinner)
	});
	
	//  network graph click event
	network.on("click", function(selected){
		console.log('')
		console.log('network.on click')
		console.log('')
		// start spinner
		var target = document.getElementById('mainArea')
		var spinner = new Spinner().spin(target);
		console.log('spinner',spinner)
		//console.log('selected', selected)
		
		var nodeId = selected.nodes.toString();
		var edgeId = selected.edges.toString();
		
		console.log('nodeId', nodeId)
		console.log('edgeId', edgeId)
			
		//  if a node is selected, hide any nodes outside the selected number N degrees
		if(nodeId) {
			selectedNode = getNodeById(rawNodes, nodeId)
			console.log('from nodeId selectedNode', selectedNode)
			//  display node or edge data in the sidebar for selected element
			displayData(selectedNode);
			
			visibleNodes = getVisibleNodes(rawNodes, rawEdges, nodeId)
			visibleEdges = rawEdges
			console.log('new visibleNodes',visibleNodes)
			console.log('new visibleEdges',visibleEdges)
			
			network.setData({nodes:new vis.DataSet(visibleNodes), edges:new vis.DataSet(visibleEdges)});
			//network = setNetwork(visibleNodes, visibleEdges)
			
			network.once("afterDrawing", function(){
				zoomToSelectedNode(nodeId, network);
				// stop spinner
				if (spinner) spinner.stop() ; 
			});
		}
	});
	
	
	
	
// FUNCTIONS	
function setNetwork(visibleNodes, visibleEdges ){
	
	var nodes = new vis.DataSet(visibleNodes);
	//console.log('nodes', JSON.stringify(nodes))
	var edges = new vis.DataSet(visibleEdges);
	//console.log('edges', JSON.stringify(edges))
		
		
	// create a network from nodes and edges
	var container = document.getElementById('mynetwork');
	var data = {
        manifest: '',
        nodes: nodes,
        edges: edges
      };
	//console.log(JSON.stringify(dnodeata))
	
	
	/// SET NETWORK !!!
	var options = getOptions();
	//var options = getVisOptions();
	//var options = {layout:{randomSeed:10,improvedLayout:false},interaction:{dragNodes:true,dragView:true,hideEdgesOnDrag:false,hideNodesOnDrag:false,hover:true,hoverConnectedEdges:true,keyboard:{enabled:true,speed:{x:10,y:10,zoom:0.02},bindToWindow:true},multiselect:false,navigationButtons:false,selectable:true,selectConnectedEdges:true,tooltipDelay:300,zoomView:true},physics:{solver:'forceAtlas2Based',maxVelocity:10,minVelocity:1,},groups:{property:{shape:'dot',size:18,color:'pink'},Education:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'brown'}},EducationalOrganization:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'grey'}},EducationalInstitution:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'black'}},Public_university:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'blue'}},University:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'Navy'}},College:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'Blue'}},Community_college:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'Blue'}},Library:{shape:'icon',icon:{face:'FontAwesome',code:'\uf19c',size:45,color:'brown'}},Job:{shape:'icon',icon:{face:'FontAwesome',name:'fa-magic',code:'\uf0d0',size:50,color:'black'}},WorkHistory:{shape:'icon',icon:{face:'FontAwesome',name:'fa-magic',code:'\uf0d0',size:50,color:'YellowGreen'}},Person:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'Crimson'}},BusinessPerson:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'IndianRed'}},Politician:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'DarkSalmon'}},OfficeHolder:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'LightSalmon'}},OrganisationMember:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'Magenta'}},Group:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:50,color:'#57169a'}},Organization:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:45,color:'blue'}},OrganizationalUnit:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:45,color:'Teal'}},Company:{shape:'icon',icon:{face:'FontAwesome',name:'fa-building-0',code:'\uf0f7',size:50,color:'OrangeRed '}},Government:{shape:'icon',icon:{face:'FontAwesome',name:'fa-building',code:'\uf1ad',size:45,color:'SaddleBrown'}},GovernmentAgency:{shape:'icon',icon:{face:'FontAwesome',name:'fa-building',code:'\uf1ad',size:45,color:'Sienna'}},Municipality:{shape:'icon',icon:{face:'FontAwesome',name:'fa-building',code:'\uf1ad',size:40,color:'RoyalBlue'}},Legislature:{shape:'icon',icon:{face:'FontAwesome',code:'\uf19c',size:45,color:'grey'}},NonProfit:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:50,color:'YellowGreen'}},NonProfitOrganisation:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:50,color:'ForestGreen'}},NGO:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:50,color:'SpringGreen'}},Faith:{shape:'icon',icon:{face:'FontAwesome',code:'\uf004',size:40,color:'Chocolate'}},ReligiousOrganisation:{shape:'icon',icon:{face:'FontAwesome',code:'\uf004',size:40,color:'DarkGoldenrod'}},State:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:60,color:'Indigo'}},Region:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:60,color:'Indigo'}},City:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:60,color:'DarkSlateGray'}},Village:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:50,color:'Gray'}},Town:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:45,color:'LightGrey'}},Role:{shape:'icon',icon:{face:'FontAwesome',code:'\uf21d',size:55,color:'BlueViolet'}},Place:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:55,color:'blue'}},Tags:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tags',code:'\uf02c',size:50,color:'YellowGreen'}},Tag:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'YellowGreen'}},ConceptScheme:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tags',code:'\uf02c',size:50,color:'YellowGreen'}},Concept:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'YellowGreen'}},Perse:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tags',code:'\uf02c',size:40,color:'OrangeRed'}},Personality:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'OrangeRed'}},MBTI:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'Green'}},MBTI_profile:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'Green'}},DiSC:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'Green'}},Traxion:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'Green'}},Interest:{shape:'icon',icon:{face:'FontAwesome',name:'fa-search',code:'\uf002',size:50,color:'OrangeRed'}},Skill:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'OrangeRed'}},Knowledge:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'OrangeRed'}},Experience:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'OrangeRed'}}}}
    //var options = {physics:{solver:'forceAtlas2Based',maxVelocity:10,minVelocity:1,},groups:{property:{shape:'dot',size:18,color:'pink'},Education:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'brown'}},EducationalOrganization:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'grey'}},EducationalInstitution:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'black'}},Public_university:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'blue'}},University:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'Navy'}},College:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'Blue'}},Library:{shape:'icon',icon:{face:'FontAwesome',code:'\uf19c',size:45,color:'brown'}},Job:{shape:'icon',icon:{face:'FontAwesome',name:'fa-magic',code:'\uf0d0',size:50,color:'black'}},WorkHistory:{shape:'icon',icon:{face:'FontAwesome',name:'fa-magic',code:'\uf0d0',size:50,color:'YellowGreen'}},Person:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'Crimson'}},BusinessPerson:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'IndianRed'}},Politician:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'DarkSalmon'}},OfficeHolder:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'LightSalmon'}},OrganisationMember:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'Magenta'}},Group:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:50,color:'#57169a'}},Organization:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:45,color:'blue'}},OrganizationalUnit:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:45,color:'Teal'}},Company:{shape:'icon',icon:{face:'FontAwesome',name:'fa-building-0',code:'\uf0f7',size:50,color:'OrangeRed '}},Government:{shape:'icon',icon:{face:'FontAwesome',name:'fa-building',code:'\uf1ad',size:45,color:'SaddleBrown'}},GovernmentAgency:{shape:'icon',icon:{face:'FontAwesome',name:'fa-building',code:'\uf1ad',size:45,color:'Sienna'}},Municipality:{shape:'icon',icon:{face:'FontAwesome',name:'fa-building',code:'\uf1ad',size:40,color:'RoyalBlue'}},Legislature:{shape:'icon',icon:{face:'FontAwesome',code:'\uf19c',size:45,color:'grey'}},NonProfit:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:50,color:'YellowGreen'}},NonProfitOrganisation:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:50,color:'ForestGreen'}},NGO:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:50,color:'SpringGreen'}},Faith:{shape:'icon',icon:{face:'FontAwesome',code:'\uf004',size:40,color:'Chocolate'}},ReligiousOrganisation:{shape:'icon',icon:{face:'FontAwesome',code:'\uf004',size:40,color:'DarkGoldenrod'}},State:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:60,color:'Indigo'}},Region:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:60,color:'Indigo'}},City:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:60,color:'DarkSlateGray'}},Village:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:50,color:'Gray'}},Town:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:45,color:'LightGrey'}},Role:{shape:'icon',icon:{face:'FontAwesome',code:'\uf21d',size:55,color:'BlueViolet'}},Place:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:55,color:'blue'}},Tags:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tags',code:'\uf02c',size:50,color:'YellowGreen'}},Tag:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'YellowGreen'}},ConceptScheme:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tags',code:'\uf02c',size:50,color:'YellowGreen'}},Concept:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'YellowGreen'}},Perse:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tags',code:'\uf02c',size:40,color:'OrangeRed'}},Personality:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'OrangeRed'}},MBTI:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'Green'}},MBTI_profile:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'Green'}},DiSC:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'Green'}},Traxion:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'Green'}},Interest:{shape:'icon',icon:{face:'FontAwesome',name:'fa-search',code:'\uf002',size:50,color:'OrangeRed'}},Skill:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'OrangeRed'}},Knowledge:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'OrangeRed'}},Experience:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'OrangeRed'}},group:{shape:'icon',icon:{face:'FontAwesome',code:'\uf0c0',size:50,color:'#57169a'}},team:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'grey'}},person:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'#aa00ff'}},role:{shape:'icon',icon:{face:'FontAwesome',code:'\uf21d',size:50,color:'#6E6EFD'}},organization:{shape:'icon',icon:{face:'FontAwesome',code:'\uf0e8',size:50,color:'blue'}},orgbiz:{shape:'icon',icon:{face:'FontAwesome',code:'\uf069',size:50,color:'#57169a'}},orggov:{shape:'icon',icon:{face:'FontAwesome',code:'\uf19c',size:50,color:'blue'}},orgnonprofit:{shape:'icon',icon:{face:'FontAwesome',code:'\uf069',size:50,color:'green'}},orgfaith:{shape:'icon',icon:{face:'FontAwesome',code:'\uf004',size:50,color:'cyan'}},globe:{shape:'icon',icon:{face:'Ionicons',code:'\uf276',size:66,color:'#6E6EFD'}},marker:{shape:'icon',icon:{face:'FontAwesome',code:'\uf041',size:50,color:'#FB7E81'}},book:{shape:'icon',icon:{face:'FontAwesome',code:'\uf02d',size:50,color:'#C2FABC'}},film:{shape:'icon',icon:{face:'FontAwesome',code:'\uf008',size:55,color:'#6E6EFD'}},tags:{shape:'icon',icon:{face:'FontAwesome',code:'\uf02c',size:40,color:'lime'}},tag:{shape:'icon',icon:{face:'FontAwesome',code:'\uf02b',size:40,color:'lime'}},projects:{shape:'icon',icon:{face:'FontAwesome',code:'\uf0ae',size:44,color:'#800000'}},project:{shape:'icon',icon:{face:'FontAwesome',code:'\uf03a',size:40,color:'maroon'}},bullseye:{shape:'icon',icon:{face:'FontAwesome',code:'\uf140',size:40,color:'red'}},puzzle:{shape:'icon',icon:{face:'FontAwesome',code:'\uf12e',size:40,color:'yellow'}},cubes:{shape:'icon',icon:{face:'FontAwesome',code:'\uf1b3',size:44,color:'black'}},cube:{shape:'icon',icon:{face:'FontAwesome',code:'\uf1b2',size:40,color:'black'}}}};
	
	console.log('container',container)
	console.log('options',options)
	var network = new vis.Network(container, data, options);
	return network
}

function getVisibleNodes(rawNodes, rawEdges, _selectedNodeId) {	
	console.log('getVisibleNodes')
	console.log(' _selectedNodeId',_selectedNodeId)
	
	var _visibleNodes = []
	var nd = getNodeById(rawNodes, _selectedNodeId) || null ;
	if (_visibleNodes.indexOf(nd) < 0 ) _visibleNodes.push(nd) ;

	// select visible edges and visible nodes
	// loop over edges, add edges that have from selected node, add to node
	console.log('rawEdges.length',rawEdges.length)
	for (var v = 0; v < rawEdges.length; v++) {
		var eg = rawEdges[v];
		//console.log('eg',eg)
		
		// if fromId is selectedID, then select toId as visibleNode (add edge as well)
		var fromId = eg.from;
		if (fromId === _selectedNodeId) {
			var toId = eg.to;
			//console.log('fromId',fromId)
			//console.log('toId',toId)
			var nd = getNodeById(rawNodes, toId) || null ;
			if (nd) {
				if (_visibleNodes.indexOf(nd) < 0 )  {
					//console.log('fromId',fromId)
					//console.log('toId',toId)
					console.log('nd', nd.id)
					_visibleNodes.push(nd) ;
					
				}
			}
		} // end if fromId
		// if toId is selectedID, then select fromId as visibleNode (add edge as well)
		var toId = eg.to;
		if (toId === _selectedNodeId) {
			var fromId = eg.from;
			//console.log('toId',toId)
			//console.log('fromId',fromId)
			//if ( toId.indexOf("foafiaf:") != -1 ) {		// check to see of value starts with foafiaf: therefoe an entity reltionship
			var nd = getNodeById(rawNodes, fromId) || null ;
			if (nd) {
				if (_visibleNodes.indexOf(nd) < 0 )  {
					//console.log('toId',toId)
					//console.log('fromId',fromId)
					console.log('nd', nd.id)
					_visibleNodes.push(nd) ;
				}
			}
			//}
		} // end if fromId
	} // end for edges
	return _visibleNodes
} // set visibles

function buildRawNodes(data) {
	console.log('buildRawNodes')
	//
	//  Create an array of raw nodes
	//
	var rawNodes = data['@graph'];
	
	// loop over nodes to determine and add id, group, title, label
	for (var i = 0; i < rawNodes.length; i++) {
		var _id = rawNodes[i]['@id'];
		rawNodes[i].id = _id;
			console.log("rawNodes[i].id", rawNodes[i].id)
		
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
		
		var _label = null;
		_label = rawNodes[i]['rdfs:label'];
		rawNodes[i].label = _label;
		
		var _prefLabel = null;
		_prefLabel = rawNodes[i]['skos:prefLabel'];
		rawNodes[i].prefLabel = _prefLabel;
		console.log('rawNodes[i].prefLabel', rawNodes[i].prefLabel)
		
		var _topic = rawNodes[i]['foaf:topic'] || null;
		var _description = rawNodes[i]['dc:description'] || null;
		var _definition = rawNodes[i]['skos:definition'] || null;
		
		var _title = null;
		_title = _prefLabel || _label ;
		rawNodes[i].title = _title
		// call function tp prepare html block for hover or popup
		// and overwrite plain title
		
		
		//    rawNodes[i].title = htmlDetails(rawNodes[i])
		console.log('rawNodes[i].title', rawNodes[i].title)
	
	
		//console.log(' rawNodes[i] ', JSON.stringify(rawNodes[i]) )	
		
	}; // end loop over nodes
	return rawNodes
} // end build raw nodes
	
function buildRawEdges(rawNodes) {
	console.log('buildRawEdges')
	//
	// Create an array of raw edges
	//
	var rawEdges = []
	for (var j = 0; j < rawNodes.length; j++) {
		//if (rawNodes[j]['@id'] === 'perse:CampaignPersonalizationOptions') console.log(rawNodes[j])
		for (var property in rawNodes[j]) {
			//console.log("property ", property)
			
			if ( property != "@id" && property != "id") {				// do not show edge for id property							// do not show @id relationship to self
				
				if ( (typeof rawNodes[j][property]) === 'string') {		// check if property value is a string ie. a single entry
					var strProp = rawNodes[j][property] || ""
					  //console.log("strProp", strProp)
					  var relLabel = property.substring(property.indexOf(":") + 1);
					  
					  if ( strProp.indexOf("foafiaf:") != -1 ) {		// check to see of value starts with foafiaf: therefoe an entity relationship
						var newEdge = {};
						newEdge.arrows = {"to":"true"};
						newEdge.from = rawNodes[j].id;
						newEdge.to = strProp;
						newEdge.label = relLabel;
						
						rawEdges.push(newEdge);
					  } // end if foafiaf
				} // end if string
				
				if ( Array.isArray(rawNodes[j][property]) ) {
					for (var k = 0; k < rawNodes[j][property].length; k++) {
						//console.log("[property][k]", rawNodes[j][property][k])
						var relLabel = property.substring(property.indexOf(":") + 1);
						
						var newEdge = {};
						newEdge.arrows = {"to":"true"};
						newEdge.from = rawNodes[j].id;
						newEdge.to = rawNodes[j][property][k];
						newEdge.label = relLabel;
						//console.log(newEdge)
						rawEdges.push(newEdge);
					}
				} // end if array
				
			} // end if id
		}	
		
	}; // end of loop to create rawedges
	return rawEdges
} // end build edges

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
		var indexesOfEdgesConnectedToNode = [];
		for (var x = 0; x < rawEdges.length; x++) {
			if (rawEdges[x].to === theNode || rawEdges[x].from === theNode) {
				indexesOfEdgesConnectedToNode.push(x);
			}
		}
		return indexesOfEdgesConnectedToNode;
}
function getConnectedNodes(theEdgeIndex) {
		var nodesConnectedToEdge = [rawEdges[theEdgeIndex].to, rawEdges[theEdgeIndex].from];
		return nodesConnectedToEdge;
}
function getNodeById(_rawNodes, _id) {
		var theNode = null;
		for (var z = 0; z < _rawNodes.length; z++) {
			if (_rawNodes[z].id === _id ) {
				theNode = _rawNodes[z];
			}
		}
		return theNode;
}
function determineConnectedEdges() {
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
		
		document.getElementById('edgeCount').innerHTML = visibleEdges.length;
	}
	
	function setVisibleNodes() {
		visibleNodes = [];
		for (var x = 0; x < rawNodes.length; x++) {
			if (rawNodes[x].hidden !== true) visibleNodes.push(rawNodes[x]);
		}
		document.getElementById('nodeCount').innerHTML = visibleNodes.length;
	}	
	
function displayData(focalPoint) {
		console.log('displayData')
		var details = "";
		for(var property in focalPoint) {
			if (focalPoint.hasOwnProperty(property) && property !== 'hidden' && property !== 'hiddenByDegree' ) {
				
				// control what properties get dislayed
				
				if (property !== "@type" && property !== "rdf:type" && property !== "rdfs:subClassOf:" ) {
					if ( focalPoint[property] != "" ) {
						var shortProp = property.substring(property.indexOf(":") + 1);
						details += (shortProp + "::  " + focalPoint[property] + "<br><br>");
					}
				}
				
			}
		}
		//console.log(details)
		document.getElementById('propDetails').innerHTML = details;	
}
	
function zoomToSelectedNode(_selectedNodeId, _network) {
	console.log('zoomToSelectedNode')
	
	var moveToOptions = {
		scale: 1.10,              // scale to animate to  (Number)
		offset: {x:0, y:0},      // offset from the center in DOM pixels (Numbers)
		animation: {             // animation object, can also be Boolean
		  duration: 1000,                 // animation duration in milliseconds (Number)
		  easingFunction: "linear" // Animation easing function, available are:  linear, easeInQuad, easeOutQuad, easeInOutQuad,
		}                                   // easeInCubic, easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart,
	}                                       // easeInQuint, easeOutQuint, easeInOutQuint
	console.log('zoom to ',_selectedNodeId)
	console.log('moveToOptions',moveToOptions)
	if(_selectedNodeId) _network.focus(_selectedNodeId, moveToOptions);	
}


	function htmlDetails (_entity) {
		var _html
		
		var _id = _entity.id || null;
		var _group = _entity.group || null;
		var _label = _entity.label || null;
		
		var _topic = _entity['foaf:topic'] || null;
		var _profile = _entity['linkedin:Profile'] || null;
		var _sameas = _entity['owl:sameAs'] || null;
		var _seealso = _entity['owl:seeAlso'] || null;
		
		var _strategy = _entity['foafiaf:Strategy'] || null;
		var _project = _entity['foafiaf:Project'] || null;
		var _measure = _entity['foafiaf:Measure'] || null;
		var _status = _entity['foafiaf:status'] || null;
		var _color = _entity['foafiaf:color'] || null;
		
		var _html = '<div>'
		_html = _html + ' ' + _group + '</br>'
		_html = _html + ' <b>' + _label + '</b></br></br>' 
		if (_topic) _html = _html + 	' topic: '     + _topic + '</br>' 
		
		//if (_description) _html = _html + 	' description: ' + _description + '</br>' 
		
		if (_strategy) _html = _html +  ' strategy: ' + _strategy + '</br>' 
		
		if (_project) _html = _html +  ' project: ' + _project + '</br>' 
		
		if (_measure) _html = _html +  ' measure: ' + _measure + '</br>' 
		
		if (_status) _html = _html +  ' status: ' + _status + '</br>' 
		
		if (_color) {
			_html = _html + ' color: <b><font color="' + _color + '">' + _color + '</font></b></br>'
		}
		
		if (_profile) {
			_html = _html + ' profile: <a href="' + _profile + '">' + _profile + '</a></br>'
		}
		
		if (_sameas) {
			_html = _html + ' profile: <a target="_new" href="' + _sameas + '">' + _sameas + '</a></br>'
		}
		
		if (_seealso) _html = _html +  ' seeAlso: ' + _seealso + '</br>'
		
		_html = _html + 	' id:    <em>' +  _id   + '</em></br>' 
		
		_html = _html + '</div>'
		
		return _html ;
	}
	
}
