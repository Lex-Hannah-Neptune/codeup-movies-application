"use strict"

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
                      <div class="card-body">
                        <a href="#" class="card-link">link</a>
                        <a href="#" class="card-link">link</a>
                      </div>
                    </div>`
                }
                $('#container').html(htmlStr);
    }, 1000);
    });
}
getMovies();

var newTitle = $('#title').value();
console.log(newTitle);
var newRating = $('#rating').value();

let newBook = {
    "title": `${newTitle}`,
    "rating": `${newRating}`,
};

let postOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(newBook),
}

$('#button').click(() => {
    fetch("https://pointed-ripple-stork.glitch.me/movies", postOptions)
        .then(getMovies);

});






// $('#button').click( function() {
//     let htmlStr = ''
//         `
//                     <div class="card m-1" style="width: 18rem;">
//                       <img src=${movie.poster} class="card-img-top" alt="...">
//                       <div class="card-body">
//                         <h5 class="card-title">${movie.title.toUpperCase()}</h5>
//                         <p class="card-text">${movie.plot}.</p>
//                       </div>
//                       <ul class="list-group list-group-flush">
//                         <li class="list-group-item">Directed by: ${movie.director}</li>
//                         <li class="list-group-item">${movie.genre}</li>
//                         <li class="list-group-item">${movie.rating}</li>
//                       </ul>
//                       <div class="card-body">
//                         <a href="#" class="card-link">link</a>
//                         <a href="#" class="card-link">link</a>
//                       </div>
//                     </div>`
//
//     $('#container').html(htmlStr)
// })