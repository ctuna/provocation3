//current input ID
var wordIndex = 0;
var MAX_WORD_LENGTH = 9
var numWords = 5;
//boolean ready if true they have scanned ID,
// if false they haven't yet and can't type
var StatusEnum = {
    READY : 0,
    SCANNING : 1,
    TYPING : 2
}
var currentStatus = StatusEnum.READY; 
var scanStart;
var timeout;
var RFID = "";
var minutes;
var seconds;


//KEY PRESS CAN EITHER BE RFID OR KEYBOARD INPUT 
      document.onkeypress = function(evt) {
        evt = evt || window.event;
        var charCode = evt.keyCode || evt.which;
        //Grab Keyboard Input
        var charStr = String.fromCharCode(charCode);

        console.log(charStr);
        //READ RFID
        if (currentStatus == StatusEnum.READY || currentStatus == StatusEnum.SCANNING){
          tryScan(charStr);
        }
        //READ TEXT 
        else if (currentStatus == StatusEnum.TYPING){
          enterText(evt, charCode, charStr);
        }
        //Grab current text inside input field
        
      }

function enterText(evt, charCode, charStr){
  console.log("in enter text");
  var lastString = $("#" + wordIndex).val();
        //is key a backspace?
        if (charCode === 8){
          $("#" + wordIndex).text(lastString.substring(0, lastString.length - 1));
        }
        //is key a return?
        else if (evt.keyCode === 13){
          nextWord();
        }
        //update text in input
        else {
          $("#" + wordIndex).value = lastString + charStr;
        }
}

function tryScan(charStr){
    console.log("in try scan");

  if (isNumber(charStr)){
    //START SCANNING
    if (currentStatus == StatusEnum.READY){
      var currentDate = new Date(); 
      minutes = currentDate.getMinutes();
      seconds = currentDate.getSeconds();
      RFID = RFID + charStr; 
      currentStatus = StatusEnum.SCANNING; 
      console.log("STARTING SCAN");
    }
    else if (currentStatus == StatusEnum.SCANNING){
      RFID = RFID + charStr; 
      console.log("SCANNING: RFID = " + RFID);
      if (RFID.length == 5){
        //SCANNED ENOUGH
        currentStatus = StatusEnum.TYPING;
      }
    }
  }
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//change which input we're on, set focus to new input
function nextWord(){
  //RESET 
  currentStatus = StatusEnum.READY;
  RFID="";
  
	console.log("wordIndex was : " + wordIndex);
	wordIndex = (wordIndex+1)%numWords;
  $("#" + wordIndex).show();
  $("#" + wordIndex).focus();
	console.log("wordIndex changed to: " + wordIndex);
  //if we've looped back to beginning, clear all words
	if (wordIndex === 0){
		clearAll();
	}
}

//clear all text in all inputs and hide them (except 0)
function clearAll(){
	for (var i = 0 ; i < numWords;i++){
		$("#" + i).val("");
    $("#" + i).hide()
	}
  $("#0").show();
}