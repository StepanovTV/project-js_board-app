import personalWindow from '../personal-area/html-personal-area';
import home from '../../services/index';
import './pers-area.css';
import templateCard from './userInfoProfile.hbs';
import templateList from './listCardProfile.hbs';
import massAds from './demoList';

const actions = {
  EDIT: 'edit',
  DELETE: 'delete',
};

home.refs.htmlButProfile.addEventListener('click', e => {
  // const userProfil = home.isAuthorized;
  const userProfil = localStorage.getItem('userName');

  if (!userProfil) {
    home.info('АВТОРИЗАЦИЯ', 'Для входа в личный кабинет авторизируйтесь');
    return;
  }

  personalWindow.show();

  drawInfoProfile();
});

function drawInfoProfile() {
  const infoCardUser = { name: home.userName };
  const newCards = templateCard(infoCardUser);

  // когда будут в базе реальные обьявки то залочить первую сроку и разлочить вторую
  // const newList = templateList(massAds);
  const newList = templateList(home.userAds);

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
    const selectCard = document.querySelector(`li[id="${target.id}"]`)
    
        home
      .deleteAd(target.id, usToken).then(() => {
        selectCard.remove();
        
      })
      .then(
        home.PNotify.success({
          title: 'Успешно!',
          text: ' Ваше сообщение удалено.',
        }),
      )
      .catch(error => {
        console.error(error);
        home.PNotify.error({
          title: 'Ошибка!',
          text: 'Ваше сообщение не было удалено.',
        });
      });
  }
}
