import axios from 'axios';
import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/es/PNotifyButtons';
import 'pnotify/dist/es/PNotifyStyleMaterial';
import * as basicLightbox from 'basiclightbox';
import infiniteScroll from 'infinite-scroll';
PNotify.defaults.styling = 'material';
PNotify.defaults.icons = 'material';

export default {
  axios: axios,
  PNotify: PNotify,
  basicLightbox: basicLightbox,
  infiniteScroll: infiniteScroll,
  image: [],
  product: null,
  category: '',

  refs: {
    btnRegAutoriz: document.querySelector('.authorization'),
    categoryList: document.querySelector('.filter-wrap'),
    addsContainer: document.querySelector('#ads-container'),
  },

  //Методы для всплывающих оповещений...
  notice(title, text) {
    this.PNotify.notice({
      title: title,
      text: text,
    });
  },
  info(title, text) {
    this.PNotify.info({
      title: title,
      text: text,
    });
  },
  success(title, text) {
    this.PNotify.success({
      title: title,
      text: text,
    });
  },
  error(title, text) {
    this.PNotify.error({
      title: title,
      text: text,
    });
  },

  giveCategory() {
    //with this fn you can take chosen by user category
    return this.category;
  },
  getCategory(category) {
    //returns chosen by user category
    this.category = category;
    console.log('services', this.category);
  },
  clearCategiry(cleanArr) {},
};
