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
      parentListItem.remove();
      services.categories = JSON.parse(localStorage.getItem('categories'));
      services.getUser().then(data => {
        if (data.status === 'success') {
          services.userAds = data.ads;
        }
      });
    })
    .then(
      services.PNotify.success({
        title: 'Успішно!',
        text: 'Ваше повідомлення видалено',
      }),
    )
    .catch(error => {
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
