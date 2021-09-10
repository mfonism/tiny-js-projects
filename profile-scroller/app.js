function profileIterator(profiles) {
    let nextIndex = 0;

    return {
        next: function () {
            if (nextIndex < profiles.length) {
                return { value: profiles[nextIndex++], done: false }
            }
            return { done: true }
        }
    }
}

const profiles = profileIterator(data);

document.addEventListener('DOMContentLoaded', displayNextProfile);
document.getElementById('advanceProfile').addEventListener('click', displayNextProfile);

function displayNextProfile() {

    const currentProfile = profiles.next().value;

    if (currentProfile === undefined) {
        window.location.reload();
        return
    }

    document.getElementById('profileDisplay').innerHTML = `
        <ul class="list-group">
            <li class="list-group-item">Name: ${currentProfile.name}</li>
            <li class="list-group-item">Age: ${currentProfile.age}</li>
            <li class="list-group-item">Location: ${currentProfile.location}</li>
            <li class="list-group-item">Preference: ${currentProfile.gender} looking for ${currentProfile.lookingFor}</li>
        </ul>
    `;

    document.getElementById('imageDisplay').innerHTML = `<img src="${currentProfile.image}">`;
}