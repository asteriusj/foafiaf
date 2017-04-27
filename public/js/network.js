//  when the graph data upload is complete, process data
function dataReceived(data) {
	console.log('dataReceived')
	
//const target = document.getElementById('canvasArea')
//console.log('target',target)
//var spinner = new Spinner().spin(target);
if (spinner) spinner.spin() ; 
console.log('spinner spin on dataRecieved',spinner)

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
	
	if (showall) {
		showAll = showall
	}
	console.log('showAll - > ', showAll)
	
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
	
	
	
	//
	// Find selected node, display details and determine nodes within n degrees
	//
	var selectedNode = getNodeById(rawNodes, selectedNodeID) || null ;
	//selectedNode = null
	console.log('selectedNode',selectedNode)
	
	if (selectedNode) {
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
		mouseover(selectedNode);
	}
	

	//console.log('visibleNodes', JSON.stringify(visibleNodes) )
	//console.log('visibleEdges', JSON.stringify(visibleEdges) )
	var network = setNetwork(visibleNodes, visibleEdges)
	network.once("afterDrawing", function(){
		console.log('network.once')
		zoomToSelectedNode(selectedNodeID, network);
		// stop spinner
		if (spinner) spinner.stop() ; 
		console.log('spinner stop afterDrawing',spinner)
	});
	
	
	

	//
	//  network graph click events
	//
	var doubleClickTime = 0;
	var threshold = 200;
	
	//  network graph click event
	network.on("click", function(selected){
			console.log('')
			console.log('network.on click')
			console.log('')
			
			var t0 = new Date();
		    if (t0 - doubleClickTime > threshold) {
		        setTimeout(function () {
		            if (t0 - doubleClickTime > threshold) {
		                doOnClick();
		                
		            }
		        },threshold);
		    }
			
			function doOnClick() {
			    console.log("execute onClick function");
			    
			    // spin spinner
// const target = document.getElementById('canvasArea')
//console.log('target',target)
if (spinner) spinner.spin() ; 
console.log('spin spinner on click',spinner)
				
				
				console.log('selected', selected)
				
				var nodeId = selected.nodes.toString();
				var edgeId = selected.edges.toString();
				let event = selected.event;
				let pointer = selected.pointer;
				
				console.log('nodeId', nodeId)
				console.log('edgeId', edgeId)
				console.log('pointer', pointer)
				console.log('event', event)
					
				//  if a node is selected, hide any nodes outside the selected number N degrees
				if(nodeId) {
					selectedNode = getNodeById(rawNodes, nodeId)
					//console.log('from nodeId selectedNode', selectedNode)
					//  display node or edge data in the sidebar for selected element
					if (selectedNode) {
						displayData(selectedNode);
						mouseover(selectedNode);
					}
					
					visibleNodes = getVisibleNodes(rawNodes, rawEdges, nodeId)
					visibleEdges = rawEdges
					//console.log('new visibleNodes',visibleNodes)
					//console.log('new visibleEdges',visibleEdges)
					
					network.setData({nodes:new vis.DataSet(visibleNodes), edges:new vis.DataSet(visibleEdges)});
					//network = setNetwork(visibleNodes, visibleEdges)
					
					network.once("afterDrawing", function(){
						zoomToSelectedNode(nodeId, network);
						// stop spinner
						if (spinner) spinner.stop() ; 
						console.log('spinner stopped', spinner)
					});
				}

			}
			
	}); // end on click
	

	network.on('showPopup', function(selected){
		console.log('')
		 console.log('network.on showPopup')
		 console.log('')
		 console.log('selected', selected)

		//  if a node is selected, hide any nodes outside the selected number N degrees
		if ((selected.node) || (selected)) {
			selectedNode = getNodeById(rawNodes, selected.node)
			console.log('from nodeId selectedNode', selectedNode)
			//  display node or edge data in the sidebar for selected element
			if (selectedNode) {
				displayData(selectedNode);
				mouseover(selectedNode);
			}
		}
	
	}); // end showPopup
	network.on('hidePopup', function(selected){
		console.log('')
		 console.log('network.on hidePopup')
		 console.log('')
	
	}); // end hidePopup
	
	
	network.on('hoverNode', function(selected){
		console.log('')
		 console.log('network.on hoverNode')
		 console.log('')

	    // console.log("execute hoverNode function");
	    
	    console.log('selected', selected)

		//  if a node is selected, hide any nodes outside the selected number N degrees
		if (selected.node) {
			selectedNode = getNodeById(rawNodes, selected.node)
			console.log('from nodeId selectedNode', selectedNode)
			//  display node or edge data in the sidebar for selected element
			if (selectedNode) {
				displayData(selectedNode);
				mouseover(selectedNode);
			}
		}

	}); // end on hoverNode
	
	network.on('blurNode', function(selected){
		console.log('')
		 console.log('network.on blurNode')
		 console.log('')
	
	}); // end on blurNode
	
	network.on('hoverEdge', function(selected){
		console.log('')
		 console.log('network.on hoverEdge')
		 console.log('')
	
	}); // end on hoverEdge
	network.on('blurEdge', function(selected){
		console.log('')
		 console.log('network.on blurEdge')
		 console.log('')
	
	}); // end on blurNode
	
	
	
	// network.on('hold', function(selected){
	// 	console.log('')
	// 	 console.log('network.on hold')
	// 	 console.log('')

	//     // console.log("execute hoverNode function");
	    
	//     console.log('selected', selected)

	// 	//  if a node is selected, hide any nodes outside the selected number N degrees
	// 	if(selected.node) {
	// 		selectedNode = getNodeById(rawNodes, selected.node)
	// 		//console.log('from nodeId selectedNode', selectedNode)
	// 		//  display node or edge data in the sidebar for selected element
	// 		if (selectedNode) {
	// 			displayData(selectedNode);
	// 			mouseover(selectedNode);
	// 		}
	// 	}

	// }); // end on hold
	
	
		
	network.on('doubleClick', function(selected){
		console.log('')
		 console.log('network.on doubleClick')
		 console.log('')
	
	    doubleClickTime = new Date();
	    console.log("execute onDoubleClick function");
	    
	    var selection = network.getNodeAt(selected.pointer.DOM);
		console.log('selection', selection)

		//  if a node is selected, hide any nodes outside the selected number N degrees
		if(selection) {
			selectedNode = getNodeById(rawNodes, selection)
			//console.log('from nodeId selectedNode', selectedNode)
			//  display node or edge data in the sidebar for selected element
			if (selectedNode) {
				displayData(selectedNode);
				mouseover(selectedNode);
			}
		}
		
		//window.alert("doubleClick")
		// modal.style.display = "block";
	    if (spinner) spinner.stop() ;
			
	}); // end on double click
	
	network.on("oncontext", function(selected){
		console.log('')
		console.log('network.on oncontext')
		console.log('')
		//window.alert("oncontext")
		
		console.log('selected', selected)

		//  if a node is selected, hide any nodes outside the selected number N degrees
		if (selected.node) {
			selectedNode = getNodeById(rawNodes, selected.node)
			console.log('from nodeId selectedNode', selectedNode)
			//  display node or edge data in the sidebar for selected element
			if (selectedNode) {
				displayData(selectedNode);
				mouseover(selectedNode);
			}
		}
			
		modal.style.display = "block";
		if (spinner) spinner.stop() ;
	});

    
   network.on('mouseover', function(selected){
		console.log('')
		 console.log('network.on mouseover')
		 console.log('')

	    // console.log("execute hoverNode function");
	    
	    console.log('selected', selected)

		//  if a node is selected, hide any nodes outside the selected number N degrees
		if(selected.node) {
			selectedNode = getNodeById(rawNodes, selected.node)
			//console.log('from nodeId selectedNode', selectedNode)
			//  display node or edge data in the sidebar for selected element
			if (selectedNode) {
				displayData(selectedNode);
				mouseover(selectedNode);
			}
		}

	}); // end on mouseover
	

    network.on('touch', function(selected){
		console.log('')
		 console.log('network.on touch')
		 console.log('')

	    // console.log("execute hoverNode function");
	    
	    console.log('selected', selected)

		//  if a node is selected, hide any nodes outside the selected number N degrees
		if(selected) {
			selectedNode = getNodeById(rawNodes, selected)
			//console.log('from nodeId selectedNode', selectedNode)
			//  display node or edge data in the sidebar for selected element
			if (selectedNode) {
				displayData(selectedNode);
				mouseover(selectedNode);
			}
		}

	}); // end on touch
	
	
		
	function mouseover(d) {
        // if (!d.children) return;
        console.log('mouseover', d)

        var header = document.getElementsByClassName('propsheet-header');
        header[0].innerHTML = getGroup(d)
        
        var body = document.getElementsByClassName('propsheet-body');
        body[0].innerHTML = htmlPreview(d)
        
        var footer = document.getElementsByClassName('propsheet-footer');
        footer[0].innerHTML = getIdentifer(d);
        
    }
	
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
	//console.log(JSON.stringify(data))
	
	
	/// SET NETWORK !!!
	var options = getOptions();
	//var options = getVisOptions();
	//var options = {layout:{randomSeed:10,improvedLayout:false},interaction:{dragNodes:true,dragView:true,hideEdgesOnDrag:false,hideNodesOnDrag:false,hover:true,hoverConnectedEdges:true,keyboard:{enabled:true,speed:{x:10,y:10,zoom:0.02},bindToWindow:true},multiselect:false,navigationButtons:false,selectable:true,selectConnectedEdges:true,tooltipDelay:300,zoomView:true},physics:{solver:'forceAtlas2Based',maxVelocity:10,minVelocity:1,},groups:{property:{shape:'dot',size:18,color:'pink'},Education:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'brown'}},EducationalOrganization:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'grey'}},EducationalInstitution:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'black'}},Public_university:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'blue'}},University:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'Navy'}},College:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'Blue'}},Community_college:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'Blue'}},Library:{shape:'icon',icon:{face:'FontAwesome',code:'\uf19c',size:45,color:'brown'}},Job:{shape:'icon',icon:{face:'FontAwesome',name:'fa-magic',code:'\uf0d0',size:50,color:'black'}},WorkHistory:{shape:'icon',icon:{face:'FontAwesome',name:'fa-magic',code:'\uf0d0',size:50,color:'YellowGreen'}},Person:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'Crimson'}},BusinessPerson:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'IndianRed'}},Politician:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'DarkSalmon'}},OfficeHolder:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'LightSalmon'}},OrganisationMember:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'Magenta'}},Group:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:50,color:'#57169a'}},Organization:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:45,color:'blue'}},OrganizationalUnit:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:45,color:'Teal'}},Company:{shape:'icon',icon:{face:'FontAwesome',name:'fa-building-0',code:'\uf0f7',size:50,color:'OrangeRed '}},Government:{shape:'icon',icon:{face:'FontAwesome',name:'fa-building',code:'\uf1ad',size:45,color:'SaddleBrown'}},GovernmentAgency:{shape:'icon',icon:{face:'FontAwesome',name:'fa-building',code:'\uf1ad',size:45,color:'Sienna'}},Municipality:{shape:'icon',icon:{face:'FontAwesome',name:'fa-building',code:'\uf1ad',size:40,color:'RoyalBlue'}},Legislature:{shape:'icon',icon:{face:'FontAwesome',code:'\uf19c',size:45,color:'grey'}},NonProfit:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:50,color:'YellowGreen'}},NonProfitOrganisation:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:50,color:'ForestGreen'}},NGO:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:50,color:'SpringGreen'}},Faith:{shape:'icon',icon:{face:'FontAwesome',code:'\uf004',size:40,color:'Chocolate'}},ReligiousOrganisation:{shape:'icon',icon:{face:'FontAwesome',code:'\uf004',size:40,color:'DarkGoldenrod'}},State:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:60,color:'Indigo'}},Region:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:60,color:'Indigo'}},City:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:60,color:'DarkSlateGray'}},Village:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:50,color:'Gray'}},Town:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:45,color:'LightGrey'}},Role:{shape:'icon',icon:{face:'FontAwesome',code:'\uf21d',size:55,color:'BlueViolet'}},Place:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:55,color:'blue'}},Tags:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tags',code:'\uf02c',size:50,color:'YellowGreen'}},Tag:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'YellowGreen'}},ConceptScheme:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tags',code:'\uf02c',size:50,color:'YellowGreen'}},Concept:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'YellowGreen'}},Perse:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tags',code:'\uf02c',size:40,color:'OrangeRed'}},Personality:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'OrangeRed'}},MBTI:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'Green'}},MBTI_profile:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'Green'}},DiSC:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'Green'}},Traxion:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'Green'}},Interest:{shape:'icon',icon:{face:'FontAwesome',name:'fa-search',code:'\uf002',size:50,color:'OrangeRed'}},Skill:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'OrangeRed'}},Knowledge:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'OrangeRed'}},Experience:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'OrangeRed'}}}}
    //var options = {physics:{solver:'forceAtlas2Based',maxVelocity:10,minVelocity:1,},groups:{property:{shape:'dot',size:18,color:'pink'},Education:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'brown'}},EducationalOrganization:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'grey'}},EducationalInstitution:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'black'}},Public_university:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'blue'}},University:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'Navy'}},College:{shape:'icon',icon:{face:'FontAwesome',name:'fa-graduation-cap',code:'\uf19d',size:50,color:'Blue'}},Library:{shape:'icon',icon:{face:'FontAwesome',code:'\uf19c',size:45,color:'brown'}},Job:{shape:'icon',icon:{face:'FontAwesome',name:'fa-magic',code:'\uf0d0',size:50,color:'black'}},WorkHistory:{shape:'icon',icon:{face:'FontAwesome',name:'fa-magic',code:'\uf0d0',size:50,color:'YellowGreen'}},Person:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'Crimson'}},BusinessPerson:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'IndianRed'}},Politician:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'DarkSalmon'}},OfficeHolder:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'LightSalmon'}},OrganisationMember:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'Magenta'}},Group:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:50,color:'#57169a'}},Organization:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:45,color:'blue'}},OrganizationalUnit:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:45,color:'Teal'}},Company:{shape:'icon',icon:{face:'FontAwesome',name:'fa-building-0',code:'\uf0f7',size:50,color:'OrangeRed '}},Government:{shape:'icon',icon:{face:'FontAwesome',name:'fa-building',code:'\uf1ad',size:45,color:'SaddleBrown'}},GovernmentAgency:{shape:'icon',icon:{face:'FontAwesome',name:'fa-building',code:'\uf1ad',size:45,color:'Sienna'}},Municipality:{shape:'icon',icon:{face:'FontAwesome',name:'fa-building',code:'\uf1ad',size:40,color:'RoyalBlue'}},Legislature:{shape:'icon',icon:{face:'FontAwesome',code:'\uf19c',size:45,color:'grey'}},NonProfit:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:50,color:'YellowGreen'}},NonProfitOrganisation:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:50,color:'ForestGreen'}},NGO:{shape:'icon',icon:{face:'FontAwesome',name:'fa-users',code:'\uf0c0',size:50,color:'SpringGreen'}},Faith:{shape:'icon',icon:{face:'FontAwesome',code:'\uf004',size:40,color:'Chocolate'}},ReligiousOrganisation:{shape:'icon',icon:{face:'FontAwesome',code:'\uf004',size:40,color:'DarkGoldenrod'}},State:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:60,color:'Indigo'}},Region:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:60,color:'Indigo'}},City:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:60,color:'DarkSlateGray'}},Village:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:50,color:'Gray'}},Town:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:45,color:'LightGrey'}},Role:{shape:'icon',icon:{face:'FontAwesome',code:'\uf21d',size:55,color:'BlueViolet'}},Place:{shape:'icon',icon:{face:'FontAwesome',name:'fa-map-marker ',code:'\uf041',size:55,color:'blue'}},Tags:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tags',code:'\uf02c',size:50,color:'YellowGreen'}},Tag:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'YellowGreen'}},ConceptScheme:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tags',code:'\uf02c',size:50,color:'YellowGreen'}},Concept:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'YellowGreen'}},Perse:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tags',code:'\uf02c',size:40,color:'OrangeRed'}},Personality:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'OrangeRed'}},MBTI:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'Green'}},MBTI_profile:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'Green'}},DiSC:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'Green'}},Traxion:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'Green'}},Interest:{shape:'icon',icon:{face:'FontAwesome',name:'fa-search',code:'\uf002',size:50,color:'OrangeRed'}},Skill:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'OrangeRed'}},Knowledge:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'OrangeRed'}},Experience:{shape:'icon',icon:{face:'FontAwesome',name:'fa-tag',code:'\uf02b',size:40,color:'OrangeRed'}},group:{shape:'icon',icon:{face:'FontAwesome',code:'\uf0c0',size:50,color:'#57169a'}},team:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'grey'}},person:{shape:'icon',icon:{face:'FontAwesome',code:'\uf007',size:50,color:'#aa00ff'}},role:{shape:'icon',icon:{face:'FontAwesome',code:'\uf21d',size:50,color:'#6E6EFD'}},organization:{shape:'icon',icon:{face:'FontAwesome',code:'\uf0e8',size:50,color:'blue'}},orgbiz:{shape:'icon',icon:{face:'FontAwesome',code:'\uf069',size:50,color:'#57169a'}},orggov:{shape:'icon',icon:{face:'FontAwesome',code:'\uf19c',size:50,color:'blue'}},orgnonprofit:{shape:'icon',icon:{face:'FontAwesome',code:'\uf069',size:50,color:'green'}},orgfaith:{shape:'icon',icon:{face:'FontAwesome',code:'\uf004',size:50,color:'cyan'}},globe:{shape:'icon',icon:{face:'Ionicons',code:'\uf276',size:66,color:'#6E6EFD'}},marker:{shape:'icon',icon:{face:'FontAwesome',code:'\uf041',size:50,color:'#FB7E81'}},book:{shape:'icon',icon:{face:'FontAwesome',code:'\uf02d',size:50,color:'#C2FABC'}},film:{shape:'icon',icon:{face:'FontAwesome',code:'\uf008',size:55,color:'#6E6EFD'}},tags:{shape:'icon',icon:{face:'FontAwesome',code:'\uf02c',size:40,color:'lime'}},tag:{shape:'icon',icon:{face:'FontAwesome',code:'\uf02b',size:40,color:'lime'}},projects:{shape:'icon',icon:{face:'FontAwesome',code:'\uf0ae',size:44,color:'#800000'}},project:{shape:'icon',icon:{face:'FontAwesome',code:'\uf03a',size:40,color:'maroon'}},bullseye:{shape:'icon',icon:{face:'FontAwesome',code:'\uf140',size:40,color:'red'}},puzzle:{shape:'icon',icon:{face:'FontAwesome',code:'\uf12e',size:40,color:'yellow'}},cubes:{shape:'icon',icon:{face:'FontAwesome',code:'\uf1b3',size:44,color:'black'}},cube:{shape:'icon',icon:{face:'FontAwesome',code:'\uf1b2',size:40,color:'black'}}}};
	
	//console.log('container',container)
	//console.log('options',options)
	var network = new vis.Network(container, data, options);
	return network
}


