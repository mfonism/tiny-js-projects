const API_ROOT = 'http://api.icndb.com/jokes/random';
const jokesDisplay = document.getElementById('jokes');

document.querySelector('form').addEventListener('submit', fetchJokes);

function fetchJokes(event) {
    event.preventDefault();

    while (jokesDisplay.firstChild) {
        jokesDisplay.firstChild.remove();
    }

    const xhr = new XMLHttpRequest();
    const numJokes = document.querySelector('input').value || 1;
    const url = API_ROOT + '/' + numJokes;

    xhr.open('GET', url, true);
    xhr.onload = function () {
        if (this.status === 200) {
            const resp = JSON.parse(this.responseText);
            if (resp.type === 'success') {
                jokesDisplay.appendChild(createElementForJokes(resp.value, numJokes));
            }
        }
    };
    xhr.send();
}

function createElementForJokes(jokes, numJokes = 1) {

    if (numJokes == 1) {
        return createElementForSingleJoke(jokes[0]);
    }

    const groupWrapperElement = document.createElement('ul');
    jokes.forEach((joke) => {
        const itemWrapperElement = document.createElement('li');
        itemWrapperElement.appendChild(createElementForSingleJoke(joke));
        groupWrapperElement.appendChild(itemWrapperElement);
    });
    return groupWrapperElement
}

function createElementForSingleJoke(joke) {
    const wrapperElement = document.createElement('ul');

    const jokeElement = document.createElement('li');
    jokeElement.appendChild(document.createTextNode(`Joke: ${joke.joke}`));
    wrapperElement.appendChild(jokeElement);

    const categoriesElement = document.createElement('li');
    const categoriesString = joke.categories.join(', ') || 'n/a';
    categoriesElement.appendChild(document.createTextNode(`Categories: ${categoriesString}`));
    wrapperElement.appendChild(categoriesElement);

    return wrapperElement
}
