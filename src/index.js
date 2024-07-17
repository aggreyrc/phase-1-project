document.addEventListener("DOMContentLoaded", () => {

    //Fetching and Adding Books to the DOM
    fetch("https://gutendex.com/books/")
    .then(function(response) {
        if(!response.ok){
            throw new Error(`HTTP Error ${response.status}`)
        }else{
            return response.json();
        }
    })
    .then(function(data) {
        console.log(data.results);
        renderBooks(data.results);
    })
    .catch(function(error){
        alert("Books Unavailable");
        console.log(error);
    });

    function renderBooks(books){
        const myBooks = document.getElementById("books")
        books.slice(0, 8).forEach(book => {
            const booksContainer = document.createElement("div");
            booksContainer.classList.add("book");

           
            const cover = document.createElement("img");
            cover.src = book.formats["image/jpeg"];
            cover.alt = `${book.title}`;
            booksContainer.appendChild(cover);

            const h2 = document.createElement("h2");
            h2.textContent = book.title;
            booksContainer.appendChild(h2);

            const addBtn = document.createElement("button");
            addBtn.textContent = "Add to Collection";
            addBtn.className = "Add Button"
            booksContainer.appendChild(addBtn);


            myBooks.appendChild(booksContainer);
        });
    }

    //Adding Event Listener for search functionality

    const searchBar = document.querySelector(".search-bar");
    const searchForm = document.querySelector(".submit")
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const bookId = searchBar.value.trim();
        if (bookId) {
            fetch(`https://gutendex.com/books/${bookId}`)
        .then(function(response) {
            if(!response.ok){
                throw new Error(`HTTP Error ${response.status}`)
            }else{
                return response.json();
            }
        })
        .then(function(data) {
            console.log(data);
            renderBook(data);
        })
        .catch(function(error){
            alert("Books Unavailable");
            console.log(error);
        });
        }else{
            alert("Enter valid Book Id")
        }
    });

    function renderBook(book){
        const myBook = document.getElementById("books");
        myBook.innerHTML = "";
        const bookContainer = document.createElement("div");
            bookContainer.classList.add("book");

           
            const cover = document.createElement("img");
            cover.src = book.formats["image/jpeg"];
            cover.alt = `${book.title}`;
            bookContainer.appendChild(cover);

            const h2 = document.createElement("h2");
            h2.textContent = book.title;
            bookContainer.appendChild(h2);

            const addBtn = document.createElement("button");
            addBtn.textContent = "Add to Collection";
            addBtn.className = "Add Button"
            bookContainer.appendChild(addBtn);


            myBook.appendChild(bookContainer);
    }
});