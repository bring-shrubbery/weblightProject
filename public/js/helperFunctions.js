//helper function that are used in other scripts

var hexColor;

//converts number to base16
function componentToHex(c) {
     var hex = c.toString(16);
     return hex.length == 1 ? "0" + hex : hex;
 }
 
 //converts rgb to hex
 function rgbToHex(r, g, b) {
     r = parseInt(r);
     g = parseInt(g);
     b = parseInt(b);
     return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
 }
 
 //converts hex to rgb
 function hexToRgb(hex) {
   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   return result ? {
       r: parseInt(result[1], 16),
       g: parseInt(result[2], 16),
       b: parseInt(result[3], 16)
   } : null;
 }
 
 //extracts separate r, g and b values from rgb() component 
 function getRGB(str){
   var match = str.match(/rgba?\((\d{1,3}), ?(\d{1,3}), ?(\d{1,3})\)?(?:, ?(\d(?:\.\d?))\))?/);
   return match ? {
     r: match[1],
     g: match[2],
     b: match[3]
   } : {};
 }

 //create div with class
function createDiv(className) {
  genDiv = document.createElement('div');
  genDiv.setAttribute("class", className);
  return genDiv;
}

//create div with id
function createDivId(idName) {
  genDiv = document.createElement('div');
  genDiv.id = idName;
  return genDiv;
}

//create input with id, type, value and onchange functionality
function createInput(idName, typeName, valueVar, onchangeFunc){
  inputGen = document.createElement('input');
  inputGen.id = idName;
  inputGen.type = typeName;
  inputGen.value = valueVar;
  inputGen.setAttribute("onchange", onchangeFunc);
  return inputGen;
}

//create paragraph
function createNameLabel(nameText, idName) {
  nameP = document.createElement('p');
  nameP.id = idName;
  nameP.appendChild(document.createTextNode(nameText));
  return nameP;
}

//check if name is not in the lightArray
function checkLightNames(inputText){
  for(light in lightArray) {
       if(lightArray[light].name == inputText) {
            alert("Name '"+inputText+"' is already taken by another light! Please choose different name.");
            return true;
       }
  }
  return false;
}

//check if name is not in the plugArray
function checkPlugNames(inputText){
  for(plug in plugArray) {
       if(plugArray[plug].name == inputText) {
            alert("Name '"+inputText+"' is already taken by another plug! Please choose different name.");
            return true;
       }
  }
  return false;
}

//check if name is not in the switchArray
function checkSwitchNames(inputText){
  for(switchInst in switchArray) {
       if(switchArray[switchInst].name == inputText) {
            alert("Name '"+inputText+"' is already taken by another switch! Please choose different name.");
            return true;
       }
  }
  return false;
}

function setSelectionCookie(type, selId, currDev) {
  setCookie("deviceType", type);
  setCookie("deviceid", currDev);
  setCookie("selectionid",selId);
}

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
          c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
          return c.substring(name.length, c.length);
      }
  }
  return "";
}