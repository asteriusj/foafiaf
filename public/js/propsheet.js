// 'use strict';
// JS for beahvor of property sheet
//openpropsheet();
function openpropsheet(a, b, c) {
    console.log('openpropsheet')
    var d = "no";
    //console.log('document.getElementById("propsheet_data")',document.getElementById("propsheet_data"))
    
    var panw = 420, panh = 240, panurl = "feedback.php?";
    
    // $("#darkenBackground").show();
    
    // $("#propsheet_data").html('<iframe src="' + panurl + "id=" + a + "&type=" + b + "&param=" + c + '" frameborder=0 height="100%" width="100%" scrolling=' + d + " id=frdata>Loading...</iframe>");
    
    var f = getSize("w"),
        g = getSize("h"),
        h = (f - panw) / 4 - 0, h=25,            
        i = (g - panh) / 4 - 1, i=25;
    0 > i && (i = 0), 0 > h && (h = 0), 
    document.getElementById("propsheet_data").style.width = panw + "px", 
      // document.getElementById("propsheet_data").style.height = panh + "px", 
    document.getElementById("propsheet_data").style.left = h + "px", 
    document.getElementById("propsheet_data").style.top = i + "px", 
    $("#propsheet_data").show()
    // ,
    // document.getElementById("propsheet_data_show").style.left = h + panw - 6 + "px", 
    // document.getElementById("propsheet_data_show").style.top = i - 13 + "px", 
    // $("#propsheet_data_show").show()

}
function closepropsheet() {
     console.log('closepropsheet')
    //  $("#propsheet_data").hide(), $("#propsheet_data_hide").hide(), $("#darkenBackground").hide(), $("input#city").focus()
     $("#propsheet_data").hide(), $("#darkenBackground").hide()
}
function togglepropsheet() {
     console.log('togglepropsheet')
     var propSheetIs = document.getElementById("propsheet_data").style.display ;
    //  alert(propSheetIs)
    //  console.log('propSheetIs',propSheetIs)
     if (propSheetIs === 'none') {
         openpropsheet()
     } else if (propSheetIs === 'block') {
         closepropsheet()
     }
}
function getSize(a) {
    var b = 0,
        c = 0;
    return "number" == typeof window.innerWidth ? (b = window.innerWidth, c = window.innerHeight) : document.documentElement && (document.documentElement.clientWidth || document.documentElement.clientHeight) ? (b = document.documentElement.clientWidth, c = document.documentElement.clientHeight) : document.body && (document.body.clientWidth || document.body.clientHeight) && (b = document.body.clientWidth, c = document.body.clientHeight), "w" == a ? b : "h" == a ? c : void 0
}

// <script>
  $( function() {
    $( "#propsheet_data" ).draggable();
  } );
// </script>



