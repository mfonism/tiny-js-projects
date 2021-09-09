const locationDisplay = document.querySelector('#wLocation .value');
const descriptionDisplay = document.querySelector('#wDesc .value');
const temperatureDisplay = document.querySelector('#wTemp .value');
const humidityDisplay = document.querySelector('#wHumidity .value');
const feelsLikeDisplay = document.querySelector('#wFeelsLike .value');
const windSpeedDisplay = document.querySelector('#wWind #speed .value');
const windDirectionDisplay = document.querySelector('#wWind #direction .value');
const windGustDisplay = document.querySelector('#wWind #gust .value');

const locationChangeModal = document.getElementById('wChangeLocationModal');
const locationChangeForm = document.getElementById('wForm');
const locationInput = document.querySelector('#wForm #city');
const locationChangeButton = document.getElementById('wChangeLocationBtn');

const weatherIconImg = document.querySelector('img#wIcon');

const alertContainer = document.getElementById('alertContainer');

class UI {
    constructor() {
        this.addEventListeners();
    }

    addEventListeners() {
        locationChangeButton.addEventListener('click', changeLocation);
        locationChangeForm.addEventListener('submit', changeLocation);
    }

    displayWeatherInfo(weatherInfo) {
        this.clearElementContent(alertContainer);
        this.setElementTextContent(locationDisplay, weatherInfo.location);
        this.setElementTextContent(descriptionDisplay, weatherInfo.description);
        this.setElementTextContent(temperatureDisplay, weatherInfo.temperature);
        this.setElementTextContent(humidityDisplay, weatherInfo.humidity);
        this.setElementTextContent(feelsLikeDisplay, weatherInfo.feelsLike);
        this.setElementTextContent(windSpeedDisplay, weatherInfo.wind.speed);
        this.setElementTextContent(windDirectionDisplay, weatherInfo.wind.deg);
        this.setElementTextContent(windGustDisplay, weatherInfo.wind.gust);
        weatherIconImg.setAttribute('src', weatherInfo.iconUrl);
    }

    setElementTextContent(element, text) {
        this.clearElementContent(element);
        element.appendChild(document.createTextNode(text));
    }

    clearElementContent(element) {
        while (element.firstChild) {
            element.firstChild.remove();
        }
    }

    displayWeatherInfoError(weatherInfoError) {
        this.clearElementContent(alertContainer);

        const alertDisplayCol = document.createElement('div');
        const alertDisplay = document.createElement('div');
        alertDisplayCol.classList.add('col-md-6', 'mx-auto', 'text-center');
        alertDisplay.classList.add('alert', 'alert-warning');
        alertDisplayCol.appendChild(alertDisplay);
        alertDisplay.appendChild(document.createTextNode(`${weatherInfoError.location}: ${weatherInfoError.message}`));

        alertContainer.appendChild(alertDisplayCol);
    }
}

function changeLocation(event) {
    event.preventDefault();

    const newLocation = locationInput.value;
    if (newLocation === '') {
        return
    }

    const setLocationInStorageEvent = new CustomEvent('setLocationInStorage', { bubbles: true });
    locationInput.dispatchEvent(setLocationInStorageEvent);

    locationInput.value = '';
    // HACK!
    // close the modal
    document.querySelector('#wChangeLocationModal .cancel-icon').click();

    const displayWeatherInfoEvent = new CustomEvent('displayWeatherInfo', { bubbles: true });
    locationChangeButton.dispatchEvent(displayWeatherInfoEvent);
}
