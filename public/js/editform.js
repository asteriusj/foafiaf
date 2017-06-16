// 'use strict';

// Todo
// see https://github.com/jdorn/json-editor
// enable json-editor within pane
// add utils function for jsonEditor() tather than htmlForm() to generate form schema from data
//
// add Issues and Actions to combineJSONLD Datasets
// import Issues and Actions into JSONLD with web-annotation schem elements
// add Issue ain Options with icons image ref
// add reciprical object relations ship for Notes and Issues


// JS for beahvor of editor form
//openeditform();
function openeditform(a, b, c) {
    console.log('openeditform')
    var d = "no";
    //console.log('document.getElementById("editform_data")',document.getElementById("editform_data"))
    
    var panw = 420, panh = 240, panurl = "feedback.php?";
    
    // $("#darkenBackground").show();
    
    // $("#editform_data").html('<iframe src="' + panurl + "id=" + a + "&type=" + b + "&param=" + c + '" frameborder=0 height="100%" width="100%" scrolling=' + d + " id=frdata>Loading...</iframe>");
    
    var f = getSize("w"),
        g = getSize("h"),
        h = (f - panw) / 4 - 0, h=25,            
        i = (g - panh) / 4 - 1, i=25;
    0 > i && (i = 0), 0 > h && (h = 0), 
    document.getElementById("editform_data").style.width = panw + "px", 
      // document.getElementById("editform_data").style.height = panh + "px", 
    document.getElementById("editform_data").style.left = h + 100 + "px", 
    document.getElementById("editform_data").style.top = i + 100 + "px", 
    $("#editform_data").show()
    // ,
    // document.getElementById("editform_data_show").style.left = h + panw - 6 + "px", 
    // document.getElementById("editform_data_show").style.top = i - 13 + "px", 
    // $("#editform_data_toggle").show()

}
function closeeditform() {
     console.log('closeeditform')
    //  $("#editform_data").hide(), $("#editform_data_hide").hide(), $("#darkenBackground").hide(), $("input#city").focus()
     $("#editform_data").hide(), $("#darkenBackground").hide(), $("input#city").focus()
}
function toggleeditform() {
     console.log('toggleeditform')
     var editFormIs = document.getElementById("editform_data").style.display ;
     if (editFormIs === 'none') {
         openeditform()
     } else if (editFormIs === 'block') {
         closeeditform()
     }
}
function getSize(a) {
    var b = 0,
        c = 0;
    return "number" == typeof window.innerWidth ? (b = window.innerWidth, c = window.innerHeight) : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? (b = document.documentElement.clientWidth, c = document.documentElement.clientHeight) : document.body && (document.body.clientWidth || document.body.clientHeight) && (b = document.body.clientWidth, c = document.body.clientHeight), "w" == a ? b : "h" == a ? c : void 0
}

// <script>
  $( function() {
    $( "#editform_data" ).draggable();
  } );
// </script>



