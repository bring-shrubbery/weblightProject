//storage for slider values
var redSlider;
var greenSlider;
var blueSlider;

//storage for color presets
var lightPresets = [];
var lastPreset;

//settings and color indicator elements
var settingsDiv = document.getElementById('settings');
var $colorIndicator = $('#colorIndicator');

//updates colors in lightArray for currently selected light
function updateColors() {
    //gets value from sliders
    redSlider = $('#redSlider').val();
    greenSlider = $('#greenSlider').val();
    blueSlider = $('#blueSlider').val();

    //set color indicator color to current color
    $('#colorIndicator').css('backgroundColor', rgbToHex(redSlider, greenSlider, blueSlider));

    //set current color values to lightArray variable
    lightArray[currentLightId].setRGB(redSlider,greenSlider,blueSlider);

    //update light list UI
    updateLights();
}

//function for renaming light
function renameLight() {
    //get value of the input field
    var nameField = $("#nameField").val();
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
  $settingsDiv = $('#settings');
  //remove everything from settings div
  $settingsDiv.children().remove();

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
  $settingsDiv.append('<div class="lightSettings"></div>');
  $lightSetDiv = $('.lightSettings');
  $lightSetDiv.append('<p id="name">Name:</p>');

  $lightSetDiv.append('<input id="nameField" type="text" value="'+currentSelectionId+'" onchange="renameLight();"></input>');

  $lightSetDiv.append('<div class="colorPicker"></div>');
  $colorPick = $('.colorPicker');
  
  //create rgb sliders
  $colorPick.append('<input id="redSlider" type="range" min="0" max="255" class="slider" oninput="updateColors();" onchange="saveLights();" value="'+lightArray[currentLightId].r+'"></input>');
  $colorPick.append('<input id="greenSlider" type="range" min="0" max="255" class="slider" oninput="updateColors();" onchange="saveLights();" value="'+lightArray[currentLightId].g+'"></input>');
  $colorPick.append('<input id="blueSlider" type="range" min="0" max="255" class="slider" oninput="updateColors();" onchange="saveLights();" value="'+lightArray[currentLightId].b+'"></input>');
  
  //create color indicator and control it's color
  $colorPick.append('<div id="colorIndicator"></div>');
  $colorInd = $('#colorIndicator');
  $colorInd.css('backgroundColor', rgbToHex(lightArray[light].r,lightArray[light].g,lightArray[light].b));

  //create preset color bar
  $settingsDiv.append(createTemplateColors());

  //scheduler section
  $settingsDiv.append('<div id="scheduler"></div>');
  var $schedulerDiv = $('#scheduler');

  //scheduler on and off times sections
  $schedulerDiv.append('<div id="onTimesDiv"></div>');
  $schedulerDiv.append('<div id="offTimesDiv"></div>');
  var $onTimesDiv = $('#onTimesDiv');
  var $offTimesDiv = $('#offTimesDiv');

  $onTimesDiv.append('<input id="onTimesInput" type="time" value="00:00"></input>');
  $offTimesDiv.append('<input id="offTimesInput" type="time" value="00:00"></input>');

  //create time add button
  $onTimesDiv.append('<p id="onTimesBtnAdd" onclick="addOnTime();setupLightSettings(currentSelectionId);">Add ON Time</p>');
  $offTimesDiv.append('<p id="offTimesBtnAdd" onclick="addOffTime();setupLightSettings(currentSelectionId);">Add OFF Time</p>');

  //create times delete buttons
  $onTimesDiv.append('<p id="onTimesBtnDelete" onclick="deleteOnTime();setupLightSettings(currentSelectionId);">Delete ON Time</p>');
  $offTimesDiv.append('<p id="offTimesBtnDelete" onclick="deleteOffTime();setupLightSettings(currentSelectionId);">Delete OFF Time</p>');

  //create on times list
  var onArray = lightArray[currentLightId].onTimes;
  $onTimesDiv.append('<div id="onTimesList"></div>');
  $onTimesList = $('#onTimesList');

  for(ont in onArray) {
    $onTimesList.append('<p id="'+ont+'" onclick="setCurrentOnTime(this.id)" class="onTimeInstance">'+onArray[ont]+'</p>');
  }

  //create off times list
  var offArray = lightArray[currentLightId].offTimes;
  $offTimesDiv.append('<div id="offTimesList"></div>');
  $offTimesList = $('#offTimesList');

  for(offt in offArray) {
    $offTimesList.append('<p id="'+offt+'" onclick="setCurrentOffTime(this.id)" class="offTimeInstance">'+offArray[offt]+'</p>');
  }

}

//sets color to color indicators and rgb sliders
function setColor(idOfColor) {
  //gets background color of preset selected
  var colorOfDiv = $("#"+idOfColor).css.backgroundColor;
  //gets color indicator element
  var $colorIndicator = $('#colorIndicator');
  //assigns color of the preset to color indicator
  $colorIndicator.css(backgroundColor, colorOfDiv);

  //sets last preset to id of the preset, which is the name of the preset
  lastPreset = idOfColor;

  //converts to rgb
  rgbColor = getRGB(colorOfDiv);

  //sets slider values to current color
  $('#redSlider').val() = rgbColor.r;
  $('#greenSlider').val() = rgbColor.g;
  $('#blueSlider').val() = rgbColor.b;

  //updates lightArray values to current color values
  lightArray[currentLightId].r = rgbColor.r;
  lightArray[currentLightId].g = rgbColor.g;
  lightArray[currentLightId].b = rgbColor.b;

  //update light selection list
  updateLights();
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
  redSlider = $('#redSlider').val();
  greenSlider = $('#greenSlider').val();
  blueSlider = $('#blueSlider').val();

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
  colorSelector = '<div id="quickColorSelector">';

  //create save preset button
  savePresetBtn = '<div id="savePreset" onclick="savePreset(); saveLights();updateColors();">Save Preset</div>';

  //create delete preset button
  deletePresetBtn = '<div id="deletePreset" onclick="deletePreset();saveLights();updateColors();">Delete Preset</div>';

  //put buttons into color selector div
  colorSelector += savePresetBtn;
  colorSelector += deletePresetBtn;

  //create indivitual buttons for presets
  for(preset in lightPresets) {
    if(lightPresets[preset] != null) {
      var quickColor = '<div id="'+preset.toString()+'" class="quickColor" onclick="setColor(this.id); saveLights();updateColors();"'
      quickColor += 'style="background-color:'+rgbToHex(lightPresets[preset].r, lightPresets[preset].g, lightPresets[preset].b)+'"></div>';
      
      colorSelector += quickColor;
    }
  }

  //return created preset bar
  return colorSelector+'</div>';
}

//delete last selected preset
function deletePreset() {
  var currentLight = lightArray[currentLightId];//get current light
  var currentPresetArray = currentLight["lightPresets"]; //get preset array of current light
  delete currentPresetArray[lastPreset]; //remove preset with the name of last preset
  setupLightSettings(currentSelectionId); //refresh settings UI
}