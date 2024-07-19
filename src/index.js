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
            <p>Download: <a href="${book.formats["application/x-mobipocket-ebook"]}" target="_blank">Download</a></p>`;
            myBooks.appendChild(booksContainer);
        });
    }

    //Adding Event Listener for search functionality

    let searchBar = document.querySelector(".search-bar");
    let searchForm = document.querySelector(".submit")
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
            bookContainer.innerHTML = `
            <img src="${book.formats["image/jpeg"]}" alt="${book.title}">
            <h2>${book.title}</h2>
            <p>Download: <a href="${book.formats["application/x-mobipocket-ebook"]}" target="_blank">Download</a></p>`;
            myBook.appendChild(bookContainer);
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
                            console.log(data)
                            renderSubject(data.results);
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
   
        function renderSubject(books){
            const mySubjects = document.getElementById("books");
            mySubjects.innerHTML = "";
            books.slice(0, 8).forEach(book =>{
                const listElement = document.getElementsByTagName("li");
                if(book.subjects[0] === listElement.textContent){
                    const subjectContainer = document.createElement("div");
                    subjectContainer.classList.add("book");
                    subjectContainer.innerHTML = `
                        <img src="${book.formats["image/jpeg"]}" alt="${book.title}">
                        <h2>${book.title}</h2>
                        <p>Download: <a href="${book.formats["application/x-mobipocket-ebook"]}" target="_blank">Download</a></p>`;
                        mySubjects.appendChild(subjectContainer);
                }
            });
        
        }
});