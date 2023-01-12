(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

},{}],2:[function(require,module,exports){
const firebaseConfig = {
    apiKey: "AIzaSyDeOILBmQ3x98YR3-tld8ArBV70_UFsEzM",
    authDomain: "valoguessr.firebaseapp.com",
    projectId: "valoguessr",
    storageBucket: "valoguessr.appspot.com",
    messagingSenderId: "340786735832",
    appId: "1:340786735832:web:fdddad739837c5603705ad",
    measurementId: "G-ZZJ2RGSJQG"
  };



const Difficulties = ["Easy","Mid","Hard","Impossible","Random"];
let CurrentDif = 0;

function changeDif(){
    CurrentDif ++;
    if(CurrentDif >= 5){
        CurrentDif = 0;
    }

    if(typeof(sessionStorage) != 'undefined') {
        sessionStorage.setItem("sessionDif", CurrentDif);
    }

    var el = document.getElementById("difficultyid");
    el.innerHTML = "-"+Difficulties[CurrentDif]+"-";
  }

let knowsMap = true;
  
function mapHintSwitch(){
    var text = document.getElementById("maphintid");
    var button = document.getElementById("mapswitchid");
    if(knowsMap == true){
        knowsMap = false;
        text.innerHTML = "-Turn ON-";
        button.classList.remove('button-active');
    }
    else{
        knowsMap = true;
        text.innerHTML = "-Turn OFF-";
        button.classList.add('button-active');
    }

    if(typeof(sessionStorage) != 'undefined') {
        sessionStorage.setItem("sessionMap", knowsMap);
    }
}

let outOfBounds;

function outOfBoundSwitch(){
    var text = document.getElementById("outofboundid");
    var button = document.getElementById("outofboundswitch");
    if(knowsMap == true){
        knowsMap = false;
        text.innerHTML = "-Turn ON-";
        button.classList.remove('button-active');
    }
    else{
        knowsMap = true;
        text.innerHTML = "-Turn OFF-";
        button.classList.add('button-active');
    }
    if(typeof(sessionStorage) != 'undefined') {
        sessionStorage.setItem("sessionOOB", outOfBounds);
    }
}
  
const Maps = ["Bind","Breeze","Haven","IceBox","Split","Pearl","Fracture","Ascent"];
const CurrentMaps = [false,false,false,false,false,false,false,false];

function pickMap(id){
    var el = document.getElementById(id);
    if(CurrentMaps[id] == false){
        CurrentMaps[id] = true
        el.classList.add('button-active');
    }
    else{
        CurrentMaps[id] = false
        el.classList.remove('button-active');
    }

    if(typeof(sessionStorage) != 'undefined') {
        sessionStorage.setItem("sessionMaps", JSON.stringify(CurrentMaps));
    }
}

function toggleSettings(){
    console.log("tests")
    var el = document.getElementById("settings");
    if(el.style.display != "none"){
        el.style.display = "none"
    }
    else{
        el.style.display = "flex"
    }
}

let currentAmmount = 1;
const ammounts = [1,2,3,4,5,8,10,12,15,20,25]
let o = 0;
function changeAmmount(){
    o++;
    if(o >= 11){
        o = 0;
    }
    currentAmmount = ammounts[o];
    document.getElementById("ammountid").innerHTML = "-"+currentAmmount+"-"
    
    if(typeof(sessionStorage) != 'undefined') {
        sessionStorage.setItem("sessionAmmount", JSON.stringify(currentAmmount));
    }
}


window.onload = function() {
    if ( document.URL.includes("game.html") ) {
        StartGame();
    }
    if ( document.URL.includes("startGame.html") ) {
        ResetGame();
    }
}
function ResetGame(){
    if(typeof(sessionStorage) != 'undefined') {
        sessionStorage.setItem("sessionDif", CurrentDif);
        sessionStorage.setItem("sessionMaps", JSON.stringify(CurrentMaps));
    }
    var maphinttext = document.getElementById("maphintid");
    var maphintbut = document.getElementById("mapswitchid");

    knowsMap = true;
    maphinttext.innerHTML = "-Turn OFF-";
    maphintbut.classList.add('button-active');

    var text = document.getElementById("outofboundid");
    var button = document.getElementById("outofboundswitch");

    knowsMap = true;
    text.innerHTML = "-Turn OFF-";
    button.classList.add('button-active');
}



function StartGame(){

    sessionDif = [ "by_name", "ascending" ]
    sessionAmmount = [ "by_name", "ascending" ]
    sessionKnowMap = [ "by_name", "ascending" ]
    sessionOOB = [ "by_name", "ascending" ]
    sessionMaps = [ "by_name", "ascending" ]

    if(typeof(sessionStorage) != 'undefined') {
        if (sessionStorage.getItem("sessionDif")) {
            sessionDif = JSON.parse(sessionStorage.getItem("sessionDif"));
        }
        if (sessionStorage.getItem("sessionAmmount")) {
            sessionAmmount = JSON.parse(sessionStorage.getItem("sessionAmmount"));
        }
        if (sessionStorage.getItem("sessionMap")) {
            sessionKnowMap = JSON.parse(sessionStorage.getItem("sessionMap"));
        }
        if (sessionStorage.getItem("sessionOOB")) {
            sessionOOB = JSON.parse(sessionStorage.getItem("sessionOOB"));
        }
        if (sessionStorage.getItem("sessionMaps")) {
            sessionMaps = JSON.parse(sessionStorage.getItem("sessionMaps"));
        }
    }
    else{
        document.getElementById("errorText").style.display = "flex";
    }

    GetLevels();
}

["Bind","Breeze","Haven","IceBox","Split","Pearl","Fracture","Ascent"];
[false,false,false,false,false,false,false,false];

function GetLevels(){

    var SelectedMaps = [];

    for(var i = 0; i < 8; i++){
        if(sessionMaps[i] == true){
            SelectedMaps.push(Maps[i]);
        }
    }

    const fs = require('fs');
    console.log(fs);
    const dir = './img';

    fs.readdir(dir, (err, files) => {
        console.log(files.length);
    });
    
}
},{"fs":1}]},{},[2]);
