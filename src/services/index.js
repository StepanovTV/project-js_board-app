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
  userName: false,
  userToken: false,
  isAuthorized : false,

  refs: {
    btnRegAutoriz: document.querySelector('.authorization'),
  },

  // async register(email, password, name) {
  //   const obj = {
  //     email: email,
  //     password: password,
  //     name: name,
  //   };
  //   try {
  //     let result = await this.axios.post(
  //       'https://dash-ads.goit.co.ua/api/v1/auth/register',
  //       obj,
  //     );
  //     return result.data;
  //   } catch (error) {
  //     throw new Error(error);
  //   }
  // },

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
};
