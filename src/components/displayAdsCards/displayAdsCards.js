import services from '../../services/index';
import axios from 'axios'
import templateDisplayAdsCards from '../../template/templateDisplayAdsCards.hbs';
import displayAdsCards from './displayAdsCards.css';


services.getAll().then(data => {
  data.docs.map(elem => {

    const markup = templateDisplayAdsCards(elem, {...elem.images = [elem.images[0]]});
    services.refs.adsContainer.insertAdjacentHTML('afterbegin', markup);
  })

});

