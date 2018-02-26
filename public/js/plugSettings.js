//storage for current plug settings
var currentPlugState = false;
var currentPlugId;

//function to create all the plug settings UI
function setupPlugSettings(plugName) {
     //get settings div
     settingsDiv = document.getElementById('settings');
     //remove everything from the settings div
     while(settingsDiv.hasChildNodes()) {
          settingsDiv.removeChild(settingsDiv.firstChild);
     }
   
     //assign the plug that is used right now to pointer variables
     for(plug in plugArray){
          if(plugArray[plug].name === plugName) {
               currentSelectionId = plugName;
               currentPlugId = plug;
          }
     }

     //create plgus settings div
     var plugSetDiv = createDiv("plugSettings");
     //create name label
     plugSetDiv.appendChild(createNameLabel("Name:", "name"));

     //create name field input
     var nameIn = createInput("nameField", "text", currentSelectionId, "renamePlug();");
     plugSetDiv.appendChild(nameIn);

     //create name label for state
     plugSetDiv.appendChild(createNameLabel("State:", "name"));

     //create on button
     onBtn = createNameLabel("ON", "onButton");
     onBtn.setAttribute("onclick", "plugOn();savePlugs();");
     plugSetDiv.appendChild(onBtn);

     //create off button
     offBtn = createNameLabel("OFF", "offButton");
     offBtn.setAttribute("onclick", "plugOff();savePlugs();");
     plugSetDiv.appendChild(offBtn);

     //put plug settings div into settings div
     settingsDiv.appendChild(plugSetDiv);
     
     //refresh on off button state and plug list
     refreshPlugToggle();
     updatePlugs();
}

//rename plug function
function renamePlug() {
      //get namefield input element
     var nameField = document.getElementById("nameField").value;
     //check if name is valid
     checkLightNames(nameField);
     checkPlugNames(nameField);
     checkSwitchNames(nameField);
     //set plug name
     plugArray[currentPlugId].name  = nameField;
     updatePlugs();
     savePlugs();
}

//turn plug on
function plugOn() {
     //set state
     plugArray[currentPlugId].state = true;
     //update plug list and button state
     updatePlugs();
     refreshPlugToggle();
}

//turn plug off
function plugOff() {
     //set state
     plugArray[currentPlugId].state = false;
     //update plug list and button state
     updatePlugs();
     refreshPlugToggle();
}

//refresh on off button state
function refreshPlugToggle() {
     //get current state
     currentPlugState = plugArray[currentPlugId].state;
     //get on and off button elements
     onBtn = document.getElementById("onButton");
     offBtn = document.getElementById("offButton");
     //set color
     if(currentPlugState) {
          onBtn.style.backgroundColor = "#BBB";
          offBtn.style.backgroundColor = "#666";
     } else {
          onBtn.style.backgroundColor = "#666";
          offBtn.style.backgroundColor = "#BBB";
     }
}