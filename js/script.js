"use strict"

let getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};

// LOADING MESSAGE
$('#container').html("Loading...");

// POPULATES MOVIE CARDS
const getMovies = () => {
    $.ajax('https://pointed-ripple-stork.glitch.me/movies').done((movies) => {
        console.log(movies);
    setTimeout(function (){
       let htmlStr = "";
        for (let movie of movies) {
            htmlStr += `
                 <div id=${movie.id.toString()} class="card m-1" style="width: 18rem;">
                      <img src=${movie.poster} class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 contenteditable="false" id="title-${movie.id}" class="card-title">${movie.title.toUpperCase()}</h5>
                        <p contenteditable="false" id="plot-${movie.id}" class="card-text plot">${movie.plot}.</p>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li contenteditable="false" id="director-${movie.id}" class="list-group-item director">${movie.director}</li>
                        <li contenteditable="false" id="genre-${movie.id}" class="list-group-item genre">${movie.genre}</li>
                        <li contenteditable="false" id="rating-${movie.id}" class="list-group-item rating">${movie.rating}</li>
                      </ul>
                    
                      <div class="card-body d-flex">
                        <i class="fas fa-edit editButton" id="editButton-${movie.id}"></i>
                        <button type="button" class="ml-auto delete">Delete</button>
                        <button type="button" class="ml-auto patch hide saveChanges">Submit</button>
                      </div>
                </div>`;
            }
            $('#container').html(htmlStr);

            // DELETE FUNCTION
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

            // PATCH FUNCTION
            $('i.editButton').click(function (){
                let parentID =  $(this).parent().parent().attr('id');
                let parent = $(this).parent().parent();

                let title = $(this).parent().parent().children().next().children('.card-title').attr('contenteditable', 'true');
                let plot = $(this).parent().parent().children().next().children().next('.plot').attr('contenteditable', 'true');
                let director = "Directed by: " + $(this).parent().parent().children().next().next().children('.director').attr('contenteditable', 'true');
                let genre = $(this).parent().parent().children().next().next().children('.genre').attr('contenteditable', 'true');
                var rating = $(this).parent().parent().children().next().next().children('.rating').attr('contenteditable', 'true');
                // $(this).next().attr('class', 'ml-auto saveChanges');
                // $(this).next().html('Save');

                console.log(genre);
                console.log(rating);
                console.log(parentID)

                $(this).next().toggleClass('hide')
                $(this).next().next().toggleClass('hide')
                // $('.delete').toggleClass('hide')

                // EDIT FUNCTION
                $('button.saveChanges').click(function () {
                    console.log($(this).text());
                    let parentID =  $(this).parent().parent().attr('id');
                    let editThis = {
                        "poster": $(this).parent().parent().children().next().children('.card-title').text(),
                        "title": $(this).parent().parent().children().next().children('.card-title').text(),
                        "plot": $(this).parent().parent().children().next().children().next('.plot').text(),
                        "director":"Directed by: " + $(this).parent().parent().children().next().next().children('.director').text(),
                        "genre": $(this).parent().parent().children().next().next().children('.genre').text(),
                        "rating": $(this).parent().parent().children().next().next().children('.rating').text(),
                    };
                    let patchOptions = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(editThis),
                    }
                    fetch(`https://pointed-ripple-stork.glitch.me/movies/${parentID}`, patchOptions)
                        .then(getMovies);
                });
            });
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

// TOGGLES VIEW OF ADD MOVIES
$("#addMovie").click(() => {
    $('#form').toggleClass('hide')
    $('#addMovie').toggleClass('visibility', 'hidden' )
});

$("#button").click(() => {
    $('#form').toggleClass('hide')
    $('#addMovie').toggleClass('visibility', 'hidden' )
});