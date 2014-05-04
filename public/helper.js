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

//RFID SCANNING
//time when scan started
var scanStartMillis;


//seconds we'll wait
var SCAN_TIMEOUT= 200;
//RFID so far
var RFID = "";




//KEY PRESS CAN EITHER BE RFID OR KEYBOARD INPUT 
      document.onkeypress = function(evt) {

        evt = evt || window.event;
        var charCode = evt.keyCode || evt.which;
        //GRAB INPUT
        var charStr = String.fromCharCode(charCode);
        //READ RFID
        if (currentStatus == StatusEnum.READY || currentStatus == StatusEnum.SCANNING){
          tryScan(charStr);
        }
       
        else if (currentStatus == StatusEnum.TYPING){
          focusLine(wordIndex);
          $('#caption').show();
          if (charCode === 13) {
            $("#caption").hide();
            nextWord();
          }
        }

        
      }



function focusLine(num){

  $('#'+num).show();
  $('#'+num).focus();


}



function hideLine(num){
    $("#" + num).val("");
    $("#" + num).hide()
}

function tryScan(charStr){
  var currentDate = new Date(); 
  if (isNumber(charStr)){
    //START SCANNING
    if (currentStatus == StatusEnum.READY){

      scanStartMillis = currentDate.getTime();
      RFID = RFID + charStr; 
      currentStatus = StatusEnum.SCANNING; 
    }
    else if (currentStatus == StatusEnum.SCANNING){
      RFID = RFID + charStr; 
      var scanEndMillis = currentDate.getTime();
      var scanTime = scanEndMillis - scanStartMillis;
      if (scanTime < SCAN_TIMEOUT){
        if (RFID.length == 5){
          currentStatus = StatusEnum.TYPING;
          scanned();
        }
      }
      //RESTART SCANNING IF TIMEOUT 
      else {
        currentStatus = StatusEnum.READY;
        RFID = "";
        }
       
      }
    }
  }

//called when the RFID has been scanned and the user can type in the next input
function scanned(){
  console.log("SCANNED");
}
function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//change which input we're on, set focus to new input
function nextWord(){
  //RESET 
  currentStatus = StatusEnum.READY;
  RFID="";
	wordIndex = (wordIndex+1)%numWords;


  focusLine(wordIndex);
  hideLine(wordIndex);

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
  //$("#0").show();
}