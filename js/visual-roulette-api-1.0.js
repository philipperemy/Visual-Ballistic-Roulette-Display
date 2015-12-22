$(document).ready(function() {

	var spinLock = false; //Unlock

    setInterval(function() { // continuously check if the audio is being played
        if (responsiveVoice.isPlaying()) {
            console.log('playing..');
			spinLock = true; //Lock
        } else {
			console.log('no more..');
			spinLock = false; //Unlock
			callApi();
		}
    }, 100);

	function callApi() {
        //$.get("http://localhost:8080/RouletteServer/Response", function(data) {
        $.get("http://localhost:8080/RouletteServer/Response?sessionid=1", function(data) {

            $("#outcome").html(data);
            if (data.indexOf("SESSION_NOT_READY_WHEEL_COUNT_ACTUAL") > -1) {
                var wheelCountActual = data.split(",")[1];
                responsiveVoice.speak("Not ready. Wheel count at " + wheelCountActual, "UK English Female");
            } else {
                responsiveVoice.speak(data, "UK English Female");
            }

        }).fail(function() {
            alert("error");
        });
    }
	
});