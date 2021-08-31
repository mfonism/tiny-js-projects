class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }

    getFieldNames() {
        return ['title', 'author', 'isbn']
    }

    isValid() {
        return !this.getFieldNames().some((fieldName) => this[fieldName] == '')
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

    addBookToList(book) {

        const row = document.createElement('tr');
        book.getFieldNames().forEach((fieldName) => {
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
        this.clearInputFields();
    }

    removeBookFromList(row) {
        row.remove();
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

const ui = new UI();
ui.bookForm.addEventListener('submit', onBookFormSubmit);
ui.bookRows.addEventListener('click', onBookRowsClick);

function onBookFormSubmit(event) {
    event.preventDefault();
    ui.clearMessages();

    const book = new Book(title = ui.titleInput.value, author = ui.authorInput.value, isbn = ui.isbnInput.value);

    if (!book.isValid()) {
        ui.displayMessage('Please fill out all input fields!', isError = true);
        return
    }

    ui.addBookToList(book);
    ui.displayMessage('Book successfully added!')
}

function onBookRowsClick(event) {
    event.preventDefault();

    if (event.target.classList.contains('delete')) {
        ui.removeBookFromList(event.target.parentElement.parentElement);
        return
    }
}
