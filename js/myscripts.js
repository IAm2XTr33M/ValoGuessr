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

    if(knowsMap){
        if(typeof(sessionStorage) != 'undefined') {
            sessionStorage.setItem("sessionMap", "1");
        }
    }
    else{
        if(typeof(sessionStorage) != 'undefined') {
            sessionStorage.setItem("sessionMap", "0");
        }
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

    let oob = 0;
    if(outOfBounds){
        oob = 1;
    }

    if(typeof(sessionStorage) != 'undefined') {
        sessionStorage.setItem("sessionOOB", oob);
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

let currentAmount = 1;
const amounts = [1,2,3,4,5,8,10,12,15,20,25]
let o = 0;
function changeAmount(){
    o++;
    if(o >= 11){
        o = 0;
    }
    currentAmount = amounts[o];
    document.getElementById("amountid").innerHTML = "-"+currentAmount+"-"
    
    if(typeof(sessionStorage) != 'undefined') {
        sessionStorage.setItem("sessionAmount", JSON.stringify(currentAmount));
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
        sessionStorage.setItem("sessionOOB", 1);
        sessionStorage.setItem("sessionAmount", 1);
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
    sessionAmount = [ "by_name", "ascending" ]
    sessionKnowMap = [ "by_name", "ascending" ]
    sessionOOB = [ "by_name", "ascending" ]
    sessionMaps = [ "by_name", "ascending" ]

    if(typeof(sessionStorage) != 'undefined') {
        if (sessionStorage.getItem("sessionDif")) {
            sessionDif = JSON.parse(sessionStorage.getItem("sessionDif"));
        }
        if (sessionStorage.getItem("sessionAmount")) {
            sessionAmount = JSON.parse(sessionStorage.getItem("sessionAmount"));
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

const CurrentGuess = [0,0];
const hasAns = false;






function GetLevels(){    
    var SelectedMaps = [];

    for(let i = 0; i < 8; i++){
        if(sessionMaps[i] == true){
            SelectedMaps.push(Maps[i]);
        }
    }

    var allLevelsOfMaps = [];
    
    for (let i = 0; i < SelectedMaps.length; i++) {
        switch (SelectedMaps[i]) {
            case "Bind":allLevelsOfMaps.push(bindLevels); break;
            case "Breeze":allLevelsOfMaps.push(breezeLevels); break;
            case "Haven":allLevelsOfMaps.push(havenLevels); break;
            case "IceBox":allLevelsOfMaps.push(iceBoxLevels); break;
            case "Split":allLevelsOfMaps.push(SplitLevels); break;
            case "Pearl":allLevelsOfMaps.push(pearlLevels); break;
            case "Fracture":allLevelsOfMaps.push(FractureLevels); break;
            case "Ascent":allLevelsOfMaps.push(AscentLevels); break;
        }
    }

    var canOOB = false;
    if(sessionOOB == 1){
        canOOB = true
    }

    var difNum = 0;
    switch (sessionDif) {
        case 0:difNum = 3; break;
        case 1:difNum = 5; break;
        case 2:difNum = 7; break;
        case 3:difNum = 8; break;
        case 4:difNum = 0; break;
    }

    var useableLevels = [];

    for (let i = 0; i < allLevelsOfMaps.length; i++) {
        for (let b = 0; b < allLevelsOfMaps[i].length; b++) {
            var level = allLevelsOfMaps[i][b];
            
            var checks = [false,false];

            if(level[2] || canOOB && !level[2]){
                checks[0] = true
            }

            if(difNum == 0){
                checks[1] = true
            }
            else if(Math.abs(difNum - level[1]) <= 2){
                checks[1] = true
            }

            if(checks[0]&&checks[1]){
                useableLevels.push(level);
            }
        }
    }

    var levelAmmount = sessionAmount;

    var usedLevels = [];

    addLevel();

    function addLevel(){
        if(usedLevels.length < levelAmmount){
            var rand = Math.floor(Math.random() * useableLevels.length);
            if(!usedLevels.includes(useableLevels[rand])){
                usedLevels.push(useableLevels[rand])
            }
            addLevel();
        }
    }

    //Current Round
    var CR = 0;

    startRound();

    function startRound(){
        var LevelMap = usedLevels[CR][4];
        var LevelImg = usedLevels[CR][0];

        var dir = "game/maps/"+LevelMap+"/" + LevelImg + ".png";

        document.getElementById('gameImage').src= dir; 

        checkAns();
        function checkAns() {
            if(hasAns === false) {
               window.setTimeout(checkAns, 100);
            } else {
                if(CR <= levelAmmount){
                    CR++;
                    startRound();
                }
            }
        }
    }

    console.log(usedLevels);
}



const devMode = true;

function clickHotspotImage(event) {
    var xCoordinate = event.offsetX;
    var yCoordinate = event.offsetY;
    
    if(devMode){
        var text = xCoordinate+","+yCoordinate;
        var dummy = document.createElement("textarea");
        document.body.appendChild(dummy);
        dummy.value = text;
        dummy.select();
        document.execCommand("copy");
        document.body.removeChild(dummy);
        alert(text);
    }
}
document.onkeydown = checkKey;
function checkKey(e) {
    if(devMode){
        e = e || window.event;

        if (e.keyCode == '39') {
            nextImage();
        }
        if (e.keyCode == '37') {
            previousImage();
        }
    }
}
let Currentimg = 0;
function nextImage(){
    Currentimg = Currentimg + 1;
    var dir = "game/maps/IceBox/locations/" + Currentimg + ".png";
    console.log(dir)
    document.getElementById('gameImage').src= dir; 
}
function previousImage(){
    Currentimg = Currentimg - 1;
    var dir = "game/maps/IceBox/locations/" + Currentimg + ".png";
    console.log(dir)
    document.getElementById('gameImage').src= dir; 
}

//DONT EVER REMOVE THIS NO MATTER WHAT YOU DO
//Scale 1/10 hardness - true false bounds

const bindLevels = [

];
const breezeLevels = [

];
const havenLevels = [

];
const iceBoxLevels = [
    [1, 4,  true,   [539,512] , "icebox"],
    [2, 3,  true,   [613,514] , "icebox"],
    [3, 2,  true,   [602,462] , "icebox"],
    [4, 6,  true,   [628,439] , "icebox"],
    [5, 5,  true,   [581,403] , "icebox"],
    [6, 5,  true,   [658,384] , "icebox"],
    [7, 4,  true,   [587,343] , "icebox"],
    [8, 3,  true,   [622,291] , "icebox"],
    [9, 6,  true,   [608,259] , "icebox"],
    [10, 8,  false,   [621,206] , "icebox"],
    [11, 6,  true,   [631,248] , "icebox"],
    [12, 9,  true,   [517,316] , "icebox"],
    [13, 4,  true,   [551,310] , "icebox"],
    [14, 6,  true,   [532,347] , "icebox"],
    [15, 8,  true,   [493,371] , "icebox"],
    [16, 4,  true,   [479,363] , "icebox"],
    [17, 6,  true,   [472,330] , "icebox"],
    [18, 5,  true,   [520,434] , "icebox"],
    [19, 6,  true,   [529,463] , "icebox"],
    [20, 8,  true,   [544,507] , "icebox"],
    [21, 7,  true,   [509,527] , "icebox"],
    [22, 9,  false,   [716,439] , "icebox"],
    [23, 3,  true,   [804,357] , "icebox"],
    [24, 10,  false,   [811,534] , "icebox"],
    [25, 4,  true,   [806,478] , "icebox"],
    [26, 8,  true,   [633,432] , "icebox"],
    [27, 6,  true,   [622,432] , "icebox"],
    [28, 7,  true,   [528,479] , "icebox"],
    [29, 5,  true,   [473,480] , "icebox"],
    [30, 6,  true,   [459,350] , "icebox"],
    [31, 6,  true,   [486,360] , "icebox"],
    [32, 3,  true,   [553,382] , "icebox"],
    [33, 2,  true,   [652,389] , "icebox"],
    [34, 8,  true,   [652,422] , "icebox"],
    [35, 5,  true,   [638,463] , "icebox"],
    [36, 6,  true,   [711,444] , "icebox"],
    [37, 7,  true,   [739,442] , "icebox"],
    [38, 8,  true,   [755,427] , "icebox"],
    [39, 3,  true,   [697,394] , "icebox"],
    [40, 5,  true,   [692,388] , "icebox"],
    [41, 6,  true,   [649,376] , "icebox"],
    [42, 5,  true,   [590,171] , "icebox"],
    [43, 6,  true,   [693,294] , "icebox"],
    [44, 4,  true,   [815,332] , "icebox"],
    [45, 7,  false,   [653,330] , "icebox"],
    [46, 2,  true,   [574,328] , "icebox"],
    [47, 9,  false,   [525,327] , "icebox"],
    [48, 8,  false,   [452,444] , "icebox"],
    [49, 6,  true,   [719,497] , "icebox"],
    [50, 8,  false,   [738,458] , "icebox"],
    [51, 8,  false,   [770,460] , "icebox"],
    [52, 7,  true,   [748,417] , "icebox"],
    [53, 5,  true,   [699,338] , "icebox"],
    [54, 6,  true,   [725,338] , "icebox"]
];
const SplitLevels = [

];
const pearlLevels = [
    [1, 7,  true,   [673,305] , "pearl"],
    [2, 2,  true,   [678,247] , "pearl"],
    [3, 4,  true,   [616,319] , "pearl"],
    [4, 6,  true,   [498,502] , "pearl"],
    [5, 5,  true,   [649,406] , "pearl"],
    [6, 5,  true,   [695,341] , "pearl"],
    [7, 4,  true,   [843,402] , "pearl"],
    [8, 7,  false,  [788,337] , "pearl"],
    [9, 6,  true,   [733,257] , "pearl"],
    [10, 1,  true,  [629,156] , "pearl"],
    [11, 7,  true,  [611,252] , "pearl"],
    [12, 2,  true,  [630,332] , "pearl"],
    [13, 6,  true,  [684,368] , "pearl"],
    [14, 7,  false, [633,468] , "pearl"],
    [15, 7,  false, [670,502] , "pearl"],
    [16, 8,  false, [651,511] , "pearl"],
    [17, 9,  false, [647,501] , "pearl"],
    [18, 7,  true,  [444,469] , "pearl"],
    [20, 6,  true,  [540,305] , "pearl"],
    [19, 5,  true,  [718,329] , "pearl"],
    [21, 9,  true,  [692,487] , "pearl"],
    [22, 6,  true,  [702,462] , "pearl"],
    [23, 5,  true,  [714,406] , "pearl"],
    [24, 7,  true,  [704,274] , "pearl"],
    [25, 10,  true, [703,274] , "pearl"],
    [26, 3,  true,  [641,366] , "pearl"],
    [27, 2,  true,  [735,357] , "pearl"],
    [28, 2,  true,  [753,394] , "pearl"],
    [29, 3,  true,  [841,416] , "pearl"],
    [30, 6,  true,  [746,425] , "pearl"],
    [31, 1,  true,  [606,568] , "pearl"],
    [32, 4,  false, [650,555] , "pearl"],
    [33, 5,  false, [551,518] , "pearl"],
    [34, 7,  false, [432,385] , "pearl"],
    [35, 9,  false, [494,175] , "pearl"],
    [36, 5,  true,  [608,459] , "pearl"],
    [37, 6,  true,  [604,405] , "pearl"],
    [38, 5,  true,  [542,413] , "pearl"],
    [39, 4,  true,  [602,228] , "pearl"],
    [40, 5,  true,  [666,176] , "pearl"],
    [41, 8,  true,  [743,231] , "pearl"],
    [42, 2,  true,  [837,254] , "pearl"],
    [43, 3,  true,  [803,331] , "pearl"],
    [44, 7,  true,  [776,453] , "pearl"],
    [45, 9,  true,  [771,455] , "pearl"],
    [46, 6,  false, [577,408] , "pearl"],
    [47, 7,  false, [508,407] , "pearl"],
    [48, 6,  false, [467,340] , "pearl"],
    [49, 9,  true,  [657,385] , "pearl"],
]
const FractureLevels = [

];
const AscentLevels = [

];
