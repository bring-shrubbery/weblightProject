//storage for slider values
var redSlider;
var greenSlider;
var blueSlider;

//storage for color presets
var lightPresets = [];
var lastPreset;

//settings and color indicator elements
var settingsDiv = document.getElementById('settings');
var colorIndicator = document.getElementById('colorIndicator');

//updates colors in lightArray for currently selected light
function updateColors() {
    //gets color indicator element
    colorIndicator = document.getElementById('colorIndicator');

    //gets value from sliders
    redSlider = document.getElementById('redSlider').value;
    greenSlider = document.getElementById('greenSlider').value;
    blueSlider = document.getElementById('blueSlider').value;

    //set color indicator color to current color
    colorIndicator.style.backgroundColor = rgbToHex(redSlider, greenSlider, blueSlider);

    //set current color values to lightArray variable
    lightArray[currentLightId].setRGB(redSlider,greenSlider,blueSlider);

    //update light list UI
    updateLights();
}

//function for renaming light
function renameLight() {
    //get value of the input field
     var nameField = document.getElementById("nameField").value;
     //check if name is taken
     if(checkLightNames(nameField)) return;
     if(checkPlugNames(nameField)) return;
     if(checkSwitchNames(nameField)) return;

     //save name to currently selected light in lightArray 
     lightArray[currentLightId].name  = nameField;
     //update light list UI
     updateLights();
     saveLights();
}

//function for starting of the app, sets up first light
//in lightArray as currently selected item for settings
function getFirstLightAsMain() {
  //check if there is a current selection cookie
  var selectionIdCookie = getCookie("selectionid");
  var currentDeviceCookie = getCookie("deviceid");
  var selectionTypeCookie = getCookie("deviceType");
  if(selectionTypeCookie == "" || selectionTypeCookie == null) {
    //setup light settings UI
    loadLights(false);
  } else if(selectionTypeCookie == "light") {
    currentSelectionId = selectionIdCookie;
    currentLightId = parseInt(currentDeviceCookie);
    lightsReady = true;
    loadLights(true);
  } else if(selectionTypeCookie == "switch") {
    currentSelectionId = selectionIdCookie;
    currentSwitchId = parseInt(currentDeviceCookie);
    lightsReady = true;
    loadSwitches(true);
  } else if(selectionTypeCookie == "plug") {
    currentSelectionId = selectionIdCookie;
    currentPlugId = parseInt(currentDeviceCookie);
    lightsReady = true;
    loadPlugs(true);
  }
}

