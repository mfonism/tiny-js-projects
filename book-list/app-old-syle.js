function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

function UI() {
    this.container = document.querySelector('.container');
    this.bookForm = document.getElementById('book-form');
    this.titleInput = document.getElementById('title');
    this.authorInput = document.getElementById('author');
    this.isbnInput = document.getElementById('isbn');
    this.bookRows = document.querySelector('tbody#book-list');
}

UI.prototype.addEventListeners = function () {
    _this = this;
    function wrapOOPEventHandler(handler) {
        // necessary because the `this` keyword
        // in an event handler refers to the event target
        function inner(event) {
            return handler(event, _this)
        }
        return inner
    }
    this.bookForm.addEventListener('submit', wrapOOPEventHandler(this.onSubmit));
    this.bookRows.addEventListener('click', wrapOOPEventHandler(this.onBookRowsClick));
}

UI.prototype.onSubmit = function (event, _this) {
    // `_this` is a reference to the ui object
    // we have to pass this in as `this` in an event handler refers to
    // the event target
    event.preventDefault();

    const
        title = _this.titleInput.value,
        author = _this.authorInput.value,
        isbn = _this.isbnInput.value
        ;

    if (title === '' || author === '' || isbn === '') {
        _this.displayMessage('Please fill up all fields.', isError = true);
        return
    }

    const book = new Book(title, author, isbn);
    _this.addBookToList(book);
    _this.displayMessage('Book successfully added!');
    _this.clearInputs();
}

UI.prototype.onBookRowsClick = function (event, _this) {
    event.preventDefault();

    if (!event.target.classList.contains('delete')) {
        return
    }

    event.target.parentElement.parentElement.remove();
}

UI.prototype.addBookToList = function (book) {
    const row = document.createElement('tr');

    for (field of ['title', 'author', 'isbn']) {
        const
            textNode = document.createTextNode(book[field]),
            tdNode = document.createElement('td')
            ;
        tdNode.appendChild(textNode);
        row.appendChild(tdNode);
    }

    const
        deleteLink = document.createElement('href'),
        deleteWrap = document.createElement('td')
        ;
    deleteLink.style.cursor = 'pointer';
    deleteLink.style.padding = '6px 4px';
    deleteLink.style.color = 'orange';
    deleteLink.classList.add('delete');
    deleteLink.appendChild(document.createTextNode('x'));
    deleteWrap.appendChild(deleteLink);

    row.appendChild(deleteWrap);
    this.bookRows.appendChild(row);
}

UI.prototype.clearInputs = function () {
    this.titleInput.value = '';
    this.authorInput.value = '';
    this.isbnInput.value = '';
}

UI.prototype.displayMessage = function (message, isError = false) {

    const messageDisplay = document.createElement('div');
    messageDisplay.appendChild(document.createTextNode(message));
    if (isError) {
        messageDisplay.classList.add('error');
    } else {
        messageDisplay.classList.add('success');
    }

    this.container.insertAdjacentElement('afterbegin', messageDisplay);
    setTimeout(function () {
        messageDisplay.remove();
    }, 2000);
}

ui = new UI();
ui.addEventListeners();
