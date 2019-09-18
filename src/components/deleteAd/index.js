import services from '../../services/index.js'

const refs = {
  // buttonDel: document.querySelector('.buttonDel'),
  list: document.querySelector('.list'),
  // buttonEdit: document.querySelector('.edit'),
};

const actions = {
  EDIT: 'edit',
  DELETE: 'delete'
}


// deleteAd(id) {
//   this._items = this._items.filter(item => item.id !== id); // метод удаления айди
// }
// const model = new Model(data);

// services.deleteAd(adId);


const deleteListItem = element => {

    const parentListItem = element.closest('li');

    const id = parentListItem.dataset.id;

    services.deleteAd(id)
      .then(() => {
        // model.delete(id); // удаление обьекта из массива( из базы данных )
        element.remove(); // удаление из дом дерева (интерфейс)

      })
      .then(
        PNotify.success({
          title: 'Успешно!',
          text: ' Ваше сообщение удалено.',
        }),
      )
      .catch(error => {
        console.error(error);
        PNotify.error({
          title: 'Ошибка!',
          text: 'Ваше сообщение не было удалено.'
        });
      });
    };


    const handleListClick = ({
      target
    }) => {

      if (target.nodeName !== 'BUTTON') return;

      const action = target.dataset.action;

      switch (action) {
        case actions.DELETE:

          deleteListItem(target);

          break;


        case actions.EDIT:
          console.log('edit');
          break;

      };

    };


    // refs.buttonDel.addEventListener('click', deleteAdFn);
    refs.list.addEventListener('click', handleListClick);
    // refs.buttonEdit.addEventListener('click', editAdFn);
