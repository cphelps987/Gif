"use strict";

$(document).ready(function () {

    console.log("ready!");

    $(document).on("click", "button", function () {


        var animal = $(this).attr("data-animal");

        var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })

            .done(function (response) {

                var results = response.data;

                for (var i = 0; i < results.length; i++) {

                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                        var gifDiv = $("<div class='animalDiv'>");

                        var rating = results[i].rating;

                        var p = $("<p>").text("Rating: " + rating);

                        var animalImage = $("<img>");

                        animalImage.attr("src", results[i].images.original_still.url, "still");//makes the image still
                        //animalImage.attr("src", results[i].images.fixed_height);//sets the fixed image height//added more than one attr is over riding the attr before it
                        //animalImage.attr("src", results[i].images.original.url);//makes the image still

                            gifDiv.append(animalImage);
                            gifDiv.append(p);

                            $("#gifs-images-here").prepend(gifDiv);

                    }
                }

                $(".animalDiv").on("click", function() {
                console.log("click");

                    var state = $(this).attr("still");

                    if (state === "still") {
                        $(this).attr("src", $(this).removeAttr());
                        $(this).attr("animate");
                    }
                    else {
                        $(this).attr("src", $(this).attr("data-still"));
                        $(this).attr("still");
                    }

                });
            });
    });
});

/*
buttons
button array
display 10 images on button click
images still until clicked images move
clicked again images become still
added to the array - create a button and gif will display 10 pictures like the others*/
