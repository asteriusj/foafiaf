/**
 * Semantic Data Broeser HTML5 (demo variant)
 * Copyright 2018, Asterius Media LLC, All Rights Reserved.
 */
 
//
// After page loads get graph data and process selected element
//
function whenPageLoaded() {
    console.log('whenPageLoaded ...')
    
    // var datalink = getUrlVars()["datalink"] || null;
	var datalink = getUrlVars()["datalink"] || '../things/jsonld/combinedJSONLD.jsonld' || null;
	localStorage.setItem('datalink', JSON.stringify(datalink));
	
	var startid = getUrlVars()["startid"] || null;
	localStorage.setItem('startid', JSON.stringify(startid));
	
	var nextid = getUrlVars()["nextid"] || null;
    localStorage.setItem('nextid', JSON.stringify(nextid));
    
    console.log('datalink: ',datalink)
    console.log('startid: ',startid)
    console.log('nextid: ',nextid)
    
    let mg = getMyGraph() || null ;
    // console.log('mg', mg )
    // console.log('getMyGraph()',getMyGraph() )
    
    if ( isEmpty(mg) ) {
    
        console.log('isEmpty',mg)
        fetchMyLinkedData(datalink, function(json) {
            let myLD = JSON.parse(json) || json ;
            console.log('myLD',myLD)
            
            let defaultId = myLD["@id"] || null ;
            localStorage.setItem('defaultId', JSON.stringify(defaultId));
            console.log('defaultId: ',defaultId)
            
            let myGraph = myLD["@graph"] || null ;
            console.log('myGraph: ',myGraph)
            setMyGraph(myGraph);
    
            processGraph(myGraph);
        }) // end getMyLinkedData
        
    } else if ( !isEmpty(mg) ) {
            
            console.log('not Empty',mg)
            let myGraph = JSON.parse(mg) || mg ;
            console.log(myGraph)
            
            processGraph(myGraph);
    
    } else {            // temp until logic figured out
        console.log('unknown')
        fetchMyLinkedData(datalink, function(json) {
            let myLD = JSON.parse(json) || json ;
            console.log('myLD',myLD)
            
            let myGraph = myLD["@graph"] || null ;
            console.log('myGraph: ',myGraph)
            setMyGraph(myGraph);
            
            processGraph(myGraph);
        }) // end getMyLinkedData
    } // end !null

} // end 
function processGraph(graph) {
    console.log('processGraph ...',graph)
//     var datalink = getUrlVars()["datalink"] || '../things/jsonld/combinedJSONLD.jsonld' || null;
// 	var startid = getUrlVars()["startid"] || null;
// 	var nextid = getUrlVars()["nextid"] || null;
	var datalink = localStorage.getItem('datalink');
	var startid = getUrlVars()["startid"] || localStorage.getItem('startid');
	var nextid = getUrlVars()["nextid"] || localStorage.getItem('nextid');
	var defaultid = localStorage.getItem('defaultid') || null ;
	console.log('datalink: ',datalink) 
    console.log('startid: ',startid)
    console.log('nextid: ',JSON.stringify(nextid))
    console.log('defaultid: ',defaultid)


   // get startingid element
    let _elID = null
    if ( !isEmpty(nextid) ) {
        _elID =  nextid ; 
        // console.log('nextid _elID: ', _elID)
    } else if ( !isEmpty(startid) ) {
        _elID =  startid ; 
        // console.log('startid _elID: ', _elID)
    } else if ( !isEmpty(defaultid) ) {
        _elID =  defaultid ; 
        // console.log('defaultid _elID: ', _elID)
    } else {
        _elID =  "foafiaf:Spoke_Education" ; 
        // console.log('else _elID: ', _elID)
    }
    console.log('_elID: ', _elID)
    
    let _eL = getElement(_elID) ;
    console.log('_eL: ', _eL)
    
    let _elData = getElementData(graph,_elID)
    console.log('_elData: ', _elData)
    
    processElementData(_elData)
    
}
function processElementData(element) {
    console.log('processElementData ...',element)
   
    // PLACEHOLDER FOR ADDITION DATA ENHANCEMENT OF ELEMENT
    
    // save data element in local store by id
    let _id = setElement(element) ;
    
    let _nodeC = buildNodeContent(element)
    console.log('_nodeC: ', _nodeC)
    
    //set node element content
    var container = document.getElementById("node");
    container.innerHTML = _nodeC; 
}
//
// Helper functions
//
let myGraph= null;
function getMyGraph(){
  console.log('getMyGraph')
  myGraph = localStorage.getItem('myGraph');
//   console.log('myGraph',myGraph)
  return myGraph
}
function setMyGraph(data){
  console.log('setMyGraph')
  myGraph = data
  localStorage.setItem('myGraph', JSON.stringify(myGraph));
//   console.log('myGraph',myGraph)
  return myGraph
}
function getElement(id){
  console.log('getElement',id)
  var _element = localStorage.getItem('id');
  var element = JSON.parse(_element) || _element ;
  console.log('element',element)
  return element
}
function setElement(element){
  console.log('setElement',element)
  let identifier = element["_id"] ;
  console.log('identifier',identifier)
  localStorage.setItem(identifier, JSON.stringify(element));
  return identifier
}
// collect URL query string parameters
function getUrlVars() {
    console.log('getUrlVars ...')
	var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
    	vars[key] = value;
	});
	return vars;
} // end getUrlVars
// is object empty
function isEmpty(obj) {
    // null and undefined are "empty"
    if (obj == null) return true;
    if (obj == "null") return true;
    if (obj == "null undefined") return true;
    // if (obj == "[Function: String]") return true;
    
    if (Array.isArray(obj)) {
      let el = obj[0] 
      if (el == null) return true;
    }  
    
    // Assume if it has a length property with a non-zero value
    // that that property is correct.
    if (obj.length && obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    
    if ( obj === {} )  return true;
    
    // Otherwise, does it have any properties of its own?
    // Note that this doesn't handle
    // toString and toValue enumeration bugs in IE < 9
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }
 
    return true;
}
// retrieve JSON-LD data from url
function fetchMyLinkedData(_url,cb){
    console.log('fetchMyLinkedData ...', _url)
    
    let url = _url || 'sample.json' ; 
    console.log('url',url)
    fetch(url , {
        headers : { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
      })
      .then(function(response) {
        // console.log(response.text())   
        return response.text();
      })
      .then(function(json) {
        // console.log('fetch json',json);
        if (cb) cb(json)
        // return json ;
      });	
    
} // end fetchMyLinkedData

// get JSON object from array
function getById(arr, value) {
  for (var i=0, iLen=arr.length; i<iLen; i++) {
    if (arr[i]["@id"] == value) return arr[i];
  }
}
// find object element data from graph array
function getElementData(_graph, _elID, cb) {
    console.log('getElementData ...',_elID)
    let ed = {};
 
    let _el = getById(_graph,_elID) || null ;
    console.log('_el: ', _el)
    
    if (!isEmpty( _el )){
        
        ed["_id"] =              _el["@id"] || "" ;
        ed["_type"] =            _el["@type"] || "" ;
        ed["dbo:abstract"] =     _el["dbo:abstract"] || "" ;
        ed["dbo:type"] =         _el["dbo:type"] || "" ;
        ed["dbo:abstract"] =     _el["dbo:abstract"] || "" ;
        ed["dc:title"] =         _el["dc:title"] || "" ;
        ed["dc:description"] =         _el["dc:description"] || "" ;
        ed["rdf:type"] =         _el["rdf:type"] || "" ;
        ed["rdf:label"] =        _el["rdf:label"] || "" ;
        ed["rdf:comment"] =      _el["rdf:comment"] || "" ;
        ed["rdf:type"] =         _el["rdf:type"] || "" ;
        ed["owl:sameAs"] =       _el["owl:sameAs"] || "" ;
        ed["owl:seeAlso"] =      _el["owl:seeAlso"] || "" ;
        ed["skos:prefLabel"] =   _el["skos:prefLabel"] || "" ;
        ed["skos:definition"] =  _el["skos:definition"] || "" ;
        ed["skos:related"] =     _el["skos:related"] || "" ;
        ed["skos:inScheme"] =    _el["skos:inScheme"] || "" ;
        ed["skos:broader"] =     _el["skos:broader"] || "" ;
        ed["skos:narrower"] =    _el["skos:narrower"] || "" ;
        ed["foaf:topic"] =       _el["foaf:topic"] || "" ;
        
        if (!isEmpty( _el["foafiaf:image"] )) {
            ed["foaf:image"] = '../img/' + _el["foafiaf:image"] 
        } else {
            ed["foaf:image"] = "" ;
        }
        // console.log('rdfs:label: ',         _el["rdfs:label"])
        // console.log('skos:prefLabel: ',     _el["skos:prefLabel"])
        // console.log('dc:title: ',           _el["dc:title"])
        // console.log('dc:description: ',     _el["dc:description"])
        // console.log('skos:inScheme: ',      _el["skos:inScheme"])
       
    }    
       
    if (cb) cb(ed) 
    return ed ; 
} // end getElementData
// build content html for node element
function buildNodeContent(_ed, cb) {
    console.log('buildNodeContent ...',_ed)
    
    var datalink = getUrlVars()["datalink"] || "";
	var startid = getUrlVars()["startid"] || "";
	var nextid = getUrlVars()["nextid"] || "";
	
    let baseUrl = "?datalink=" + datalink + "&startid=" + startid + "&nextid="

    let content = "" ;
    content += '<div id="node" about="' + _ed["_id"] + '" typeof="skos:Concept">'
    
    content += '<h2>' 
    content += '<span property="skos:notation"></span>'  
    if (!isEmpty(_ed["skos:prefLabel"] )) {
        content += '<span property="skos:prefLabel" xml:lang="en">' + _ed["skos:prefLabel"] + '</span> '
    } else if (!isEmpty(_ed["rdf:label"] )) {
        content += '<span property="rdf:label" xml:lang="en">' + _ed["rdf:label"] + '</span> '
    } else if (!isEmpty(_ed["dc:title"] )) {
        content += '<span property="dc:title" xml:lang="en">' + _ed["dc:title"] + '</span> '
    }
    content += '<small>(' + _ed["_id"] + ' )</small>'
    content += '</h2>' 

    if (!isEmpty( _ed["rdf:type"] )) {
        content += '<h3>Type (rdf:type)</h3>'
        content += '	<span property="rdf:type" style=""><p>'
        content +=          _ed["rdf:type"] 
        content += '	<p></span>'
        content += '<dl>'
    }
    
    if (!isEmpty( _ed["rdf:label"] )) {
        content += '<h3>Label (rdf:label)</h3>'
        content += '	<span property="rdf:type"><p>'
        content +=          _ed["rdf:type"] 
        content += '	</p></span>'
        content += '<dl>'
    }
    
    if (!isEmpty( _ed["dc:title"] )) {
        content += '<h3>Title (dc:title)</h3>'
        content += '	<span property="dc:title"><p>'
        content +=          _ed["dc:title"] 
        content += '	</p></span>'
        content += '<dl>'
    }
    
    // console.log('_ed["dc:description"]:',_ed["dc:description"])
    if (!isEmpty( _ed["dc:description"] )) {
        content += '<h3>Description (dc:description)</h3>'
        content += '	<span property="dc:description"><p>'
        content +=          _ed["dc:description"] 
        content += '	</p></span>'
        content += '<dl>'
    }
    
    if (!isEmpty( _ed["foaf:image"] )) {
        content += '<h3>Image (foaf:image)</h3>'
        content += '	<span property="foaf:image"><p>'
        content += '         <img src="'+ _ed["foaf:image"] + '">'
        content += '	</p></span>'
        content += '<dl>'
    }
    
    if (!isEmpty( _ed["foaf:topic"] )) {
        content += '<h3>Topic (foaf:topic)</h3>'
        content += '	<span property="foaf:topic"><p>'
        content +=          _ed["foaf:topic"]
        content += '	</p></span>'
        content += '<dl>'
    }
    
    if (!isEmpty( _ed["skos:inScheme"] )) {
        content += '<h3>Concept Schemes (skos:inScheme)</h3>'
        content += '<ul rel="skos:inScheme">'
        content += '    <li resource="' + _ed["skos:inScheme"] + '">'
        content += '		 <a href="' + baseUrl + _ed["skos:inScheme"] + '">' + _ed["skos:inScheme"] + '</a>'
        content += '	</li>'
        content += '</ul>'
    }
    
    if (!isEmpty( _ed["skos:broader"] )) {
        content += '<h3>Broader Concepts (skos:broader)</h3>'
        content += '<ul rel="skos:broader">'
        content += '    <li resource="' + _ed["skos:broader"] + '">'
        content += '		 <a href="' + baseUrl + _ed["skos:broader"] + '">' + _ed["skos:broader"] + '</a>'
        content += '	</li>'
        content += '</ul>'
    }
    
    if (!isEmpty( _ed["skos:narrower"] )) {
        content += '<h3>Narrower Concepts (skos:narrower)</h3>'
        content += '<ul rel="skos:narrower">'
        if ( Array.isArray(_ed["skos:narrower"]) ) {
            for (var n=0; n<_ed["skos:narrower"].length; n++) {
                let nn = _ed["skos:narrower"][n]
                content += '    <li resource="' + nn + '">'
                content += '		 <a href="' + baseUrl + nn + '">' + nn + '</a>'
                content += '	</li>'
            }
        } else {
                content += '    <li resource="' + _ed["skos:narrower"] + '">'
                content += '		 <a href="' + baseUrl + _ed["skos:narrower"] + '">' + _ed["skos:narrower"] + '</a>'
                content += '	</li>'
        }
        content += '</ul>'
    }
    
    content += '</div>'
    

// 							<dt>
// 								<em property="skos:prefLabel" xml:lang="es">Declaración del impacto de la educación</em>(es)
// 							</dt>
// 							<dt>
// 								<em property="skos:prefLabel" xml:lang="fr">Education Spoke Impact Statement</em> (fr)
// 							</dt>
// 							<dt>
// 								<em property="skos:prefLabel" xml:lang="sv">Utbildningssamtal</em> (sv)
// 							</dt>
// 						</dl>
						
// 						<h3>Title (dc:title)</h3>
// 						<span property="dc:title">
// 							Education Spoke Impact Statement
// 						</span>
						
// 						<h3>Description (dc:description)</h3>
// 						<span property="dc:description">
// 							Our pre-K through 12 schools and students are the pride of our community and are nationally recognized for excellence. All education and training programs are dynamic, provide accessible paths to fulfilling careers, and are highly valued by our citizens and employers.
//   						</span>
  						
// 						<h3>Image (foafiaf:image)</h3>
// 						<span property="foafiaf:image">
// 							<img src="../img/edu-new-3-2.jpg">
// 						</span>
						
// 						<h3>Topic(foaf:topic)</h3>
// 						<span property="dc:title">
// 							Spoke: Education"
// 						</span>
						
// 						<h3>Concept Schemes (skos:inScheme)</h3>
// 						<ul rel="skos:inScheme">
// 							<li resource="foafiaf:Spoke_0">
// 								<a href="foafiaf:Spoke_0"> Spokes </a>
// 							</li>
// 						</ul>
						
// 						<h3>Top Concept of ... (skos:topConceptOf)</h3>
// 						<ul rel="skos:topConceptOf">
// 							<li resource="">
// 								<a href=""> </a>
// 							</li>
// 						</ul>
						
// 						<h3>Broader Concepts (skos:broader)</h3>
// 						<ul rel="skos:broader">
// 							<li resource="foafiaf:Segment_RENEWAL">
// 								<a href="foafiaf:Segment_RENEWAL">Revitalization Segment </a>
// 							</li>
// 						</ul>
						
// 						<h3>Narrower Concepts (skos:narrower)</h3>
// 						<ul rel="skos:narrower">
// 							<li resource="foafiaf:Strategy_All_Are_Ready">
// 								<a href="foafiaf:Strategy_All_Are_Ready">Strategy: All Are Ready </a>
// 							</li>
// 							<li resource="foafiaf:Strategy_Partnering_for_Success">
// 								<a href="foafiaf:Strategy_Partnering_for_Success">"Strategy: Partnering for Success </a>
// 							</li>
// 							<li resource="foafiaf:Strategy_Supporting_Students_n_Families">
// 								<a href="foafiaf:Strategy_Supporting_Students_n_Families">"Strategy: Supporting Students and Families </a>
// 							</li>
// 						</ul>


    if (cb) cb(content) 
    return content ; 
} // buildNodeContent



(function() {
    console.log('loading index.js ...')
    'use strict';
    /**/
    // var param = {
    //         stop_browser_behavior: {
    //             userSelect: "none",
    //             touchCallout: "none",
    //             touchAction: "none",
    //             contentZooming: "none",
    //             userDrag: "none",
    //             tapHighlightColor: "rgba(0,0,0,0)"
    //         }
    //     },
    //     startid = getUrlVars()["startid"] || null,
    //     datalink = getUrlVars()["datalink"] || null,
    //     showall = getUrlVars()["showall"] || null;
    
// // temporary hard code jsonld data
// let jsonLD = {"@graph":[{"@id":"foafiaf:Segment_REVITALIZATION","@type":"skos:Concept","dbo:abstract":"","dbo:type":"foafiaf:Segment","foafiaf:Segment":"","foafiaf:Spoke":"","foafiaf:Strategy":"","foafiaf:categories":"","foafiaf:documents":"","foafiaf:group":"foafiaf:TR_Revitalization_Team","foafiaf:image":"","foafiaf:keywords":"","foafiaf:monitors":"","foafiaf:ownedby":"","foafiaf:owner":"","foafiaf:perspective":"foafiaf:perspective_Segment","foafiaf:shortname":"Revitalization","foafiaf:supports":"","foafiaf:theme":"","foafiaf:userdefinedfields":"","dc:description":"","dc:title":"Revitalization Segment","rdf:type":"sioc:topic","rdfs:comment":"","rdfs:label":"Revitalization","owl:sameAs":"","owl:seeAlso":"","skos:broader":"","skos:definition":"","skos:inScheme":"foafiaf:Segment_0","skos:narrower":"","skos:prefLabel":"","skos:related":"","foaf:topic":"Segment: Revitalization"},{"@id":"foafiaf:Spoke_Education","@type":"skos:Concept","dbo:abstract":"","dbo:type":"foafiaf:Spoke","foafiaf:Segment":"foafiaf:Segment_RENEWAL","foafiaf:Spoke":"","foafiaf:Strategy":"","foafiaf:categories":"","foafiaf:documents":"","foafiaf:group":"foafiaf:TR_Education_Spoke_Team","foafiaf:image":"edu-new-3-2.jpg","foafiaf:keywords":"","foafiaf:monitors":"","foafiaf:ownedby":"","foafiaf:owner":"","foafiaf:perspective":"foafiaf:perspective_Spoke","foafiaf:shortname":"Education","foafiaf:supports":"","foafiaf:theme":"","foafiaf:userdefinedfields":"","dc:description":"Our pre-K through 12 schools and students are the pride of our community and are nationally recognized for excellence. All education and training programs are dynamic, provide accessible paths to fulfilling careers, and are highly valued by our citizens and employers.","dc:title":"Education Spoke Impact Statement","rdf:type":"sioc:topic","rdfs:comment":"","rdfs:label":"Education","owl:sameAs":"","owl:seeAlso":"","skos:broader":"foafiaf:Segment_RENEWAL","skos:definition":"","skos:inScheme":"foafiaf:Spoke_0","skos:narrower":"","skos:prefLabel":"Education","skos:related":"","foaf:topic":"Spoke: Education"},]}
// let graph = jsonLD["@graph"]
// console.log('graph: ',graph)

// TODO
// preprocess Linked Data while page is loading
// determin datalink url
// fecth JSON-LD data
// resolve relationships between entitities i.e. broader and narrower match
// loop over elements
// save each element in localstore by id

    
    
    

    
})(); // end of function