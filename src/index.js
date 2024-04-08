const apiKey = "301074c8a9423b23020f6a947f72b2aa";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const form = document.querySelector('.form');
const enterCity = document.querySelector('.enter-city');
const searchCity = document.querySelector('.search-city');
const cityWeather = document.querySelector('.city-weather');
const listTabs = document.querySelector('.list-tabs')
const textError = document.querySelector('.text-error');
const tabOne = document.querySelector('.tab-one');
const tabTwo = document.querySelector('.tab-two');
const tabsContainer = document.querySelectorAll('.tabs-container')

const NAME_TAB = {
    ALL_CITIES: "tab-1",
    FAVORITE: "tab-2",
}

let CITY_WEATHER = [];
let CITY_WEATHER_FAVORITE = [];
let ACTIVE_TAB = NAME_TAB.ALL_CITIES;

async function getCityWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        alert("This city name is not correct");
    } else {
        const data = await response.json();
        return data;

    }
}

function createElement(tag, className) {
    let element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
}

function addCityWeather(newCityWeather) {
    CITY_WEATHER.push(newCityWeather);
}

function deleteCityWeather(id, allCities) {
    const cityId = allCities.findIndex((city) => city.id === id);
    allCities.splice(cityId, 1);
}

function toggleFavoriteCity(id) {
    const cityFavorite = CITY_WEATHER.find((city) => city.id === id);
    cityFavorite.isFavorite = !cityFavorite.isFavorite;
}

// function addCityWeatherInFavorite(id) {
//     const findCity = CITY_WEATHER.find((city) => city.id === id);
//     if (findCity.isFavorite) {
//         CITY_WEATHER_FAVORITE.push(findCity);
//     }
//     if (!findCity.isFavorite) {
//         CITY_WEATHER_FAVORITE.pop(findCity);
//     }
// }

function changeActiveBtnAllCities(className) {
    if (!tabOne.classList.contains(className)) {
        tabOne.classList.add(className)
        tabTwo.classList.remove(className)
    }
}

function changeActiveBtnFavorite(className) {
    if (!tabTwo.classList.contains(className)) {
        tabTwo.classList.add(className);
        tabOne.classList.remove(className);
    }
}


function getInputText(event) {
    event.preventDefault();

    const inputCity = enterCity.value;
    return inputCity;
}

function removeInputText() {
    enterCity.value = '';
    enterCity.focus();
}

function getCityId(event) {
    const parentNode = event.target.closest('.city-list');
    const id = Number(parentNode.id);
    return id;
}

function getElementId(event) {
    const parentNode = event.target.closest('.tabs');
    const id = Number(parentNode.id);
    return id;
}

function renderCityWeather(arrayList) {
    cityWeather.innerHTML = '';

    arrayList.forEach((city) => {
        const favoriteClass = city.isFavorite ? "btn-favorite btn-favorite2" : "btn-favorite"
        const elementDiv = createElement('div', "city-list");
        elementDiv.setAttribute('id', city.id);

        const cityList = `<div class="favorit">
                         <button class="${favoriteClass}" data-action="favorite"></button>
                         </div>
                          <h1 class="temp city-list__temp">${city.temp + '°'}c</h1>
                          <h2 class="cityName city-list__cityName">${city.name}</h2>
                          <div class="hum-wind city-list__hum-wind">
                          <div class="humidity-wrapper hum-wind__humidity-wrapper">
                          <img class="humidity-icon icon" src="img/humidity.png" alt="icon humidity">
                          <div class="text-hum">
                          <p class="humidity text-hum__humidity">${city.humidity + ' %'}</p>
                          <p class="hum-wind-text">Humidity</p>
                          </div>
                          </div>
                          <div class="wind-wrapper hum-wind__wind-wrapper">
                          <img class="wind-icon icon" src="img/wind.png" alt="icon wind">
                          <div class="text-wind">
                          <p class="wind text-wind__wind">${city.wind + ' km/h'}</p>
                          <p class="hum-wind-text">Wind</p>
                          </div>
                          </div>
                          </div>
                          <div class="button">
                          <button type="button" data-action="delete" class="button-delete btn">delete</button>
                          </div>                 
       `;

        elementDiv.innerHTML = cityList;
        cityWeather.appendChild(elementDiv);
    })
}

function emptyText() {
    const text = createElement('p', 'text-error');
    text.innerHTML = "You must Enter city name";
    textError.innerHTML = ''
    textError.appendChild(text);
}

async function controllerCityWeather(e) {
    const inputText = await getInputText(e);
    const city = await getCityWeather(inputText);

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

function actionCityWeather(e) {
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
}

function actionCityFavorit(e) {
    const tab = e.target.dataset.tab;

    if (tab === NAME_TAB.ALL_CITIES) {
        window.location.hash = "all-cities";
    }

    if (tab === NAME_TAB.FAVORITE) {
        window.location.hash = "favorite";
    }
}

function controllerWeatherCards(){
    if (location.hash === "#all-cities") {
        ACTIVE_TAB = NAME_TAB.ALL_CITIES;
        renderCityWeather(CITY_WEATHER);
        changeActiveBtnAllCities("active");
    }

    if (location.hash === "#favorite") {
        ACTIVE_TAB = NAME_TAB.FAVORITE;
        renderCityWeather(CITY_WEATHER.filter((item) => item.isFavorite));
        changeActiveBtnFavorite("active");
    }
}

function updatePage() {
    const newUrl = history.replaceState(null, null, "#all-cities");
    return newUrl;
}

function init() {
    updatePage();
    renderCityWeather(CITY_WEATHER);

    window.addEventListener ("hashchange", controllerWeatherCards);
    form.addEventListener('submit', controllerCityWeather);
    cityWeather.addEventListener('click', actionCityWeather);
    listTabs.addEventListener('click', actionCityFavorit)
}

init()
