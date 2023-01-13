const Difficulties = ["Easy","Mid","Hard","Impossible","Random"];
let CurrentDif = 0;

const devMode = false;

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
    if ( document.URL.includes("ScoreScreen.html") ) {
        ShowPoints();
    }
}
function ResetGame(){
    if(typeof(sessionStorage) != 'undefined') {
        sessionStorage.setItem("sessionMap", "1");
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

var CurrentGuess = [0,0];
var usedLevels = []
//Current Round
var CR = 0;;
var CurrentPoints = 0;

var KnowsMap = true;
var HasPickedMap = false;

var hasGuess = false;
var hasSubmitted = false;
var hasConfirmed = false;

var LevelMap;
var LevelImg;

var imgWidth;
var imgHeight;

var pointsGain = 0;






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


    if(sessionKnowMap == 0){
        document.getElementById("selectmapid").style.display = 'block'
        KnowsMap = false;
    }

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

    startRound();

    async function startRound(){
        LevelMap = usedLevels[CR][4];
        LevelImg = usedLevels[CR][0];

        var Imgdir = "game/maps/"+LevelMap+"/" + LevelImg + ".png";

        var roundText = "Round: " + (CR+1).toString() + "/" + levelAmmount.toString();
        document.getElementById("roundText").innerHTML = roundText;

        if(KnowsMap){
            var MapDir = "game/maps/"+LevelMap+"/map.png";
        }
        else{
            var MapDir = "game/maps/NoMap/map.png";
        }

        document.getElementById('gameImage').src= Imgdir; 
        document.getElementById('mapImage').src= MapDir; 

        await delay(500);

        for (let index = 0; index < 100; index++) {
            document.getElementById("overlay").style.opacity = 100-index+"%";
            await delay(5);
        }
        document.getElementById("overlay").style.display = "none";

        checkAns();
        async function checkAns() {
            if(hasConfirmed === false) {
               window.setTimeout(checkAns, 100);
            } else {
                CurrentPoints += pointsGain;
                CurrentPoints = Math.round(CurrentPoints);
 
                resetStuff();

                CR++;

                if(CR == levelAmmount){
                    CR = 0;
                    sessionStorage.setItem("LastPoints", JSON.stringify(CurrentPoints));
                    document.location = "ScoreScreen.html";
                }
                else{
                    startRound();
                }
            }
        }
    }
}

function resetStuff(){
    hasSubmitted = false;
    hasConfirmed = false;
    hasGuess = false;
    HasPickedMap = false;
    CurrentGuess = [0,0]; 
    
    document.getElementById("pointsGained").innerHTML = "Guess as close as possible!";
    document.getElementById("pointText").innerHTML = "Points: " + CurrentPoints.toString();
    document.getElementById("selectImg").style.left = "500%";
}

var map = "";
function ChooseMap(index){
    map = "";
    switch (index) {
        case 0: map="Bind"; break;
        case 1: map="Breeze"; break;
        case 2: map="Haven"; break;
        case 3: map="IceBox"; break;
        case 4: map="Split"; break;
        case 5: map="Pearl"; break;
        case 6: map="Fracture"; break;
        case 7: map="Ascent"; break;
        default: map="NoMap";
            break;
    }
    var MapDir = "game/maps/"+map+"/map.png";
    document.getElementById('mapImage').src= MapDir; 
}

async function Continue(){
    if(hasSubmitted){
        document.getElementById("overlay").style.display = "block";
        for (let index = 0; index < 100; index++) {
            document.getElementById("overlay").style.opacity = index+"%";
            await delay(1);
        }

        document.getElementById("continueButton").classList.remove("GuessButtonSelected");
        document.getElementById("mapImage").style.display = "block";

        hasConfirmed = true;
    }
}

function SubmitGuess(){
    if(hasGuess){

        document.getElementById("submitButton").classList.remove("GuessButtonSelected");
        document.getElementById("submitButton").classList.remove("GuessButtonSelected");

        document.getElementById("mapImage").style.display = "none";

        var Imgdir = "game/maps/"+LevelMap+"/locations/" + LevelImg + ".png";

        document.getElementById("gameImage").src = Imgdir;


        pointsGain = 0;
        var levelAns = [usedLevels[CR][3][0]/1222*100,usedLevels[CR][3][1]/720*100];
        var difference = Math.abs(CurrentGuess[0]-levelAns[0])+Math.abs(CurrentGuess[1]-levelAns[1]);

        if(KnowsMap){
            if(difference<3){
                pointsGain = 5000;
            }
            else{
                pointsGain = 5000+500-(200*difference);
            }
            if(pointsGain < 0){
                pointsGain = 0;
            }
            hasSubmitted = true;
        }
        else{
            if(map.toUpperCase() == usedLevels[CR][4].toUpperCase()){
                if(difference<3){
                    pointsGain = 5000;
                }
                else{
                    pointsGain = 5000+500-(200*difference);
                }
                if(pointsGain < 0){
                    pointsGain = 0;
                }
                hasSubmitted = true;
            }
            else{
                hasSubmitted = true;
            }
        }

        document.getElementById("pointsGained").innerHTML = "You gained "+ Math.round(pointsGain).toString() +" points!" 
    
        document.getElementById("continueButton").classList.add("GuessButtonSelected");
    }
}

//1222 720

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
    }
    else{
        CurrentGuess = [xCoordinate,yCoordinate];

        imgWidth = document.getElementById("gameImage").clientWidth;;
        imgHeight = document.getElementById("gameImage").clientHeight;

        CurrentGuess = [xCoordinate/imgWidth*100,yCoordinate/imgHeight*100]

        var selectImgEl = document.getElementById("selectImg").style;
        selectImgEl.left = imgWidth/100*CurrentGuess[0]-(5).toString()+"px";
        selectImgEl.top = imgHeight/100*CurrentGuess[1]-(imgHeight+5).toString()+"px";

        document.getElementById("submitButton").classList.add("GuessButtonSelected");

        hasGuess = true;
    }
}