//generate UI for light with cpecified parameter
function setupLightSettings(lightName) {
  //get settings div
  settingsDiv = document.getElementById('settings');
  //remove everything from settings div
  while(settingsDiv.hasChildNodes()) {
      settingsDiv.removeChild(settingsDiv.firstChild);
  }

  //set current selection variables
  for(light in lightArray){
      if(lightArray[light].name === lightName) {
      currentSelectionId = lightName;
      currentLightId = light;
      }
  }

  //update light presets variable
  loadLightPresets();
  
  //create div with class "lightSettings"
  lightSetDiv = createDiv("lightSettings");

  //create div with id "colorIndicator"
  colorInd = createDivId("colorIndicator");
  colorInd.style.backgroundColor = rgbToHex(lightArray[light].r,lightArray[light].g,lightArray[light].b);

  //create div with class "colorPicker"
  colorPick = createDiv("colorPicker");

  //put SLIDERS and COLOR INDICATOR into color picker div
  colorPick.appendChild(createRGBSlider("redSlider"));
  colorPick.appendChild(createRGBSlider("greenSlider"));
  colorPick.appendChild(createRGBSlider("blueSlider"));
  colorPick.appendChild(colorInd);

  //put name, input field for name and color picker into light settings div "lightSetDiv"
  lightSetDiv.appendChild(createNameLabel("Name:", "name"));
  lightSetDiv.appendChild(createInput("nameField", "text", currentSelectionId, "renameLight();"));
  lightSetDiv.appendChild(colorPick);

  //create preset color bar
  presetColors = createTemplateColors();

  //scheduler section
  var schedulerDiv = createDivId("scheduler");
  var onTimesDiv = createDivId("onTimesDiv");
  var offTimesDiv = createDivId("offTimesDiv");

  var onTimeInput = createInput("onTimesInput", "time", "00:00", "");
  var offTimeInput = createInput("offTimesInput", "time", "00:00", "");

  onTimesDiv.appendChild(onTimeInput);
  offTimesDiv.appendChild(offTimeInput);

  var onTimesAddBtn = createNameLabel("Add On Time","onTimesBtnAdd");
  onTimesAddBtn.setAttribute("onclick", "addOnTime();setupLightSettings(currentSelectionId);");
  var offTimesAddBtn = createNameLabel("Add Off Time","offTimesBtnAdd");
  offTimesAddBtn.setAttribute("onclick", "addOffTime();setupLightSettings(currentSelectionId);");

  var onTimesDeleteBtn = createNameLabel("Delete On Time","onTimesBtnDelete");
  onTimesDeleteBtn.setAttribute("onclick", "deleteOnTime();setupLightSettings(currentSelectionId);");
  var offTimesDeleteBtn = createNameLabel("Delete Off Time","offTimesBtnDelete");
  offTimesDeleteBtn.setAttribute("onclick", "deleteOffTime();setupLightSettings(currentSelectionId);");

  var onArray = lightArray[currentLightId].onTimes;
  var onTimesList = createOnTimes(onArray);
  onTimesDiv.appendChild(onTimesList);

  var offArray = lightArray[currentLightId].offTimes;
  var offTimesList = createOnTimes(offArray);
  offTimesDiv.appendChild(offTimesList);

  onTimesDiv.appendChild(onTimesAddBtn);
  offTimesDiv.appendChild(offTimesAddBtn);
  onTimesDiv.appendChild(onTimesDeleteBtn);
  offTimesDiv.appendChild(offTimesDeleteBtn);

  schedulerDiv.appendChild(onTimesDiv);
  schedulerDiv.appendChild(offTimesDiv);

  //assign light settings div and preset colors to settings div
  settingsDiv.appendChild(lightSetDiv);
  settingsDiv.appendChild(presetColors);
  settingsDiv.appendChild(schedulerDiv);
}

function createOnTimes(onTimesArray) {
  var onTimesLabelList = createDivId("onTimesList");

  for(ont in onTimesArray) {
    var onTimeInstance = createNameLabel(onTimesArray[ont], ont);
    onTimeInstance.setAttribute("onclick", "setCurrentOnTime(this.id)");
    onTimeInstance.setAttribute("class", "onTimeInstance");

    onTimesLabelList.appendChild(onTimeInstance);
  }
  return onTimesLabelList;
}

function createOffTimes(offTimesArray) {
  var offTimesLabelList = createDivId("offTimesList");

  for(offt in offTimesArray) {
    var offTimeInstance = createNameLabel(offTimesArray[offt], offt);
    offTimeInstance.setAttribute("onclick", "setCurrentOffTime(this.id)");
    offTimeInstance.setAttribute("class", "offTimeInstance");

    offTimesLabelList.appendChild(onTimeInstance);
  }
  return offTimesLabelList;
}

//sets color to color indicators and rgb sliders
function setColor(idOfColor) {
  //gets background color of preset selected
  colorOfDiv = document.getElementById(idOfColor).style.backgroundColor;
  //gets color indicator element
  colorIndicator = document.getElementById('colorIndicator');
  //assigns color of the preset to color indicator
  colorIndicator.style.backgroundColor = colorOfDiv;

  //sets last preset to id of the preset, which is the name of the preset
  lastPreset = idOfColor;

  //converts to rgb
  rgbColor = getRGB(colorOfDiv);

  //sets slider values to current color
  document.getElementById('redSlider').value = rgbColor.r;
  document.getElementById('greenSlider').value = rgbColor.g;
  document.getElementById('blueSlider').value = rgbColor.b;

  //updates lightArray values to current color values
  lightArray[currentLightId].r = rgbColor.r;
  lightArray[currentLightId].g = rgbColor.g;
  lightArray[currentLightId].b = rgbColor.b;

  //update light selection list
  updateLights();
}

