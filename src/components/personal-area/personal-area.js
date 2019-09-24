import personalWindow from '../personal-area/html-personal-area';
import services from '../../services/index';
import './pers-area.css';
import templateCard from './userInfoProfile.hbs';
import templateList from './listCardProfile.hbs';
import '../delAd/deleteAd';
import '../delAd/editAd';

import massAds from './demoList';


services.refs.htmlButProfile.addEventListener('click', e => {
  // const userProfil = services.isAuthorized;
  const userProfil = localStorage.getItem('userName');
  
  if (!userProfil) {
    services.info('АВТОРИЗАЦИЯ', 'Для входа в личный кабинет авторизируйтесь');
    return;
  }

  personalWindow.show();

  drawInfoProfile();
});

function drawInfoProfile() {
  const infoCardUser = { name: services.userName };
  const newCards = templateCard(infoCardUser);

  // когда будут в базе реальные обьявки то залочить первую сроку и разлочить вторую
  // const newList = templateList(massAds);
  const newList = templateList(services.userAds);

  const profileRefs = {
    htmlHederInfo: document.querySelector('.fio'),
    htmlListAds: document.querySelector('.list'),
  };

  profileRefs.htmlHederInfo.innerHTML = '';
  profileRefs.htmlListAds.innerHTML = '';

  profileRefs.htmlHederInfo.insertAdjacentHTML('afterbegin', newCards);
  profileRefs.htmlListAds.insertAdjacentHTML('afterbegin', newList);

  profileRefs.htmlListAds.addEventListener('click', handleListClick);
}

function handleListClick({ target }) {
  const usToken = localStorage.getItem('userToken');

  if (target.classList == 'dellIdAd') {
    const selectCard = document.querySelector(`li[id="${target.id}"]`);

    services
      .deleteAd(target.id, usToken)
      .then(() => {
        selectCard.remove();
        services.categories = JSON.parse(localStorage.getItem('categories'));
        services.getUser().then(data => {
          if (data.status === 'success') {
            services.userAds = data.ads;
          }
        });
      })
      .then(
        services.PNotify.success({
          title: 'Успешно!',
          text: ' Ваше сообщение удалено.',
        }),
      )
      .catch(error => {
        console.error(error);
        services.PNotify.error({
          title: 'Ошибка!',
          text: 'Ваше сообщение не было удалено.',
        });
      });
  }
}
