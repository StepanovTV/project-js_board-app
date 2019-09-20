import services from '../../services/index';
import axios from 'axios'
// import fictiveTempInfo from './fictiveTemplateCard.json';
import templateDisplayAdsCards from '../../template/templateDisplayAdsCards.hbs';
import displayAdsCards from './displayAdsCards.css';


services.getAll().then(res => {

  // console.log(res);
  const docs = res.docs;
  // console.log(docs);


});

services.getAll().then(data => {
  data.docs.map(elem => {
    // console.log('elem',elem)
    console.log('images',elem.images)

    const markup = templateDisplayAdsCards(elem, {...elem.images = [elem.images[0]]});
    // console.log(markup);
    services.refs.adsContainer.insertAdjacentHTML('beforeend', markup);
  })

});
console.log(services.getAll());




// services
//     .getAdsByCategory(2)
//     .then(data => {
//       services.refs.addsContainer.innerHTML = ' ';
//       let eachObj = data.forEach(elem => {
//         console.log(elem);

//         services.refs.addsContainer.insertAdjacentHTML('beforeend', templateDisplayAdsCards(elem));
//       });
//     })
//     .catch(alert => console.log(alert));
