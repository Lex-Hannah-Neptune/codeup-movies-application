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
            // let htmlStr = "";
            // for (let movie of movies) {
            //     htmlStr += `<h2>${movie.title}</h2><p>by: ${movie.author.firstName} ${movie.author.lastName}</p>`;
            // }
            // $('#container').html(htmlStr);
        });
}

getMovies();