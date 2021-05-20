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
                        <h5 id="title-${movie.id}" class="card-title">${movie.title.toUpperCase()}</h5>
                        <p id="plot-${movie.id}" class="card-text">${movie.plot}.</p>
                      </div>
                      <ul class="list-group list-group-flush">
                        <li id="director-${movie.id}" class="list-group-item">Directed by: ${movie.director}</li>
                        <li id="genre-${movie.id}" class="list-group-item">${movie.genre}</li>
                        <li id="rating-${movie.id}" class="list-group-item">${movie.rating}</li>
                      </ul>
                      <div class="card-body d-flex">
                        <i class="fas fa-edit editButton" id="editButton-${movie.id}"></i>
                        <button type="button" class="ml-auto delete">Delete</button>
                      </div>
                </div>`;

            $(".editButton").click(function () {
                var title = $(this).parent().parent().id;
                console.log(title)
//                 let htmlPatch = ''
//                 htmlPatch += `
// <!--                     <div id=${movie.id.toString()}  class="card m-1" style="width: 18rem;">-->
//                           <img src=${movie.poster} class="card-img-top" alt="...">
//                           <div class="card-body">
//                             <input class="card-title" value="${movie.title.toUpperCase()}">
//                             <input class="card-text" value="${movie.plot}.">
//                           </div>
//                           <ul class="list-group list-group-flush">
//                             <input class="list-group-item" value="Directed by: ${movie.director}">
//                             <input class="list-group-item" value="${movie.genre}">
//                             <input class="list-group-item" value="${movie.rating}">
//                           </ul>
//                           <div class="card-body d-flex">
// <!--                            <i class="fas fa-edit" id="editButton-${movie.id}"></i>-->
//                             <button type="button" class="ml-auto patch">Submit</button>
//                           </div>
// <!--                    </div>-->`;
//                 // $('#patch').html(htmlPatch);
                console.log(htmlPatch);
                $('body').css('background', 'blue')

            })

            // $(document).on(“click”, “.editButton”, function (e) {
            //     let editID = $(this).data(“id”);
            // }
            let movieID = movie.id
            // $(".editButton").click(function (){
            //     let editID = $(this).attr("id")
            // // //
            // //     let parentID =  $(this).parent().parent().attr('id');
            // //     let turnForm = $(this).parent().parent();
            // //     turnForm.html(patching)
            // // // console.log(parentID);
            // // //
            // // //     // emptyThis.empty();
            // // //
            // // //     //// fetch("https://pointed-ripple-stork.glitch.me/books/7", patchOptions)
            // // //     //             //     .then(getMovies);
            // //     patching()
            //     console.log(editID);
            //     $('body').css('background', 'blue')
            // })

            }
            $('#container').html(htmlStr);

            // $(".editButton").click(function (){
            //     let editID = $(this).attr("id")
            //     // //
            //     //     let parentID =  $(this).parent().parent().attr('id');
            //     //     let turnForm = $(this).parent().parent();
            //     //     turnForm.html(patching)
            //     // // console.log(parentID);
            //     // //
            //     // //     // emptyThis.empty();
            //     // //
            //     // //     //// fetch("https://pointed-ripple-stork.glitch.me/books/7", patchOptions)
            //     // //     //             //     .then(getMovies);
            //     //     patching()
            //     console.log(editID);
            // })

            $('button.delete').click(function() {
                let parentID =  $(this).parent().parent().attr('id');
                console.log(parentID);

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

        //     $('i.editButton').click(function (){
        //
        //
        //         let parentID =  $(this).parent().parent().attr('id');
        //         let turnForm = $(this).parent().parent();
        //         turnForm.html()
        //
        //         // emptyThis.empty();
        //
        //     //// fetch("https://pointed-ripple-stork.glitch.me/books/7", patchOptions)
        // //             //     .then(getMovies);
        //     });

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