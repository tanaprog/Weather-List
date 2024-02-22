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
const tabsAll = document.querySelector('.tabs-wrapper')
const tabFavorite = document.getElementById('tab-2')
const tabCyties = document.getElementById('tab-1')

const tabTitle = document.querySelectorAll('.tab-title')
const tabContent = document.querySelectorAll('.tab-content')


let CITY_WEATHER = [];
let CITY_WEATHER_FAVORITE = [];

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

function changeIconStar(id) {
    const cityFavorite = CITY_WEATHER.find((city) => city.id === id);
    cityFavorite.isFavorite = !cityFavorite.isFavorite;
}

function addCityWeatherInFavorite(id) {
    const findCity = CITY_WEATHER.find((city) => city.id === id);
    if (findCity.isFavorite) {
        CITY_WEATHER_FAVORITE.push(findCity)
        console.log(CITY_WEATHER_FAVORITE)
    }
    if (!findCity.isFavorite) {
        CITY_WEATHER_FAVORITE.pop(findCity)
    }
}


// function activeButtonTab (){
//     tabTitle.forEach((item) => {
//         if(!item.classList.contains('active')){
//            item.classList.add('active')
//         }else{
//         item.classList.remove('active')
//       }
//     })
// }
// Функция перебипает все Tab-кнопки


function changeActiveBtnAllCities() {
    if (!tabOne.classList.contains('active')) {
        tabOne.classList.add('active')
        tabTwo.classList.remove('active')
    }
    if (tabCyties.classList.contains('active')) {
        tabCyties.classList.remove('hidden');
        tabFavorite.classList.add('hidden')
    }

}

function changeActiveBtnFavorite() {
    if (!tabTwo.classList.contains('active')) {
        tabTwo.classList.add('active');
        tabOne.classList.remove('active');
    }
    if (tabFavorite.classList.contains('hidden')) {
        tabFavorite.classList.remove('hidden');
        tabFavorite.classList.add('active');
        tabCyties.classList.add('hidden');
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

function getCityFavoriteId(event) {
    const parentNode = event.target.closest('.tabs');
    const id = Number(parentNode.id);
    return id;
}




// ///////////
// function tabs() {
//     const elemTabs = createElement('div', 'tabs');

//     const createTabs = `<div class="tabs5">
//  <div class="tabs-container">
//      <div data-tab="tab-1" class="tab-one tab-title active">All cities</div>
//      <div data-tab="tab-2" class="tab-two tab-title">Favorit</div>
//  </div>
//  <div class="tabs-wrapper">
//      <div id="tab-1" class="tab-content active"></div>
//      <div id="tab-2" class="tab-content hidden-tab-content"></div>
//  </div>
// </div>`;

//     elemTabs.innerHTML = createTabs;
//     listTabs.appendChild(elemTabs)
// }
// //////////////


// tabs();




function renderCityWeather() {
    cityWeather.innerHTML = '';

    CITY_WEATHER.forEach((city) => {
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

function actionCityWeather(e) {
    const id = getCityId(e);
    const action = e.target.dataset.action;

    if (action === 'delete') {
        deleteCityWeather(id);
        renderCityWeather();
    }

    if (action === 'favorite') {
        changeIconStar(id);
        addCityWeatherInFavorite(id);
        renderCityWeather();
    }
}

// function pushFavoriteCities (id){
//     CITY_WEATHER.forEach((city) => {
//         if(city.isFavorite){
//             tabFavorite.append(city.name)
//         }
//         if(!city.isFavorite){
//             tabCyties.append(city.name + city.temp)
//         }
//     });
// }

function actionCityFavorit(e) {
    const id = getCityFavoriteId(e);
    const tab = e.target.dataset.tab;

    if (tab === "tab-1") {
        changeActiveBtnAllCities();
        // activeButtonTab()
        // pushFavoriteCities()
        console.log(CITY_WEATHER);
    }

    if (tab === "tab-2") {
        changeActiveBtnFavorite();
        // pushFavoriteCities ()
        // activeButtonTab()
        console.log(CITY_WEATHER_FAVORITE);
    }
}

function init() {
    renderCityWeather;

    form.addEventListener('submit', controllerCityWeather);
    cityWeather.addEventListener('click', actionCityWeather);
    listTabs.addEventListener('click', actionCityFavorit)
}

init()
