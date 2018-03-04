

//create Switch settings UI
function setupSwitchSettings(switchName) {
     //get settings div
     settingsDiv = document.getElementById('settings');
     //remove averything in the settings div
     while(settingsDiv.hasChildNodes()) {
          settingsDiv.removeChild(settingsDiv.firstChild);
     }
   
     //find required switch by name and set current state variables
     for(switchId in switchArray){
          if(switchArray[switchId].name === switchName) {
               currentSelectionId = switchName;
               currentSwitchId = switchId;
          }
     }

     switchSetDiv = createDiv("switchSettings");//create switch settings div
     switchSetDiv.appendChild(createNameLabel("Name:", "name"));//add name label

     //create name input field
     nameIn = createInput("nameField", "text", currentSelectionId, "renameSwitch();saveSwitches();");
     switchSetDiv.appendChild(nameIn);//add name field to switch settings div

     switchSetDiv.appendChild(createNameLabel("State:", "name"));//create state name label 

     //create on button
     onBtn = createNameLabel("ON", "onButton");
     onBtn.setAttribute("onclick", "switchOn();saveSwitches();");
     switchSetDiv.appendChild(onBtn);

     //create off button
     offBtn = createNameLabel("OFF", "offButton");
     offBtn.setAttribute("onclick", "switchOff();saveSwitches();");
     switchSetDiv.appendChild(offBtn);

     //create slave id name label
     switchSetDiv.appendChild(createNameLabel("Slave:", "name"));

     var slaveNameIn;
     //create slave id input field
     for(light in lightArray) {
          
          if(lightArray[light].ident == switchArray[currentSwitchId].slaveid) {
               slaveNameIn = createInput("slaveField", "text", "", "setSlave();saveSwitches();");
               break;
          }
     }

     for(plug in plugArray) {
          if(plugArray[plug].ident == switchArray[currentSwitchId].slaveid) {
               slaveNameIn = createInput("slaveField", "text", plugArray[plug].name, "setSlave();saveSwitches();");
               break;
          }
     }

     if(slaveNameIn == undefined){
          slaveNameIn = createInput("slaveField", "text", "", "setSlave();saveSwitches();");
     }
     
     switchSetDiv.appendChild(slaveNameIn);

     //put switch settings div into settings div
     settingsDiv.appendChild(switchSetDiv);
     
     //update switches list and on/off btn state
     refreshSwitchToggle();
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
               return;
          }
     }

     //check if the name is one of the plugs
     for(plug in plugArray) {
          if(plugArray[plug].name == slaveNameField.value) {
               switchArray[currentSwitchId].slaveid = plugArray[plug].ident;
               return;
          }
     }

     
     //give and error if it's not
     alert("You need to enter the name of existing Light or Plug!");
}

//rename switch
function renameSwitch() {
     //get name field value
     var nameField = document.getElementById("nameField").value;
     //check if name is valid
     checkLightNames(nameField);
     checkPlugNames(nameField);
     checkSwitchNames(nameField);
     //set name to name field value
     switchArray[currentSwitchId].name  = nameField;
     //update switches list
     updateSwitches();
}

//switch the switch on
function switchOn() {
     //set current switch state ON
     switchArray[currentSwitchId].state = true;

     //set plug state if it's attached to the switch
     for(plug in plugArray) {
          if(plugArray[plug].name == switchArray[currentSwitchId].slaveid) {
               plugArray[plug].state = true;
          }
     }

     //set light state if it's attachesd to the switch
     for(light in lightArray) {
          if(lightArray[light].name == switchArray[currentSwitchId].slaveid) {
               lightArray[light].r = "255";
               lightArray[light].g = "255";
               lightArray[light].b = "255";
          }
     }
     //update on/off button state nad switches list
     refreshSwitchToggle();
     updateSwitches();
}

//switch current switch off
function switchOff() {
     //set variable to off
     switchArray[currentSwitchId].state = false;

     //apply state to plug if it is the plug
     for(plug in plugArray) {
          if(plugArray[plug].name == switchArray[currentSwitchId].slaveid) {
               plugArray[plug].state = false;
          }
     }

     //set state to a light if it is the light
     for(light in lightArray) {
          if(lightArray[light].name == switchArray[currentSwitchId].slaveid) {
               lightArray[light].r = "0";
               lightArray[light].g = "0";
               lightArray[light].b = "0";
          }
     }
     //update on/off button state and update switches list
     refreshSwitchToggle();
     updateSwitches();
     console.log(switchArray[currentSwitchId].state);
}

//update on/off button state
function refreshSwitchToggle() {
     //get current switch state
     currentSwitchState = switchArray[currentSwitchId].state;
     //get on and off buttons
     onBtn = document.getElementById("onButton");
     offBtn = document.getElementById("offButton");
     //set colors
     if(currentSwitchState) {
          onBtn.style.backgroundColor = "#BBB";
          offBtn.style.backgroundColor = "#666";
     } else {
          onBtn.style.backgroundColor = "#666";
          offBtn.style.backgroundColor = "#BBB";
     }
}