class MapOfCountries {
    map = document.querySelector('.map');
    countriesArr = this.map.querySelectorAll('.map path');
    popupCode = `<div class="map-popup"><p class="map-popup__title"></p><p class="map-popup__text"></p></div>`;
    mapPopupText = 'description';

    defautltStyles = {
        colorCountry: '#f2f2f2',
        colorCountryActive: 'rgba(236, 205, 159, 0.705)',
        colorBorder: '#000000',
        colorBorderActive: 'rgba(236, 205, 159, 0.705)',
    };

    constructor(data) {
        this.dataToDefault(data);

        this.map.insertAdjacentHTML('beforeend', this.popupCode);
        this.mapPopUp = this.map.querySelector('.map-popup');

        this.countriesDefault();

        document.querySelector('body').addEventListener('click', (e)=>{
            if (!this.mapPopUp.contains(e.target) && !e.target.hasAttribute('data-country-id') && !e.target.hasAttribute('data-id')){
                this.setDefaultStyles();
            }
        });
    }

    dataToDefault(data) {
        if (data !== undefined) {
            if (data.popupCode !== undefined) this.popupCode = data.popupCode;
            if (data.mapPopupText !== undefined) this.mapPopupText = data.mapPopupText;
            if (data.styles !== undefined) {
                if (data.styles.colorCountry !== undefined) this.defautltStyles.colorCountry = data.styles.colorCountry;
                if (data.styles.colorCountryActive !== undefined) this.defautltStyles.colorCountryActive = data.styles.colorCountryActive;
                if (data.styles.colorBorder !== undefined) this.defautltStyles.colorBorder = data.styles.colorBorder;
                if (data.styles.colorBorderActive !== undefined) this.defautltStyles.colorBorderActive = data.styles.colorBorderActive;
            }
        }
    }

    countriesDefault(){
        for (let i = 0; i < this.countriesArr.length; i++){
            this.countriesArr[i].classList.add('map-country');
            this.countriesArr[i].style.fill = this.defautltStyles.colorCountry;
            this.countriesArr[i].style.stroke = this.defautltStyles.colorBorder;
    
            this.countriesArr[i].addEventListener('click', (e) => {
                this.countriesArr[i].classList.add('map-country--active');
                
                if (e.target.getAttribute('data-id') == this.mapPopUp.getAttribute('data-country-id')){
                    this.setDefaultStyles();
                } else{
                    let data = this.mapPopUp.getAttribute('data-country-id');
    
                    if (data != null){
                        this.map.querySelector(`path[data-id=${data}]`).style.fill = this.defautltStyles.colorCountry;
                        this.map.querySelector(`path[data-id=${data}]`).style.stroke = this.defautltStyles.colorBorder;        
                    }
        
                    this.mapPopupTitle = this.countriesArr[i].getAttribute('data-name');
                    this.mapPopupID = this.countriesArr[i].getAttribute('data-id');
        
                    this.mapPopUp.style.position = "absolute";
                    this.mapPopUp.style.top = this.getCoordCenterOfCountry(this.countriesArr[i]).middleY;
                    this.mapPopUp.style.left = this.getCoordCenterOfCountry(this.countriesArr[i]).middleX;
                    this.mapPopUp.style.display = "block";
                    this.mapPopUp.setAttribute('data-country-id', this.mapPopupID);
    
                    this.countriesArr[i].style.fill = this.defautltStyles.colorCountryActive;
                    if (this.mapPopUp.querySelector('.map-popup__title') !== undefined) this.mapPopUp.querySelector('.map-popup__title').innerText = this.mapPopupTitle;
                    if (this.mapPopUp.querySelector('.map-popup__text') !== undefined) this.mapPopUp.querySelector('.map-popup__text').innerText = this.mapPopupText;
                }
            });
        }
    }

    getCoordCenterOfCountry(country){
        let rect = country.getBoundingClientRect();
    
        let coordX = rect.left;
        let coordY = rect.top;
    
        let width = rect.width;
        let height = rect.height;
    
        let middleX = width / 2 + coordX + 'px';
        let middleY = height / 2 + coordY + 'px';
    
        return {middleX, middleY};
    }

    setDefaultStyles() {
        this.mapPopUp.style.position = "static";
        this.mapPopUp.style.top = 0;
        this.mapPopUp.style.left = 0;
        this.mapPopUp.style.display = "none";
        let data = this.mapPopUp.getAttribute('data-country-id');
        if (this.mapPopUp.getAttribute('data-country-id') != null && this.map.querySelector(`path[data-id=${data}]`) != null) {
            this.map.querySelector(`path[data-id=${data}]`).style.fill = this.defautltStyles.colorCountry;
            this.map.querySelector(`path[data-id=${data}]`).style.stroke = this.defautltStyles.colorBorder;
            this.mapPopUp.removeAttribute('data-country-id');
        }
    }
}

const map = new MapOfCountries();
