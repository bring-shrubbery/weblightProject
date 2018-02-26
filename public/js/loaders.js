var devicesDiv = document.getElementById('devices');
var lightsReady = false;

var lightArray;
var switchArray;
var plugArray;

function loadLights() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200){
          lightArray = JSON.parse(xmlhttp.responseText);
          
          if(!lightsReady) getFirstLightAsMain();
          lightsReady = true;
          updateLights();
      }
  }

  var getLights = "/getLights";
  xmlhttp.open("GET", getLights, true);
  xmlhttp.send();
}

function saveLights() {
  var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance 
  xmlhttp.open("POST", "/setLights");
  xmlhttp.setRequestHeader("Content-Type", "application/json");
  xmlhttp.send(JSON.stringify(lightArray));
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

function loadSwitches() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200){
          switchArray = JSON.parse(xmlhttp.responseText);
          updateSwitches();
      }
  }

  var getSwitches = "/getSwitches";
  xmlhttp.open("GET", getSwitches, true);
  xmlhttp.send();
}

function loadPlugs() {
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (xmlhttp.readyState==4 && xmlhttp.status==200){
          plugArray = JSON.parse(xmlhttp.responseText);
          updatePlugs();
      }
  }

  var getPlugs = "/getPlugs";
  xmlhttp.open("GET", getPlugs, true);
  xmlhttp.send();
}

function updateLights() {
  while(devicesDiv.hasChildNodes()) {
    devicesDiv.removeChild(devicesDiv.firstChild);
  }

  for(light in lightArray) {
    currentLight = lightArray[light];
    var device = document.createElement("div");
    device.className = 'light';

    var nameProp = document.createElement("p");
    var nameText = document.createTextNode("Name: "+ currentLight.name);

    nameProp.appendChild(nameText);
    nameProp.id = 'name';
    device.appendChild(nameProp);

    var colorProp = document.createElement("p");
    colorProp.id = 'color';
    colorProp.style.backgroundColor = rgbToHex(currentLight.r, currentLight.g, currentLight.b)
    device.appendChild(colorProp);

    device.id = currentLight.name;
    device.setAttribute("onclick","setupLightSettings('"+currentLight.name+"');");
    devicesDiv.appendChild(device);
  }
}

function updateSwitches() {
  while(devicesDiv.hasChildNodes()) {
    devicesDiv.removeChild(devicesDiv.firstChild);
  }

  for(Switch in switchArray) {
    currentSwitch = switchArray[Switch];
    var device = document.createElement("div");
    device.className = 'switch';

    var nameProp = document.createElement("p");
    var nameText = document.createTextNode("Name: "+ currentSwitch.name);

    nameProp.appendChild(nameText);
    nameProp.id = 'name';
    device.appendChild(nameProp);

    var stateProp = document.createElement("p");
    stateProp.id = 'state';
    if(currentSwitch.state === true) {
      stateProp.style.backgroundColor = '#FFF';
    } else {
      stateProp.style.backgroundColor = '#000';
    }

    device.appendChild(stateProp);

    device.id = currentSwitch.name;
    device.setAttribute("onclick","setupSwitchSettings('"+currentSwitch.name+"');");
    devicesDiv.appendChild(device);
  }

  saveSwitches();
}

function updatePlugs() {
  while(devicesDiv.hasChildNodes()) {
    devicesDiv.removeChild(devicesDiv.firstChild);
  }

  for(plug in plugArray) {
    currentPlug = plugArray[plug];
    var device = document.createElement("div");
    device.className = 'plug';

    var nameProp = document.createElement("p");
    var nameText = document.createTextNode("Name: "+ currentPlug.name);

    nameProp.appendChild(nameText);
    nameProp.id = 'name';
    device.appendChild(nameProp);

    var stateProp = document.createElement("p");
    stateProp.id = 'state';
    if(currentPlug.state === true) {
      stateProp.style.backgroundColor = '#FFF';
    } else {
      stateProp.style.backgroundColor = '#000';
    }

    device.appendChild(stateProp);

    device.id = currentPlug.name;
    device.setAttribute("onclick","setupPlugSettings('"+currentPlug.name+"');");
    devicesDiv.appendChild(device);
  }

  savePlugs();
}