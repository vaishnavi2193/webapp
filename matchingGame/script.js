//Sources
//Kantor, I. (2019). Shuffle an array. Retrieved from https://javascript.info/task/shuffle
//Roy. (March 23, 2011). How can I refresh a page with jQuery? https://stackoverflow.com/questions/5404839/how-can-i-refresh-a-page-with-jquery

$(document).ready(function(){
	var folder = "images/";
	var response = "";
	
	//ajax to retrieve response content from url link
	$.ajax({
		type: "GET",
		url:"http://localhost:8080/game/mGame",
		success: function(data){
			response = data.split(",");

		/*var images = ["gear", "house", "inward", "maze", "puzzle", "search", "star", "tree", "xstar",
			"zap"];
		var ext = ".png";
		*/		
		//variables to store images in arrays
		var gamesel = [];
		var gamesel2 = [];

//		shuffle(images);

		//get response data from link and remove new line bad character
		for(var i=0; i < response.length; i++){
			if(response[i] == "\n"){
				response.splice(i, 1);
			}
		}
		
		//populate array variables
		for(var i = 0; i < response.length - 2; i++){
			gamesel[i] = response[i];
			gamesel2[i] = response[i];
		}
		
		//append table into html body
		$("div").append("<table>");
		$("table").append("<tr>");
		
		var count = 1;
		var pos = 0;
		//shuffle second array to mix up patterns of images on matching game
		shuffle(gamesel2);
		for(var i=0; i < gamesel.length; i++){
			//append images on html page
			$("table").append("<td><img src=\"" + folder + gamesel[i] + "\" onclick=\"match(\'"+gamesel[i]+"\', "+ pos +")\"></td>");
			if(count == 4){ //after 4th column, append a new row
				$("table").append("<tr>");
				count = 0;
			}

			count++;
			pos++;
			
			$("table").append("<td><img src=\"" + folder + gamesel2[i] + "\" onclick=\"match(\'"+gamesel2[i]+"\', "+ pos +")\"></td>");	

			if(count == 4){ //after 4th column, append a new row
				$("table").append("<tr>");
				count = 0;
			}

			count++;
			pos++;
		}

		$("img").attr("height", "100px");
		$("img").attr("width", "100px");	

//-----------------//

		},
		error: function(errorMsg){
			console.log("error " + errorMsg);

		}
	});

	

});

//function to change/shuffle array values positions
function shuffle(array) {
	array.sort(() => Math.random() - 0.5);
}

//global variables
var match1 = "";
var match2 = "";
var count1 = 0;
var count2 = 0;
var clickCount = 0;

//populate global variables with values received from images when clicked
function match(name, pos) {
	//---Track tiles clicked, and show result to user---//
	clickCount++;
	if(clickCount > 2){
		clickCount = 1;
	}
	if(clickCount <= 2){
		$("#clicks").html("Tiles Count: " + clickCount);
	}
	//------//
	if(match1 != ""){
		if(match2 == ""){
			match2 = name;
			count2 = pos;
		}
	}else if(match1 == ""){
		match1 = name;
		count1 = pos;
	}
	
	if(match1 != "" && match2 != ""){
		compare(match1, count1, match2, count2); //send values to compare() method
	}
}

function compare(m1, c1, m2, c2){
	//variables to identify images and table data clicked.
	var $img1 = $("img:eq("+c1+")");
	var $img2 = $("img:eq("+c2+")");
	var $td1 = $("td:eq("+c1+")");
	var $td2 = $("td:eq("+c2+")");
		
	//if successful matches, alter css content of the images and td values to represent a successful match
	if(m1 == m2 && c1 != c2){
		$td1.css("background-color", "white");
		$td2.css("background-color", "white");
		$img1.css("opacity", 0);
		$img2.css("opacity", 0);
		match1 = "";
		match2 = "";
		count1 = 0;
		count2 = 0;

	}else {//else just reset globabl variables and perform no change
		console.log("no match");
		match1 = "";
		match2 = "";
		count1 = 0;
		count2 = 0;

	}
	var $alltd = $("td");
	var $tdlength = $("td").length;
	var verify = 0;
	for(var i=0; i < $tdlength; i++){ //for loop to verify that all td values background has been changed to white. This is done by incrementing verify.
		if($("td:eq("+i+")").css("background-color") == "rgb(255, 255, 255)"){
			verify++;
			continue;
		}
	}
	console.log(verify);
	if(verify == $tdlength){//if verify equals the length of all td on the page holding images, set disabled properity for play again button to false.
		$("#play").attr("disabled", false);
	}

}

function playAgain(){//function for play again button. This method will refresh the page.
		location.reload();
		$("#play").attr("disabled", true);
}
