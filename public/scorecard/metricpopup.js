/**
 * Semantic Data Metric Detials Card
 * Copyright 2018, Asterius Media LLC, All Rights Reserved.
 */
 'use strict';


//
// inject popup layer inside canvas area
//
function setGroupDetails(group) {
    // console.log('setGroupDetails',group)
    var x = document.getElementById("myPopupBox");
    
    var grpLabel = document.getElementById("grpLabel");
    grpLabel.innerHTML = group.label;
    
    var grpFull = document.getElementById("grpFull");
    let _full = group.full  || null ;
    if (_full != null) {
        grpFull.innerHTML = group.full;
    } else {
        grpFull.innerHTML = ""
    }
    
    var grpStatus = document.getElementById("grpStatus");
    let _status = group.status  || null ;
    if (_status != null) {
        grpStatus.innerHTML = '<em>status:</em> <span style="display: inline-block; width: 10px;"></span>    <span id="statusText" ><font color="'+ group.status + '">' + group.status + '</font></span>';
    } else {
        grpStatus.innerHTML = ""
    }
    
    // var grpUnits = document.getElementById("grpUnits");
    // grpUnits.innerHTML = '<em>units:</em> ' + group.units;
    
    var grpValue = document.getElementById("grpValue");
    let _value = group.value  || null ;
    if (_value != null) {
        grpValue.innerHTML = '<i>value:</i>  <span style="display: inline-block; width: 5px;"></span>' + group.value + ' in ' + group.year ;
    } else {
        grpValue.innerHTML = ""
    }
    
    var grpTrend = document.getElementById("grpTrend");
    let _trend = group.trend  || null ;
    if (_trend != null) {
        let _ico = null
        if (_trend == 'Better') _ico = '&nbsp; <i class="fas fa-arrow-up    fa-2x"  title="Better" aria-hidden style="color: Green;"></i>'
        if (_trend == 'Steady') _ico = '&nbsp; <i class="fas fa-arrow-right fa-2x"  title="Steady" aria-hidden style="color: Cyan;"></i>'
        if (_trend == 'Worse')  _ico = '&nbsp; <i class="fas fa-arrow-down  fa-2x"  title="Worse"  aria-hidden style="color: Red;"></i>'
        if (_ico != null) grpTrend.innerHTML = '<em>5-year Trend:</em> ' + _ico ;
    } else {
        grpTrend.innerHTML = ""
    }
    
    var grpRank = document.getElementById("grpRank");
    let _rank = group.rank  || null ;
    if (_rank!== null) {
        grpRank.innerHTML = '<em>rank:</em>  <span style="display: inline-block; width: 5px;"></span>' + group.rank ;
    } else {
        grpRank.innerHTML = ""
    }
    
    var grpTrendRank = document.getElementById("grpTrendRank");
    let _ranktrend = group.ranktrend || null ;
    if (_ranktrend != null) {
        let _rankico = null
        if (_ranktrend.includes('Better')) _rankico = '&nbsp; <i class="fas fa-arrow-up    fa-2x"  title="' +_ranktrend + '" aria-hidden style="color: Green;"></i>'
        if (_ranktrend.includes('Steady')) _rankico = '&nbsp; <i class="fas fa-arrow-right fa-2x"  title="' +_ranktrend + '" aria-hidden style="color: Cyan;"></i>'
        if (_ranktrend.includes('Worse'))  _rankico = '&nbsp; <i class="fas fa-arrow-down  fa-2x"  title="' +_ranktrend + '"  aria-hidden style="color: Red;"></i>'
        if (_rankico != null) grpTrendRank.innerHTML = '<i>Trend in rank:</i> '  + _rankico ;
    } else {
        grpTrendRank.innerHTML = ""
    }
    
    return true
}
function myPopupFunction(group) {
    // console.log('myPopupFunction',group)
    var x = document.getElementById("myPopupBox");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}



