class UI {
    constructor() {
        this.profileDisplay = document.getElementById('profile');
    }

    displayProfile(userData) {
        this.clearProfileDisplay();
        this.clearAlertDisplay();

        const card = document.createElement('div');
        card.classList.add('card', 'card-body', 'mb-3');

        const cardRow = document.createElement('div');
        cardRow.classList.add('row');

        const cardFirstCol = document.createElement('div');
        cardFirstCol.classList.add('col-md-3', 'd-grid');

        const userImg = document.createElement('img');
        userImg.classList.add('img-fluid', 'mb-2');
        userImg.setAttribute('src', userData.avatar_url);

        const userProfileLink = document.createElement('a');
        userProfileLink.appendChild(document.createTextNode(userData.name || userData.login));
        userProfileLink.classList.add('btn', 'btn-primary', 'rounded-pill', 'mb-2');
        userProfileLink.setAttribute('href', userData.html_url);
        userProfileLink.setAttribute('target', '_blank');

        const cardSecondCol = document.createElement('div');
        cardSecondCol.classList.add('col-md-9');

        const reposBadge = document.createElement('span');
        reposBadge.classList.add('badge', 'bg-primary', 'm-1', 'rounded-pill', 'd-inline-block');
        reposBadge.appendChild(document.createTextNode(`Public Repos: ${userData.public_repos}`));

        const gistsBadge = document.createElement('span');
        gistsBadge.classList.add('badge', 'bg-secondary', 'rounded-pill', 'm-1', 'd-inline-block');
        gistsBadge.appendChild(document.createTextNode(`Public Gists: ${userData.public_gists}`));

        const followersBadge = document.createElement('span');
        followersBadge.classList.add('badge', 'bg-success', 'rounded-pill', 'm-1', 'd-inline-block');
        followersBadge.appendChild(document.createTextNode(`Followers: ${userData.followers}`));

        const followeesBadge = document.createElement('span');
        followeesBadge.classList.add('badge', 'bg-info', 'rounded-pill', 'm-1', 'd-inline-block');
        followeesBadge.appendChild(document.createTextNode(`Following: ${userData.following}`));

        card.appendChild(cardRow);
        cardRow.appendChild(cardFirstCol);
        cardFirstCol.appendChild(userImg);
        cardFirstCol.appendChild(userProfileLink);
        cardRow.appendChild(cardSecondCol);
        cardSecondCol.appendChild(reposBadge);
        cardSecondCol.appendChild(gistsBadge);
        cardSecondCol.appendChild(followeesBadge);
        cardSecondCol.appendChild(followersBadge);

        this.profileDisplay.appendChild(card);
    }

    clearProfileDisplay() {
        while (this.profileDisplay.firstChild) {
            this.profileDisplay.firstChild.remove();
        }
    }

    clearAlertDisplay() {
        const alertDisplay = document.querySelector('.alert');

        try {
            alertDisplay.remove();
        } catch (err) {

        }
    }

    showAlert(message, isError = false) {
        const alertDisplay = document.createElement('div');
        alertDisplay.appendChild(document.createTextNode(message));
        alertDisplay.classList.add('alert');
        if (isError) {
            alertDisplay.classList.add('alert-danger');
        } else {
            alertDisplay.classList.add('alert-success');
        }

        const searchContainer = document.getElementById('searchContainer');
        searchContainer.insertAdjacentElement('afterbegin', alertDisplay);
    }

    displayRepos(reposData) {
        reposData.forEach((repo) => {
            console.log(repo);
        })
    }
}
