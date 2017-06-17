'use strict';

console.log('loading search.js ...')



$("#searchForm").submit(function() {
    search($("#searchText").get(0));
    return false;
});


function changeEntity(){
	
}
function changeProperty(){
	
}

function dataLoaded(data) {
	console.log('dataLoaded')
	/* global rawNodes */
	var rawNodes = data['@graph'];
		//console.log('rawNodes ', JSON.stringify(rawNodes))
	
	
	//  **
	//  populate entity dropdown with known @types
	//  **
	var entityTypesList = [];
	var typeitem = {
			id: "",
			val: "",
			txt: ""
		}
	entityTypesList.push(typeitem);
	// console.log('rawNodes.length', rawNodes.length)
	for (var i = 0; i < rawNodes.length; i++) {				// walk through all raw nodes
		var node = rawNodes[i];
		var _type = node['@type'];							// eval the node type
		var _dbo = node['dbo:type'];
		
		var type = null;
		if (_type) {
			//console.log('entityTypesList.indexOf(_type)', JSON.stringify(entityTypesList).indexOf(_type))
			if ( (JSON.stringify(entityTypesList).indexOf(_type) === -1) ) {
				type = {
					id: _type,
					val:_type,
					txt:_type.substring(_type.indexOf(":")+1, _type.length)
				}
				console.log(type.txt)
			}	
		}

		if (type) {											// if unique type add to list
			entityTypesList.push(type);
			// console.log('type', JSON.stringify(type))

		}
	}; //end rawnodes
	// console.log('entityTypesList.length', entityTypesList.length)
	
	entityTypesList.sort(function(a, b) {
	    var result = ( a.txt.toLowerCase() > b.txt.toLowerCase() );
		//console.log(a.txt, b.txt, result)
	    return result  ;
	});
	//entityTypesList.sort();
	// console.log('entityTypesList', JSON.stringify(entityTypesList))
	
	//  create option for each unique node type	
	for (var i = 0; i < entityTypesList.length; i++) {
		if (entityTypesList[i].id !== "./") {
			var option = document.createElement('option');
			option.setAttribute('id', entityTypesList[i].id);
			option.setAttribute('value', entityTypesList[i].val);
			var textNode = document.createTextNode(entityTypesList[i].txt);
			option.appendChild(textNode);
			document.getElementById("entitySelector").appendChild(option);	
		}
	};
	
	
	
	
	// // **
	// // populate property dropdown with known properties
	// // **
	// var propertyTypesList = [];
	// var typeitem = {
	// 		id: "",
	// 		val: "",
	// 		txt: ""
	// 	}
	// 	typeitem = " ";  // removd struct
	// propertyTypesList.push(typeitem);
	// console.log('rawNodes.length', rawNodes.length)
	// for (var i = 0; i < rawNodes.length; i++) {							// walk through all raw nodes
	// 	for(var property in rawNodes[i]) {								// walk through each property in node
	// 		  //console.log(property)
	// 		if (rawNodes[i].hasOwnProperty(property)) {
	// 			var _type = property
	// 			_type = _type.substring(_type.indexOf(":")+1, _type.length)
				
	// 			var type = null;
	// 			if (_type) {											// check to see if _type in list
	// 				if ( (JSON.stringify(propertyTypesList).indexOf(_type) === -1) ) {
	// 					if( property !== "@id" && property !== "@type" && property !== "dbo:type") {
	// 						type = {
	// 							id: _type,
	// 							val:_type,
	// 							txt:_type.substring(_type.indexOf(":")+1, _type.length)
	// 						}
	// 						type = _type
	// 						//console.log(type.txt)
	// 					}
	// 				}	
	// 			}
				
	// 			if (type) {											// if unique type add to list
	// 				propertyTypesList.push(type);
	// 				//console.log('type', JSON.stringify(type))
	// 			}
				
	// 		} // end hasOwnProperty
	// 	}; // end property
	// }; //end rawnodes
	// console.log('propertyTypesList.length', propertyTypesList.length)
	
	// propertyTypesList.sort(function(a, b) {
	//     //var result = ( a.txt.toLowerCase() > b.txt.toLowerCase() );
	// 	//console.log(a.txt, b.txt, result)
	// 	var result = ( a.toLowerCase() > b.toLowerCase() );
	// 	//console.log(a.toLowerCase(), b.toLowerCase(), result)
	//     return result  ;
	// });
	// propertyTypesList.sort();
	// console.log('propertyTypesList', JSON.stringify(propertyTypesList))
	
	// //  create option for each unique property type	
	// for (var i = 0; i < propertyTypesList.length; i++) {
	// 	//if (propertyTypesList[i].id !== "./") {
	// 		var option = document.createElement('option');
	// 		// option.setAttribute('id', propertyTypesList[i].id);
	// 		// option.setAttribute('value', propertyTypesList[i].val);
	// 		// var textNode = document.createTextNode(propertyTypesList[i].txt);
	// 		option.setAttribute('id', propertyTypesList[i]);
	// 		option.setAttribute('value', propertyTypesList[i]);
	// 		var textNode = document.createTextNode(propertyTypesList[i]);
	// 		option.appendChild(textNode);
	// 		document.getElementById("propertySelector").appendChild(option);	
	// 	//}
	// };

	
}