async function ShowPoints(){
    var lastPoints;
    if (sessionStorage.getItem("LastPoints")) {
        lastPoints = JSON.parse(sessionStorage.getItem("LastPoints"));
        document.getElementById("pointsText").innerHTML = getNumberWithCommas(lastPoints) + " points!"
        for (let index = 0; index < 100; index++) {
            document.getElementById("overlay").style.opacity = (100-index)+"%";
            await delay(5);
        }
    }
    else{
        for (let index = 0; index < 100; index++) {
            document.getElementById("overlay").style.opacity = (100-index)+"%";
            await delay(5);
        }
        document.getElementById("pointsText").innerHTML = "0 points!"
    }
}

function getNumberWithCommas(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
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
    var dir = "game/maps/pearl/locations/" + Currentimg + ".png";
    document.getElementById('mapImage').src= dir; 
}
function previousImage(){
    Currentimg = Currentimg - 1;
    var dir = "game/maps/pearl/locations/" + Currentimg + ".png";
    document.getElementById('mapImage').src= dir; 
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

//DONT EVER REMOVE THIS NO MATTER WHAT YOU DO
//Scale 1/10 hardness - true false bounds

const bindLevels = [

];
const breezeLevels = [
    [1 , 5,  true,   [] , ""],
    [2 , 5,  true,   [] , ""],
    [3 , 5,  true,   [] , ""],
    [4 , 5,  true,   [] , ""],
    [5 , 5,  true,   [] , ""],
    [6 , 5,  true,   [] , ""],
    [7 , 5,  true,   [] , ""],
    [8 , 5,  true,   [] , ""],
    [9 , 5,  true,   [] , ""],
    [10, 5,  true,   [] , ""],
    [11, 5,  true,   [] , ""],
    [12, 5,  true,   [] , ""],
    [13, 5,  true,   [] , ""],
    [14, 5,  true,   [] , ""],
    [15, 5,  true,   [] , ""],
    [16, 5,  true,   [] , ""],
    [17, 5,  true,   [] , ""],
    [18, 5,  true,   [] , ""],
    [19, 5,  true,   [] , ""],
    [20, 5,  true,   [] , ""],
    [21, 5,  true,   [] , ""],
    [22, 5,  true,   [] , ""],
    [23, 5,  true,   [] , ""],
    [24, 5,  true,   [] , ""],
    [25, 5,  true,   [] , ""],
    [26, 5,  true,   [] , ""],
    [27, 5,  true,   [] , ""],
    [28, 5,  true,   [] , ""],
    [29, 5,  true,   [] , ""],
    [30, 5,  true,   [] , ""],
    [31, 5,  true,   [] , ""],
    [32, 5,  true,   [] , ""],
    [33, 5,  true,   [] , ""],
    [34, 5,  true,   [] , ""],
    [35, 5,  true,   [] , ""],
    [36, 5,  true,   [] , ""],
    [37, 5,  true,   [] , ""],
    [38, 5,  true,   [] , ""],
    [39, 5,  true,   [] , ""],
    [40, 5,  true,   [] , ""],
    [41, 5,  true,   [] , ""],
    [42, 5,  true,   [] , ""],
    [43, 5,  true,   [] , ""],
    [44, 5,  true,   [] , ""],
    [45, 5,  true,   [] , ""],
    [46, 5,  true,   [] , ""],
    [47, 5,  true,   [] , ""],
    [48, 5,  true,   [] , ""],
    [49, 5,  true,   [] , ""],
    [50, 5,  true,   [] , ""],
    [51, 5,  true,   [] , ""],
    [52, 5,  true,   [] , ""],
    [53, 5,  true,   [] , ""],
    [54, 5,  true,   [] , ""],
    [55, 5,  true,   [] , ""],
    [56, 5,  true,   [] , ""],
    [57, 5,  true,   [] , ""],
    [58, 5,  true,   [] , ""],
    [59, 5,  true,   [] , ""],
    [60, 5,  true,   [] , ""],
    [61, 5,  true,   [] , ""],
    [62, 5,  true,   [] , ""],
    [63, 5,  true,   [] , ""],
];
const havenLevels = [
    [1 , 5,  true,   [481,386] , "haven"],
    [2 , 6,  true,   [479,371] , "haven"],
    [3 , 5,  true,   [465,387] , "haven"],
    [4 , 6,  true,   [458,381] , "haven"],
    [5 , 8,  true,   [440,445] , "haven"],
    [6 , 5,  true,   [456,448] , "haven"],
    [7 , 7,  true,   [502,471] , "haven"],
    [8 , 4,  true,   [542,486] , "haven"],
    [9 , 6,  true,   [524,404] , "haven"],
    [10, 5,  true,   [562,400] , "haven"],
    [11, 5,  true,   [595,392] , "haven"],
    [12, 6,  true,   [608,437] , "haven"],
    [13, 7,  true,   [607,456] , "haven"],
    [14, 4,  true,   [600,327] , "haven"],
    [15, 8,  true,   [625,285] , "haven"],
    [16, 4,  true,   [672,305] , "haven"],
    [17, 6,  true,   [662,338] , "haven"],
    [18, 7,  true,   [666,341] , "haven"],
    [19, 6,  true,   [664,383] , "haven"],
    [20, 9,  true,   [665,365] , "haven"],
    [21, 5,  true,   [655,376] , "haven"],
    [22, 6,  true,   [637,300] , "haven"],
    [23, 6,  true,   [565,267] , "haven"],
    [24, 7,  true,   [566,301] , "haven"],
    [25, 4,  true,   [560,304] , "haven"],
    [26, 9,  true,   [513,286] , "haven"],
    [27, 7,  true,   [527,323] , "haven"],
    [28, 7,  true,   [495,309] , "haven"],
    [29, 3,  true,   [448,333] , "haven"],
    [30, 2,  true,   [432,344] , "haven"],
    [31, 3,  true,   [564,539] , "haven"],
    [32, 8,  true,   [543,534] , "haven"],
    [33, 7,  true,   [585,513] , "haven"],
    [34, 6,  true,   [607,522] , "haven"],
    [35, 8,  true,   [655,414] , "haven"],
    [36, 4,  true,   [761,377] , "haven"],
    [37, 5,  true,   [595,407] , "haven"],
    [38, 5,  true,   [646,279] , "haven"],
    [39, 1,  true,   [632,185] , "haven"],
    [40, 7,  true,   [622,152] , "haven"],
    [41, 5,  true,   [605,156] , "haven"],
    [42, 3,  true,   [700,243] , "haven"],
    [43, 5,  true,   [761,265] , "haven"],
    [44, 7,  true,   [733,280] , "haven"],
    [45, 5,  true,   [742,262] , "haven"],
    [46, 3,  true,   [719,418] , "haven"],
    [47, 4,  true,   [716,374] , "haven"],
    [48, 3,  true,   [742,391] , "haven"],
    [49, 8,  true,   [758,428] , "haven"],
    [50, 5,  true,   [701,455] , "haven"],
    [51, 8,  false,   [435,438] , "haven"],
    [52, 7,  false,   [715,313] , "haven"],
    [53, 6,  false,   [578,436] , "haven"],
    [54, 5,  true,   [558,372] , "haven"],
    [55, 8,  true,   [554,369] , "haven"],
    [56, 6,  true,   [560,344] , "haven"],
    [57, 8,  true,   [555,300] , "haven"],
    [58, 7,  false,   [462,308] , "haven"],
    [59, 6,  false,   [572,274] , "haven"],
    [60, 6,  true,   [738,315] , "haven"],
    [61, 5,  true,   [731,399] , "haven"],
    [62, 6,  true,   [664,399] , "haven"],
    [63, 4,  true,   [593,280] , "haven"],
    [64, 6,  true,   [661,419] , "haven"],
    [65, 4,  true,   [748,399] , "haven"]
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
    [17, 9,  false, [620,501] , "pearl"],
    [18, 7,  true,  [444,469] , "pearl"],
    [20, 6,  true,  [540,305] , "pearl"],
    [19, 5,  true,  [518,306] , "pearl"],
    [21, 9,  true,  [692,487] , "pearl"],
    [22, 6,  true,  [702,462] , "pearl"],
    [23, 5,  true,  [714,406] , "pearl"],
    [24, 7,  true,  [684,407] , "pearl"],
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
