var wordIndex = 0; 
var MAX_WORD_LENGTH = 9
var numWords = 5;

      document.onkeypress = function(evt) {
        evt = evt || window.event;
        var charCode = evt.keyCode || evt.which;
        var charStr = String.fromCharCode(charCode);
        console.log(charStr);
        var lastString = $("#" + wordIndex).text();
        if (charCode == 8){
        	$("#" + wordIndex).text(lastString.substring(0, lastString.length - 1));
        }
        else if (evt.keyCode == 13){

        	nextWord();
        }
        else if (lastString.length<MAX_WORD_LENGTH){
        	$("#" + wordIndex).text(lastString + charStr);
        	}
      }
    


function nextWord(){
	console.log("wordIndex was : " + wordIndex);
	wordIndex = (wordIndex+1)%numWords;
	console.log("wordIndex changed to: " + wordIndex);
	if (wordIndex == 0){
		clearAll();
	}
}


function clearAll(){
	for (var i = 0 ; i < numWords;i++){
		$("#" + i).text("");
	}
}