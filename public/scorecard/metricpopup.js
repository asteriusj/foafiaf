/**
 * Semantic Data Metric Detials Card
 * Copyright 2018, Asterius Media LLC, All Rights Reserved.
 */
 'use strict';


//
// inject popup layer inside canvas area
//
function setGroupDetails(group) {
    console.log('setGroupDetails',group)
    var x = document.getElementById("myPopupBox");
    console.log('x.innerHTML',x.innerHTML)
    
    var grpLabel = document.getElementById("grpLabel");
    grpLabel.innerHTML = group.label;
    
    var grpFull = document.getElementById("grpFull");
    grpFull.innerHTML = group.full;
    
    var grpStatus = document.getElementById("grpStatus");
    grpStatus.innerHTML = '<em>status:</em> <b><font color="'+ group.status + '">' + group.status + '</font></b>';
    
    var grpUnits = document.getElementById("grpUnits");
    grpUnits.innerHTML = '<em>units:</em> ' + group.units;
    
    var grpValue = document.getElementById("grpValue");
    grpValue.innerHTML = '<em>value:</em> ' + group.value;
    
    return true
}
function myPopupFunction(group) {
    console.log('myPopupFunction',group)
    var x = document.getElementById("myPopupBox");
    
    console.log('x.style',x.style)
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}



