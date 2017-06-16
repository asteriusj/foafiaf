'use strict';
// email comments from prompt popup
function sendComment(comments) {
  try {
	
	Email.send(
		"jstewart@transformrockcord.org",
		"jstewart@transformrockcord.org",
		"comment from foafiaf projects",
		comments,
		"aspmx.l.google.com",
		"jstewart@transformrockford.org",
		"t030710"
	);
	// console.log('comments sent', comments)
  	
  } catch(e) {
  	console.error("sendComment error", e)
  }
};

// determin color of thing by ordinal scale per .name
function getCol(d) {

    if (d.color) {
    	return d.color;
    } else {
    	return 	;
    }
    
};
    
// function getEntity(id) {
// 	var entity = getGraphEntity(id) || null;
// }

// prep group of element 
function getGroup(d){
    var grp = d.group || "" ;
    return grp;
};

// prep title of element 
function getText(d){
    var txt = d.depth ? d.name.split(" ")[0] : "" ;
    //console.log('txt', txt)
    return txt;
};

// prep title of element 
function getIdentifer(t){
    var identifier = t.id || null ;
    // console.log('identifier', identifier)
    return identifier;
};

// prep title of element 
function getLabel(t){
    //console.log(t)

    var _label = t.label || null ;

    return _label
};

// prep title of element 
function getTitle(t){
    //console.log(t)
    // title content for mouseover

    var _dbotype = t.dbotype || "";
    var _group = t.group || "";
    var _name = t.name || "";
    var _label = t.label || _name ;
    var _description = t.description || "";
    // var _startdate = t.startdate || "";
    // var _status = t.status || "";
    //var _colour = t.colour || "";
    var _color = t.color || getCol(t) ;
    var _id = t.id || "";
    
    var _title =  _group + ": " + _label + "\n" + _description + _color + "\n" ;
    //console.log('_title', _title)
    return _title
};

// prep previw of element contents
function getDetails(t){
    console.log('getDetails', t)
    // title content for mouseover

    var _dbotype = t.dbotype || "";
    var _group = t.group || "";
    var _name = t.name || "";
    var _label = t.label || _name ;
    var _description = t.description || "";
    // var _startdate = t.startdate || "";
    // var _status = t.status || "";
    //var _colour = t.colour || "";
    var _color = t.color || getCol(t) ;
    var _id = t.id || "";
    
    var _preview =   "<h3>" + _label + "</h3>" + "\n\n<p>" + _description + _color + "</p>\n\n" ;
    //console.log('_preview', _preview)
    return _preview
};

// prep dialog box details 
function getFullDetails(t){
    console.log('getFullDetails', t)
    // details content for hover / popup

    var _dbotype = t.dbotype || "";
    var _group = t.group || "";
    var _name = t.name || "";
    var _label = t.label || _name ;
    var _description = t.description || "";
    var _startdate = t.startdate || "";
    var _enddate = t.enddate || "";
    var _broader = t.broader || "";
    var _projectoutputs = t.projectoutputs || "";
    var _status = t.status || "";
    var _target = t.target || "";
    var _actual = t.actual || "";
    var _units = t.units || "";
    var _colour = t.colour || "";
    var _color = t.color || getCol(t) ;
    var _segment = t.segment || "";
    var _spoke = t.spoke || "";
    var _strategy = t.strategy || "";
    var _id = t.id || "";
    
    var details =  _group + ": " + _label + "\n\n" + 
    			  "id: " + _id + "\n\n" + 
                  "Name: " + _name + "\n\n" + 
                  "Descrption: " + _description + "\n\n" 

    if (_dbotype === 'foafiaf:Project') {
    	
        details = details + "Status: " + _status +  _colour + "\n\n" + 
        					"Color: " + _color +  "\n\n" +
                            "Start: " + _startdate + " " + _enddate + " " + _color + "\n\n"  +
                            "Parent: " + _broader + "\n\n"  +
                            "Output: " + _projectoutputs + "\n\n"
                            
    } else if (_dbotype === 'foafiaf:Measure') {
    	
        details = details + "Status: " + _status + " " + _colour + " " +  "\n\n" +
        					"Color: " + _color +  "\n\n" +
                            "Target: " + _target + "Actual: " + _actual + " " + _units + "\n\n"  
                              
    }
    
    details = details + "Segment: " + _segment + "\n\n" +
    					"Spoke: " + _spoke + "\n\n" +
    					"Strategy: " + _strategy + "\n\n" 
    
    //console.log('details', details)
    return details;
}; // end getDetails
    
function textArray(_el){
	if (_el) {
		//console.log('_el',_el)
		if (_el.length > 0) {
			var items = "\n"
			for (var i=0; i<_el.length; i++) {
				var el = _el[i];
				el = el['@id'] || el;				//check to see if item has @id index
				//console.log(el)
				items = items + "\n" + el 
			}
			_el = items
		}
		return _el;
	} else {
		return null;
	}
}; // end textArray


