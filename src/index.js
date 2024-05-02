import {form, enterCity, searchCity, cityWeather, listTabs, textError, tabOne, tabTwo, tabsContainer,
    popup, loader, NAME_TAB, ACTIVE_TAB,
    toggleLoad, renderCityWeather, emptyText, renderPopup, clearPopup, openPopup, closePopup,
    getCityId, getElementId, getPopupId, getInputText, removeInputText, createElement,
    changeActiveBtnAllCities, changeActiveBtnFavorite, updatePage
} from './js/view.js';

import {apiKey, apiUrl, CITY_WEATHER, CITY_WEATHER_FAVORITE,
    getCityWeather, addCityWeather, deleteCityWeather, toggleFavoriteCity,
    deletePopup, toggleFavoritePopup
} from './js/model.js';



async function controllerCityWeather(e) {
    const inputText = await getInputText(e);
    toggleLoad();
    const city = await getCityWeather(inputText);
    toggleLoad();

    textError.innerHTML = '';

    if (!inputText) {
        emptyText();
    } else {
        const newCityWeather = {
            id: Math.floor(Math.random() * 200) + 1,
            name: city.name,
            temp: Math.round(city.main.temp),
            humidity: city.main.humidity,
            wind: Math.round(city.wind.speed),
        }
        removeInputText();
        addCityWeather(newCityWeather);
        renderCityWeather(CITY_WEATHER);
    }
}

function controllerCityButton(e) {
    const id = getCityId(e);
    const action = e.target.dataset.action;

    if (action === 'delete') {
        if (ACTIVE_TAB === NAME_TAB.FAVORITE) {
            deleteCityWeather(id, CITY_WEATHER);
            renderCityWeather(CITY_WEATHER.filter((item) => item.isFavorite));
            changeActiveBtnFavorite();
        }
        if (ACTIVE_TAB === NAME_TAB.ALL_CITIES) {
            deleteCityWeather(id, CITY_WEATHER);
            renderCityWeather(CITY_WEATHER);
            changeActiveBtnAllCities();
        }
    }

    if (action === 'favorite') {
        toggleFavoriteCity(id);
        if (ACTIVE_TAB === NAME_TAB.ALL_CITIES) {
            renderCityWeather(CITY_WEATHER);
        }
        if (ACTIVE_TAB === NAME_TAB.FAVORITE) {
            renderCityWeather(CITY_WEATHER.filter((item) => item.isFavorite));
        }
    }

    if (action === 'open-popup') {
        const infoIndex = CITY_WEATHER.findIndex((item) => item.id === id);
        const info = CITY_WEATHER[infoIndex];
        openPopup();
        renderPopup(info);
    }
}

function controllerCityFavorite(e) {
    const tab = e.target.dataset.tab;

    if (tab === NAME_TAB.ALL_CITIES) {
        window.location.hash = "all-cities";
    }

    if (tab === NAME_TAB.FAVORITE) {
        window.location.hash = "favorite";
    }
}

function controllerWeatherCards() {
    if (location.hash === "#all-cities") {
        ACTIVE_TAB === NAME_TAB.ALL_CITIES;
        renderCityWeather(CITY_WEATHER);
        changeActiveBtnAllCities("active");
    }

    if (location.hash === "#favorite") {
        ACTIVE_TAB === NAME_TAB.FAVORITE;
        renderCityWeather(CITY_WEATHER.filter((item) => item.isFavorite));
        changeActiveBtnFavorite("active");
    }
}

function controllerPopup(e) {
    const id = getPopupId(e);
    const action = e.target.dataset.action;

    if (action === 'close') {
        closePopup();
        clearPopup();
    }

    if (action === 'favorite-popup') {
        toggleFavoritePopup(id);
    }

    if (action === 'delete-popup') {
        // deletePopup(id);
        closePopup();
        clearPopup();
        // renderPopup()
    }

    if (action === 'popup') {
        closePopup();
    }
}

function init() {
    updatePage();
    renderCityWeather(CITY_WEATHER);

    window.addEventListener("hashchange", controllerWeatherCards);
    form.addEventListener('submit', controllerCityWeather);
    cityWeather.addEventListener('click', controllerCityButton);
    listTabs.addEventListener('click', controllerCityFavorite);
    popup.addEventListener('click', controllerPopup);
}

init()