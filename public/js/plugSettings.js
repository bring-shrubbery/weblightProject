//function to create all the plug settings UI
function setupPlugSettings(plugName) {
      //get settings div
      $settingsDiv = $('#settings');
      //remove everything from the settings div
      $settingsDiv.children().remove();
   
     //assign the plug that is used right now to pointer variables
      for(plug in plugArray){
            if(plugArray[plug].name === plugName) {
                  currentSelectionId = plugName;
                  currentPlugId = plug;
            }
      }

      //create plgus settings div
      $settingsDiv.append('<div class="plugSettings"></div>');
      var $plugSetDiv = $('.plugSettings');
      //create name label
      $plugSetDiv.append('<p id="name">Name:</p>');

      //create name field input
      $plugSetDiv.append('<input id="nameField" type="text" onchange="renamePlug();" value="'+currentSelectionId+'"></input>');

      //create name label for state
      $plugSetDiv.append('<p id="name">State:</p>');

      //create on/off button
      $plugSetDiv.append('<p id="onButton" onclick="plugOn();savePlugs();">ON</p>');
      $plugSetDiv.append('<p id="offButton" onclick="plugOff();savePlugs();">OFF</p>');

      //scheduler
      $settingsDiv.append('<div id="scheduler"></div>');
      var $schedulerDiv = $("#scheduler");

      $schedulerDiv.append('<div id="onTimesDiv"></div>');
      $schedulerDiv.append('<div id="offTimesDiv"></div>');
      var $onTimesDiv = $("#onTimesDiv");
      var $offTimesDiv = $("#offTimesDiv");

      $onTimesDiv.append('<input id="onTimesInput" type="time" value="00:00"></input>');
      $offTimesDiv.append('<input id="offTimesInput" type="time" value="00:00"></input>');

      $onTimesDiv.append('<p id="onTimesBtnAdd" onclick="addOnTime();setupPlugSettings(currentSelectionId);">Add ON Time</p>');
      $offTimesDiv.append('<p id="offTimesBtnAdd" onclick="addOffTime();setupPlugSettings(currentSelectionId);">Add OFF Time</p>');

      $onTimesDiv.append('<p id="onTimesBtnDelete" onclick="deleteOnTime();setupPlugSettings(currentSelectionId);">Delete ON Time</p>');
      $offTimesDiv.append('<p id="offTimesBtnDelete" onclick="deleteOffTime();setupPlugSettings(currentSelectionId);">Delete OFF Time</p>');

      var onArray = plugArray[currentPlugId].onTimes;
      $onTimesDiv.append('<div id="onTimesList"></div>');
      $onTimesList = $('#onTimesList');

      for(ont in onArray) {
            $onTimesList.append('<p id="'+ont+'" onclick="setCurrentOnTime(this.id)" class="onTimeInstance">'+onArray[ont]+'</p>');
      }

      //create off times list
      var offArray = plugArray[currentPlugId].offTimes;
      $offTimesDiv.append('<div id="offTimesList"></div>');
      $offTimesList = $('#offTimesList');

      for(offt in offArray) {
            $offTimesList.append('<p id="'+offt+'" onclick="setCurrentOffTime(this.id)" class="offTimeInstance">'+offArray[offt]+'</p>');
      }

      //refresh on off button state and plug list
      refreshPlugToggle();
      updatePlugs();
}

//rename plug function
function renamePlug() {
      //get namefield input element
     var nameField = $("#nameField").val();
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
     var $onBtn = $("#onButton");
     var $offBtn = $("#offButton");
     //set color
     if(currentPlugState == 1) {
          $onBtn.css('background-color', "#BBB");
          $offBtn.css('background-color', "#666");
     } else {
          $onBtn.css('background-color', "#666");
          $offBtn.css('background-color', "#BBB");
     }
}