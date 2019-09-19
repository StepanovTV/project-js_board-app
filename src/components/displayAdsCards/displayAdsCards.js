import displayAdsCards from './displayAdsCards.css';
import services from '../../services/index.js';
import fictiveTempInfo from './fictiveTemplateCard.json';
import templateDisplayAdsCards from '../../template/templateDisplayAdsCards.hbs';

// console.log(templateDisplayAdsCards);
// console.log(fictiveTempInfo);


// привязываем к ul фиктивный массив объектов
const refs = {
  listDisplayAds: document.querySelector('.js-displayAdsCards'),
};
// // отрисовываем фиктивный массив объектов
// const markup = templateDisplayAdsCards(fictiveTempInfo[0]);
// refs.listDisplayAds.insertAdjacentHTML('beforeend', markup);


fictiveBuildCardAds(fictiveTempInfo);

function fictiveBuildCardAds(cards) {
  const markup = cards.map(card => templateDisplayAdsCards(card)).join('');
  console.log(markup);
  // отрисовываем фиктивный массив объектов
  refs.listDisplayAds.insertAdjacentHTML('beforeend', markup);
}








// services.getAds()
// .then(res => console.log(res));
// .catch(el => console.log());

/*
displayAdsMainPage(card);

function displayAdsMainPage(cars) {
  const arr = arr.map(element, index) => {
    if(index === 0) return " ";
    return `img src ${element}`
  }
}
*/
