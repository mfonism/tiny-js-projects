const API_KEY = '2c3bd4c1e92f5638a773dc60cd0a38e7';
const owClient = new OpenWeather(API_KEY);
const storage = new Storage();
const ui = new UI();

const defaultLocation = 'Calabar';

document.addEventListener('DOMContentLoaded', getWeather);
document.addEventListener('setLocationInStorage', setLocationInStorage);
document.addEventListener('displayWeatherInfo', getWeather)

function getWeather(event) {
    event.preventDefault();

    const location = storage.getLocation() || defaultLocation;
    owClient.getWeatherInfo(location)
        .then((res) => {
            if (res.status !== 200) {
                ui.displayWeatherInfoError({ location: location, message: res.err.message });
            } else {
                ui.displayWeatherInfo(res.data);
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

function setLocationInStorage(event) {
    event.preventDefault();
    storage.setLocation(event.target.value);
}
