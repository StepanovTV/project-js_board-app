import services from '../../services/';
import renderingAd from '../../template/renderingAd.hbs';
import './rendering.css';

const handlOpenAdClick = e => {
  if (e.target === e.currentTarget) return;
  const adId = e.target.closest('.adsItem').dataset.adid;
  console.log(adId);
  
  services.getAd(adId).then(data => {
    services.spinnerOff();
    const instance = services.basicLightbox.create(renderingAd(data));
    instance.show();
  });
};

services.refs.adWrapper.addEventListener('click', handlOpenAdClick);

export default handlOpenAdClick;
