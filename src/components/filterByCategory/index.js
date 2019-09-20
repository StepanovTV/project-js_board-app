import services from '../../services';
import template from '../../template/templateDisplayAdsCards.hbs';

services.refs.categoryList.addEventListener('click', findCategory);
services.refs.addPageBtn.addEventListener('click', addNewPage);

let privateCounter = 1;

function buttonDrow() {
  services.getAll().then(data => {
    let eachCat = data.categories.map(elem => {
      return `<button id='${elem._id}'>${elem.category}</button>`;
    });

    eachCat.forEach(elem => {
      services.refs.categoryList.insertAdjacentHTML('afterbegin', elem);
    });
  });
}

buttonDrow();

function findCategory(event) {
  event.preventDefault();
  //   console.log(event.target);
  let chosenBut = event.target;
  let chosenOne = event.target.getAttribute('id');
  let ClearButt = event.target.dataset.name;

  if (chosenBut === event.currentTarget) {
    return;
  }

  if (chosenBut.classList.contains('disabled')) {
  } else {
    let allBut = services.refs.categoryList.querySelectorAll('button');
    allBut.forEach(element => {
      element.removeAttribute('disabled');
    });
    chosenBut.setAttribute('disabled', 'disabled');
  }
  // console.log(services.refs.adsContainer);

  if (ClearButt === 'clear') {
    services.refs.adsContainer.innerHTML = ' ';
    services.getAll().then(data => {
      let renderToHtml = data.docs.map(elem => {
        return template(elem);
      });
      services.refs.adsContainer.insertAdjacentHTML('beforeend', renderToHtml);
    });
    chosenOne = '';
  }
  services.categoryId = chosenOne;


  services
    .getAdsByCategory(chosenOne)
    .then(data => {
      console.log(data);

      services.refs.adsContainer.innerHTML = ' ';
      let eachObj = data.forEach(elem => {
        // console.log(elem);

        services.refs.adsContainer.insertAdjacentHTML(
          'beforeend',
          template(elem),
        );
      });
    })
    .catch(alert => console.log(alert));
}

function addNewPage(e) {
  e.preventDefault();
  console.log(services.categoryId, );
  services.refs.addPageBtn.setAttribute('page', ++privateCounter);
  let counter = e.target.attributes.page.value;
  // console.log(counter);

  console.log(services.getAdsByCategory(services.categoryId, counter));

  // services.getAdsByCategory(services.categoryId, counter).then(data => {
  //   console.log(data);
  //   let renderToHtml = data.docs.map(elem => {
  //     return template(elem);
  //   });
  //   services.refs.adsContainer.insertAdjacentHTML('beforeend', renderToHtml);

  //   if (data.totalPages <= counter) {
  //     e.target.setAttribute('disabled', 'disabled');
  //   }
  // });
}
