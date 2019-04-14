$(document).ready(function() {

  var animals = ["dog",
                    "fish",
                        "cat",
                            "lion",
                                "rabbit","hamster",
                    "skunk",
                        "goldfish",
                                "bird",                            
                                     "ferret",
                                            "turtle",
   
  ];

  $(document).on("click", ".animal-button", function() {
    $("#animals").empty();
    $(".animal-button").removeClass("active");
    $(this).addClass("active");

    var animal = $(this).attr("data-animal");
    var queryURL="http://api.giphy.com/v1/gifs/search?q="+ animal +"&api_key=p0bgXHQsYz72GIfOmOF5FeOeSf6WjGkK&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    })
      .then(function(response) {
        var results = response.data;
            for (var i = 0; i < results.length; i++) {
          var animalDiv = $("<div class= 'animalDiv float-left'>");
          var rating = results[i].rating;
          var p = $("<p>").text("Rating: " + rating);
          var animated = results[i].images.fixed_height.url;
          var still = results[i].images.fixed_height_still.url;
          
           var animalImage = $("<img>");
          animalImage.attr("src", still);
          animalImage.attr("data-still", still);
          animalImage.attr("data-animate", animated);
          animalImage.attr("data-state", "still");
          animalImage.addClass("animal-image");

          animalDiv.append(p);
          animalDiv.append(animalImage);

          $("#animals").append(animalDiv);
        } 
      });
  });
   // function to make buttons and add to page
  function Buttons(animal, animalclass, animals) {
    $(animals).empty();

    for (var i = 0; i < animal.length; i++) {
      var a = $("<button>");
      a.addClass(animalclass+ " btn btn-primary");
      a.attr("data-animal", animal[i]);
      a.text(animal[i]);
      $(animals).append(a);
    }
}
$("#add-animal").on("click", function(event) {
  event.preventDefault();
  var newAnimal = $("input").eq(0).val();
    if (newAnimal.length > 2) {
    animals.push(newAnimal);
  }
Buttons(animals, "animal-button", "#animal-buttons");
});
Buttons(animals, "animal-button", "#animal-buttons");

$(document).on("click", ".animal-image", function() {
    var state = $(this).attr("data-state");
      if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    }else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
});

