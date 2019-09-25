import services from '../../services/';
import renderingAd from '../../template/renderingAd.hbs';
import './rendering.css';

const handlOpenAdClick = e => {
  if (e.target === e.currentTarget) return;
  const adId = e.target.closest('.adsItem').dataset.adid;

  services.getAd(adId).then(data => {
    services.spinnerOff();
    const instance = services.basicLightbox.create(renderingAd(data));
    instance.show(() => {
      const btnfavorite = document.querySelector('#btnfavorite');
      const handlAddFavorite = ({target}) => {
        if(target.checked) {
          services.adFavorite(adId).then(console.log)
        }
      };
      btnfavorite.addEventListener('change', handlAddFavorite);
    });
  });

}
services.refs.adWrapper.addEventListener('click', handlOpenAdClick);
