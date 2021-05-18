"use strict"

let getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};
const getBooks = () => {
    fetch("https://pointed-ripple-stork.glitch.me/books", getOptions)
        .then(resp => resp.json())
        .then(books => {
            console.log(books);
            let htmlStr = "";
            for (let book of books) {
                htmlStr += `<h2>${book.title}</h2><p>by: ${book.author.firstName} ${book.author.lastName}</p>`;
            }
            $('#container').html(htmlStr);
        });
}