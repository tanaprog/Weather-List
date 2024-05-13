
import { View } from "./js/view.js";
import { Model } from "./js/model.js";


let ACTIVE_TAB = View.NAME_TAB.ALL_CITIES;

async function controllerCityWeather(e) {
    const inputText = await View.getInputText(e);
    View.toggleLoad();
    const city = await Model.getCityWeather(inputText);
    View.toggleLoad();

    View.textError.innerHTML = '';

    if (!inputText) {
        View.emptyText();
    } else {
        const newCityWeather = {
            id: Math.floor(Math.random() * 200) + 1,
            name: city.name,
            temp: Math.round(city.main.temp),
            humidity: city.main.humidity,
            wind: Math.round(city.wind.speed),
        }
        View.removeInputText();
        Model.addCityWeather(newCityWeather);
        View.renderCityWeather(Model.CITY_WEATHER);
    }
}

function controllerCityButton(e) {
    const id = View.getCityId(e);
    const action = e.target.dataset.action;

    if (action === 'delete') {
        if (ACTIVE_TAB === View.NAME_TAB.FAVORITE) {
            Model.deleteCityWeather(id, Model.CITY_WEATHER);
            View.renderCityWeather(Model.CITY_WEATHER.filter((item) => item.isFavorite));
            View.changeActiveBtnFavorite();
        }
        if (ACTIVE_TAB === View.NAME_TAB.ALL_CITIES) {
            Model.deleteCityWeather(id, Model.CITY_WEATHER);
            View.renderCityWeather(Model.CITY_WEATHER);
            View.changeActiveBtnAllCities();
        }
    }

    if (action === 'favorite') {
        toggleFavoriteCity(id);
        if (ACTIVE_TAB === View.NAME_TAB.ALL_CITIES) {
            View.renderCityWeather(Model.CITY_WEATHER);
        }
        if (ACTIVE_TAB === View.NAME_TAB.FAVORITE) {
            View.renderCityWeather(Model.CITY_WEATHER.filter((item) => item.isFavorite));
        }
    }

    if (action === 'open-popup') {
        const infoIndex = Model.CITY_WEATHER.findIndex((item) => item.id === id);
        const info = Model.CITY_WEATHER[infoIndex];
        View.openPopup();
        View.renderPopup(info);
    }
}

function controllerCityFavorite(e) {
    const tab = e.target.dataset.tab;

    if (tab === View.NAME_TAB.ALL_CITIES) {
        window.location.hash = "all-cities";
    }

    if (tab === View.NAME_TAB.FAVORITE) {
        window.location.hash = "favorite";
    }
}

function controllerWeatherCards() {
    if (location.hash === "#all-cities") {
        ACTIVE_TAB = View.NAME_TAB.ALL_CITIES;
        View.renderCityWeather(Model.CITY_WEATHER);
        View.changeActiveBtnAllCities("active");
    }

    if (location.hash === "#favorite") {
        ACTIVE_TAB = View.NAME_TAB.FAVORITE;
        View.renderCityWeather(Model.CITY_WEATHER.filter((item) => item.isFavorite));
        View.changeActiveBtnFavorite("active");
    }
}

function controllerPopup(e) {
    const id = View.getPopupId(e);
    const action = e.target.dataset.action;

    if (action === 'close') {
        View.closePopup();
        View.clearPopup();
    }

    if (action === 'favorite-popup') {
        Model.toggleFavoritePopup(id);
    }

    if (action === 'delete-popup') {
        Model.deletePopup(id);
        View.closePopup();
        View.clearPopup();
        View.renderCityWeather()
    }

    if (action === 'popup') {
        View.closePopup();
    }
}

function init() {
    View.updatePage();
    View.renderCityWeather(Model.CITY_WEATHER);

    window.addEventListener("hashchange", controllerWeatherCards);
    View.form.addEventListener('submit', controllerCityWeather);
    View.cityWeather.addEventListener('click', controllerCityButton);
    this.listTabs.addEventListener('click', controllerCityFavorite);
    this.popup.addEventListener('click', controllerPopup);
}

init()















// import {form, enterCity, searchCity, cityWeather, listTabs, textError, tabOne, tabTwo, tabsContainer,
//     popup, loader, NAME_TAB, 
//     toggleLoad, renderCityWeather, emptyText, renderPopup, clearPopup, openPopup, closePopup,
//     getCityId, getElementId, getPopupId, getInputText, removeInputText, createElement,
//     changeActiveBtnAllCities, changeActiveBtnFavorite, updatePage
// } from './js/view.js';

// import {apiKey, apiUrl, CITY_WEATHER, CITY_WEATHER_FAVORITE,
//     getCityWeather, addCityWeather, deleteCityWeather, toggleFavoriteCity,
//     deletePopup, toggleFavoritePopup
// } from './js/model.js';