var devicesDiv = document.getElementById('devices');
var lightsReady = false;

var lightArray = {};
var switchArray = {};
var plugArray = {};

//storage for current plug settings
var currentPlugState = 0;
var currentPlugId;

//currently selected stuff
var currentLightId;
var currentSelectionId;

//current state storage
var currentSwitchState = 0;
var currentSwitchId;

function setupSelectors() {
  getFirstLightAsMain();
  
}

function loadLights(setupSettings) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200){
          lightArray = {};
          jsonLightArray = JSON.parse(xmlhttp.responseText);
          for(lt in jsonLightArray) {
            lightArray[lt] = new LightBulbClass(
              jsonLightArray[lt]._id,
              jsonLightArray[lt].ident,
              jsonLightArray[lt].name,
              jsonLightArray[lt].onTimes,
              jsonLightArray[lt].offTimes,
              jsonLightArray[lt].lightPresets,
              jsonLightArray[lt].r,
              jsonLightArray[lt].g,
              jsonLightArray[lt].b
            );
          }

          if(!lightsReady) {
            //set selector variables to first item
            if(lightArray) {
              currentSelectionId = lightArray[0].name;
              currentLightId = 0;
              setCookie("deviceType", "light");
              setCookie("deviceid",currentLightId);
              setCookie("selectionid",currentSelectionId);
              setupLightSettings(currentSelectionId);
            }
          }
          lightsReady = true;
          
          updateLights();
          updateSelectors('light');
          if(setupSettings) setupLightSettings(currentSelectionId);
      }
  }

  var getLights = "/getLights";
  xmlhttp.open("GET", getLights, true);
  xmlhttp.send();
}

function loadSwitches(setupSettings) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200){
          switchArray = {};
          jsonSwitchArray = JSON.parse(xmlhttp.responseText);
          for(sw in jsonSwitchArray) {
            switchArray[sw] = new SwitchClass(
              jsonSwitchArray[sw]._id,
              jsonSwitchArray[sw].ident,
              jsonSwitchArray[sw].name,
              jsonSwitchArray[sw].onTimes,
              jsonSwitchArray[sw].offTimes,
              jsonSwitchArray[sw].state,
              jsonSwitchArray[sw].slaveid
            );
          }
          
          updateSwitches();
          updateSelectors('switch');
          if(setupSettings) setupSwitchSettings(currentSelectionId);

      }
  }

  var getSwitches = "/getSwitches";
  xmlhttp.open("GET", getSwitches, true);
  xmlhttp.send();
}

function loadPlugs(setupSettings) {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200){
          plugArray = {};
          jsonPlugArray = JSON.parse(xmlhttp.responseText);
          for(pl in jsonPlugArray) {
            plugArray[pl] = new PlugClass(
              jsonPlugArray[pl]._id,
              jsonPlugArray[pl].ident,
              jsonPlugArray[pl].name,
              jsonPlugArray[pl].onTimes,
              jsonPlugArray[pl].offTimes,
              jsonPlugArray[pl].state
            );
          }
          
          updatePlugs();
          updateSelectors('plug');
          if(setupSettings) setupPlugSettings(currentSelectionId);
      }
  }

  var getPlugs = "/getPlugs";
  xmlhttp.open("GET", getPlugs, true);
  xmlhttp.send();
}

function saveLights() {
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  xmlhttp.open("POST", "/setLights");
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(lightArray));
  console.log(JSON.stringify(lightArray));
}

function saveSwitches() {
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  xmlhttp.open("POST", "/setSwitches");
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(switchArray));
}

function savePlugs() {
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  xmlhttp.open("POST", "/setPlugs");
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(plugArray));
}

function updateLights() {
  //remove existing lights
  while(devicesDiv.hasChildNodes()) {
    devicesDiv.removeChild(devicesDiv.firstChild);
  }

  //instantiate new lights
  for(light in lightArray) {
    //setup variables and add class
    currentLight = lightArray[light];
    var device = document.createElement("div");
    device.className = 'light';

    //create name label
    var nameProp = document.createElement("p");
    var nameText = document.createTextNode("Name: "+ currentLight.name);
    nameProp.appendChild(nameText);
    nameProp.id = 'name';
    device.appendChild(nameProp);

    //create color indicator
    var colorProp = document.createElement("p");
    colorProp.id = 'color';
    colorProp.style.backgroundColor = rgbToHex(currentLight.r, currentLight.g, currentLight.b)
    device.appendChild(colorProp);

    //append label and color labels
    device.id = currentLight.name;
    device.setAttribute("onclick","setCurrentSelection(this.id);loadLights(true);setSelectionCookie('light', this.id, '"+light+"');");
    devicesDiv.appendChild(device);
  }
}

function updateSwitches() {
  //remove existing swithces
  while(devicesDiv.hasChildNodes()) {
    devicesDiv.removeChild(devicesDiv.firstChild);
  }

  //instantiate new switches
  for(Switch in switchArray) {
    //setup variables
    currentSwitch = switchArray[Switch];
    var device = document.createElement("div");
    device.className = 'switch';

    //create name label
    var nameProp = document.createElement("p");
    var nameText = document.createTextNode("Name: "+ currentSwitch.name);
    nameProp.appendChild(nameText);
    nameProp.id = 'name';
    device.appendChild(nameProp);

    //create state label
    var stateProp = document.createElement("p");
    stateProp.id = 'state';
    if(currentSwitch.state == 1) {
      stateProp.style.backgroundColor = '#FFF';
    } else {
      stateProp.style.backgroundColor = '#000';
    }
    device.appendChild(stateProp);

    //append name and state labels
    device.id = currentSwitch.name;
    device.setAttribute("onclick","loadLights(false);setCurrentSelection(this.id);loadSwitches(true);setSelectionCookie('switch', this.id, "+Switch+");");
    devicesDiv.appendChild(device);
  }
}

function updatePlugs() {
  //remove existing plugs
  while(devicesDiv.hasChildNodes()) {
    devicesDiv.removeChild(devicesDiv.firstChild);
  }

  //instantiate new plugs
  for(plug in plugArray) {
    //setup variables
    currentPlug = plugArray[plug];
    var device = document.createElement("div");
    device.className = 'plug';

    //create name label
    var nameProp = document.createElement("p");
    var nameText = document.createTextNode("Name: "+ currentPlug.name);
    nameProp.appendChild(nameText);
    nameProp.id = 'name';
    device.appendChild(nameProp);

    //create state label
    var stateProp = document.createElement("p");
    stateProp.id = 'state';
    if(currentPlug.state == 1) {
      stateProp.style.backgroundColor = '#FFF';
    } else {
      stateProp.style.backgroundColor = '#000';
    }
    device.appendChild(stateProp);

    //append name and state labels
    device.id = currentPlug.name;
    device.setAttribute("onclick","setCurrentSelection(this.id);loadPlugs(true);setSelectionCookie('plug', this.id, "+plug+");");
    devicesDiv.appendChild(device);
  }
}

function setCurrentSelection(sel) {
  currentSelectionId = sel.toString();
}