class Model {
    constructor() {
        this.apiKey = "301074c8a9423b23020f6a947f72b2aa";
        this.apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

        this.CITY_WEATHER = [];
        this.CITY_WEATHER_FAVORITE = [];
    }

    getCityWeather = async (city) => {

        const response = await fetch(this.apiUrl + city + `&appid=${this.apiKey}`);
        if (response.status == 404) {
            alert("This city name is not correct");
        } else {
            const data = await response.json();
            return data;
        }
    }

    addCityWeather = (newCityWeather) => {
        this.CITY_WEATHER.push(newCityWeather);
    }

    deleteCityWeather = (id, allCities) => {
        const cityId = allCities.findIndex((city) => city.id === id);
        allCities.splice(cityId, 1);
    }

    toggleFavoriteCity (id) {
        const cityFavorite = this.CITY_WEATHER.find((city) => city.id === id);
        cityFavorite.isFavorite = !cityFavorite.isFavorite;
    }

    deletePopup = (id) => {
        const popupId = this.CITY_WEATHER.findIndex((item) => item.id === id);
        this.CITY_WEATHER.splice(popupId, 1);
    }

    toggleFavoritePopup = (id) => {
        const popupFavorite = this.CITY_WEATHER.find((item) => item.id === id);
        console.log(popupFavorite)
        popupFavorite.isFavorite = !popupFavorite.isFavorite;
    }

}

export { Model }









// class Model {
//     constructor() {
//         this.apiKey = "301074c8a9423b23020f6a947f72b2aa";
//         this.apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

//         this.CITY_WEATHER = [];
//         this.CITY_WEATHER_FAVORITE = [];
//     }

//     getCityWeather = async (city) => {

//         const response = await fetch(this.apiUrl + city + `&appid=${this.apiKey}`);
//         if (response.status == 404) {
//             alert("This city name is not correct");
//         } else {
//             const data = await response.json();
//             return data;
//         }
//     }

//     addCityWeather = (newCityWeather) => {
//         this.CITY_WEATHER.push(newCityWeather);
//     }

//     deleteCityWeather = (id, allCities) => {
//         const cityId = allCities.findIndex((city) => city.id === id);
//         allCities.splice(cityId, 1);
//     }

//     deletePopup = (id) => {
//         const popupId = this.CITY_WEATHER.findIndex((item) => item.id === id);
//         this.CITY_WEATHER.splice(popupId, 1);
//     }

//     toggleFavoriteCity(id) {
//         const cityFavorite = this.CITY_WEATHER.find((city) => city.id === id);
//         cityFavorite.isFavorite = !cityFavorite.isFavorite;
//     }

// }

// export { Model }