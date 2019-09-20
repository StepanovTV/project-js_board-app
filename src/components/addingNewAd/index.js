import adForm from '../../template/adForm.hbs';
import services from '../../services';
import handleFileSelect from '../loadImage/loadImage';

services.refs.newAdBut.onclick = () => {
  //Вітянуть ид объявления

  if (!services.isAuthorized) {
    services.notice(
      'Вибачте ;(',
      'Для створення оголошення зареєструйтесь або авторизуйтесь.',
    );
    return;
  }

  console.log(services.categories);

  const instance = services.basicLightbox.create(adForm(services.categories));
  instance.show();

  //Рефи всередині модалки
  const localRefs = {
    popup: document.querySelector('.js-ad-form'),
    fileMult: document.querySelector('#fileMulti'),
  };
  localRefs.fileMult.addEventListener('change', handleFileSelect);
  localRefs.popup.addEventListener('submit', e => {
    e.preventDefault();

    //Перевірка на доданість фото
    let imagesControl;
    imagesControl = services.image;
    if (services.image.length === 0) {
      imagesControl = ['./img/no-photo-available.png'];
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
    console.log(product);

    services
      .postAd(product)
      .then(({ data }) => {
        console.log(data.ads);
        services.refs.adWrapper.insertAdjacentHTML(
          'afterbegin',
          `<li class="ad-item" data-adId="${data.ads.adsId}">
    <img class="ad-img" src="${data.ads.images[0]}" width="320" alt="${
            data.ads.title
          }">
    <h2 class="ad-heading">${data.ads.title}</h2>
    <span class="ad-price">Вартість ${data.ads.price} грн<</span>
  </li>`,
        );

        instance.close(services.success('Оголошення', 'Додано'));
      })
      .catch(console.error);
  });
};
