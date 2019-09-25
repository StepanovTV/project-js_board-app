// импорт сервисы
// создать запрос на сервер
// получить избранные
// отрисовать в лич каб секцию избранного

import services from '../../services';
import favorithbs from './favorites.hbs';
import handlOpenAdClick from '../renderingAd';


export default function() {
  if (services.isAuthorized) {
       //  console.log(favorites);
      //  console.log('services.userFavorites', services.userFavorites);
      const favoriteResult = favorithbs(services.userFavorites);
      if(services.userFavorites.length === 0) return;
      // console.log(favoriteResult);
      document
        .querySelector('.favorite-section').innerHTML = favoriteResult;
      document
        .querySelector('.favoritList')
        .addEventListener('click', handlOpenAdClick);
    //   console.log(document.querySelector('.favoritList'));

  }
}
