"use strict"

// LOADING MESSAGE FOR FUN
$('#container').html("Loading...");
let url = 'https://pointed-ripple-stork.glitch.me/movies';

// POPULATES MOVIE CARDS
const getMovies = () => {
    $.ajax('https://pointed-ripple-stork.glitch.me/movies').done((movies) => {
        let htmlStr = "";
        for (let movie of movies) {
            htmlStr += `
                 <div id=${movie.id.toString()} class="card m-1 mb-5 p-0" style="width: 18rem;">
                      <img src=${movie.poster} class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 id="title-${movie.id}" class="title text-uppercase">${movie.title}</h5>
                        <p id="plot-${movie.id}" class="plot">${movie.plot}</p>
                        <p id="director-${movie.id}" class="director">${movie.director}</p>
                        <p id="genre-${movie.id}" class="genre">${movie.genre}</p>
                      </div>
                      <div id="rating-${movie.id}" class="rating ms-3">
<!--                      work in progress for star rating functionality-->
<!--                        <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>-->
<!--                            <i class="fas fa-star star" data-value="1"></i>                           -->
<!--                            <i class="fas fa-star star" data-value="2"></i>                           -->
<!--                            <i class="fas fa-star star" data-value="3"></i>                         -->
<!--                            <i class="fas fa-star star" data-value="4"></i>                           -->
<!--                            <i class="fas fa-star star" data-value="5"></i>                           -->
                      </div>
                      <div class="card-body d-flex">
                        <i class="fas fa-edit editButton me-auto text-center mt-2" id="editButton-${movie.id}"></i>
                        <button type="button" class="delete me-3">Delete</button>
                        <button type="button" class="patch hide saveChanges me-3">Save</button>
                      </div>
                </div>`;
        }

        // PUTTING ALL JSON DATA ONTO PAGE
        $('#container').html(htmlStr);

        // DELETE FUNCTION
        $('.delete').click(function () {
            let parentID = $(this).parent().parent().attr('id');
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
        $('i.editButton').click(function () {
            let editItem = $(this).parent().parent();
            let parentID = editItem.attr('id');
            var title = editItem.find('.title').attr('contenteditable', 'true');
            let plot = editItem.find('.plot').attr('contenteditable', 'true');
            let director = editItem.find('.director').attr('contenteditable', 'true');
            let genre = editItem.find('.genre').attr('contenteditable', 'true');
            let rating = editItem.find('.rating');

            editItem.children().children().toggleClass('highlight')
            $(this).css('visibility', 'hidden');
            $(this).next().css('visibility', 'hidden');
            $(this).next().next().toggleClass('hide');

            // EDIT FUNCTION
            $('.saveChanges').click(function () {
                let editThis = {
                    // "poster": editItem.children('img').attr('src'),
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
    });
}
getMovies();

// FORM TO ADD NEW ITEMS
$('#submit').click(() => {
    let title = $('#title').val();
    $.get("http://www.omdbapi.com/?t=" + title + "&apikey=44f7af56").done(function (data) {
        let newPoster = data.Poster;
        let newTitle = title;
        let newRating = $('#rating').val();
        let newPlot = data.Plot;
        let newDirector = data.Director;
        let newGenre = data.Genre;
        let newMovie = {
            "title": `${newTitle}`,
            "rating": `${newRating}`,
            "plot": `${newPlot}`,
            "director": `${newDirector}`,
            "genre": `${newGenre}`,
            "poster": `${newPoster}`
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
    });
});

// todo this is a work in progress, for star rating
$(".fa-star").click(() => {
    $('.fa-star').toggleClass('yellow')
});

$('.star').hover(function() {
    $('#review-result').html($(this).attr('data-value'));
});
