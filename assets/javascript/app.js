"use strict";

$(document).ready(function () {
    console.log("ready!");

    var animate =0;

    var animal_list = ["dog", "cat", "pig", "lion", "tiger", "bear"];

    function renderButton () {
        $(".animalButton").empty();

        for (var i=0; i< animal_list.length; i++) {

            var a = $("<button>");
            a.addClass("animal_button");
            a.attr("data-animal", animal_list[i]);
            a.text(animal_list[i]);
            $(".animalButton").append(a);

        }
    }

    renderButton();

    $(document).on("click", "button", function () {


        var animal = $(this).attr("data-animal");

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";

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

                        var animalImage = $("<img class='animalImg'>");

                        animalImage.attr("src", results[i].images.original_still.url).val(i);//makes the image still
                        //animalImage.attr("src", results[i].images.fixed_height);//sets the fixed image height//added more than one attr is over riding the attr before it
                        //animalImage.attr("src", results[i].images.original.url);//makes the image still

                            gifDiv.append(animalImage);
                            gifDiv.append(p);

                            $("#gifs-images-here").prepend(gifDiv);

                    }//if statement ends
                }//for loop ends

                $(".animalImg").on("click", function() { //make sure you check that it is pulling the img NOT the DIV
                console.log("click");

                    if (animate === 0) {
                        var imageValue = this.value;
                        console.log(this.value);
                        $(this).attr("src", results[imageValue].images.original.url);
                        animate++;
                        console.log(animate)
                    }
                    else {
                        var imageValue = this.value;
                        $(this).attr("src", results[imageValue].images.original_still.url);
                        animate--;
                        console.log(animate)
                    }

                });

                $("#add-animal").on("click", function(event) {
                    event.preventDefault();
                    var theAnimalList = $("#animal-input").val().trim();
                    animal_list.push(theAnimalList);
                    $(".animalButton").empty();
                    renderButton();
                });

            });//done function end
    });//click on doc button end
});//document ready end

/*
buttons
button array
display 10 images on button click
images still until clicked images move
clicked again images become still
added to the array - create a button and gif will display 10 pictures like the others*/
