

const View = {

    // constructor  () {
    form: document.querySelector('.form'),
    enterCity: document.querySelector('.enter-city'),
    // searchCity: document.querySelector('.search-city'),
    // cityWeather: document.querySelector('.city-weather'),
    // listTabs: document.querySelector('.list-tabs'),
    // textError: document.querySelector('.text-error'),
    // tabOne: document.querySelector('.tab-one'),
    // tabTwo: document.querySelector('.tab-two'),
    // tabsContainer: document.querySelectorAll('.tabs-container'),
    // popup: document.querySelector('.popup'),
    // loader: document.querySelector('.loader'),
    // },

    NAME_TAB: {
        ALL_CITIES: "tab-1",
        FAVORITE: "tab-2",
    },

    toggleLoad: () => {
        searchCity.classList.toggle('search-city-hiden');
        loader.classList.toggle('loader-visible');
    },

    createElement: (tag, className) => {
        let element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    },

    renderCityWeather: (arrayList) => {
        cityWeather.innerHTML = '';

        arrayList.forEach((city) => {
            const favoriteClass = city.isFavorite ? "btn-favorite btn-favorite2" : "btn-favorite"
            const elementDiv = createElement('div', "city-list");
            elementDiv.setAttribute('id', city.id);

            const cityList = `
                         <div class="favorit">
                         <button class="open-popup" data-action="open-popup">popup</button>
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
    },

    emptyText: () => {
        const text = createElement('p', 'text-error');
        text.innerHTML = "You must Enter city name";
        textError.innerHTML = ''
        textError.appendChild(text);
    },

    renderPopup: (info) => {
        const temp = info.temp;
        const name = info.name;
        const humidity = info.humidity;
        const wind = info.wind;

        const favoriteClass = info.isFavorite ? "btn-favorite-popup btn-favorite2-popup" : "btn-favorite-popup"
        const elementDiv = createElement('div', "popup__content");
        elementDiv.setAttribute('id', info.id)

        const infoElement = ` <div class="favorit">
                              <button class="${favoriteClass}" data-action="favorite-popup"></button>
                              </div>
                              <div data-action="close" class="popup__close">&#10006</div>
    
                              <h1 class="popup-temp">${temp + '°'}c</h1>
                              <h2 class="popup-cityName">${name}</h2>
    
                              <div class="popup-hum-wind ">
                              <div class="popup-humidity-wrapper ">
                              <img class="popup-wind-wrapper icon" src="img/humidity.png" alt="icon humidity">
                              <div class="text">
                              <p class="humidity">${humidity + ' %'}</p>
                              <p class="popup-hum-wind-text">Humidity</p>
                              </div>
                              </div>
    
                              <div class="wind-wrapper hum-wind__wind-wrapper">
                              <img class="wind-icon icon" src="img/wind.png" alt="icon wind">
                              <div class="text">
                              <p class="wind">${wind + ' km/h'}</p>
                              <p class="hum-wind-text">Wind</p>
                              </div>
                              </div>
                              </div>
    
                              <div class="button">
                              <button type="button" data-action="delete-popup" class="button-delete btn">delete</button>
                              </div> 
                             `
            ;

        elementDiv.innerHTML = infoElement;
        popup.appendChild(elementDiv);
    },

    clearPopup: () => {
        popup.innerHTML = '';
    },

    openPopup: () => {
        popup.classList.add('open-popup');
        document.body.classList.add('stop-scrolling');
    },

    closePopup: (e) => {
        popup.classList.remove('open-popup');
        document.body.classList.remove('stop-scrolling');
    },

    getCityId: (event) => {
        const parentNode = event.target.closest('.city-list');
        if (!parentNode?.id) return;
        const id = Number(parentNode.id);
        return id;
    },

    getPopupId: (event) => {
        const parentNode = event.target.closest('.popup__content');
        if (!parentNode?.id) return;
        const id = Number(parentNode.id);
        return id;
    },

    getInputText: (event) => {
        event.preventDefault();

        const inputCity = enterCity.value;
        return inputCity;
    },

    removeInputText: () => {
        enterCity.value = '';
        enterCity.focus();
    },

    changeActiveBtnAllCities: (className) => {
        if (!tabOne.classList.contains(className)) {
            tabOne.classList.add(className)
            tabTwo.classList.remove(className)
        }
    },

    changeActiveBtnFavorite: (className) => {
        if (!tabTwo.classList.contains(className)) {
            tabTwo.classList.add(className);
            tabOne.classList.remove(className);
        }
    },

    updatePage: () => {
        const newUrl = history.replaceState(null, null, "#all-cities");
        return newUrl;
    }
}

export { View }















// const form = document.querySelector('.form');
// const enterCity = document.querySelector('.enter-city');
// const searchCity = document.querySelector('.search-city');
// const cityWeather = document.querySelector('.city-weather');
// const listTabs = document.querySelector('.list-tabs')
// const textError = document.querySelector('.text-error');
// const tabOne = document.querySelector('.tab-one');
// const tabTwo = document.querySelector('.tab-two');
// const tabsContainer = document.querySelectorAll('.tabs-container');
// const popup = document.querySelector('.popup');
// const loader = document.querySelector('.loader');

// const NAME_TAB = {
//     ALL_CITIES: "tab-1",
//     FAVORITE: "tab-2",
// }

// // let ACTIVE_TAB = NAME_TAB.ALL_CITIES;

// function toggleLoad() {
//     searchCity.classList.toggle('search-city-hiden');
//     loader.classList.toggle('loader-visible');
// }

// function createElement(tag, className) {
//     let element = document.createElement(tag);
//     if (className) element.classList.add(className);
//     return element;
// }

// function renderCityWeather(arrayList) {
//     cityWeather.innerHTML = '';

//     arrayList.forEach((city) => {
//         const favoriteClass = city.isFavorite ? "btn-favorite btn-favorite2" : "btn-favorite"
//         const elementDiv = createElement('div', "city-list");
//         elementDiv.setAttribute('id', city.id);

//         const cityList = `
//                          <div class="favorit">
//                          <button class="open-popup" data-action="open-popup">popup</button>
//                          <button class="${favoriteClass}" data-action="favorite"></button>
//                          </div>
//                           <h1 class="temp city-list__temp">${city.temp + '°'}c</h1>
//                           <h2 class="cityName city-list__cityName">${city.name}</h2>
//                           <div class="hum-wind city-list__hum-wind">
//                           <div class="humidity-wrapper hum-wind__humidity-wrapper">
//                           <img class="humidity-icon icon" src="img/humidity.png" alt="icon humidity">
//                           <div class="text-hum">
//                           <p class="humidity text-hum__humidity">${city.humidity + ' %'}</p>
//                           <p class="hum-wind-text">Humidity</p>
//                           </div>
//                           </div>
//                           <div class="wind-wrapper hum-wind__wind-wrapper">
//                           <img class="wind-icon icon" src="img/wind.png" alt="icon wind">
//                           <div class="text-wind">
//                           <p class="wind text-wind__wind">${city.wind + ' km/h'}</p>
//                           <p class="hum-wind-text">Wind</p>
//                           </div>
//                           </div>
//                           </div>
//                           <div class="button">
//                           <button type="button" data-action="delete" class="button-delete btn">delete</button>
//                           </div>
//        `;
//         elementDiv.innerHTML = cityList;
//         cityWeather.appendChild(elementDiv);
//     })
// }

// function emptyText() {
//     const text = createElement('p', 'text-error');
//     text.innerHTML = "You must Enter city name";
//     textError.innerHTML = ''
//     textError.appendChild(text);
// }

// function renderPopup(info) {
//     const temp = info.temp;
//     const name = info.name;
//     const humidity = info.humidity;
//     const wind = info.wind;

//     const favoriteClass = info.isFavorite ? "btn-favorite-popup btn-favorite2-popup" : "btn-favorite-popup"
//     const elementDiv = createElement('div', "popup__content");
//     elementDiv.setAttribute('id', info.id)

//     const infoElement = ` <div class="favorit">
//                           <button class="${favoriteClass}" data-action="favorite-popup"></button>
//                           </div>
//                           <div data-action="close" class="popup__close">&#10006</div>

//                           <h1 class="popup-temp">${temp + '°'}c</h1>
//                           <h2 class="popup-cityName">${name}</h2>

//                           <div class="popup-hum-wind ">
//                           <div class="popup-humidity-wrapper ">
//                           <img class="popup-wind-wrapper icon" src="img/humidity.png" alt="icon humidity">
//                           <div class="text">
//                           <p class="humidity">${humidity + ' %'}</p>
//                           <p class="popup-hum-wind-text">Humidity</p>
//                           </div>
//                           </div>

//                           <div class="wind-wrapper hum-wind__wind-wrapper">
//                           <img class="wind-icon icon" src="img/wind.png" alt="icon wind">
//                           <div class="text">
//                           <p class="wind">${wind + ' km/h'}</p>
//                           <p class="hum-wind-text">Wind</p>
//                           </div>
//                           </div>
//                           </div>

//                           <div class="button">
//                           <button type="button" data-action="delete-popup" class="button-delete btn">delete</button>
//                           </div>
//                          `
//         ;

//     elementDiv.innerHTML = infoElement;
//     popup.appendChild(elementDiv);
// }

// function clearPopup() {
//     popup.innerHTML = '';
// }

// function openPopup() {
//     popup.classList.add('open-popup');
//     document.body.classList.add('stop-scrolling');
// }

// function closePopup(e) {
//     popup.classList.remove('open-popup');
//     document.body.classList.remove('stop-scrolling');
// }

// function getCityId(event) {
//     const parentNode = event.target.closest('.city-list');
//     if (!parentNode?.id) return;
//     const id = Number(parentNode.id);
//     return id;
// }

// function getElementId(event) {
//     const parentNode = event.target.closest('.tabs');
//     const id = Number(parentNode.id);
//     return id;
// }

// function getPopupId(event) {
//     const parentNode = event.target.closest('.popup__content');
//     if (!parentNode?.id) return;
//     const id = Number(parentNode.id);
//     return id;
// }

// function getInputText(event) {
//     event.preventDefault();

//     const inputCity = enterCity.value;
//     return inputCity;
// }

// function removeInputText() {
//     enterCity.value = '';
//     enterCity.focus();
// }

// function changeActiveBtnAllCities(className) {
//     if (!tabOne.classList.contains(className)) {
//         tabOne.classList.add(className)
//         tabTwo.classList.remove(className)
//     }
// }

// function changeActiveBtnFavorite(className) {
//     if (!tabTwo.classList.contains(className)) {
//         tabTwo.classList.add(className);
//         tabOne.classList.remove(className);
//     }
// }

// function updatePage() {
//     const newUrl = history.replaceState(null, null, "#all-cities");
//     return newUrl;
// }


// export {
//     form, enterCity, searchCity, cityWeather, listTabs, textError, tabOne, tabTwo, tabsContainer,
//     popup, loader, NAME_TAB,
//     toggleLoad, renderCityWeather, emptyText, renderPopup, clearPopup,
//     openPopup, closePopup, getCityId, getElementId, getPopupId, getInputText, removeInputText,
//     createElement, changeActiveBtnAllCities, changeActiveBtnFavorite, updatePage
// }