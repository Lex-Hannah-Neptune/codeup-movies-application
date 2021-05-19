"use strict"

let getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};
const getMovies = () => {
    fetch("https://pointed-ripple-stork.glitch.me/movies", getOptions)
        .then(resp => resp.json())
        .then(movies => {
            console.log(movies);
            let htmlStr = "";
            for (let movie of movies) {
                htmlStr += `
                    <div class="card m-1" style="width: 18rem;">
                      <img src=${movie.poster} class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${movie.title}</h5>
                        <p class="card-text">${movie.plot}.</p>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li class="list-group-item">Directed by: ${movie.director}</li>
                        <li class="list-group-item">--</li>
                        <li class="list-group-item">--</li>
                      </ul>
                      <div class="card-body">
                        <a href="#" class="card-link">link</a>
                        <a href="#" class="card-link">link</a>
                      </div>
                    </div>`
                    
                    // <div class="bg-warning">
                    //     <h2>${movie.title}</h2>
                    //     <p>by: ${movie.director} ${movie.plot}</p>
                    // </div> ;
            }
            $('#container').html(htmlStr);
        });
}

getMovies();