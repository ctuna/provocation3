    
var wordIndex = 1; 
      document.onkeypress = function(evt) {
        evt = evt || window.event;
        var charCode = evt.keyCode || evt.which;
        var charStr = String.fromCharCode(charCode);
        console.log(charStr);
        var lastString = $("#" + wordIndex).text();
        $("#" + wordIndex).text(lastString + charStr);
      }




      //clear function
      //start new word