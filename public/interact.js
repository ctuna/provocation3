$(document).ready(function() {
	$('#0').show();
	$('#0').focus();

	$(document).keypress(function(evt) {
    	var code = (evt.keyCode ? evt.keyCode : evt.which);
    	$('#caption').show();
    	if (code === 13) {
    		$("#caption").hide();
    	}
    });

});