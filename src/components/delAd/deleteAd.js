import services from '../../services/index.js';

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
};

const handleListClick = ({ target }) => {
  if (target.nodeName !== 'BUTTON') return;

  const action = target.dataset.action;

  switch (action) {
    case actions.DELETE:
      deleteListItem(target);

      break;

    case actions.EDIT:
      console.log('opren file');
      break;
  }
};

// function listener

// profileRefs.htmlListAds.addEventListener('click', handleListClick);

export function addListenerEditDel() {
  const editId = document.querySelector('.list');
  editId.addEventListener('click', handleListClick);
}
