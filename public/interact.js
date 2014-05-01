$(document).ready(function() {

	$(document).keypress(function(evt) {
    	var code = (evt.keyCode ? evt.keyCode : evt.which);
    	$('#caption').show();
    	if (code === 13) {
    		$("#caption").hide();
    	}
    });

});