//current input ID
var wordIndex = 0;
var MAX_WORD_LENGTH = 9
var numWords = 5;

      document.onkeypress = function(evt) {
        evt = evt || window.event;
        var charCode = evt.keyCode || evt.which;
        //Grab Keyboard Input
        var charStr = String.fromCharCode(charCode);

        console.log(charStr);

        //Grab current text inside input field
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



//change which input we're on, set focus to new input
function nextWord(){
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