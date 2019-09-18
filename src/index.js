import services from './services';
// import addAd from './components/addingNewAd';
// CSS
import adForm from './template/adForm.hbs';
import 'material-design-icons/iconfont/material-icons.css';
import 'pnotify/dist/PNotifyBrightTheme.css';
import 'basiclightbox/dist/basicLightbox.min.css';
import './styles.css';
import './components/addingNewAd/addingAdd.css';

services.success('DONE', 'Все работает!!!');

const instance = services.basicLightbox.create(adForm());

services.refs.newAdBut.onclick = () => {
  instance.show();
  const popup = document.querySelector(".js-ad-form");
  popup.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log(e.target.elements);
    console.log(e.target.elements.category.value);
    const product = {
      title: e.target.elements.title.value,
      category: Number(e.target.elements.category.value),
      price: Number(e.target.elements.price.value),
      phone: e.target.elements.phone.value,
      description: e.target.elements.description.value,
      images: e.target.elements.images.value,
    };
    console.log(product);
    
    instance.close(services.success("Оголошення", "Додано"))
  })
  
}

// console.log(adForm());

// services.refs.adForm.addEventListener('submit', (e) => {
//   e.preventDefault();
//   console.log(e.target);
// })