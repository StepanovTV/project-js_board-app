import services from './../../services/';
import template from './../../template/renderingAd.hbs'


const refs = {
  renderingAd: document.querySelector(".renderingAd")
}

// *********** Отрисовка  ***************************//
// console.log(services);

// services
//   .getAd(idAd)
//   .then(data => {
//     console.log(data.id);
//     const renderToHtml = template(data.id);
//     refs.renderingAd.insertAdjacentHTML('beforeend', renderToHtml);
//   })
//   .catch(error => console.log(error));





import * as basicLightbox from 'basiclightbox'

const instance = basicLightbox.create(
	document.querySelector('template')
)

instance.show()
