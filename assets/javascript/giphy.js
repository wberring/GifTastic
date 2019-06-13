// Establishing array of names of initial buttons

var shows = ["Samurai Jack", "Animaniacs", "Kim Possible", "Bugs Bunny", "Bob's Burgers",
"Bojack Horseman", "Rick and Morty", "My Little Pony", "Steven Universe", "Regular Show",
"Power Puff Girls", "We Bare Bears", "Gravity Fails", "The Jetsons", "The Amazing World of Gumball",
"Garfield"];

// limiting the number of GIFs to fetch/display and limiting the content rating
var numberOfGIFs = 10;
var cutOffRating = "R";

// based on size of inital button array, FOR LOOP to render buttons

function renderButtons(){
	for(var i = 0; i < shows.length; i++) {
		var newButton = $("<button>");
		newButton.addClass("btn");
		newButton.addClass("cartoon-button");
		newButton.text(shows[i]);
		$("#button-container").append(newButton);
	}
	$(".cartoon-button").unbind("click");

	$(".cartoon-button").on("click", function(){
		$(".gif-image").unbind("click");
		$("#gif-container").empty();
		$("#gif-container").removeClass("solid-border");
		populateGIFContainer($(this).text());
	});

}

// add new button function based upon user input from "on.click" function

function addButton(show){
	if(shows.indexOf(show) === -1) {
		shows.push(show);
		$("#button-container").empty();
		renderButtons();
	}
}

// Sets up AJAX logic and API authentication, limits, etc. to fetch and display GIFs from giphy.com

function populateGIFContainer(show){
	$.ajax({
		url: "https://api.giphy.com/v1/gifs/search?q=" + show + 
		"&api_key=cOfFFbAd5NQXgFxXpE3DSjo7nVeqxFbz&rating=" + cutOffRating + "&limit=" + numberOfGIFs,
		method: "GET"
	}).then(function(response){
		response.data.forEach(function(element){
			newDiv = $("<div>");
			newDiv.addClass("individual-gif-container");
			var newImage = $("<img src = '" + element.images.fixed_height_still.url + "'>");
			newImage.addClass("gif-image");
			newImage.attr("state", "still");
			newImage.attr("still-data", element.images.fixed_height_still.url);
			newImage.attr("animated-data", element.images.fixed_height.url);
			newDiv.append(newImage);
			newDiv.append("<p>Rating: " + element.rating.toUpperCase() + "</p>");
			$("#gif-container").append(newDiv);
		});
		
		$("#gif-container").addClass("solid-border");
        $(".gif-image").unbind("click");
        
        // change GIFs from still to animated based upon click of images, changing state
		$(".gif-image").on("click", function(){
			if($(this).attr("state") === "still") {
				$(this).attr("state", "animated");
				$(this).attr("src", $(this).attr("animated-data"));
			}
			else {
				$(this).attr("state", "still");
				$(this).attr("src", $(this).attr("still-data"));
			}
		});
	});
}

$(document).ready(function(){
	renderButtons();
	$("#submit").on("click", function(){
		event.preventDefault();
		addButton($("#cartoon-show").val().trim());
		$("#cartoon-show").val("");
	});
});

