// 'use strict';

// Todo


// JS for beahvor of search form
//opensearchform();
function opensearchform(a, b, c) {
    console.log('opensearchform')
    var d = "no";
    //console.log('document.getElementById("searchform_data")',document.getElementById("searchform_data"))
    
    var panw = 420, panh = 360
    
    // $("#darkenBackground").show();
    
    // $("#searchform_data").html('<iframe src="' + panurl + "id=" + a + "&type=" + b + "&param=" + c + '" frameborder=0 height="100%" width="100%" scrolling=' + d + " id=frdata>Loading...</iframe>");
    
    var f = getSize("w"),
        g = getSize("h"),
        h = (f - panw) / 4 - 0, h=25,            
        i = (g - panh) / 4 - 1, i=25;
    0 > i && (i = 0), 0 > h && (h = 0), 
    document.getElementById("searchform_data").style.width = panw + "px", 
      // document.getElementById("searchform_data").style.height = panh + "px", 
    document.getElementById("searchform_data").style.left = h + 25 + "px", 
    document.getElementById("searchform_data").style.top = i + 25 + "px", 
    $("#searchform_data").show()
    // ,
    // document.getElementById("searchform_data_show").style.left = h + panw - 6 + "px", 
    // document.getElementById("searchform_data_show").style.top = i - 13 + "px", 
    // $("#searchform_data_show").show()
    


}
function closesearchform() {
     console.log('closesearchform')
    //  $("#searchform_data").hide(), $("#searchform_data_hide").hide(), $("#darkenBackground").hide(), $("input#city").focus()
     $("#searchform_data").hide(), $("#darkenBackground").hide()
}
function togglesearchform() {
     console.log('togglesearchform')
     var searchformIs = document.getElementById("searchform_data").style.display ;
    //  alert(searchformIs)
    //  console.log('searchformIs',searchformIs)
     if (searchformIs === 'none') {
         opensearchform()
     } else if (searchformIs === 'block') {
         closesearchform()
     }
}
function getSize(a) {
    var b = 0,
        c = 0;
    return "number" == typeof window.innerWidth ? (b = window.innerWidth, c = window.innerHeight) : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? (b = document.documentElement.clientWidth, c = document.documentElement.clientHeight) : document.body && (document.body.clientWidth || document.body.clientHeight) && (b = document.body.clientWidth, c = document.body.clientHeight), "w" == a ? b : "h" == a ? c : void 0
}

// <script>
  $( function() {
    $( "#searchform_data" ).draggable();
  } );
// </script>



	function updateSearchForm() {
        // if (!d.children) return;
        console.log('updateSearchForm')

        var header = document.getElementsByClassName('searchform-header');
        header[0].innerHTML = "Search It";
        //$(header).hide()
        
        var body = document.getElementsByClassName('searchform-body');
        body[0].innerHTML = getHTML()								    //get html form 
        
        var footer = document.getElementsByClassName('searchform-footer');
        footer[0].innerHTML = "";
        
    }
    
    
    function getHTML(){
        
        var HTMLContent = 
        
'<div>' +
'	<form id="searchForm"  action="#" > ' +
'		<fieldset> ' +
'			<legend>FOAFIAF SearchIt</legend> ' +
'			<div> ' +
'				<label for="entitySelector">Find Entity:</label> ' +
'				<select class="form-control" id="entitySelector" onchange="changeEntity(this.value)"></select>	 ' +
'			</div> ' +
'			<div style="display:none;" > ' +
'			<!--<div >--> ' +
'				<label for="propertySelector">has Property:</label> ' +
'				<select class="form-control" id="propertySelector" onchange="changeProperty(this.value)"></select>	 ' +
'			</div> ' +
'			<div style="display:none;" > ' +
'			<!--<div >--> ' +
'				<label for="propertySelector">has Relation:</label> ' +
'				<select class="form-control" id="propertySelector" onchange="changeProperty(this.value)"></select>	 ' +
'			</div> ' +
'			<div> ' +
'				<label for="propertyContains" id="propertyContainsLabel">Contains:</label> ' +
'				<input type="text" id="propertyContains" size="12"> ' +
'			</div> ' +
'			<div><button type="button" id="searchButton" onclick="searchData()">Search It</button></div> ' +
'		</fieldset> ' +
'	</form> ' +
'</div> ' +
'<div id="resultBox"> ' +
'	Results: ' +
'</div>        ' ;
        
        return HTMLContent
    } // endgetHTML


					
