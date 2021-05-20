"use strict"

    $('#container').html("Loading...");

let getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};

$('#container').html("Loading...");

const getMovies = () => {
    $.ajax('https://pointed-ripple-stork.glitch.me/movies').done((movies) => {
        console.log(movies);
    setTimeout(function (){
       let htmlStr = "";
        for (let movie of movies){
            htmlStr += `
                 <div id=${movie.id.toString()} class="card m-1" style="width: 18rem;">
                      <img src=${movie.poster} class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 contenteditable="false" id="title-${movie.id}" class="card-title">${movie.title.toUpperCase()}</h5>
                        <p contenteditable="false" id="plot-${movie.id}" class="card-text">${movie.plot}.</p>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li contenteditable="false" id="director-${movie.id}" class="list-group-item director">Directed by: ${movie.director}</li>
                        <li contenteditable="false" id="genre-${movie.id}" class="list-group-item genre">${movie.genre}</li>
                        <li contenteditable="false" id="rating-${movie.id}" class="list-group-item rating">${movie.rating}</li>
                      </ul>
                      <div class="card-body d-flex">
                        <i class="fas fa-edit editButton" id="editButton-${movie.id}"></i>
                        <button type="button" class="ml-auto delete">Delete</button>
                      </div>
                </div>`;

            }
            $('#container').html(htmlStr);


            // DELETE
            $('button.delete').click(function() {
                let parentID =  $(this).parent().parent().attr('id');


                let deleteOptions = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };
                fetch(`https://pointed-ripple-stork.glitch.me/movies/${parentID}`, deleteOptions)
                    .then(getMovies);
            });
            // PATCH

            $('i.editButton').click(function (){
                let parentID =  $(this).parent().parent().attr('id');
                let parent = $(this).parent().parent();

                let title = $(this).parent().parent().children().next().children('.card-title').attr('contenteditable', 'true');
                let plot = $(this).parent().parent().children().next().children().next().attr('contenteditable', 'true');
                let director = $(this).parent().parent().children().next().next().children('.director').attr('contenteditable', 'true');
                let genre = $(this).parent().parent().children().next().next().children('.genre').attr('contenteditable', 'true');
                let rating = $(this).parent().parent().children().next().next().children('.rating').attr('contenteditable', 'true');
                $(this).next().attr('class', 'ml-auto saveChanges');
                $(this).next().html('Save Changes');

                console.log(genre);
                console.log(rating);



                console.log(parentID)


            //// fetch("https://pointed-ripple-stork.glitch.me/books/7", patchOptions)
        //             //     .then(getMovies);
            });

        // FORM TO PATCH 2.0


        // $('i.editButton').click(function () {

        // });



        let editThis = {
                "title": "Percy Jackson & The Titan's Curse",
            };

            let patchOptions = {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(editThis),
            }



    }, 1000);
    });
}
getMovies();


// FORM TO ADD NEW ITEMS
$('#button').click(() => {
    var newTitle = $('#title').val();
    var newRating = $('#rating').val();
    var newPlot = $('#plot').val();
    var newDirector = $('#director').val();
    var newGenre = $('#genre').val();
    let newMovie = {
        "title": `${newTitle}`,
        "rating": `${newRating}`,
        "plot": `${newPlot}`,
        "director": `${newDirector}`,
        "genre": `${newGenre}`,
    };
    let postOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newMovie),
    }
    fetch("https://pointed-ripple-stork.glitch.me/movies", postOptions)
        .then(getMovies);
});

function myFunction() {
    var x = document.getElementById("container");
    if (x.style.display === "none") {
        x.style.display = "block";
    } else {
        x.style.display = "none";
    }
}