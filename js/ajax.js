$( document ).ready(function() {
  setInterval(function(){
		$("#outcome").load('http://localhost:8080/RouletteServer/Response');
		var htmlVal = $("#outcome").html();
		console.log(htmlVal);
		//responsiveVoice.speak("32", "French Female");
		responsiveVoice.speak(htmlVal, "French Female");
	}, 5000);
});