function htmlPreview (_entity) {
	console.log('htmlPreview', _entity)
	var _html
	
	var _id = _entity.id || null;
	var _dbotype = _entity.dbotype || "";
	var _group = _entity.group || null;
	var _label = _entity.label || null;
	
	var _topic = _entity['foaf:topic'] || _entity['topic']  || null;
	var _profile = _entity['linkedin:Profile']  || _entity['profile'] || null;
	var _sameas = _entity['owl:sameAs']  || _entity['sameas'] || null;
	var _seealso = _entity['owl:seeAlso'] || _entity['seealso']  || null;
	var _comments = _entity['rdfs:comment'] || _entity['comments']  || null;
	var _prefLabel = _entity['skos:prefLabel'] || _entity['prefLabel']  || null;
	    // _prefLabel = _prefLabel.@value || _prefLabel ;
	
	
	var _state = _entity['dbo:state'] || null;
	var _country = _entity['dbo:country'] || null;
	var _region = _entity['dbp:region'] || null;
	var _district = _entity['dbp:district'] || null;
	
	var _georss = _entity['georss:point'] || null;
	var _lat = _entity['geo:lat'] || null;
	var _long = _entity['geo:long'] || null;
	var _geometry = _entity['geo:geometry'] || null;
	var _elevation = _entity['dbo:elevation'] || null;
	var _areaTotalSqM = _entity['dbp:areaTotalSqM'] || null;
	var _timeZone = _entity['dbo:timeZone'] || null;
	var _postalCode = _entity['dbo:timepostalCodeZone'] || null;
	var _populationTotal = _entity['dbo:populationTotal'] || null;
	
	
	var _name = _entity['foaf:name'] || _entity['name']  || null;
	var _title = _entity['dc:title'] || _entity['title']  || null;
	var _description = _entity['dc:description'] || _entity['description']  || null;
	var _abstract = _entity['dc:abstract']  || _entity['dbo:abstract']  || _entity['dboabstract'] || _entity['abstract'] || null;	
	var _comment = _entity['rdfs:comment'] || _entity['comment']  || null;
	
	var _categories = _entity['foafiaf:categories'] || _entity['categories'] || null;
	var _keywords = _entity['foafiaf:keywords'] || _entity['keywords'] || null;
	
	var _segment = _entity['foafiaf:Segment'] || _entity['segment']  || null;
	var _spoke = _entity['foafiaf:Spoke'] || _entity['spoke']  || null;
	var _strategy = _entity['foafiaf:Strategy'] || _entity['strategy']  || null;
							
	var _project = _entity['foafiaf:Project'] || _entity['project'] || null;
	var _measure = _entity['foafiaf:Measure'] || _entity['measure']  || null;
	
	var _status = _entity['foafiaf:status'] || _entity['status']  || null;
	var _percent = _entity['foafiaf:percent'] || _entity['percent']  || null;
	var _priority = _entity['foafiaf:priority'] || _entity['priority']  || null;
	var _color = _entity['foafiaf:color'] || _entity['color']  || null;
	
	var _startdate = _entity['foafiaf:startdate'] || _entity['startdate']  || null;
	var _enddate = _entity['foafiaf:enddate']  || _entity['enddate'] || "";
	var _projectoutputs = _entity['foafiaf:projectoutputs'] || null;
	var _target = _entity['foafiaf:targetvalue'] || _entity['target']  || null;
	var _actual = _entity['foafiaf:datavalues'] || _entity['actual']  || null;
	var _units = _entity['foafiaf:unitofmeasure'] || _entity['units']  || null;
	var _colour = _entity['foafiaf:colour'] || _entity['colour']  || null;
			
	var _shortname = _entity['foafiaf:shortname'] || _entity['shortname']  || null;

	var _broader = _entity['skos:broader'] || _entity['broader']  || null;
	var _narrower = _entity['skos:narrower'] || _entity['narrower']  || null;
	var _related = _entity['skos:related'] || _entity['related']  || null;
	var _monitors = _entity['foafiaf:monitors'] || _entity['monitors']  || null;
	var _supports = _entity['foafiaf:supports'] || _entity['supports']  || null;
	
	var _predecessor = _entity['tmo:PredecessorDependency'] || _entity['PredecessorDependency']  || null;
	var _successor = _entity['tmo:SuccessorDependency'] || _entity['SuccessorDependency']  || null;


	var _ambassador = _entity['foafiaf:ambassador'] || _entity['ambassador'] || null;
	var _role = _entity['foafiaf:Role'] || _entity['role'] || null;
	var _hasBody = _entity['oa:hasBody'] || _entity['hasBody']  || null;
	var _hasTarget = _entity['oa:hasTarget'] || _entity['hasTarget']  || null;
	var _motivatedBy = _entity['oa:motivatedBy'] || _entity['motivatedBy']  || null;
	var _notify = _entity['foafiaf:Notify'] || _entity['notify']  || null;
	var _assignedBy = _entity['foafiaf:assignedBy'] || _entity['assignedBy']  || null;
	var _assignedTo = _entity['foafiaf:assignedTo'] || _entity['assignedTo']  || null;
	var _dueDate = _entity['foafiaf:dueDate'] || _entity['dueDate']  || null;
	var _timestamp = _entity['foafiaf:timestamp'] || _entity['timestamp']  || null;
	
	var _prefix = _entity['vcard:prefix']  || _entity['prefix']  || null;
	var _givenName = _entity['foaf:givenName']  || _entity['name']  || null;
	var _surname = _entity['foaf:surname']  || _entity['name']  || null;
	var _suffix = _entity['vcard:suffix']  || _entity['suffix']  || null;
	var _nick = _entity['foaf:nick']  || _entity['nick']  || null;
	
	var _mbox = _entity['foaf:mbox']  || _entity['mbox']  || null;
	var _phone = _entity['foaf:phone']  || _entity['name']  || null;
	var _email = _entity['vcard:email']  || _entity['email']  || null;
	
	var _title = _entity['vcard:title']  || _entity['title']  || null;
	var _employer = _entity['bio:Employer']  || _entity['employer']  || null;
	var _contactOf = _entity['foafiaf:isContactOf']  || _entity['contactOf']  || null;
	var _holdsRole = _entity['org:holdsRole'] || _entity['holdsRole'] || null;
	var _hadRole = _entity['org:hadRole'] || _entity['hadRole'] || null;
			
	var _motto = _entity['foaf:motto']  || _entity['motto']  || null;
	var _homepage = _entity['foaf:homepage'] || _entity['name']  || null;
	var _depiction = _entity['foaf:depiction']  || _entity['name']  || null;
	var _thumbnail = _entity['foaf:thumbnail']  || _entity['name']  || null;
	
	var _linkedin = _entity['linkedin:Profile']  || _entity['linkedin']  || null;
	var _connections = _entity['linkedin:Connections']  || _entity['connections']  || null;
	var _knows = _entity['foaf:knows']  || _entity['name']  || null;			//console.log('_knows ', _knows)
	var _member = _entity['foaf:member']  || _entity['name']  || null;
	var _based_near = _entity['foaf:based_near']  || _entity['name']  || null;
	
	var _postIn = _entity['org:postIn'] || _entity['postIn'] || null;
	var _hasPost = _entity['org:hasPost'] || _entity['hasPost'] || null;
	var _heldBy = _entity['org:heldBy'] || _entity['heldBy'] || null;
	var _reportsTo = _entity['org:reportsTo'] || _entity['reportsTo'] || null;
	
	// get label for related objects
	// var seg = getEntity(_segment)  
	// console.log('seg, seg')
	// if (seg) _segment = getLabel(seg);
	
		
	_html = '<div>'
	// _html = _html + ' ' + _group + ': '
	
	var _header = null;
	if (_prefLabel) {
		_header = _prefLabel;
	} else if (_label) {
		_header = _label;
	} else if (_title) {
		_header = _title;
	} else {
		_header = _name;
	}
	if (_header) _html = _html + '<p>' + '<b>' + _header + '</b>'  + '</p>'
	
	// if (_topic) _html = _html + _topic + '</br></br>' 
	//if (_title) _html = _html + _title + '</br></br>' 
	if (_description) _html = _html + _description + '</br></br>' 

	if (_projectoutputs) _html = _html + _projectoutputs + '</br></br>' 
	
	if (_startdate) _html = _html + ' year: '  + _startdate + '  '  + '</br></br>' 
	// if (_percent) _html = _html	+ ' complete: '  + _percent + ' %' + '</br></br>' 
	if (_status) _html = _html	+ ' status: '  + _status + ' ' + '</br></br>' 
	
	if (_target) _html = _html	+ ' target value: '  + _target + ' ' + '</br></br>' 

	// if (_segment) _html = _html + 	_segment + '</br></br>'
	// if (_spoke) _html = _html + 	 _spoke + '</br></br>'
	// if (_strategy) _html = _html + 	_strategy + '</br></br>'
	// if (_project) _html = _html + 	 _project + '</br></br>'
	// if (_measure) _html = _html + 	_measure + '</br></br>'
	
	if (_broader) _html = _html +  'parent: ' +  _broader + '</br></br>'
	
	if (_predecessor) _html = _html +  'predecessor: ' +  _predecessor + '</br></br>'
	if (_successor) _html = _html +  'successor: ' +  _successor + '</br></br>'
	
	
	if (_role) _html = _html + '_role: ' +  _role + '</br></br>'
	if (_motivatedBy) _html = _html + '_motivatedBy: ' +  _motivatedBy + '</br></br>'
	if (_hasTarget) _html = _html + '_hasTarget: ' +  _hasTarget + '</br></br>'
	if (_hasBody) _html = _html + '_hasBody: ' +  _hasBody + '</br></br>'
	if (_notify) _html = _html + '_notify: ' +  _notify + '</br></br>'
	if (_assignedBy) _html = _html + '_assignedBy: ' +  _assignedBy + '</br></br>'
	if (_assignedTo) _html = _html + '_assignedTo: ' +  _assignedTo + '</br></br>'
	if (_dueDate) _html = _html + '_dueDate: ' +  _dueDate + '</br></br>'
	if (_timestamp) _html = _html + '_timestamp: ' +  _timestamp + '</br></br>'
	
	
	if (_country) _html = _html + '<b>country:</b> ' +  _country + '</br></br>'
	if (_state) _html = _html + '<b>state:</b> ' +  _state + '</br></br>'
	if (_region) _html = _html + '<b>region:</b> ' +  _region + '</br></br>'
	// if (_district) _html = _district + '<b>district:</b> ' +  _district + '</br></br>'
	
	if (_georss) _html = _html + '<b>geo:</b> ' +  _georss + '</br></br>'
	if (_lat) _html = _html + '<b>lat:</b> ' +  _lat + '</br></br>'
	if (_long) _html = _html + '<b>long:</b> ' +  _long + '</br></br>'
	if (_elevation) _html = _html + '<b>elev:</b> ' +  _elevation + '</br></br>'
	if (_areaTotalSqM) _html = _html + '<b>area:</b> ' +  _areaTotalSqM + '</br></br>'
	if (_timeZone) _html = _html + '<b>tz:</b> ' +  _timeZone + '</br></br>'
	if (_postalCode) _html = _html + '<b>postal:</b> ' +  _postalCode + '</br></br>'
	if (_populationTotal) _html = _html + '<b>pop:</b> ' +  _populationTotal + '</br></br>'

	
	
	if (_broader) _html = _html + '<b>_broader:</b> ' +  _broader + '</br></br>'
	if (_narrower) _html = _html + '<b>_narrower:</b> ' +  _narrower + '</br></br>'
	if (_related) _html = _html + '<b>_related:</b> ' +  _related + '</br></br>'
	if (_monitors) _html = _html + '<b>_monitors:</b> ' +  _monitors + '</br></br>'
	if (_supports) _html = _html + '<b>supports:</b> ' +  _supports + '</br></br>'
	if (_segment) _html = _html + '<b>_segment:</b> ' +  _segment + '</br></br>'
	if (_spoke) _html = _html + '<b>_spoke:</b> ' +  _spoke + '</br></br>'
	if (_strategy) _html = _html + '<b>_strategy:</b> ' +  _strategy + '</br></br>'
	if (_measure) _html = _html + '<b>_measure:</b> ' +  _measure + '</br></br>'
	if (_predecessor) _html = _html + '<b>_predecessor:</b> ' +  _predecessor + '</br></br>'
	if (_successor) _html = _html + '<b>_successor:</b> ' +  _successor + '</br></br>'



	if (_name)       _html = _html + '<b>name:</b> ' +  _name + '</br></br>'    
	if (_prefix)     _html = _html + '<b>prefix:</b> ' +  _prefix + '</br></br>'  
	if (_givenName)  _html = _html + '<b>givenName:</b> ' +  _givenName + '</br></br>'  
	if (_surname)    _html = _html + '<b>surname:</b> ' +  _surname + '</br></br>'  
	if (_suffix)     _html = _html + '<b>suffix:</b> ' +  _suffix + '</br></br>'  
	if (_nick)       _html = _html + '<b>nick:</b> ' +  _nick + '</br></br>' 
	
	if (_mbox)       _html = _html + '<b>mbox:</b> ' +  _mbox + '</br></br>'  
	if (_phone)      _html = _html + '<b>phone:</b> ' +  _phone + '</br></br>'  
	if (_email)       _html = _html + '<b>email:</b> ' +  _email + '</br></br>'  
	
	
	if (_title)      _html = _html + '<b>title:</b> ' +  _title + '</br></br>'  
	if (_employer)   _html = _html + '<b>employer:</b> ' +  _employer + '</br></br>'  
	if (_contactOf)  _html = _html + '<b>contactOf:</b> ' +  _contactOf + '</br></br>'  
	if (_holdsRole)  _html = _html + '<b>holdsRole:</b> ' +  _holdsRole + '</br></br>'
	if (_hadRole)    _html = _html + '<b>hadRole:</b> ' +  _hadRole + '</br></br>'
	
	
	if (_depiction)  _html = _html + '<b>depiction:</b> ' + '<img src="' + _depiction + '" >' + '</br></br>'  
	if (_thumbnail)  _html = _html + '<b>thumbnail:</b> ' + '<img src="' + _thumbnail + '" >' + '</br></br>'  
	
	
	if (_linkedin)     _html = _html + '<b>linkedin:</b> ' + '<a href="' + _linkedin + '" target="_blank" title="LinkedIn Profile">' + _linkedin +'</a>' + '</br></br>'  
	if (_connections)  _html = _html + '<b>connections:</b> ' + '<a href="' + _connections + '" target="_blank" title="LinkedIn Connection">' + _connections +'</a>' + '</br></br>' 
	if (_member)     _html = _html + '<b>member:</b> ' +  _member + '</br></br>'  
	if (_knows)      _html = _html + '<b>knows:</b> ' +  _knows + '</br></br>'  

	if (_postIn)     _html = _html + '<b>postIn:</b> ' +  _postIn + '</br></br>'  
	if (_hasPost)    _html = _html + '<b>hasPost:</b> ' +  _hasPost + '</br></br>'  
	if (_heldBy)     _html = _html + '<b>heldBy:</b> ' +  _heldBy + '</br></br>'  
	if (_reportsTo)  _html = _html + '<b>reportsTo:</b> ' +  _reportsTo + '</br></br>' 
	if (_ambassador)  _html = _html + '<b>ambassador:</b> ' +  _ambassador + '</br></br>' 

	if (_topic) _html = _html +  _topic + '</br></br>'
	if (_abstract) _html = _html +  _abstract + '</br></br>'
		
	// if (_sameas) _html = _html + '<b>sameAs:</b> ' +  _sameas + '</br></br>'
	// if (_seealso) _html = _html + '<b>seeAlso:</b> ' +  _seealso + '</br></br>'

	if (_comments) _html = _html + '<b>comments:</b> ' +  _comments + '</br></br>'
	
	// _html = _html + 	' id:    <em>' +  _id   + '</em></br>'
	_html = _html + '</div>'

	// console.log('_html', _html)
	return _html ;
}; // end htmlPreview


