const apiKey = "301074c8a9423b23020f6a947f72b2aa";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const form = document.querySelector('.form');
const enterCity = document.querySelector('.enter-city');
const searchCity = document.querySelector('.search-city');
const cityWeather = document.querySelector('.city-weather');
const textError = document.querySelector('.text-error')

let CITY_WEATHER = [];

async function getCityWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`)
    const data = await response.json();
    return data;
}


function createElement(tag, className) {
    let element = document.createElement(tag);
    if (className) element.classList.add(className);
    return element;
}

function addCityWeather(newCityWeather) {
    CITY_WEATHER.push(newCityWeather);
}

function deleteCityWeather(id) {
    const cityId = CITY_WEATHER.findIndex((city) => city.id === id);
    CITY_WEATHER.splice(cityId, 1);
}

/////////////////////

async function updateCityWeather(id) {
    const updateWeather = CITY_WEATHER.find((city) => city.id === id);
    console.log(updateWeather)
    const request = await fetch(apiUrl + updateWeather + `&appid=${apiKey}`);
    const data = await request.json();
    return data;
}

//////////////////////

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
    const parentNode = event.target.closest('.city-weather');
    const id = Number(parentNode.id);
    return id;
}

function renderCityWeather() {
    cityWeather.innerHTML = '';

    CITY_WEATHER.forEach((city) => {
        const elementDiv = createElement('div', "city-list");
        elementDiv.setAttribute('id', city.id);

        const cityList = `<h1 class="temp city-list__temp">${city.temp + '°'}c</h1>
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
                          <button type="button" data-action="update" class="button-update btn">update</button>
                          <button type="button" data-action="delete" class="button-delete btn">delete</button>
                          </div>                 
       `;

        elementDiv.innerHTML = cityList;
        cityWeather.appendChild(elementDiv);
    })
}

function emptyText() {
    const text = createElement('p', 'text-error');
    text.innerHTML = "You must Enter city";
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
        renderCityWeather();
    }
    console.log(CITY_WEATHER)
}

async function actionCityWeather(e) {
    const id = getCityId(e);
    const action = e.target.dataset.action;

    if (action === 'delete') {
        deleteCityWeather(id);
        renderCityWeather();
    }

    if (action === 'update') {
        const up = await updateCityWeather(id);
        console.log(up)
        renderCityWeather();
    }
}

function init() {
    renderCityWeather;

    form.addEventListener('submit', controllerCityWeather);
    cityWeather.addEventListener('click', actionCityWeather);
}

init()
