

//create Switch settings UI
function setupSwitchSettings(switchName) {
     //get settings div
     const $settingsDiv = $('#settings');
     //remove averything in the settings div
     $settingsDiv.children().remove();
   
     //find required switch by name and set current state variables
     for(switchId in switchArray){
          if(switchArray[switchId].name === switchName) {
               currentSelectionId = switchName;
               currentSwitchId = switchId;
          }
     }

     $settingsDiv.append('<div class="switchSettings"></div>');

     var $switchSetDiv = $('.switchSettings');
     $switchSetDiv.append('<p id="name">Name:</p>');
     switchSetDiv.append('<input id="nameField" type="text" onchange="renameSwitch();">'+currentSelectionId+'</input>');

     $switchSetDiv.append('<p id="name">Slave:</p>');
     
     var slaveIdentified = false;
     for(light in lightArray) {
          if(lightArray[light].ident == switchArray[currentSwitchId].slaveid) {
               $switchSetDiv.append('<input id="slaveField" type="text" onchange="setSlave();">'+lightArray[light].name+'</input>');
               slaveIdentified = true;
               break;
          }
     }

     for(plug in plugArray) {
          if(plugArray[plug].ident == switchArray[currentSwitchId].slaveid) {
               $switchSetDiv.append('<input id="slaveField" type="text" onchange="setSlave();">'+plugArray[plug].name+'</input>');
               slaveIdentified = true;
               break;
          }
     }

     if(slaveIdentified) $switchSetDiv.append('<input id="slaveField" type="text" onchange="setSlave();"></input>');
}

//set slave
function setSlave() {
     //get slave input field
     var slaveNameField = document.getElementById("slaveField");

     //check if name is another switch
     for(switchInst in switchArray) {
          if(switchArray[switchInst].name == slaveNameField.value) {
               alert("You cannot control other switches! This would defead the purpose.");
               return;
          }
     }

     //check if the name is one of the switches
     for(light in lightArray) {
          if(lightArray[light].name == slaveNameField.value) {
               switchArray[currentSwitchId].slaveid = lightArray[light].ident;
               saveSwitches();
               return;
          }
     }

     //check if the name is one of the plugs
     for(plug in plugArray) {
          if(plugArray[plug].name == slaveNameField.value) {
               switchArray[currentSwitchId].slaveid = plugArray[plug].ident;
               saveSwitches();
               return;
          }
     }

     
     //give and error if it's not
     alert("You need to enter the name of existing Light or Plug!");
}

//rename switch
function renameSwitch() {
     //get name field value
     var nameField = $("#nameField").val();
     //check if name is valid
     checkLightNames(nameField);
     checkPlugNames(nameField);
     checkSwitchNames(nameField);
     //set name to name field value
     switchArray[currentSwitchId].name  = nameField;
     //update switches list
     updateSwitches();
     saveSwitches();
}