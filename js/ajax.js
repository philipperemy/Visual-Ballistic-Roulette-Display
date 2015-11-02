$( document ).ready(function() {
  setInterval(function(){
		$("#outcome").load('http://localhost:8080/RouletteServer/Response')
	}, 2000);
});

