//current input ID
var wordIndex;
var MAX_WORD_LENGTH = 9
var numWords = 7;

//boolean ready if true they have scanned ID,
// if false they haven't yet and can't type


//STRINGS
var scannedString = "Scanned! Type ";
var scannedTwiceString=  "You cannot type two words in a row."

var StatusEnum = {
  READY : 0,
  SCANNING : 1,
  TYPING : 2
}

// Keyboard Keys
var BACKSPACE = 8,
    ENTER = 13;
//SENTENCE CONSTRUCTION:

currentWords = ["the", "noun", "adverb", "verb", "the", "adjective", "noun"];
articles = ["the", "his", "her", "my", "its"];
//TODO: count not "thes to construct on the fly"
currentRemainingWords = [];
remainingWords = [1, 2, 3, 5, 6];
var currentStatus = StatusEnum.READY;

//manually keep track of every string
var sentence = [];

//RFID SCANNING
//time when scan started
var scanStartMillis;
var lastRFID="";

//seconds we'll wait, 200 is real with cal id reader
//var SCAN_TIMEOUT= 200;
var SCAN_TIMEOUT= 40000;
//RFID so far
var RFID = "";



//for backspace detection
document.onkeydown = function(evt) {

  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;
  if (evt.keyCode == 119){
    clearLastWord();
  }
  if (currentStatus === StatusEnum.TYPING) {
    if (charCode === BACKSPACE) {
      $('#char-limit').hide();
      sentence[wordIndex] = sentence[wordIndex].substring(0, sentence[wordIndex].length - 1);
    }
  }
}

document.ready = function (){
  console.log("HELLOOOO");
  pickWord();
  initializeSentence();
  //$('#scanid').show();
}
function pickWord(){
  if (currentRemainingWords.length == 0){
    currentRemainingWords = remainingWords.slice(0);
    $("#0").val(articles[Math.floor(Math.random()*articles.length)]);

    $("#4").val(articles[Math.floor(Math.random()*articles.length)]);
  }

  wordIndex = currentRemainingWords [Math.floor(Math.random()*currentRemainingWords.length)];
  var indexIndex = currentRemainingWords.indexOf(wordIndex);
  console.log("picked word : " + wordIndex);
  if (indexIndex>-1){
    currentRemainingWords.splice(indexIndex, 1);
  }
  $("#" + wordIndex).val(currentWords[wordIndex]);
  $("#" + wordIndex).css("color", "#6DD0F7");
  console.log("MAKIN IT BLUE");
}
//KEY PRESS CAN EITHER BE RFID OR KEYBOARD INPUT
document.onkeypress = function(evt) {

  //$('#arrow').show();

  evt = evt || window.event;
  var charCode = evt.keyCode || evt.which;

  //GRAB INPUT
  var charStr = String.fromCharCode(charCode);

  //READ RFID
  if (currentStatus === StatusEnum.READY || currentStatus === StatusEnum.SCANNING){
    tryScan(charStr);
  }

  else if (currentStatus === StatusEnum.TYPING) {
    focusLine(wordIndex);

    // Turns on "Press ENTER to submit caption"
    $('#caption').show();
    $('#scanid').hide();

    // If "ENTER" pressed
    if (charCode === ENTER) {

      // Hides helper captions
      $('.caption').hide();

      // Pulse animation
      $('#' + wordIndex).animate({fontSize:"150px", height: "180px"});
      setTimeout(function() {}, 1000);
      $('#' + wordIndex).animate({fontSize:"80px", height: "110px"});

      // Proceeds to next word
      nextWord();

    // If length is less than MAX_WORD_LENGTH
    } else if (sentence[wordIndex].length < MAX_WORD_LENGTH){
      sentence[wordIndex] += charStr;

    // If length is more than MAX_WORD_LENGTH
    } else {

      // Shows character limit text
      $('#char-limit').show();

      // Shake animation
      $('#' + wordIndex).css("-webkit-animation-play-state", "running");
      setTimeout(function() {
        $('#' + wordIndex).css("-webkit-animation-play-state", "paused");
      }, 500);
    }
  }

}

function readSentence(){
  var fullSentence = "";
  for (var i = 0 ; i < sentence.length;i++){
    fullSentence += sentence[i] + " ";
  }
  speak(fullSentence, {  wordgap: 5 });
}

function focusLine(num){
  $('#'+num).show();
  $('#'+num).focus();
  // $('#'+num).val("");
}

function hideLine(num){
  $("#" + num).val("");
  $("#" + num).hide()
}

function tryScan(charStr){
  var currentDate = new Date();
  if (isNumber(charStr)){

    //START SCANNING
    if (currentStatus === StatusEnum.READY){
      scanStartMillis = currentDate.getTime();
      RFID = RFID + charStr;
      currentStatus = StatusEnum.SCANNING;
    }
    else if (currentStatus === StatusEnum.SCANNING){
      RFID = RFID + charStr;
      var scanEndMillis = currentDate.getTime();
      var scanTime = scanEndMillis - scanStartMillis;
      if (scanTime < SCAN_TIMEOUT){
        if (RFID.length === 5) {
          if (RFID === lastRFID) {
            speak(scannedTwiceString , { wordgap: 5});
            currentStatus = StatusEnum.READY;
            RFID = "";

          }
          else {
            lastRFID = RFID;
            sentence[wordIndex] = "";
            scanned();

            currentStatus = StatusEnum.TYPING;

          }
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
  if (currentWords[wordIndex] == "adjective" || currentWords[wordIndex]=="adverb"){

     speak(scannedString + " annnnnnnn " + currentWords[wordIndex], { wordgap: 5 });
  }
  else {speak(scannedString + " a " + currentWords[wordIndex], { wordgap: 5 });
}
  $("#" + wordIndex).val("");
  $('#scanid').hide();

  //$('#arrow').hide();

}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}

//change which input we're on, set focus to new input
function nextWord(){
  $("#" + wordIndex).css("color", "white");
  var dte = new Date();
  var currentDate = dte.getMonth() + "/" + dte.getDay() + dte.getFullYear()
  var currentTime = dte.getHours() + ":" + dte.getMinutes() + ":" + dte.getSeconds();
  var jason = JSON.stringify({RFID: lastRFID, "WORD": sentence[wordIndex], "WORD_INDEX": wordIndex, "date": currentDate, "time": currentTime });

  console.log(jason);
  //readSentence();

  //RESET
  currentStatus = StatusEnum.READY;
  RFID="";
  pickWord();
  focusLine(11);
  hideLine(11);

  //$('#scanid').show();

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
  sentence = [];
}

function initializeSentence(){

  for (var i = 0 ; i < numWords;i++){
    $("#" + i).val(currentWords[i]);
    $("#" + i).show()
  }
  //MAKE SELECTED WORD COLOR

}






