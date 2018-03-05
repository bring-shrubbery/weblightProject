var currentOnTimeSelection;
var currentOffTimeSelection;

function addOnTime() {
     var time = document.getElementById("onTimesInput").value;
     var selectionTypeCookie = getCookie("deviceType");

     if(selectionTypeCookie == "light") {
          lightArray[currentLightId].onTimes.push(time);
          saveLights();
     } else if(selectionTypeCookie == "plug") {
          plugArray[currentPlugId].onTimes.push(time);
          savePlugs();
     }

}

function addOffTime() {
     var time = document.getElementById("offTimesInput").value;
     var selectionTypeCookie = getCookie("deviceType");

     if(selectionTypeCookie == "light") {
          lightArray[currentLightId].offTimes.push(time);
          saveLights();
     } else if(selectionTypeCookie == "plug") {
          plugArray[currentPlugId].offTimes.push(time);
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

function setCurrentOnTime(timeId) {
     currentOnTimeSelection = timeId;
}

function setCurrentOffTime(timeId) {
     currentOffTimeSelection = timeId;
}