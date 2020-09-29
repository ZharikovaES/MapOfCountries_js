let map = document.querySelector('.map');
let countriesArr = map.querySelectorAll('.map path');
let popupCode = `<div class="map-popup"><span class="map-popup__title"></span><p class="map-popup__text"></p></div>`;
let mapPopupText = 'description';

const defautltStyles = {
    colorCountry: '#f2f2f2',
    colorCountryActive: 'rgba(236, 205, 159, 0.705)',
    colorBorder: '#000000',
    colorBorderActive: 'rgba(236, 205, 159, 0.705)',

};

map.insertAdjacentHTML('beforeend', popupCode);
let mapPopUp = map.querySelector('.map-popup');

function countriesDefault(){

    for (let i = 0; i < countriesArr.length; i++){
        countriesArr[i].classList.add('map-country');
        countriesArr[i].style.fill = defautltStyles.colorCountry;
        countriesArr[i].style.stroke = defautltStyles.colorBorder;

        countriesArr[i].addEventListener('click', (e) => {
            countriesArr[i].classList.add('map-country--active');
            
            if (e.target.getAttribute('data-id') == mapPopUp.getAttribute('data-country-id')){
                console.log(1);
                mapPopUp.style.position = "static";
                mapPopUp.style.top = 0;
                mapPopUp.style.left = 0;
                mapPopUp.style.display = "none";
                let data = mapPopUp.getAttribute('data-country-id');
                map.querySelector(`path[data-id=${data}]`).style.fill = defautltStyles.colorCountry;
                map.querySelector(`path[data-id=${data}]`).style.stroke = defautltStyles.colorBorder;        

                mapPopUp.removeAttribute('data-country-id');
        
            } else{
                console.log(2);
                let data = mapPopUp.getAttribute('data-country-id');
                if (data != null){
                    map.querySelector(`path[data-id=${data}]`).style.fill = defautltStyles.colorCountry;
                    map.querySelector(`path[data-id=${data}]`).style.stroke = defautltStyles.colorBorder;        
                }

                let rect = countriesArr[i].getBoundingClientRect();

                let coordX = rect.left;
                let coordY = rect.top;
    
                let width = rect.width;
                let height = rect.height;
    
                let middleX = width / 2 + coordX + 'px';
                let middleY = height / 2 + coordY + 'px';
    
                mapPopupTitle = countriesArr[i].getAttribute('data-name');
                mapPopupID = countriesArr[i].getAttribute('data-id');
    
                mapPopUp.style.position = "absolute";
                mapPopUp.style.top = middleY;
                mapPopUp.style.left = middleX;
                mapPopUp.style.display = "block";
                mapPopUp.setAttribute('data-country-id', mapPopupID);

                countriesArr[i].style.fill = defautltStyles.colorCountryActive;
    
                mapPopUp.querySelector('.map-popup__title').innerText = mapPopupTitle;
                mapPopUp.querySelector('.map-popup__text').innerText = mapPopupText;
            }

        });
    }
}

document.querySelector('body').addEventListener('click', (e)=>{
    if (!mapPopUp.contains(e.target) && !e.target.hasAttribute('data-country-id') && !e.target.hasAttribute('data-id')){
        console.log(e.target, mapPopUp);
        mapPopUp.style.position = "static";
        mapPopUp.style.top = 0;
        mapPopUp.style.left = 0;
        mapPopUp.style.display = "none";
        let data = mapPopUp.getAttribute('data-country-id');
        if (mapPopUp.getAttribute('data-country-id') != null && map.querySelector(`path[data-id=${data}]`) != null) {
            map.querySelector(`path[data-id=${data}]`).style.fill = defautltStyles.colorCountry;
            map.querySelector(`path[data-id=${data}]`).style.stroke = defautltStyles.colorBorder;
            mapPopUp.removeAttribute('data-country-id');
        }
    }
});

function mapCountries(objectParams){
    defautltStyles = objectParams;
    

}




countriesDefault();
