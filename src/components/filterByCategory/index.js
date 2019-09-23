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
      services.refs.adsContainer.innerHTML = ' ';
      let eachObj = data.forEach(elem => {
        services.refs.adsContainer.insertAdjacentHTML(
          'beforeend',
          template(elem),
        );
      });
    })
    .catch(alert => console.log(alert));
}

function addNewPage(e) {
  services.nextPage();
  switch (services.trigerShe) {
    case 'all':
      services.getAds().then(({ docs }) => {
        console.log(docs);
        let renderToHtml = docs
          .map(elem => {
            return template(elem);
          })
          .join('');
        services.refs.adsContainer.insertAdjacentHTML(
          'beforeend',
          renderToHtml,
        );
      });
      break;
    case 'serch':
      services.searchAds(services.searchValue).then(({ docs }) => {
        console.log(docs);
        console.log(docs);
        let renderToHtml = docs
          .map(elem => {
            return template(elem);
          })
          .join('');
        services.refs.adsContainer.insertAdjacentHTML(
          'beforeend',
          renderToHtml,
        );
      });
      break;
    default:
      services.error('не работает что-то))', '');
  }
  e.preventDefault();

  // services.refs.addPageBtn.setAttribute('page', ++privateCounter);
  // let counter = e.target.attributes.page.value;

  // services.getAdsByCategory(counter).then(data => {
  //   let renderToHtml = data.map(elem => {
  //     return template(elem);
  //   });
  //   services.refs.adsContainer.insertAdjacentHTML('beforeend', renderToHtml);

  //   if (data.totalPages <= counter) {
  //     e.target.setAttribute('disabled', 'disabled');
  //   }
  // });
}

const renderSearch = evt => {
  services.resetPages();
  services.trigerShe = 'serch';
  services.refs.adsContainer.innerHTML = '';
  evt.preventDefault();
  console.log(evt.target.elements);
  const [search] = evt.target.elements;
  console.log(search.value);
  services.searchValue = search.value;
  services.searchAds(search.value).then(({ docs }) => {
    console.log(docs);
    console.log(docs);
    let renderToHtml = docs
      .map(elem => {
        return template(elem);
      })
      .join('');
    services.refs.adsContainer.insertAdjacentHTML('beforeend', renderToHtml);
  });
};

services.refs.searchForm.addEventListener('submit', renderSearch);
