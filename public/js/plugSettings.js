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

      //scheduler
      var schedulerDiv = createDivId("scheduler");
      var onTimesDiv = createDivId("onTimesDiv");
      var offTimesDiv = createDivId("offTimesDiv");

      var onTimeInput = createInput("onTimesInput", "time", "00:00", "");
      var offTimeInput = createInput("offTimesInput", "time", "00:00", "");

      onTimesDiv.appendChild(onTimeInput);
      offTimesDiv.appendChild(offTimeInput);

      var onTimesAddBtn = createNameLabel("Add On Time","onTimesBtnAdd");
      onTimesAddBtn.setAttribute("onclick", "addOnTime();setupPlugSettings(currentSelectionId);");
      var offTimesAddBtn = createNameLabel("Add Off Time","offTimesBtnAdd");
      offTimesAddBtn.setAttribute("onclick", "addOffTime();setupPlugSettings(currentSelectionId);");

      var onTimesDeleteBtn = createNameLabel("Delete On Time","onTimesBtnDelete");
      onTimesDeleteBtn.setAttribute("onclick", "deleteOnTime();setupPlugSettings(currentSelectionId);");
      var offTimesDeleteBtn = createNameLabel("Delete Off Time","offTimesBtnDelete");
      offTimesDeleteBtn.setAttribute("onclick", "deleteOffTime();setupPlugSettings(currentSelectionId);");

      var onArray = plugArray[currentPlugId].onTimes;
      var onTimesList = createOnTimes(onArray);
      onTimesDiv.appendChild(onTimesList);

      var offArray = plugArray[currentPlugId].offTimes;
      var offTimesList = createOnTimes(offArray);
      offTimesDiv.appendChild(offTimesList);

      onTimesDiv.appendChild(onTimesAddBtn);
      offTimesDiv.appendChild(offTimesAddBtn);
      onTimesDiv.appendChild(onTimesDeleteBtn);
      offTimesDiv.appendChild(offTimesDeleteBtn);

      schedulerDiv.appendChild(onTimesDiv);
      schedulerDiv.appendChild(offTimesDiv);

      //put plug settings div into settings div
      settingsDiv.appendChild(plugSetDiv);
      settingsDiv.appendChild(schedulerDiv);

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
     plugArray[currentPlugId].state = 1;
     //update plug list and button state
     updatePlugs();
     refreshPlugToggle();
}

//turn plug off
function plugOff() {
     //set state
     plugArray[currentPlugId].state = 0;
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
     if(currentPlugState == 1) {
          onBtn.style.backgroundColor = "#BBB";
          offBtn.style.backgroundColor = "#666";
     } else {
          onBtn.style.backgroundColor = "#666";
          offBtn.style.backgroundColor = "#BBB";
     }
}