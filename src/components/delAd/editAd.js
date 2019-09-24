
import editAd from '../../template/editAd.hbs';
import services from '../../services';
import handleFileSelect from '../loadImage/loadImage';
import drawInfoProfile from '../personal-area/personal-area'

export default function editFn  (element)  {


services.getAd(element.id).then ((obj) => {
  services.spinnerOff();


const instance = services.basicLightbox.create(editAd(obj));
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

    // Об'єкт форми оголошення
    const product = {
      title: e.target.elements.title.value,
      
      price: Number(e.target.elements.price.value),
      phone: e.target.elements.phone.value,
      description: e.target.elements.description.value,
      images: imagesControl,
    };

    //change ad
  // в obj прописуються ті поля, які змінюються



    services
      .changeAd(element.id, product )
      .then(({ data }) => {



        services.categories = JSON.parse(localStorage.getItem('categories'));
        services.getUser().then(data => {
          if (data.status == 'success') {
            services.userAds = data.ads;
            drawInfoProfile();
            services.spinnerOff();
          }
        });


        instance.close(services.success('Ваше оголошення', 'Редаговано'));
      }
      )
      .catch(console.error);
  });



});


};



