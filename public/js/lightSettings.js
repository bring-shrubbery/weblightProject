//storage for slider values
var redSlider;
var greenSlider;
var blueSlider;

//storage for color presets
var lightPresets = [];
var lastPreset;

//currently selected stuff
var currentLightId;
var currentSelectionId;

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
    lightArray[currentLightId].r = redSlider;
    lightArray[currentLightId].g = greenSlider;
    lightArray[currentLightId].b = blueSlider;

    //update light list UI
    updateLights();
}

//function for renaming light
function renameLight() {
    //get value of the input field
     var nameField = document.getElementById("nameField").value;
     //check if name is taken
     checkLightNames(nameField);
     checkPlugNames(nameField);
     checkSwitchNames(nameField);

     //save name to currently selected light in lightArray 
     lightArray[currentLightId].name  = nameField;
     //update light list UI
     updateLights();
     saveLights();
}

//function for starting of the app, sets up first light
//in lightArray as currently selected item for settings
function getFirstLightAsMain() {
    //set selector variables to first item
    if(lightArray) {
      currentSelectionId = lightArray[0].name;
      currentLightId = 0;
    }
    //setup light settings UI
    setupLightSettings();
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

  //assign light settings div and preset colors to settings div
  settingsDiv.appendChild(lightSetDiv);
  settingsDiv.appendChild(presetColors);
  
  //update light list
  updateColors();
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
  slid.setAttribute("oninput", "updateColors(); saveLights();");

  //return created slider
  return slid;
}

//load light presets from current light of lightArray into lightPresets variable
function loadLightPresets() {
  lightPresetItem = lightArray[currentLightId.toString()];
  lightPresets = [];

  if(lightPresetItem["lightPresets"]) {
    lightPresets = lightPresetItem["lightPresets"];
  }
}

//save current color as preset into relevant light object in lightArray
function savePreset() {
  //get number of light presets
  num = 0;
  for(n in lightPresets) {
      num++;
  }

  //set currentColor to current values of the rgb sliders
  var currentColor = {
      "r": redSlider,
      "g": greenSlider,
      "b": blueSlider,
  }

  //create new name of the new preset by adding one to number of current presets
  var clrName = "preset"+(num+1).toString();
  var currentLight = lightArray[currentLightId]; //get current light
  var currentPresetArray = currentLight["lightPresets"]; //get presets array
  currentPresetArray[clrName] = currentColor; //add new preset
  lastPreset = clrName; //set last preset var for deleting presets
  setupLightSettings(currentSelectionId);//setup ligth settings UI
}

//create presets UI
function createTemplateColors() {
  //create color selector div
  colorSelector = createDivId("quickColorSelector");

  //create save preset button
  savePresetBtn = createDivId("savePreset");
  savePresetBtn.setAttribute("onclick", "savePreset(); saveLights();");
  savePresetBtn.appendChild(document.createTextNode("Save Preset"));

  //create delete preset button
  deletePresetBtn = createDivId("deletePreset");
  deletePresetBtn.setAttribute("onclick", "deletePreset();saveLights();");
  deletePresetBtn.appendChild(document.createTextNode("Delete Preset"));

  //put buttons into color selector div
  colorSelector.appendChild(savePresetBtn);
  colorSelector.appendChild(deletePresetBtn);

  //create indivitual buttons for presets
  for(preset in lightPresets) {
      quickColor = createDivId(preset.toString());
      quickColor.setAttribute("class", "quickColor");
      quickColor.style.backgroundColor = rgbToHex(lightPresets[preset].r, lightPresets[preset].g, lightPresets[preset].b);
      quickColor.setAttribute("onclick", "setColor(this.id); saveLights();");
      colorSelector.appendChild(quickColor);
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