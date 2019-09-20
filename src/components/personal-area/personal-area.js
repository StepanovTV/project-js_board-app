import personalWindow from '../personal-area/html-personal-area';
import home from '../../services/index';
import './pers-area.css';
import templateCard from './userInfoProfile.hbs';
import templateList from './listCardProfile.hbs';
import massAds from './demoList';

home.refs.htmlButProfile.addEventListener('click', e => {
  const userProfil = home.isAuthorized;
  if (userProfil == false) {
    home.info('АВТОРИЗАЦИЯ', 'Для входа в личный кабинет авторизируйтесь');
    return;
  }
  
  personalWindow.show();
  drawInfoProfile () ;
  
});


function drawInfoProfile () {
  const infoCardUser = {name: home.userName,}
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
}
