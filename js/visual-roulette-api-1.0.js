$(document).ready(function() {

    var spinLock = false; //Unlock
    var scriptResponseTime = 200; // ms

    // continuously check if the audio is being played
    var timerID = setInterval(function() {
        if (responsiveVoice.isPlaying()) {
            console.log('playing..');
            spinLock = true; //Lock
        } else {
            console.log('no more..');
            spinLock = false; //Unlock
            callApi();
        }
    }, scriptResponseTime);

    function callApi() {

        var target = "http://localhost:8080/RouletteServer/Response";
        //TODO: remove it
        if (Math.random() < 0.1) {
            target = "http://localhost:8080/RouletteServer/Response?sessionid=1"
        }

        $.get(target, function(data) {

            $("#outcome").html(data);
            if (data.indexOf("SESSION_NOT_READY_WHEEL_COUNT_ACTUAL") > -1) {
                /*var wheelCountActual = data.split(",")[1];
                responsiveVoice.speak("Not ready. Wheel count at " + wheelCountActual, "UK English Female");*/
            } else {
                responsiveVoice.speak(data, "UK English Female");
            }

        }).fail(function() {
            error();

        });
    }

    function error() {
        $("#outcome").html("Critical error.");
        clearInterval(timerID);
        responsiveVoice.speak("Critical error.", "UK English Female");
    }

});