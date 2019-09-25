import services from '../../services';
import handleFileSelect from '../loadImage/loadImage';
import adForm from '../../template/adForm.hbs';
import templateDisplayAdsCards from '../../template/templateDisplayAdsCards.hbs';

import './addingAdd.css';

services.refs.newAdBut.onclick = () => {
  //Вітянуть ид объявления

  if (!services.isAuthorized) {
    services.notice(
      'Вибачте ;(',
      'Для створення оголошення зареєструйтесь або авторизуйтесь.',
    );
    return;
  }

  const instance = services.basicLightbox.create(adForm(services.categories));
  instance.show();

  //Рефи всередині модалки
  const localRefs = {
    popup: document.querySelector('.js-ad-form'),
    fileMult: document.querySelector('#fileMulti'),
    phoneMask: document.querySelector('.phone-mask'),
  };

  const im = new services.inputmask('+38-099-999-9999');
  im.mask(localRefs.phoneMask);

  localRefs.fileMult.addEventListener('change', handleFileSelect);
  localRefs.popup.addEventListener('submit', e => {
    e.preventDefault();

    //Перевірка на доданість фото
    let imagesControl;
    imagesControl = services.image;
    if (services.image.length === 0) {
      imagesControl = ['./images/no-image.jpg'];
    }

    //Об'єкт форми оголошення
    const product = {
      title: e.target.elements.title.value,
      category: Number(e.target.elements.category.value),
      price: Number(e.target.elements.price.value),
      phone: e.target.elements.phone.value,
      description: e.target.elements.description.value,
      images: imagesControl,
    };

    services
      .postAd(product)
      .then(data => {
        services.spinnerOff();

        services.resetPage();
        services.getAds().then(data => {
          services.refs.adsContainer.innerHTML = '';
          services.drawHTMLAllAdsByPage(data);
          services.spinnerOff();
        });

        services.getUser().then(data => {
          services.spinnerOff();
          if (data.status === 'success') {
            services.userAds = data.ads;
          }
        });

        instance.close(services.success('Оголошення', 'Додано'));
      })
      .catch(services.spinnerOff());
  });
};