function htmlForm (_entity) {
	console.log('htmlPreview', _entity)
	var _html
	
	var _id = _entity.id || null;
	var _dbotype = _entity.dbotype || "";
	var _group = _entity.group || null;
	var _label = _entity.label || null;
	
	var _topic = _entity['foaf:topic'] || _entity['topic']  || null;
	var _profile = _entity['linkedin:Profile']  || _entity['profile'] || null;
	var _sameas = _entity['owl:sameAs']  || _entity['sameas'] || null;
	var _seealso = _entity['owl:seeAlso'] || _entity['seealso']  || null;
	var _comments = _entity['rdfs:comment'] || _entity['comments']  || null;
	var _prefLabel = _entity['skos:prefLabel'] || _entity['prefLabel']  || null;
	
	var _title = _entity['dc:title'] || null;
	var _description = _entity['dc:description'] || null;
	var _dcabstract = _entity['dc:abstract'] || null;
	var _dboabstract = _entity['dbo:abstract'] || null;
	
	var _name = _entity['foaf:name'] || null;
	var _givenName = _entity['foaf:givenName'] || null;
	var _surname = _entity['foaf:surname'] || null;
	var _nick = _entity['foaf:nick'] || null;
	var _mbox = _entity['foaf:mbox'] || null;
	var _phone = _entity['foaf:phone'] || null;
	var _motto = _entity['foaf:motto'] || null;
	var _homepage = _entity['foaf:homepage'] || null;
	var _depiction = _entity['foaf:depiction'] || null;
	
	var _thumbnail = _entity['foaf:thumbnail'] || null;
	
	var _knows = _entity['foaf:knows'] || null;				//console.log('_knows ', _knows)
	var _member = _entity['foaf:member'] || null;
	var _based_near = _entity['foaf:based_near'] || null;
	
	var _locationCity = _entity['dbo:locationCity'] || null;
	var _state = _entity['dbo:state'] || null;
	var _country = _entity['dbo:country'] || null;
	var _region = _entity['dbp:region'] || null;
	var _district = _entity['dbp:district'] || null;
	
	
	var _georss = _entity['georss:point'] || null;
	var _lat = _entity['geo:lat'] || null;
	var _long = _entity['geo:long'] || null;
	var _geometry = _entity['geo:geometry'] || null;
	var _elevation = _entity['dbo:elevation'] || null;
	var _areaTotalSqM = _entity['dbp:areaTotalSqM'] || null;
	var _timeZone = _entity['dbo:timeZone'] || null;
	var _postalCode = _entity['dbo:timepostalCodeZone'] || null;
	var _populationTotal = _entity['dbo:populationTotal'] || null;


	var _has_container = _entity['sioc:has_container'] || null;
	var _hasPost			=  textArray( _entity['org:hasPost'] )  || null;
		
	var _unitOf = _entity['org:unitOf'] || null;
	var _hasUnit = _entity['org:hasUnit'] || null;
	var _linkedin = _entity['linkedin:Profile'] || null;	
	var _comment = _entity['rdfs:comment'] || null;

	var _aboutPerson = _entity['perse:aboutPerson'] || null;
	var _hasGeography = _entity['perse:hasGeography'] || null;
	var _hasDemography = _entity['perse:hasDemography'] || null;
	var _hasKnowledge= _entity['perse:hasKnowledge'] || null;
	var _hasExperience  = _entity['perse:hasExperience'] || null;
	var _hasSkill = _entity['perse:hasSkill'] || null;
	var _hasInterest = _entity['perse:hasInterest'] || null;
	var _hasPersonality  = _entity['perse:hasPersonality'] || null;
	
	
	var _name = _entity['foaf:name'] || _entity['name']  || null;
	var _title = _entity['dc:title'] || _entity['title']  || null;
	var _description = _entity['dc:description'] || _entity['description']  || null;
	var _abstract = _entity['dc:abstract']  || _entity['dbo:abstract']  || _entity['dboabstract'] || _entity['abstract'] || null;	
	var _comment = _entity['rdfs:comment'] || _entity['comment']  || null;
	
	var _categories = _entity['foafiaf:categories'] || _entity['categories'] || null;
	var _keywords = _entity['foafiaf:keywords'] || _entity['keywords'] || null;
	
	var _segment = _entity['foafiaf:Segment'] || _entity['segment']  || null;
	var _spoke = _entity['foafiaf:Spoke'] || _entity['spoke']  || null;
	var _strategy = _entity['foafiaf:Strategy'] || _entity['strategy']  || null;
							
	var _project = _entity['foafiaf:Project'] || _entity['project'] || null;
	var _measure = _entity['foafiaf:Measure'] || _entity['measure']  || null;
	var _status = _entity['foafiaf:status'] || _entity['status']  || null;
	var _percent = _entity['foafiaf:percent'] || _entity['percent']  || null;
	var _priority = _entity['foafiaf:priority'] || _entity['priority']  || null;
	var _color = _entity['foafiaf:color'] || _entity['color']  || null;
	
	var _startdate = _entity['foafiaf:startdate'] || _entity['startdate']  || null;
	var _enddate = _entity['foafiaf:enddate']  || _entity['enddate'] || "";
	var _projectoutputs = _entity['foafiaf:projectoutputs'] || null;
	var _target = _entity['foafiaf:targetvalue'] || _entity['target']  || null;
	var _actual = _entity['foafiaf:datavalues'] || _entity['actual']  || null;
	var _units = _entity['foafiaf:unitofmeasure'] || _entity['units']  || null;
	var _colour = _entity['foafiaf:colour'] || _entity['colour']  || null;
			
	var _shortname = _entity['foafiaf:shortname'] || _entity['shortname']  || null;

	var _broader = _entity['skos:broader'] || _entity['broader']  || null;
	var _narrower = _entity['skos:narrower'] || _entity['narrower']  || null;
	
	var _predecessor = _entity['tmo:PredecessorDependency'] || _entity['PredecessorDependency']  || null;
	var _successor = _entity['tmo:SuccessorDependency'] || _entity['SuccessorDependency']  || null;


	var _role = _entity['foafiaf:Role'] || _entity['role'] || null;
	var _hasBody = _entity['oa:hasBody'] || _entity['hasBody']  || null;
	var _hasTarget = _entity['oa:hasTarget'] || _entity['hasTarget']  || null;
	var _motivatedBy = _entity['oa:motivatedBy'] || _entity['motivatedBy']  || null;
	var _notify = _entity['foafiaf:Notify'] || _entity['Notify']  || null;
	var _assignedBy = _entity['foafiaf:assignedBy'] || _entity['assignedBy']  || null;
	var _assignedTo = _entity['foafiaf:assignedTo'] || _entity['assignedTo']  || null;
	var _dueDate = _entity['foafiaf:dueDate'] || _entity['dueDate']  || null;
	var _timestamp = _entity['foafiaf:timestamp'] || _entity['timestamp']  || null;

	
		_html = ''
		_html = _html + ' ' + '<div class="row">' + ''
		_html = _html + ' ' + ' <div class="col-md-12">' + ''
		_html = _html + ' ' + '  <form id="form-contact_info" class="form-horizontal">' + ''
		_html = _html + ' ' + '   <fieldset id="contact_info" class="section" style="display: block;">' + '</br> '
		_html = _html + ' ' + '    <legend id="contact_info-headline">' +  _group  + '</legend>' + '</br> '
		
			  
		// if (_prefLabel)      _html = _html + '   prefLabel: <input type="text" class="form-control " value="' +  _prefLabel   + '" size="30"  disabled> </br>'
		// if (_topic)          _html = _html + '       topic: <input type="text" class="form-control " value="' +  _topic       + '" disabled> </br>'
		// if (_title)          _html = _html + '       title: <input type="text" class="form-control " value="' +  _title       + '" size="30" disabled> </br>'
		// if (_description)    _html = _html + ' description: <input type="text" class="form-control " value="' +  _description + '" disabled> </br>'

		// if (_categories)     _html = _html + '  categories: <input type="text" class="form-control " value="' +  _categories  + '" disabled> '
		// if (_keywords)       _html = _html + '    keywords: <input type="text" class="form-control "cvalue="' +  _keywords    + '" disabled> '

		if (_projectoutputs) _html = _html + 'projectoutputs: <input type="text" class="form-control "cvalue="' +  _projectoutputs    + '" disabled> '
	
		if (_startdate)      _html = _html + '   startdate: <input type="text" class="form-control "cvalue="' +  _startdate    + '" disabled> </br>' 
	// // if (_percent) _html = _html	+ ' complete: '  + _percent + ' %' + '</br></br>' 
		
		if (_status)         _html = _html + '      status: <input type="text" class="form-control "cvalue="' +  _status    + '" disabled> </br>'  
	
		if (_target)         _html = _html + '      target: <input type="text" class="form-control "cvalue="' +  _target    + '" disabled> </br>' 

		if (_segment) _html = _html + 	 '_segment: <input type="text" class="form-control "cvalue="' +  _segment  + '" disabled> </br>'
		if (_spoke) _html = _html + 	  '_spoke: <input type="text" class="form-control "cvalue="' +  _spoke  + '" disabled> </br>'
		if (_strategy) _html = _html + 	 '_strategy: <input type="text" class="form-control "cvalue="' +  _project  + '" disabled> </br>'
		if (_project) _html = _html + 	  '_project: <input type="text" class="form-control "cvalue="' +  _segment  + '" disabled> </br>'
		if (_measure) _html = _html + 	 '_measure: <input type="text" class="form-control "cvalue="' +  _measure  + '" disabled> </br>'
	
		if (_broader)        _html = _html + '     broader: <input type="text" class="form-control "cvalue="' +  _broader    + '" disabled> </br>'
		if (_narrower)        _html = _html + '     narrower: <input type="text" class="form-control "cvalue="' +  _narrower    + '" disabled> </br>'
		
		if (_predecessor)    _html = _html + ' predecessor: <input type="text" class="form-control "cvalue="' +  _predecessor    + '" disabled> </br>'
		if (_successor)      _html = _html + '   successor: <input type="text" class="form-control "cvalue="' +  _successor    + '" disabled> </br>'
		
		if (_abstract)       _html = _html + '    abstract: <input type="text" class="form-control "cvalue="' +  _abstract    + '" disabled> </br>'
		if (_comment)        _html = _html + '     comment: <input type="text" class="form-control "cvalue="' +  _comment    + '" disabled> </br>'
		
	// 	_html = _html + '<input type="text" class="form-control "cvalue="' +  _id    + '" disabled> </br>'
	// 	_html = _html + '</fieldset>' ;
		
	// _html = _html + '</div>'
	
	
		
		

		if (_label) 	_html = _html + 
						  '<div class="form-group label">' +
						   '<label class="control-label col-sm-4"> label </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _label + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		
		if (_prefLabel)   _html = _html + '  prefLabel: <input type="text" class="form-control " value="' +  _prefLabel   + '" disabled> </br>'
		if (_topic)       _html = _html + '      topic: <input type="text" class="form-control " value="' +  _topic       + '" disabled> </br>'
		if (_title)       _html = _html + '      title: <input type="text" class="form-control " value="' +  _title       + '" disabled> </br>'
		if (_description) _html = _html + 'description: <input type="text" class="form-control " value="' +  _description + '" disabled> </br>'
		
		if (_categories)  _html = _html + ' categories: <input type="text" class="form-control " value="' +  _categories  + '" disabled> </br>'
		if (_keywords)    _html = _html + '   keywords: <input type="text" class="form-control "cvalue="' +  _keywords    + '" disabled> </br>'


		if (_name)        _html = _html + 
						  '<div class="form-group givenName">' +
						   '<label class="control-label col-sm-4"> name </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _name + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		
		if (_givenName)        _html = _html + 
						  '<div class="form-group givenName">' +
						   '<label class="control-label col-sm-4"> givenName </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _givenName + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
						  
		if (_surname)        _html = _html + 
						  '<div class="form-group surname">' +
						   '<label class="control-label col-sm-4"> surname </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _surname + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		if (_nick)        _html = _html + 
						  '<div class="form-group nick">' +
						   '<label class="control-label col-sm-4"> nick </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _nick + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		if (_mbox)        _html = _html + 
						  '<div class="form-group mbox">' +
						   '<label class="control-label col-sm-4"> mbox </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _mbox + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		if (_phone)        _html = _html + 
						  '<div class="form-group phone">' +
						   '<label class="control-label col-sm-4"> phone </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _phone + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		if (_depiction)        _html = _html + 
						  '<div class="form-group _depiction">' +
						   '<label class="control-label col-sm-4"> depiction </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _depiction + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		if (_thumbnail)        _html = _html + 
						  '<div class="form-group _thumbnail">' +
						   '<label class="control-label col-sm-4"> depiction </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _thumbnail + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
						  
		if (_member)        _html = _html + 
						  '<div class="form-group member">' +
						   '<label class="control-label col-sm-4"> member </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _member + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		if (_knows)        _html = _html + 
						  '<div class="form-group _knows">' +
						   '<label class="control-label col-sm-4"> knows </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _knows + '" disabled> </br>' +
						   '</div>' +
						  '</div>'


		if (_role)         _html = _html + '  _role: <input type="text" class="form-control " value="' +  _role   + '" disabled> </br>'
		if (_hasBody)      _html = _html + '  _hasBody: <input type="text" class="form-control " value="' +  _hasBody   + '" disabled> </br>'
		if (_hasTarget)    _html = _html + '  _hasTarget: <input type="text" class="form-control " value="' +  _hasTarget   + '" disabled> </br>'
		if (_motivatedBy)  _html = _html + '  _motivatedBy: <input type="text" class="form-control " value="' +  _motivatedBy   + '" disabled> </br>'
		if (_notify)       _html = _html + '  _notify: <input type="text" class="form-control " value="' +  _notify   + '" disabled> </br>'
		if (_assignedBy)   _html = _html + '  _assignedBy: <input type="text" class="form-control " value="' +  _assignedBy   + '" disabled> </br>'
		if (_assignedTo)   _html = _html + '  _assignedTo: <input type="text" class="form-control " value="' +  _assignedTo   + '" disabled> </br>'
		if (_dueDate)      _html = _html + '  _dueDate: <input type="text" class="form-control " value="' +  _dueDate   + '" disabled> </br>'
		if (_timestamp)    _html = _html + '  _timestamp: <input type="text" class="form-control " value="' +  _timestamp   + '" disabled> </br>'




		_html = _html + ' ' + '   </fieldset>' + '</br>'
		_html = _html + ' ' + '  </form>' + ''
		_html = _html + ' ' + ' </div>' + ''
		_html = _html + ' ' + '</div>' + ''
	
	
	

	console.log('_html', _html)
	return _html ;
}; // end htmlForm


