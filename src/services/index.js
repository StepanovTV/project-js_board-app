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
  url: `https://dash-ads.goit.co.ua/api/v1`,
  pageLimit: 10,

  refs: {
    btnRegAutoriz: document.querySelector('.authorization'),
    outputMult: document.getElementById('outputMulti'),
    fileMult: document.querySelector('#fileMulti'),
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


  
  // get all ads by 10 per page
  async getAll() {
    try {
      const result = await this.axios.get(`${this.url}/ads/all`);
      return result.data.ads;
    } catch (error) {
      throw new Error(error);
    }
  },

  // search by keyword
  async searchAds(keyword, page) {
    try {
      const result = await this.axios.get(
        `${this.url}/ads/all?search=${keyword}&limit=${this.pageLimit}&page=${page}`,
      );
      return result.data.ads.docs;
    } catch (error) {
      throw new Error(error);
    }
  },

  //get ads by category id
  async getAdsByCategory(categoryId) {
    const result = await axios.get(
      `${this.url}/ads/all?category=${categoryId}`,
    );

    return result.data.ads.docs;
  },
  
  async register(email, password, name) {
    const obj = {
      email: email,
      password: password,
      name: name,
    };
    try {
      let result = await this.axios.post(
        `${this.url}/auth/register`,
        obj,
      );
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

};
