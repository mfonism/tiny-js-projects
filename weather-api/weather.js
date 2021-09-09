class OpenWeather {
    constructor(apiKey) {
        this.apiKey = apiKey;
        this.apiRoot = 'https://api.openweathermap.org/data/2.5/';
    }

    getWeatherInfoURI(location, units = 'metric') {
        return `${this.apiRoot}/weather?q=${location}&units=${units}&appid=${this.apiKey}`
    }

    async getWeatherInfo(location) {
        const response = await fetch(this.getWeatherInfoURI(location));
        const responseData = await response.json();

        if (response.status !== 200) {
            return {
                status: response.status,
                err: {
                    message: responseData.message,
                }
            }
        }

        return {
            status: response.status,
            data: {
                location: `${responseData.name}, ${responseData.sys.country}`,
                description: responseData.weather[0].description,
                iconUrl: OpenWeather.getIconURL(responseData.weather[0].icon),
                temperature: responseData.main.temp,
                feelsLike: responseData.main.feels_like,
                humidity: responseData.main.humidity,
                wind: responseData.wind,
            }
        }
    }

    static getIconURL(code) {
        return `http://openweathermap.org/img/w/${code}.png`
    }
}