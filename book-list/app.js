class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    isValid() {
        return !Book.getDisplayFieldNames().some((fieldName) => this[fieldName] == '')
    }

    static getDisplayFieldNames() {
        return ['title', 'author', 'isbn']
    }
}

class UI {
    constructor() {
        this.bookForm = document.getElementById('bookForm');
        this.titleInput = document.getElementById('title');
        this.authorInput = document.getElementById('author');
        this.isbnInput = document.getElementById('isbn');
        this.bookRows = document.getElementById('bookRows');
    }

    refreshBookList() {
        const books = Storage.getBooks();
        console.log(books);

        while (this.bookRows.firstChild) {
            this.bookRows.firstChild.remove();
        }
        books.forEach((book) => { this.displayBookRow(book) });
    }

    displayBookRow(book) {
        const row = document.createElement('tr');
        row.id = book.index;
        Book.getDisplayFieldNames().forEach((fieldName) => {
            const col = document.createElement('td');
            col.appendChild(document.createTextNode(book[fieldName]));
            row.appendChild(col);
        });

        const col = document.createElement('td');
        const deleteLink = document.createElement('a');
        row.appendChild(col);
        col.appendChild(deleteLink);
        deleteLink.appendChild(document.createTextNode('X'));
        deleteLink.classList.add('delete');
        deleteLink.style.color = 'orange';
        deleteLink.style.padding = '6px 4px';
        deleteLink.style.cursor = 'pointer';

        this.bookRows.appendChild(row);
    }

    clearInputFields() {
        this.titleInput.value = '';
        this.authorInput.value = '';
        this.isbnInput.value = '';
    }

    displayMessage(message, isError = false) {
        const messageDisplay = document.createElement('div');
        messageDisplay.appendChild(document.createTextNode(message));
        this.bookForm.insertAdjacentElement('beforebegin', messageDisplay);

        messageDisplay.classList.add('alert');
        if (isError) {
            messageDisplay.classList.add('error');
        } else {
            messageDisplay.classList.add('success');
        }

        setTimeout(() => { messageDisplay.remove() }, 3000);
    }

    clearMessages() {
        document.querySelectorAll('.alert').forEach((alert) => alert.remove());
    }
}

class Storage {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }

        Storage.resetIndices(books);
        return books
    }

    static setBooks(books) {
        Storage.resetIndices(books);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static resetIndices(books) {
        books.forEach((book, index) => book.index = index);
    }

    static addBook(book) {
        const books = Storage.getBooks();

        books.push(book);
        Storage.setBooks(books);
    }

    static removeBook(index) {
        let books = Storage.getBooks();

        books.splice(index, 1);
        Storage.setBooks(books);
    }
}

let ui;

document.addEventListener('DOMContentLoaded', onDOMContentLoaded);

function onDOMContentLoaded() {
    ui = new UI();
    ui.bookForm.addEventListener('submit', onBookFormSubmit);
    ui.bookRows.addEventListener('click', onBookRowsClick);
    ui.refreshBookList();
}

function onBookFormSubmit(event) {
    event.preventDefault();
    ui.clearMessages();

    const book = new Book(title = ui.titleInput.value, author = ui.authorInput.value, isbn = ui.isbnInput.value);
    if (!book.isValid()) {
        ui.displayMessage('Please fill out all input fields!', isError = true);
        return
    }

    Storage.addBook(book);
    ui.clearInputFields();
    ui.refreshBookList();
    ui.displayMessage('Book successfully added!')
}

function onBookRowsClick(event) {
    event.preventDefault();
    if (event.target.classList.contains('delete')) {
        Storage.removeBook(event.target.parentElement.parentElement.id);
        ui.refreshBookList();
        return
    }
}
