var currentOnTimeSelection;
var currentOffTimeSelection;

function addOnTime() {
     var time = $("#onTimesInput").val();
     var selectionTypeCookie = getCookie("deviceType");

     if(selectionTypeCookie == "light") {
          var lightOn = lightArray[currentLightId].onTimes;

          lightOn.push(time);
          lightOn = organiseTimes(lightOn);
          saveLights();
     } else if(selectionTypeCookie == "plug") {
          var plugOn = plugArray[currentPlugId].onTimes;

          plugOn.push(time);
          plugOn = organiseTimes(plugOn);
          savePlugs();
     }

}

function addOffTime() {
     var time = $("#offTimesInput").val();
     var selectionTypeCookie = getCookie("deviceType");

     if(selectionTypeCookie == "light") {
          var lightOff = lightArray[currentLightId].offTimes;

          lightOff.push(time);
          lightOff = organiseTimes(lightOff);
          saveLights();
     } else if(selectionTypeCookie == "plug") {
          var plugOff = plugArray[currentPlugId].offTimes;

          plugOff.push(time);
          plugOff = organiseTimes(plugOff); 
          savePlugs();
     }
}

function deleteOnTime () {
     var selectionTypeCookie = getCookie("deviceType");

     if(selectionTypeCookie == "light") {
          lightArray[currentLightId].onTimes.splice(currentOnTimeSelection, 1);
          saveLights();
     } else if(selectionTypeCookie == "plug") {
          plugArray[currentPlugId].onTimes.splice(currentOnTimeSelection, 1);
          savePlugs();
     }
}

function deleteOffTime () {
     var selectionTypeCookie = getCookie("deviceType");
     if(selectionTypeCookie == "light") {
          lightArray[currentLightId].offTimes.splice(currentOnTimeSelection, 1);
          saveLights();
     } else if(selectionTypeCookie == "plug") {
          plugArray[currentPlugId].offTimes.splice(currentOnTimeSelection, 1);
          savePlugs();
     }
}

function setCurrentOnTime(timeId) { currentOnTimeSelection = timeId; }
function setCurrentOffTime(timeId) { currentOffTimeSelection = timeId; }

function organiseTimes(arrayToOrganise) {
     arrayToOrganise.sort();
     for(o in arrayToOrganise) {
          if(arrayToOrganise[o] === arrayToOrganise[o-1]) {
               arrayToOrganise.splice(o, 1);
               o--;
          }
     }
     return arrayToOrganise;
}