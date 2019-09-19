import adForm from '../../template/adForm.hbs';
import services from '../../services';
import handleFileSelect from '../loadImage/loadImage';

services.refs.newAdBut.onclick = () => {
  //Вітянуть ид объявления

  const instance = services.basicLightbox.create(adForm());
  instance.show();
  //Рефи всередині модалки
  const localRefs = {
    popup: document.querySelector('.js-ad-form'),
    fileMult: document.querySelector('#fileMulti'),
  }
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

    services.refs.adWrapper.insertAdjacentHTML(
      'afterbegin',
      `<li class="ad-item">
    <span class="ad-price">${product.price}</span>
    <img class="ad-img" src="${product.images[0]}" width="320" alt="${
          product.title
        }">
    <h2 class="ad-heading">${product.title}</h2>
  </li>`
    );

    instance.close(services.success('Оголошення', 'Додано'));
  });
};