//function to create rgb slider
function createRGBSlider(sliderType) {
  //create input element with specified properties
  slid = document.createElement('input');
  slid.type = "range";
  slid.min = "0";
  slid.max = "255";
  //set values depending on the type of slider
  switch(sliderType) {
      case "redSlider":
      slid.value = lightArray[currentLightId].r;
      break;
      case "greenSlider":
      slid.value = lightArray[currentLightId].g;
      break;
      case "blueSlider":
      slid.value = lightArray[currentLightId].b;
      break;
      default:
      console.warn("Slider Type is invalid!");
  }

  //set class, is and on input attributes
  slid.setAttribute("class","slider");

  slid.id = sliderType;
  slid.setAttribute("oninput", "updateColors(); ");
  slid.setAttribute("onchange", "saveLights(); ");

  //return created slider
  return slid;
}

//load light presets from current light of lightArray into lightPresets variable
function loadLightPresets() {
  lightPresetItem = lightArray[currentLightId];
  lightPresets = {};

  if(lightPresetItem["lightPresets"]) {
    lightPresets = lightPresetItem["lightPresets"];
  }
}

//save current color as preset into relevant light object in lightArray
function savePreset() {
  //get number of light presets
  num = 0;
  for(n in lightPresets) {
    if(lightPresets[n] != null) num++;
  }

  //gets value from sliders
  redSlider = document.getElementById('redSlider').value;
  greenSlider = document.getElementById('greenSlider').value;
  blueSlider = document.getElementById('blueSlider').value;

  //set currentColor to current values of the rgb sliders
  var currentColor = {
    "r": parseInt(redSlider),
    "g": parseInt(greenSlider),
    "b": parseInt(blueSlider)
  }

  //create new name of the new preset by adding one to number of current presets
  var currentLight = lightArray[currentLightId]; //get current light
  var currentPresetArray = currentLight["lightPresets"]; //get presets array
  currentPresetArray[num+1] = currentColor; //add new preset
  lastPreset = num+1; //set last preset var for deleting presets
  setupLightSettings(currentSelectionId);//setup ligth settings UI
}

//create presets UI
function createTemplateColors() {
  //create color selector div
  colorSelector = createDivId("quickColorSelector");

  //create save preset button
  savePresetBtn = createDivId("savePreset");
  savePresetBtn.setAttribute("onclick", "savePreset(); saveLights();updateColors();");
  savePresetBtn.appendChild(document.createTextNode("Save Preset"));

  //create delete preset button
  deletePresetBtn = createDivId("deletePreset");
  deletePresetBtn.setAttribute("onclick", "deletePreset();saveLights();updateColors();");
  deletePresetBtn.appendChild(document.createTextNode("Delete Preset"));

  //put buttons into color selector div
  colorSelector.appendChild(savePresetBtn);
  colorSelector.appendChild(deletePresetBtn);

  //create indivitual buttons for presets
  for(preset in lightPresets) {
    if(lightPresets[preset] != null) {
      quickColor = createDivId(preset.toString());
      quickColor.setAttribute("class", "quickColor");
      quickColor.style.backgroundColor = rgbToHex(lightPresets[preset].r, lightPresets[preset].g, lightPresets[preset].b);
      quickColor.setAttribute("onclick", "setColor(this.id); saveLights();updateColors();");
      colorSelector.appendChild(quickColor);
    }
  }

  //return created preset bar
  return colorSelector;
}

//delete last selected preset
function deletePreset() {
  var currentLight = lightArray[currentLightId];//get current light
  var currentPresetArray = currentLight["lightPresets"]; //get preset array of current light
  delete currentPresetArray[lastPreset]; //remove preset with the name of last preset
  setupLightSettings(currentSelectionId); //refresh settings UI
}