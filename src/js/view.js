class View {
    constructor (){
        this.form = document.querySelector('.form');
        this.enterCity = document.querySelector('.enter-city');
        this.searchCity = document.querySelector('.search-city');
        this.cityWeather = document.querySelector('.city-weather');
        this.listTabs = document.querySelector('.list-tabs')
        this.textError = document.querySelector('.text-error');
        this.tabOne = document.querySelector('.tab-one');
        this.tabTwo = document.querySelector('.tab-two');
        this.tabsContainer = document.querySelectorAll('.tabs-container');
        this.popup = document.querySelector('.popup');
        this.loader = document.querySelector('.loader');

        this.NAME_TAB = {
            ALL_CITIES: "tab-1",
            FAVORITE: "tab-2",
        }

    }

    toggleLoad = () => {
        this.searchCity.classList.toggle('search-city-hiden');
        this.loader.classList.toggle('loader-visible');
    }

    createElement = (tag, className) => {
        let element = document.createElement(tag);
        if (className) element.classList.add(className);
        return element;
    }

    renderCityWeather = (arrayList) => {
        this.cityWeather.innerHTML = '';
    
        arrayList.forEach((city) => {
            const favoriteClass = city.isFavorite ? "btn-favorite btn-favorite2" : "btn-favorite"
            const elementDiv = this.createElement('div', "city-list");
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
            this.cityWeather.appendChild(elementDiv);
        })
    }

    emptyText = () => {
        const text = this.createElement('p', 'text-error');
        text.innerHTML = "You must Enter city name";
        this.textError.innerHTML = ''
        this.textError.appendChild(text);
    }

    renderPopup = (info) => {
        const temp = info.temp;
        const name = info.name;
        const humidity = info.humidity;
        const wind = info.wind;
    
        const favoriteClass = info.isFavorite ? "btn-favorite-popup btn-favorite2-popup" : "btn-favorite-popup"
        const elementDiv = this.createElement('div', "popup__content");
        elementDiv.setAttribute('id', info.id)
    
        const infoElement = `
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
        this.popup.appendChild(elementDiv);
    }

    clearPopup = () => {
        this.popup.innerHTML = '';
    }

    openPopup = () => {
        this.popup.classList.add('open-popup');
        document.body.classList.add('stop-scrolling');
    }

    closePopup = (e) => {
        this.popup.classList.remove('open-popup');
        document.body.classList.remove('stop-scrolling');
    }

    getCityId = (event) => {
        const parentNode = event.target.closest('.city-list');
        if (!parentNode?.id) return;
        const id = Number(parentNode.id);
        return id;
    }

    getElementId = (event) => {
        const parentNode = event.target.closest('.tabs');
        const id = Number(parentNode.id);
        return id;
    }

    getPopupId = (event) => {
        const parentNode = event.target.closest('.popup__content');
        if (!parentNode?.id) return;
        const id = Number(parentNode.id);
        return id;
    }

    getInputText = (event) => {
        event.preventDefault();
    
        const inputCity = this.enterCity.value;
        return inputCity;
    }

    removeInputText = () => {
        this.enterCity.value = '';
        this.enterCity.focus();
    }

    changeActiveBtnAllCities = (className) => {
        if (!this.tabOne.classList.contains(className)) {
            this.tabOne.classList.add(className)
            this.tabTwo.classList.remove(className)
        }
    }

    changeActiveBtnFavorite = (className) => {
        if (!this.tabTwo.classList.contains(className)) {
            this.tabTwo.classList.add(className);
            this.tabOne.classList.remove(className);
        }
    }

    updatePage = () => {
        const newUrl = history.replaceState(null, null, "#all-cities");
        return newUrl;
    }

}

export {View}










// class View {
//     constructor() {
//         this.form = document.querySelector('.form');
//         this.enterCity = document.querySelector('.enter-city');
//         this.searchCity = document.querySelector('.search-city');
//         this.cityWeather = document.querySelector('.city-weather');
//         this.listTabs = document.querySelector('.list-tabs')
//         this.textError = document.querySelector('.text-error');
//         this.tabOne = document.querySelector('.tab-one');
//         this.tabTwo = document.querySelector('.tab-two');
//         this.tabsContainer = document.querySelectorAll('.tabs-container');
//         this.popup = document.querySelector('.popup');
//         this.loader = document.querySelector('.loader');

//         this.NAME_TAB = {
//             ALL_CITIES: "tab-1",
//             FAVORITE: "tab-2",
//         }

//     }

//     toggleLoad = () => {
//         this.searchCity.classList.toggle('search-city-hiden');
//         this.loader.classList.toggle('loader-visible');
//     }

//     createElement = (tag, className) => {
//         let element = document.createElement(tag);
//         if (className) element.classList.add(className);
//         return element;
//     }

//     renderCityWeather = (arrayList) => {
//         this.cityWeather.innerHTML = '';

//         arrayList.forEach((city) => {
//             const favoriteClass = city.isFavorite ? "btn-favorite btn-favorite2" : "btn-favorite"
//             const elementDiv = this.createElement('div', "city-list");
//             elementDiv.setAttribute('id', city.id);

//             const cityList = `
//                              <div class="favorit">
//                              <button class="open-popup" data-action="open-popup">popup</button>
//                              <button class="${favoriteClass}" data-action="favorite"></button>
//                              </div>
//                               <h1 class="temp city-list__temp">${city.temp + '°'}c</h1>
//                               <h2 class="cityName city-list__cityName">${city.name}</h2>
//                               <div class="hum-wind city-list__hum-wind">
//                               <div class="humidity-wrapper hum-wind__humidity-wrapper">
//                               <img class="humidity-icon icon" src="img/humidity.png" alt="icon humidity">
//                               <div class="text-hum">
//                               <p class="humidity text-hum__humidity">${city.humidity + ' %'}</p>
//                               <p class="hum-wind-text">Humidity</p>
//                               </div>
//                               </div>
//                               <div class="wind-wrapper hum-wind__wind-wrapper">
//                               <img class="wind-icon icon" src="img/wind.png" alt="icon wind">
//                               <div class="text-wind">
//                               <p class="wind text-wind__wind">${city.wind + ' km/h'}</p>
//                               <p class="hum-wind-text">Wind</p>
//                               </div>
//                               </div>
//                               </div>
//                               <div class="button">
//                               <button type="button" data-action="delete" class="button-delete btn">delete</button>
//                               </div>                 
//            `;
//             elementDiv.innerHTML = cityList;
//             this.cityWeather.appendChild(elementDiv);
//         })
//     }

//     showMessageByEmptyText = () => {
//         const text = this.createElement('p', 'text-error');
//         text.innerHTML = "You must Enter city name";
//         this.textError.innerHTML = ''
//         this.textError.appendChild(text);
//     }

//     renderPopup = (info) => {
//         const temp = info.temp;
//         const name = info.name;
//         const humidity = info.humidity;
//         const wind = info.wind;

//         const elementDiv = this.createElement('div', "popup__content");
//         elementDiv.setAttribute('id', info.id)

//         const infoElement = ` 
//                               <div data-action="close" class="popup__close">&#10006</div>
    
//                               <h1 class="popup-temp">${temp + '°'}c</h1>
//                               <h2 class="popup-cityName">${name}</h2>
    
//                               <div class="popup-hum-wind ">
//                               <div class="popup-humidity-wrapper ">
//                               <img class="popup-wind-wrapper icon" src="img/humidity.png" alt="icon humidity">
//                               <div class="text">
//                               <p class="humidity">${humidity + ' %'}</p>
//                               <p class="popup-hum-wind-text">Humidity</p>
//                               </div>
//                               </div>
    
//                               <div class="wind-wrapper hum-wind__wind-wrapper">
//                               <img class="wind-icon icon" src="img/wind.png" alt="icon wind">
//                               <div class="text">
//                               <p class="wind">${wind + ' km/h'}</p>
//                               <p class="hum-wind-text">Wind</p>
//                               </div>
//                               </div>
//                               </div>

//                               <div class="button">
//                               <button type="button" data-action="delete-popup" class="button-delete btn">delete</button>
//                               </div> 
    
//                              `
//             ;

//         elementDiv.innerHTML = infoElement;
//         this.popup.appendChild(elementDiv);
//     }

//     clearPopup = () => {
//         this.popup.innerHTML = '';
//     }

//     openPopup = () => {
//         this.popup.classList.add('open-popup');
//         document.body.classList.add('stop-scrolling');
//     }

//     closePopup = (e) => {
//         this.popup.classList.remove('open-popup');
//         document.body.classList.remove('stop-scrolling');
//     }

//     getCityId = (event) => {
//         const parentNode = event.target.closest('.city-list');
//         if (!parentNode?.id) return;
//         const id = Number(parentNode.id);
//         return id;
//     }

//     getElementId = (event) => {
//         const parentNode = event.target.closest('.tabs');
//         const id = Number(parentNode.id);
//         return id;
//     }

//     getPopupId = (event) => {
//         const parentNode = event.target.closest('.popup__content');
//         if (!parentNode?.id) return;
//         const id = Number(parentNode.id);
//         return id;
//     }

//     getInputText = (event) => {
//         event.preventDefault();

//         const inputCity = this.enterCity.value;
//         return inputCity;
//     }

//     removeInputText = () => {
//         this.enterCity.value = '';
//         this.enterCity.focus();
//     }

//     changeActiveBtnAllCities = (className) => {
//         if (!this.tabOne.classList.contains(className)) {
//             this.tabOne.classList.add(className)
//             this.tabTwo.classList.remove(className)
//         }
//     }

//     changeActiveBtnFavorite = (className) => {
//         if (!this.tabTwo.classList.contains(className)) {
//             this.tabTwo.classList.add(className);
//             this.tabOne.classList.remove(className);
//         }
//     }

//     updatePage = () => {
//         const newUrl = history.replaceState(null, null, "#all-cities");
//         return newUrl;
//     }

// }

// export { View }