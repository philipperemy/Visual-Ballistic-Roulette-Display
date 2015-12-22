
$(document).ready(function() {
    
	setInterval(function(){ // continuously check if the audio is being played
	  if(responsiveVoice.isPlaying()) {
			console.log('playing..');
	}}, 100);
	
	setInterval(function() {
		$.get("http://localhost:8080/RouletteServer/Response", function(data){
			
			$("#outcome").html(data);
			if(data.indexOf("SESSION_NOT_READY_WHEEL_COUNT_ACTUAL") > -1) {
				var wheelCountActual = data.split(",")[1];
				responsiveVoice.speak("Not ready. Wheel count at " + wheelCountActual, "UK English Female");
			} else {
				responsiveVoice.speak(data, "UK English Female");
			}
			
        }).fail(function() {
			alert( "error" );
		  });
    }, 5000);
});