function searchData() {
	console.log('searchData ')
	var data = myData;
	//console.log(JSON.stringify(data))

	// var selectedId = document.getElementById('selectedId').value;
	var entitySelector = document.getElementById('entitySelector').value;
	var propertySelector = document.getElementById('propertySelector').value;
	var propertyContains = document.getElementById('propertyContains').value;
	// console.log(JSON.stringify(selectedId))
	console.log(JSON.stringify(entitySelector))
	console.log(JSON.stringify(propertySelector))
	console.log(JSON.stringify(propertyContains))
	
	var searchStr = propertyContains;
	console.log('searchStr',searchStr)
	
	var myId = data['@id'];
	//console.log(JSON.stringify(myId))
	document.getElementById('resultBox').innerHTML = 'Graph Id: ' + myId;
	
	let rawNodes = data['@graph'];

	
	var idList = [];
	for (var i = 0; i < rawNodes.length; i++) {
		var rawId = rawNodes[i]["@id"] || null;
		var rawType = rawNodes[i]["@type"] || null;
		var rawLabel = rawNodes[i]["rdfs:label"] || null;
		//console.log(JSON.stringify(rawLabel))
		if (rawId && rawType && rawLabel) {				// if not null
		  if ( (rawType === entitySelector) || (entitySelector === "") ) {		// if type equals selected or if selecter is blank
			if ( rawLabel.toLowerCase().indexOf(searchStr.toLowerCase()) != -1 ) {
				//console.log('rawId ', JSON.stringify(rawId) )
				var item = {}
				item.id = rawId;
				item.type = rawType;
				item.label = rawLabel
				idList.push(item);
			}	
		  }
		}
	};
	
	var baseUrl = "?startid=";
	//var baseUrl = "/public/meGraph.html?startid=";
	var txtIds = "";
	var txtLinks = "";
	console.log('idList.length ', idList.length)
	for (var i = 0; i < idList.length; i++) {
		var id = idList[i].id ;
		var type = idList[i].type ;
		var label = idList[i].label ;
		// var url = baseUrl + id ;
		
		var jshref = 'Javascript:HandleSearchResult("' + id + '");'
		// txtIds += "<a title='handleSearchResult(" + id +  ")' href='Javascript:handleSearchResult(" + id  +  "); return false;' startid='" + id  + "'>" + " [" + type + "] " + label + "</a>" + "<br/>" ;
		// txtIds += "<a title='alert(" + id +  ")' href='Javascript:alert(" + id  +  ");' startid='" + id  + "'>" + " [" + type + "] " + label + "</a>" + "<br/>" ;
		txtIds += "<a class='' title='" + jshref + "' href='" + jshref + "'  resultid='" + id  + "'  id='txtId_" + i + "' >"  + label + "</a>" + "<br/>" ;
		
		// txtIds += "<a href='" + url + "' startid='" + id  + "'>" + " [" + type + "] " + label + "</a>" + "<br/>" ;
		// txtIds += "<a href='#' startid='"+ id + "' onclick='return CloseMySelf(this)' id='"+ id + "'>" + " [" + type + "] " + label + "</a>" + "<br/>" ;
		//txtIds += "<a href='" + url + "' target='_parent' >" + id + "</a>" + "<br/>" ;
		//txtIds += "<li>" + id + "</li>" + "" ;
		//<a href="#" result="allow" onclick="return CloseMySelf(this);">Allow</a>
	};
	
	//console.log('txtIds ', JSON.stringify(txtIds))
	document.getElementById('resultBox').innerHTML = txtIds;
	
}

document.onkeypress = enter;
function enter(e){
	if (e.which == 13){
		searchData()
		console.log('key detected')
	}
}
    
    
//
// nextId input needs to be initialized in visulization specific JS routine
//
function HandleSearchResult(id) {
	console.log('HandleSearchResult', id)
	var element = document.getElementById('nextId')
	element.style.display='none';
	// Set element value
	element.value = id;
	// Create a new 'change' event
	var event = new Event('change');
	// Dispatch it.
	element.dispatchEvent(event);

}
	
// </script>
