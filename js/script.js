"use strict"

// let getOptions = {
//     method: 'GET',
//     headers: {
//         'Content-Type': 'application/json',
//     }
// };

// loading message for fun
$('#container').html("Loading...");
let url = 'https://pointed-ripple-stork.glitch.me/movies';

// POPULATES MOVIE CARDS
const getMovies = () => {
    // movies in an arbitrary name, stand in for 'data'
    $.ajax('https://pointed-ripple-stork.glitch.me/movies').done((movies) => {
    //    this timeout was set so that the "loading" message could show.... just for fun
    setTimeout(function () {
       let htmlStr = "";
        for (let movie of movies) {
            htmlStr += `
                 <div id=${movie.id.toString()} class="card m-1 mb-5" style="width: 18rem;">
                      <img src=${movie.poster} class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 contenteditable="false" id="title-${movie.id}" class="card-title">${movie.title.toUpperCase()}</h5>
                        <p contenteditable="false" id="plot-${movie.id}" class="card-text plot">${movie.plot}</p>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li contenteditable="false" id="director-${movie.id}" class="list-group-item director">${"Directed By: " + movie.director}</li>
                        <li contenteditable="false" id="genre-${movie.id}" class="list-group-item genre">${movie.genre}</li>
                      </ul>
                      <div contenteditable="false" id="rating-${movie.id} class="rating">
                            <i class="fas fa-star ml-3"></i>                           
                            <i class="fas fa-star"></i>                           
                            <i class="fas fa-star"></i>                         
                            <i class="fas fa-star"></i>                           
                            <i class="fas fa-star"></i>                           
                      </div>
                      <div class="card-body d-flex">
                        <i class="fas fa-edit editButton" id="editButton-${movie.id}"></i>
                        <button type="button" class="ml-auto delete">Delete</button>
                        <button type="button" class="ml-auto patch hide saveChanges">Save</button>
                      </div>
                </div>`;
            }

            // putting all the data into the #container div on html page
            $('#container').html(htmlStr);

            // DELETE FUNCTION
            $('.delete').click(function() {
                let parentID =  $(this).parent().parent().attr('id');
                let deleteOptions = {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                };
                fetch(`${url}/${parentID}`, deleteOptions)
                    .then(getMovies);
            });

            // PATCH FUNCTION
            $('i.editButton').click(function (){
                let parentID =  $(this).parent().parent().attr('id');
                let parent = $(this).parent().parent();
                let title = $(this).parent().parent().find('.card-title').attr('contenteditable', 'true');
                const plot = $(this).parent().parent().find('.plot').attr('contenteditable', 'true');
                const director = $(this).parent().parent().find('.director').attr('contenteditable', 'true');
                const genre = $(this).parent().parent().find('.genre').attr('contenteditable', 'true');
                const rating = $(this).parent().parent().find('.rating').attr('contenteditable', 'true');

                $(this).next().toggleClass('hide')
                $(this).next().next().toggleClass('hide')
                $(this).parent().parent().toggleClass('highlight')
                $(this).parent().prev().children().toggleClass('highlight')

                // EDIT FUNCTION
                $('.saveChanges').click(function () {
                    let parentID =  $(this).parent().parent().attr('id');
                    let editThis = {
                        "poster": $(this).parent().parent().children('img').attr('src'),
                        "title": title.text(),
                        "plot": plot.text(),
                        "director": director.text(),
                        "genre": genre.text(),
                        "rating": rating.text(),
                    };
                    let patchOptions = {
                        method: 'PATCH',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(editThis),
                    }
                    fetch(`${url}/${parentID}`, patchOptions)
                        .then(getMovies);
                });
            });
    }, 1000);
    });
}
getMovies();

// TODO poster api
var getPoster = function() {
    var film = $('#title').value();
    $.getJSON("https://api.themoviedb.org/3/search/movie?api_key=15d2ea6d0dc1d476efbca3eba2b9bbfb&query=" + film + "&callback=?", function (json) {
    });
    return false;
}

// FORM TO ADD NEW ITEMS
$('#submit').click(() => {
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
    fetch('https://pointed-ripple-stork.glitch.me/movies', postOptions)
        .then(getMovies);
    getPoster();
});

// TOGGLES VIEW OF ADD MOVIES FORM, is this still needed now that it's a modal?
// $("#button").click(() => {
//     $('#form').toggleClass('hide')
//     $('#addMovie').toggleClass('visibility', 'hidden' )
// });
//
// $("#addMovie").click(() => {
//     $('#form').toggleClass('hide')
//     $('#addMovie').toggleClass('visibility', 'hidden' )
// });
//
// $("#button").click(() => {
//     $('#form').toggleClass('hide')
//     $('#addMovie').toggleClass('visibility', 'hidden' )
// });

// this is a work in progress
$(".fa-star").click(() => {
    $('.fa-star').toggleClass('yellow')
});
