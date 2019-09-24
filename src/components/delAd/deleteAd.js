import services from '../../services/index.js'



const actions = {
  EDIT: 'edit',
  DELETE: 'delete'
}



const deleteListItem = element => {

    const parentListItem = element.closest('li');

    const idAd = id.element;

    services.deleteAd(idAd)
      .then(() => {

        parentListItem.remove();

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
      console.log('open')

      if (target.nodeName !== 'BUTTON') return;

      const action = target.dataset.action;

      switch (action) {
        case actions.DELETE:

          deleteListItem(target);

          break;

        case actions.EDIT:
              console.log('opren file')
          break;

      };

    };



    profileRefs.htmlListAds.addEventListener('click', handleListClick);
  // services.editId.addEventListener('click', handleListClick);



