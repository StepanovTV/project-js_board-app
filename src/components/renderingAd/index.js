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
      const userFavUnickum = services.userFavorites.some(
        elem => elem._id === adId,
      );
      if (userFavUnickum) {
        btnfavorite.setAttribute('checked', 'checked');
      } else {
        btnfavorite.removeAttribute('checked');
      }

      const handlAddFavorite = ({ target }) => {
        if (services.isAuthorized) {
          if (target.checked) {
            services.adFavorite(adId).then(data => {services.success("Доданно до 'Мої Обрані'", '')});
          } else {
            if (document.querySelector(`.favorit[data-adid="${adId}"]`)) {
              document.querySelector(`.favorit[data-adid="${adId}"]`).remove();
            }
            services.delFavorite(adId).then(data => {services.notice(
              "Вилучено з 'Мої Обрані'",
              '',
            );});
          }
        } else {
          services.notice(
            'Увага!!!!!',
            'Для додавання в обрані зайдіть або зареєструйтесь',
          );
        }
      };
      btnfavorite.addEventListener('change', handlAddFavorite);
    });
  });
};
services.refs.adWrapper.addEventListener('click', handlOpenAdClick);

export default handlOpenAdClick;