function getVisibleNodes(rawNodes, rawEdges, _selectedNodeId) {	
	console.log('getVisibleNodes')
	//console.log(' _selectedNodeId',_selectedNodeId)
	//console.log('rawNodes.length',rawNodes.length)
	
	var allNodes = false;
	if (typeof showAll !== "undefined") {
		if (showAll) {
			allNodes = true;
			console.log('allNodes', allNodes)
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


function buildRawNodes(data) {
	console.log('buildRawNodes')

	var propNodes = false;
	//
	//  Create an array of raw nodes
	//
	var rawNodes = data['@graph'];
	
	// loop over nodes to determine and add id, group, title, label
	for (var i = 0; i < rawNodes.length; i++) {
		var _id = rawNodes[i]['@id'];
		rawNodes[i].id = _id;
			//console.log("rawNodes[i].id", rawNodes[i].id)
		
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
		
		
		
	}; // end loop over nodes
		
		// var nodeCount = rawNodes.length
		// console.log('nodeCount', nodeCount)
		// document.getElementById('nodeCount').innerHTML = nodeCount;
	return rawNodes
} // end build raw nodes
	
// is this right?
// {
//   "@id": "perse:VolunteerPostings_",
//   "@type": "perse:OpportunityType",
//   "rdfs:type": "skos:Concept",
//   "rdfs:label": "Volunteer Opportunites",
//   "skos:related": [
    
//   ],
//   "perse:Opportunities": [
    
//   ],
//   "skos:prefLabel": "Perse MatchMaker Volunteer Opportunites"
// },
// {
//   "@id": "perse:VolunteerPostings_@id",
//   "@type": "property",
//   "rdfs:label": "perse:VolunteerPostings_",
//   "@id": [
//     "perse:VolunteerPostings_"
//   ],
//   "group": "property",
//   "label": "",
//   "title": ""
// },
// {
//   "@id": "perse:VolunteerPostings_rdfs:type",
//   "@type": "property",
//   "rdfs:type": [
//     "perse:VolunteerPostings_"
//   ],
//   "group": "property",
//   "label": "skos:Concept",
//   "title": ""
// },
// {
//   "@id": "perse:VolunteerPostings_rdfs:label",
//   "@type": "property",
//   "rdfs:label": [
//     "perse:VolunteerPostings_"
//   ],
//   "group": "property",
//   "label": "Volunteer Opportunites",
//   "title": ""
// }

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
	
		// edgeCount = rawEdges.length
		// console.log('edgeCount', edgeCount)
		// document.getElementById('edgeCount').innerHTML = edgeCount;
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
		var theNode = null;
		for (var z = 0; z < _rawNodes.length; z++) {
			if (_rawNodes[z].id === _id ) {
				theNode = _rawNodes[z];
			}
		}
		return theNode;
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
	//console.log('zoom to ',_selectedNodeId)
	//console.log('moveToOptions',moveToOptions)
	if(_selectedNodeId) _network.focus(_selectedNodeId, moveToOptions);	
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
