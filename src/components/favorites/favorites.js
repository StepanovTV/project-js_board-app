// импорт сервисы
// создать запрос на сервер
// получить избранные
// отрисовать в лич каб секцию избранного

import services from '../../services';
import favorithbs from './favorites.hbs';
import handlOpenAdClick from '../renderingAd';


export default function() {
  if (services.isAuthorized) {
    services.getUserFavourites().then(({ favorites }) => {
      services.userFavorites = favorites;
      //  console.log(favorites);
      //  console.log('services.userFavorites', services.userFavorites);
      const favoriteResult = favorithbs(services.userFavorites);
      console.log(favoriteResult);
      document
        .querySelector('.modalProfile')
        .insertAdjacentHTML('beforeend', favoriteResult);

      document
        .querySelector('.favoritList')
        .addEventListener('click', handlOpenAdClick);
    //   console.log(document.querySelector('.favoritList'));
    });
  }
}
