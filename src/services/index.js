import axios from 'axios';
import PNotify from 'pnotify/dist/es/PNotify';
import 'pnotify/dist/es/PNotifyButtons';
import 'pnotify/dist/es/PNotifyStyleMaterial';
import * as basicLightbox from 'basiclightbox';
import infiniteScroll from 'infinite-scroll';
import templateDisplayAdsCards from '../template/templateDisplayAdsCards.hbs';

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
  categoryId: false,
  userName: false,
  userToken: false,
  isAuthorized: false,
  url: `https://dash-ads.goit.co.ua/api/v1`,
  pageLimit: 10,
  userAds: false,
  categories: false,
  page: 1,
  trigerShe: 'all',
  hasNextPage: null,
  searchValue: '',

  refs: {
    btnRegAutoriz: document.querySelector('.authorization'),
    categoryList: document.querySelector('.filter-wrap'),
    adsContainer: document.querySelector('#ads-container'),
    addPageBtn: document.querySelector('.addPage'),
    btnRegAutoriz: document.querySelector('.authorization'),
    outputMult: document.getElementById('outputMulti'),
    fileMult: document.querySelector('#fileMulti'),
    htmlButProfile: document.querySelector('#Login'),
    newAdBut: document.querySelector('.js-new-ad'),
    adForm: document.querySelector('.js-ad-form'),
    popupfom: document.querySelector('.popupfom'),
    adWrapper: document.querySelector('.ad-wrapper'),
    spinner: document.querySelector('#spinner'),
    exitbtn: document.querySelector('.exitbtn'),
    adsContainer: document.querySelector('#ads-container'),
    
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
  setCategory(category) {
    //returns chosen by user category
    this.category = category;
  },

  giveCategoryId() {
    //with this fn you can take chosen by user category
    return this.categoryId;
  },
  getCategoryId(categoryid) {
    //returns chosen by user category
    this.categoryId = categoryid;
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
      let result = await this.axios.post(`${this.url}/auth/register`, obj);
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  async getUser() {
    const heders = {
      headers: {
        Authorization: this.userToken,
      },
    };
    try {
      let result = await this.axios.get(`${this.url}/ads`, heders);
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },
  async userAutorization(obj) {
    try {
      let result = await this.axios.post(`${this.url}/auth/login`, obj);
      return result.data;
    } catch (error) {
      throw new Error(error);
    }
  },

  //get ad by id
  async getAd(adId) {
    try {
      const result = await this.axios.get(`${this.url}/ads/${adId}`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return result.data.goal;
    } catch (error) {
      throw new Error(error);
    }
  },
  //post new ad
  async postAd(obj) {
    try {
      let result = await this.axios.post(`${this.url}/ads`, obj, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: this.userToken,
        },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },

  // get ads by page
  async getAds() {
    try {
      const result = await this.axios.get(
        `${this.url}/ads/all?limit=${this.pageLimit}&page=${this.page}`,
      );
      return result.data.ads;
    } catch (error) {
      throw new Error(error);
    }
  },

  // ++ Added new TWO METHODS
  nextPage() {
    this.page += 1;
  },

  resetPage() {
    this.page = 1;
  },

  //get ad by id
  async getAd(adId) {
    try {
      const result = await this.axios.get(`${this.url}/ads/${adId}`);
      return result.data.goal;
    } catch (error) {
      throw new Error(error);
    }
  },

  //delete ad
  async deleteAd(adId, token) {
    try {
      let result = await this.axios.delete(`${this.url}/ads/${adId}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },

  async logout(email, password, token) {
    const obj = {
      email: email,
      password: password,
    };
    try {
      let result = await this.axios.post(`${this.url}/auth/logout`, obj, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      return result;
    } catch (error) {
      throw new Error(error);
    }
  },
  //get ads by category id
  async getAdsByCategory() {
    try {
      const result = await axios.get(
        `${this.url}/ads/all?category=${this.giveCategory()}&page=${this.page}`,
      );
      return result.data.ads;
    } catch (error) {
      throw new Error(error);
    }
  },

  drawHTMLAllAdsByPage(data) {
    const collectPage = data.docs
      .map(elem => {
        return templateDisplayAdsCards(elem, {
          ...(elem.images = elem.images[0]),
        });
      })
      .join('');
    this.nextPage();
    this.refs.adsContainer.insertAdjacentHTML('beforeend', collectPage);
    this.hasNextPage = data.hasNextPage;

    if (!this.hasNextPage) {
      this.refs.addPageBtn.style.display = 'none';
    } else {
      this.refs.addPageBtn.style.display = 'inline-block';
    }
  },

  drawHTMLbyCategoryId(data){
      this.hasNextPage = data.hasNextPage;

      if (!this.hasNextPage) {
        this.refs.addPageBtn.style.display = 'none';
      } else {
        this.refs.addPageBtn.style.display = 'inline-block';
      }

      const collectPage = data.docs
        .map(elem => {
          return templateDisplayAdsCards(elem, {
            ...(elem.images = elem.images[0]),
          });
        })
        .join('');
        this.nextPage();
        this.refs.adsContainer.insertAdjacentHTML('beforeend', collectPage);
        this.hasNextPage = data.hasNextPage;
  }
};
