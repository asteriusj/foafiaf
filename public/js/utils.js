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
function getIdentifer(d){
    var txt = d.depth ? d.id : "" ;
    //console.log('txt', txt)
    return txt;
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

// prep dialog box details 
function getDetails(t){
    console.log('getDetails', t)
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
		_html = _html + ' ' + '    <legend id="contact_info-headline">Entity:</legend>' + '</br> '
		
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
