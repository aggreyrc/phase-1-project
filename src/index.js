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
        renderBooks(data.results);
    })
    .catch(function(error){
        alert("Books Unavailable");
        console.log(error);
    });

    function renderBooks(books){
        const myBooks = document.getElementById("books")
        books.slice(0, 12).forEach(book => {
            const booksContainer = document.createElement("div");
            booksContainer.classList.add("book");
            booksContainer.innerHTML = `
            <img src="${book.formats["image/jpeg"]}" alt="${book.title}">
            <h2>${book.title}</h2>
            <p>Download: <a href="${book.formats["application/x-mobipocket-ebook"]}">Download</a></p>`;
            myBooks.appendChild(booksContainer);
        });
    }


    //Searching by author and title

    const form = document.querySelector(".submit");
    const searchBar = document.querySelector(".search-bar");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const searchQuery = searchBar.value.trim().toLowerCase();
        if (searchQuery) {
            fetch(`https://gutendex.com/books?search=${searchQuery}`)
                .then((response) => response.json())
                .then((data) => {
                    renderAuthors(data.results, searchQuery);
                    searchBar.value = "";
                })
                .catch((error) => {
                    alert("Books Unavailable");
                    console.log(error);
                });
        }
    });

    function renderAuthors(books, searchQuery) {
        const myBook = document.getElementById("books");
        myBook.innerHTML = "";
        if (books.length === 0) {
            const noResults = document.createElement("p");
            noResults.textContent = "No books found matching your search query.";
            myBook.appendChild(noResults);
        } else {
            books.forEach((book) => {
                const authorNames = book.authors.map((author) => author.name.toLowerCase());
                const title = book.title.toLowerCase();
                if (authorNames.includes(searchQuery) || title.includes(searchQuery)) {
                    const bookContainer = document.createElement("div");
                    bookContainer.classList.add("book");
                    bookContainer.innerHTML = `
                        <img src="${book.formats["image/jpeg"] || 'default-image.jpg'}" alt="${book.title}">
                        <h2>${book.title}</h2>
                        <p>Author: ${authorNames.join(', ')}</p>
                        <p>Download: <a href="${book.formats["application/x-mobipocket-ebook"] || '#'}">Download</a></p>`;
                    myBook.appendChild(bookContainer);
                }
            });
        }    
    }


    // Adding Event Listeners to The Categories

    const subjectContainer = document.querySelector(".categories")
    function renderSubjects(){
        fetch("https://gutendex.com/books/")
        .then(response => response.json())
        .then(function(data) {
            const books = data.results;
            books.forEach(book => {
                const listElement = document.createElement("li")
                listElement.addEventListener("mouseover", () => {
                    listElement.style.backgroundColor = "#108bb1";
                });
                listElement.addEventListener("mouseout", () => {
                    listElement.style.backgroundColor = "";
                });
                listElement.textContent = book.subjects[0]
                subjectContainer.appendChild(listElement)

                listElement.addEventListener("click",() => {
                    const subject = listElement.textContent.trim();
                    fetch(`https://gutendex.com/books/?subjects=${subject}`)
                    .then(response => response.json())
                    .then(data => {
                            renderSubject(data.results, subject);
                        })
                    .catch(error => {
                            alert("Books Unavailable");
                            console.log(error);
                    });
                });
           })
            
        })
    }
    renderSubjects()
   
        function renderSubject(books, subject){
            const mySubjects = document.getElementById("books");
            mySubjects.innerHTML = "";
            books.forEach(book =>{
                const listElement = document.getElementsByTagName("li");
                if(book.subjects[0] === subject){
                    const subjectContainer = document.createElement("div");
                    subjectContainer.classList.add("book");
                    subjectContainer.innerHTML = `
                        <img src="${book.formats["image/jpeg"]}" alt="${book.title}">
                        <h2>${book.title}</h2>
                        <p>Download: <a href="${book.formats["application/x-mobipocket-ebook"]}">Download</a></p>`;
                        mySubjects.appendChild(subjectContainer);
                }
            });
        
        }
});