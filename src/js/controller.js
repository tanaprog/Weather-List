class Controller {

    constructor(View, Model) {
        this.View = View;
        this.Model = Model;

        this.ACTIVE_TAB = View.NAME_TAB.ALL_CITIES;
    }

    async controllerCityWeather(e) {
        const inputText = await this.View.getInputText(e);
        this.View.toggleLoad();
        const city = await this.Model.getCityWeather(inputText);
        this.View.toggleLoad();

        View.textError.innerHTML = '';

        if (!inputText) {
            this.View.emptyText();
        } else {
            const newCityWeather = {
                id: Math.floor(Math.random() * 200) + 1,
                name: city.name,
                temp: Math.round(city.main.temp),
                humidity: city.main.humidity,
                wind: Math.round(city.wind.speed),
            }
            this.View.removeInputText();
            this.Model.addCityWeather(newCityWeather);
            this.View.renderCityWeather(this.Model.CITY_WEATHER);
        }
    }

    controllerCityButton(e) {
        const id = this.View.getCityId(e);
        const action = e.target.dataset.action;

        if (action === 'delete') {
            if (this.ACTIVE_TAB === this.View.NAME_TAB.FAVORITE) {
                this.Model.deleteCityWeather(id, this.Model.CITY_WEATHER);
                this.View.renderCityWeather(this.Model.CITY_WEATHER.filter((item) => item.isFavorite));
                this.View.changeActiveBtnFavorite();
            }
            if (this.ACTIVE_TAB === this.View.NAME_TAB.ALL_CITIES) {
                this.Model.deleteCityWeather(id, this.Model.CITY_WEATHER);
                this.View.renderCityWeather(this.Model.CITY_WEATHER);
                this.View.changeActiveBtnAllCities();
            }
        }

        if (action === 'favorite') {
            toggleFavoriteCity(id);
            if (this.ACTIVE_TAB === View.NAME_TAB.ALL_CITIES) {
                this.View.renderCityWeather(this.Model.CITY_WEATHER);
            }
            if (this.ACTIVE_TAB === View.NAME_TAB.FAVORITE) {
                this.View.renderCityWeather(this.Model.CITY_WEATHER.filter((item) => item.isFavorite));
            }
        }

        if (action === 'open-popup') {
            const infoIndex = this.Model.CITY_WEATHER.findIndex((item) => item.id === id);
            const info = this.Model.CITY_WEATHER[infoIndex];
            this.View.openPopup();
            this.View.renderPopup(info);
        }
    }

    controllerCityFavorite(e) {
        const tab = e.target.dataset.tab;

        if (tab === this.View.NAME_TAB.ALL_CITIES) {
            window.location.hash = "all-cities";
        }

        if (tab === this.View.NAME_TAB.FAVORITE) {
            window.location.hash = "favorite";
        }
    }

    controllerWeatherCards() {
        if (location.hash === "#all-cities") {
            this.ACTIVE_TAB = this.View.NAME_TAB.ALL_CITIES;
            this.View.renderCityWeather(this.Model.CITY_WEATHER);
            this.View.changeActiveBtnAllCities("active");
        }

        if (location.hash === "#favorite") {
            this.ACTIVE_TAB = this.View.NAME_TAB.FAVORITE;
            this.View.renderCityWeather(this.Model.CITY_WEATHER.filter((item) => item.isFavorite));
            this.View.changeActiveBtnFavorite("active");
        }
    }

    controllerPopup(e) {
        const id = this.View.getPopupId(e);
        const action = e.target.dataset.action;

        if (action === 'close') {
            this.View.closePopup();
            this.View.clearPopup();
        }

        if (action === 'favorite-popup') {
            this.Model.toggleFavoritePopup(id);
        }

        if (action === 'delete-popup') {
            this.Model.deletePopup(id);
            this.View.closePopup();
            this.View.clearPopup();
            this.View.renderCityWeather()
        }

        if (action === 'popup') {
            this.View.closePopup();
        }
    }

    init() {
        this.View.updatePage();
        this.View.renderCityWeather(this.Model.CITY_WEATHER);

        window.addEventListener("hashchange", this.controllerWeatherCards);
        this.View.form.addEventListener('submit', this.controllerCityWeather);
        this.View.cityWeather.addEventListener('click', this.controllerCityButton);
        this.View.listTabs.addEventListener('click', this.controllerCityFavorite);
        this.View.popup.addEventListener('click', this.controllerPopup);
    }

    init() {}

}


export { Controller }