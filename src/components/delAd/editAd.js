
import services from '../../services/index.js';
import "./styles.css";
import template from '../../template/editAd.hbs';
// import services from '../../services';
// import handleFileSelect from '../loadImage/loadImage';
​import * as basicLightbox from 'basiclightbox';


const butEdit = document.querySelector('button[data-action="edit"]'),

const openModalonEdit = (event) => {
  services.changeAd(idAd, objAd)
.then(data=>{

  const instance = basicLightbox.create(template(data));
  instance.show();
});



  const localRefs = {
    popup: document.querySelector('.js-ad-form'),
    fileMult: document.querySelector('#fileMulti'),
  }
  localRefs.fileMult.addEventListener('change', handleFileSelect);
  localRefs.popup.addEventListener('submit', e => {
    e.preventDefault();



    const butSubmit = document.querySelector('button[data-action="submit"]');
const butCancel =document.querySelector('button[data-action="cancel"]');
butSubmit.addEventListener('click', handleFileSelect);
butCancel.addEventListener('click', handleFileSelect);


  //Перевірка на доданість фото
  let imagesControl;
  imagesControl = image;
  if (image.length === 0) {
    imagesControl = ['./img/no-photo-available.png'];
  }


      // Об'єкт форми оголошення
      const product = {
        title: e.target.elements.title.value,
        category: Number(e.target.elements.category.value),
        price: Number(e.target.elements.price.value),
        phone: e.target.elements.phone.value,
        description: e.target.elements.description.value,
        images: imagesControl,
      };
      console.log(product);
      
      instance.close(success('Оголошення', 'Редаговоно'));
    });
    console.log('event.target.checked',event.target.checked);

// }

butEdit.addEventListener('click', openModalonEdit);


};