function htmlDetails (_entity) {
	//console.log('htmlDetails', _entity)
	var formfields = true;
	
	var _html
	
	var _id = _entity.id || null;
	var _group = _entity.group || null;
	var _label = _entity.label || null;
	
	var _topic = _entity['foaf:topic'] || null;
	var _profile = _entity['linkedin:Profile'] || null;
	var _sameas = _entity['owl:sameAs'] || null;
	var _seealso = _entity['owl:seeAlso'] || null;
	var _comments = _entity['rdfs:comment'] || null;
	var _prefLabel = _entity['skos:prefLabel'] || null;
	
	var _title = _entity['dc:title'] || null;
	var _description = _entity['dc:description'] || null;
	var _dcabstract = _entity['dc:abstract'] || null;
	var _dboabstract = _entity['dbo:abstract'] || null;
	
	var _name = _entity['foaf:name'] || null;
	var _givenName = _entity['foaf:givenName'] || null;
	var _surname = _entity['foaf:surname'] || null;
	var _nick = _entity['foaf:nick'] || null;
	var _mbox = _entity['foaf:mbox'] || null;
	var _phone = _entity['foaf:phone'] || null;
	var _motto = _entity['foaf:motto'] || null;
	var _homepage = _entity['foaf:homepage'] || null;
	var _depiction = _entity['foaf:depiction'] || null;
	var _knows = _entity['foaf:knows'] || null;				//console.log('_knows ', _knows)
	var _member = _entity['foaf:member'] || null;
	var _based_near = _entity['foaf:based_near'] || null;
	
	var _locationCity = _entity['dbo:locationCity'] || null;
	var _state = _entity['dbo:state'] || null;
	var _country = _entity['dbo:country'] || null;
	var _georss = _entity['georss:point'] || null;

	var _has_container = _entity['sioc:has_container'] || null;
	var _hasPost			=  textArray( _entity['org:hasPost'] )  || null;
		
	var _unitOf = _entity['org:unitOf'] || null;
	var _hasUnit = _entity['org:hasUnit'] || null;
	var _linkedin = _entity['linkedin:Profile'] || null;	
	var _comment = _entity['rdfs:comment'] || null;

	var _aboutPerson = _entity['perse:aboutPerson'] || null;
	var _hasGeography = _entity['perse:hasGeography'] || null;
	var _hasDemography = _entity['perse:hasDemography'] || null;
	var _hasKnowledge= _entity['perse:hasKnowledge'] || null;
	var _hasExperience  = _entity['perse:hasExperience'] || null;
	var _hasSkill = _entity['perse:hasSkill'] || null;
	var _hasInterest = _entity['perse:hasInterest'] || null;
	var _hasPersonality  = _entity['perse:hasPersonality'] || null;


	_html = '<div>'
	if (formfields) {
		
		_html = _html + ' ' + '<div class="row">' + ''
		_html = _html + ' ' + ' <div class="col-md-12">' + ''
		_html = _html + ' ' + '  <form id="form-contact_info" class="form-horizontal">' + ''
		_html = _html + ' ' + '   <fieldset id="contact_info" class="section" style="display: block;">' + '</br> '
		_html = _html + ' ' + '    <legend id="contact_info-headline">' +  _group  + '</legend>' + '</br> '
		
		if (_id)    	_html = _html + 
						  '<div class="form-group id">' +
						   '<label class="control-label col-sm-4"> id </label>' + 
						    '<span class="form-control uneditable-input">' +
    							_id +
							'</span>' +
						  '</div>'
		if (_group) 	_html = _html + 
						  '<div class="form-group group">' +
						   '<label class="control-label col-sm-4"> group </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _group + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		if (_label) 	_html = _html + 
						  '<div class="form-group label">' +
						   '<label class="control-label col-sm-4"> label </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _label + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		
		if (_prefLabel)   _html = _html + '  prefLabel: <input type="text" class="form-control " value="' +  _prefLabel   + '" disabled> </br>'
		if (_topic)       _html = _html + '      topic: <input type="text" class="form-control " value="' +  _topic       + '" disabled> </br>'
		if (_title)       _html = _html + '      title: <input type="text" class="form-control " value="' +  _title       + '" disabled> </br>'
		if (_description) _html = _html + 'description: <input type="text" class="form-control " value="' +  _description + '" disabled> </br>'
		
		if (_categories)  _html = _html + ' categories: <input type="text" class="form-control " value="' +  _categories  + '" disabled> </br>'
		if (_keywords)    _html = _html + '   keywords: <input type="text" class="form-control "cvalue="' +  _keywords    + '" disabled> </br>'


		if (_name)        _html = _html + 
						  '<div class="form-group givenName">' +
						   '<label class="control-label col-sm-4"> name </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _name + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		
		if (_givenName)        _html = _html + 
						  '<div class="form-group givenName">' +
						   '<label class="control-label col-sm-4"> givenName </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _givenName + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
						  
		if (_surname)        _html = _html + 
						  '<div class="form-group surname">' +
						   '<label class="control-label col-sm-4"> surname </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _surname + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		if (_nick)        _html = _html + 
						  '<div class="form-group nick">' +
						   '<label class="control-label col-sm-4"> nick </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _nick + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		if (_mbox)        _html = _html + 
						  '<div class="form-group mbox">' +
						   '<label class="control-label col-sm-4"> mbox </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _mbox + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		if (_phone)        _html = _html + 
						  '<div class="form-group phone">' +
						   '<label class="control-label col-sm-4"> phone </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _phone + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		if (_depiction)        _html = _html + 
						  '<div class="form-group _depiction">' +
						   '<label class="control-label col-sm-4"> depiction </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _depiction + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		if (_member)        _html = _html + 
						  '<div class="form-group member">' +
						   '<label class="control-label col-sm-4"> member </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _member + '" disabled> </br>' +
						   '</div>' +
						  '</div>'
		if (_knows)        _html = _html + 
						  '<div class="form-group _knows">' +
						   '<label class="control-label col-sm-4"> knows </label>' + 
						   '<div class="col-sm-8">' + 
							'<input type="text" class="form-control " value="' +  _knows + '" disabled> </br>' +
						   '</div>' +
						  '</div>'

		_html = _html + ' ' + '   </fieldset>' + '</br>'
		_html = _html + ' ' + '  </form>' + ''
		_html = _html + ' ' + ' </div>' + ''
		_html = _html + ' ' + '</div>' + ''
		
		
	} else {
	
		_html = _html + ' ' + _group + ': '
				
		switch(_entity.group) {
			
		    case "Note":
	
				var _timestamp = _entity['foafoaf:timestamp'] || null;
				var _Person = _entity['foafiaf:Person'] || null;
				var _Role = _entity['foafiaf:Role'] || null;
				var _assignedBy = _entity['foafiaf:assignedBy'] || null;
				var _assignedTo = _entity['foafiaf:assignedTo'] || null;
				var _dueDate = _entity['foafiaf:dueDate'] || null;
	
	
				_html = _html + ' <b>' + _prefLabel + '</b>'  + '</br>'
				_html = _html + '</br>'
	
				if (_Role) _html = _html + 	' role: '     + _Role + '</br>'			
				if (_Person) _html = _html + 	' person: '     + _Person + '</br>'
				_html = _html + '</br>'
				
				if (_title) _html = _html + 	' title: '     + _title + '</br></br>' 
				
				if (_description) _html = _html + 	' description: ' + _description + '</br></br>' 
				
				if (_dueDate) _html = _html + 	' due: '     + _dueDate + '</br></br>'
				
				if (_assignedTo) _html = _html + 	' assigned: '     + _assignedTo + '</br></br>'
				
				if (_assignedBy) _html = _html + 	' by: '     + _assignedBy + '</br></br>'
				
				if (_timestamp) _html = _html + 	' timestamp:    <em>' +  _timestamp   + '</em></br>' 
	
	
		        break;
		        
		        
		    case "Strategy":
		    case "Project":
		    case "Measure":
	
				
		    	var _categories = _entity['foafiaf:categories'] || null;
		    	var _keywords = _entity['foafiaf:keywords'] || null;
		    	
				var _segment = _entity['foafiaf:Segment'] || null;
				var _spoke = _entity['foafiaf:Spoke'] || null;
				var _strategy = _entity['foafiaf:Strategy'] || null;
										
				var _project = _entity['foafiaf:Project'] || null;
				var _measure = _entity['foafiaf:Measure'] || null;
				var _status = _entity['foafiaf:status'] || null;
				var _color = _entity['foafiaf:color'] || null;
				
				var _startdate = _entity['foafiaf:startdate'] || null;
				var _enddate = _entity['foafiaf:enddate'] || null;
				var _projectoutputs = _entity['foafiaf:projectoutputs'] || null;
				var _target = _entity['foafiaf:targetvalue'] || null;
				var _actual = _entity['foafiaf:datavalues'] || null;
				var _units = _entity['foafiaf:unitofmeasure'] || null;
				var _colour = _entity['foafiaf:colour'] || null;
			
				var _shortname = _entity['foafiaf:shortname'] || null;
	    
	
				_html = _html + ' <b>' + _label + '</b></br></br>' 
				_html = _html + '</br>'
				
				if (_topic) _html = _html + 	' topic: '     + _topic + '</br></br>' 
				
				if (_title) _html = _html + 	' title: '     + _title + '</br></br>' 
				if (_description) _html = _html + 	' description: ' + _description + '</br></br>' 
				
				if (_categories) _html = _html + 	' categories: '     + _categories + '</br></br>' 
				if (_keywords) _html = _html + 	' keywords: '     + _keywords + '</br></br>' 
				
				if (_segment) _html = _html +   ' segment: ' + _segment + '</br></br>' 
				if (_spoke) _html = _html +     ' spoke: ' + _spoke + '</br></br>' 
				if (_strategy) _html = _html +  ' strategy: ' + _strategy + '</br></br>' 
				if (_project) _html = _html +  ' project: ' + _project + '</br></br>' 
				if (_measure) _html = _html +  ' measure: ' + _measure + '</br></br>' 
				
				if (_startdate) _html = _html +  ' startdate: ' + _startdate + '</br></br>' 
				if (_enddate) _html = _html +  ' enddate: ' + _enddate + '</br></br>' 
				if (_projectoutputs) _html = _html +  ' projectoutputs: ' + _projectoutputs + '</br></br>' 
				
				if (_target) _html = _html +  ' target: ' + _target + '</br></br>' 
				if (_actual) _html = _html +  ' actual: ' + _actual + '</br></br>' 
				if (_units) _html = _html +  ' units: ' + _units + '</br></br>' 
				
				
				if (_color) {
					_html = _html + ' color: <b><font color="' + _color + '">' + _color + '</font></b></br>'
				}
				if (_colour) {
					_html = _html + ' colour: <b><font color="' + _colour + '">' + _colour + '</font></b></br>'
				}
				
				if (_shortname) _html = _html +  ' _shortname: ' + _shortname + '</br></br>' 
				
				if (_sameas) _html = _html +   ' _sameas: ' + _sameas + '</a></br>'
				
				if (_seealso) _html = _html +  ' seeAlso: ' + _seealso + '</br>'
				
				if (_comment) _html = _html +  ' _comment: ' + _comment + '</br>'
	
		        break;
		        
		    default:
		    
				
				var _header = null;
				if (_prefLabel) {
					_header = _prefLabel;
				} else if (_title) {
					_header = _title;
				} else {
					_header = _label;
				}
				if (_header) _html = _html + ' <b>' + _header + '</b>'  + '</br></br>'
				
				if (_topic) _html = _html + 	' topic: '     + _topic + '</br></br>' 
				if (_title) _html = _html + 	' title: '     + _title + '</br></br>' 
				if (_description) _html = _html + 	' description: ' + _description + '</br></br>' 
				
				if (_categories) _html = _html + 	' categories: '     + _categories + '</br></br>' 
				if (_keywords) _html = _html + 	' keywords: '     + _keywords + '</br></br>' 

				
				if (_name) _html = _html + 	' name:  ' + _name + '</br>'
				if (_givenName) _html = _html + 	' givenName:  ' + _givenName + '</br>'
				if (_surname) _html = _html + 	' surname: ' + _surname + '</br>'
				if (_nick) _html = _html + 	' nick:  ' + _nick + '</br>'
				if (_mbox) _html = _html + 	' mbox:  ' + _mbox + '</br>'
				if (_phone) _html = _html + 	' phone:  ' + _phone + '</br>'
				if (_motto) _html = _html + 	' motto:  ' + _motto + '</br>'
				if (_homepage) _html = _html + 	' homepage:  ' + _homepage + '</br>'
				if (_depiction) _html = _html + 	' depiction:  ' + '<img src="' + _depiction + '" >' + '</br>'
				if (_member) _html = _html + 	' member:  ' + _member + '</br>'
				if (_knows) _html = _html + 	' knows:  ' + _knows + '</br>'

		
						
				if (_based_near) _html = _html + 	' based near: ' + _based_near + '</br></br>'
				if (_locationCity) _html = _html + 	' location City: ' + _locationCity + '</br></br>'
				if (_state) _html = _html + 	' state: ' + _state + '</br></br>'
				if (_country) _html = _html + 	' country: ' + _country + '</br></br>'
				if (_georss) _html = _html + 	' georss: ' + _georss + '</br></br>'
				
				if (_has_container) _html = _html +   ' has container: ' + _has_container + '</a></br></br>'
				if (_hasUnit) _html = _html +   ' has Unit: ' + _hasUnit + '</a></br></br>'
				if (_unitOf) _html = _html +   ' unit Of: ' + _unitOf + '</a></br></br>'
				if (_hasPost) _html = _html +   ' has Post: ' + _hasPost + '</a></br></br>'
				
				if (_sameas) _html = _html +   ' same As: ' + _sameas + '</a></br></br>'
				if (_seealso) _html = _html +  ' see Also: ' +'<a href="' + _seealso + '"  target="_blank" >' + _seealso + '</a>' + '</br></br>'
				if (_profile) _html = _html +  ' profile: '+ '<a href="' + _profile + '"  target="_blank" >' + _profile + '</a>' + '</br></br>'
				
				if (_comment) _html = _html +  ' comment: ' + _comment + '</br></br>'
				if (_dcabstract) _html = _html +  ' _dcabstract: ' + _dcabstract + '</br></br>'
				
				if (_aboutPerson) _html = _html +  ' _aboutPerson: ' + _aboutPerson + '</br></br>'
				if (_hasGeography) _html = _html +  ' _hasGeography: ' + _hasGeography + '</br></br>'
				if (_hasDemography) _html = _html +  ' _hasDemography: ' + _hasDemography + '</br></br>'
				if (_hasKnowledge) _html = _html +  ' _hasKnowledge: ' + _hasKnowledge + '</br></br>'
				if (_hasExperience) _html = _html +  ' _hasExperience: ' + _hasExperience + '</br></br>'
				if (_hasSkill) _html = _html +  ' _hasSkill: ' + _hasSkill + '</br></br>'
				if (_hasInterest) _html = _html +  ' _hasInterest: ' + _hasInterest + '</br></br>'
				if (_hasPersonality) _html = _html +  ' _hasPersonality: ' + _hasPersonality + '</br></br>'
				
	
				
		} // end switch
		
			
		_html = _html + 	' id:    <em>' +  _id   + '</em></br>'

		
		
	} // end if formfields	
	_html = _html + '</div>'

	return _html ;
} // end htmlDetails
