

const Model = {
    apiKey: "301074c8a9423b23020f6a947f72b2aa",
    apiUrl: "https://api.openweathermap.org/data/2.5/weather?units=metric&q=",

    CITY_WEATHER: [],
    CITY_WEATHER_FAVORITE: [],

    getCityWeather: async () => {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        if (response.status == 404) {
            alert("This city name is not correct");
        } else {
            const data = await response.json();
            return data;
        }
    },

    addCityWeather: (newCityWeather) => {
        CITY_WEATHER.push(newCityWeather);
    },

    deleteCityWeather: (id, allCities) => {
        const cityId = allCities.findIndex((city) => city.id === id);
        allCities.splice(cityId, 1);
    },

    toggleFavoriteCity: (id) => {
        const cityFavorite = CITY_WEATHER.find((city) => city.id === id);
        cityFavorite.isFavorite = !cityFavorite.isFavorite;
    },

    deletePopup: (id) => {
        const popupId = CITY_WEATHER.findIndex((item) => item.id === id);
        CITY_WEATHER.splice(popupId, 1);
    },

    toggleFavoritePopup: (id) => {
        const popupFavorite = CITY_WEATHER.find((item) => item.id === id);
        console.log(popupFavorite)
        popupFavorite.isFavorite = !popupFavorite.isFavorite;
    },
}

export { Model };