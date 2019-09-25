import services from '../../services/index.js';
import editFn from './editAd'



const actions = {
  EDIT: 'edit',
  DELETE: 'delete',
};

const deleteListItem = element => {
  const usToken = localStorage.getItem('userToken');
  const parentListItem = element.closest('li');
  const idAd = element.id;

  services
    .deleteAd(idAd, usToken)
    .then(() => {
      services.spinnerOff();
      parentListItem.remove();
      services.categories = JSON.parse(localStorage.getItem('categories'));
      services.getUser().then(data => {
        services.spinnerOff();
        if (data.status === 'success') {
          services.resetPage();
          services.getAds().then(data => {
            services.refs.adsContainer.innerHTML = '';
            services.drawHTMLAllAdsByPage(data);
            services.spinnerOff();
          });
          services.userAds = data.ads;
          services.success('Успішно!', 'Ваше повідомлення видалено');
        }
      });
    }).catch(error => {
      console.error(error);
      services.PNotify.error({
        title: 'Помилка!',
        text: 'Ваше повідомлення не видалено.',
      });
    });
};

const handleListClick = ({ target }) => {
  if (target.nodeName !== 'BUTTON') return;

  const action = target.dataset.action;

  switch (action) {
    case actions.DELETE:
      deleteListItem(target);

      break;

    case actions.EDIT:
    editFn(target);
      break;
  }
};



export function addListenerEditDel() {
  const editId = document.querySelector('.list');
  editId.addEventListener('click', handleListClick);
}
