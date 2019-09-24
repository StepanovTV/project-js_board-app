import editAd from '../../template/editAd.hbs';
import listCardProfile from '../../template/listCardProfile.hbs';
import services from '../../services';
import personalArea from '../personal-area/personal-area';
import "./styles.css";

const parentListItem = element.closest('li');
const idAd = parentListItem.dataset.idAd;

personalArea.actions.DELETE(idAd)


function handleEditClick () {
  //Вітянуть ид объявления

  if (!services.isAuthorized) {
    services.notice(
      'Ой ;(',
      'Чого це ви не хочете редагувати?',
    );
    return;
  }


}

  const instance = services.basicLightbox.create(adForm(editAd));
  instance.show();

  //Рефи всередині модалки
  const localRefs = {
     butEdit = document.querySelector('button[data-action="edit id"]'),
    fileMult: document.querySelector('#fileMulti'),
  };
  localRefs.fileMult.addEventListener('change', handleFileSelect);
  localRefs.butEdit.addEventListener('submit', e => {
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



        instance.close(services.success('Оголошення', 'Редаговано'));
      })
      .catch(console.error);

};

const refsLol = {
  editBut: document.querySelector.button('[data-action="edit"]'),
}
refsLol.editBut.addEventListener('click', handleEditClick);






// // import services from '../../services/index.js';
// // import "./styles.css";
// // import template from '../../template/editAd.hbs';

// // // import handleFileSelect from '../loadImage/loadImage';
// // ​import * as basicLightbox from 'basiclightbox';


// // const butEdit =  document.querySelector('button[data-action="edit"]'),

// // const openModalonEdit = (event) => {
// //   services.changeAd(idAd, objAd)
// // .then(data=>{




// //   const localRefs = {
// //     popup: document.querySelector('.js-ad-form'),
// //     fileMult: document.querySelector('#fileMulti'),
// //   }
// //   localRefs.fileMult.addEventListener('change', handleFileSelect);
// //   localRefs.popup.addEventListener('submit',



// //     const butSubmit = document.querySelector('button[data-action="submit"]');
// // const butCancel =document.querySelector('button[data-action="cancel"]');
// // butSubmit.addEventListener('submit', handleFileSelect);
// // butCancel.addEventListener('click', handeCancel);


// //   //Перевірка на доданість фото
// //   let imagesControl;
// //   imagesControl = image;
// //   if (image.length === 0) {c-available.png'];
// //   }


// //       // Об'єкт форми оголошення
// //       const product = {
// //         title: e.target.elements.title.value,
// //         category: Number(e.target.elements.category.value),
// //         price: Number(e.target.elements.price.value),
// //         phone: e.target.elements.phone.value,
// //         description: e.target.elements.description.value,
// //         images: imagesControl,
// //       };






// //       instance.close(success('Оголошення', 'Редаговоно'));
// //     });


// // butEdit.addEventListener('click', openModalonEdit);


// // };
