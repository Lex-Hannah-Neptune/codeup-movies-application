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
                     <div class="card m-1" style="width: 18rem;">
                      <img src=${movie.poster} class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${movie.title.toUpperCase()}</h5>
                        <p class="card-text">${movie.plot}.</p>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Directed by: ${movie.director}</li>
                        <li class="list-group-item">${movie.genre}</li>
                        <li class="list-group-item">${movie.rating}</li>
                      </ul>
                      <div class="card-body d-flex">
                        <a href="#" class="card-link">link</a>
                        <a href="#" class="card-link">link</a>
                        <button type="button" class="ml-auto delete">Delete</button>
                      </div>
                    </div>`
                }
                $('#container').html(htmlStr);
                $('.delete').click(() => {
                    var getParent = $(this).html;
                    var test = 'test'
                    console.log(getParent);
                    console.log(test);
        }) ;
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
    console.log(newTitle);
    console.log(newMovie.title);
    fetch("https://pointed-ripple-stork.glitch.me/movies", postOptions)
        .then(getMovies);

});

// DELETE MOVIES FUNCTION
// $('.button').click(() => {
//     var getParent = $(this).parent().parent();
//     var test = 'test'
//     console.log(getParent);
//     console.log(test);
// }) ;

let deleteOptions = {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    }
};

$('.delete').click(() => {
    let inputVal = $('#id-to-delete').val();
    console.log(inputVal);
    fetch(`https://pointed-ripple-stork.glitch.me/movies/14`, deleteOptions)
        .then(getMovies);
});

// $('#uniqueBooks').click(() => {
//     let inputVal = $('#id-to-delete').val();
//     console.log(inputVal);
//     fetch(`https://pointed-ripple-stork.glitch.me/books/${inputVal}`, deleteOptions)
//         .then(getBooks);
// })

