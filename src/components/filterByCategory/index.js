import services from '../../services';
import template from '../../template/templateDisplayAdsCards.hbs';

// services.refs.categoryList.addEventListener('click', findCategory);
// services.refs.addPageBtn.addEventListener('click', addNewPage);

function buttonDrow() {
  services.getAds().then(data => {
    let eachCat = data.categories
      .map(elem => {
        return `<button id='${elem._id}' class='btnCategory'>${elem.category}</button>`;
      })
      .join('');
    services.refs.categoryList.insertAdjacentHTML('afterbegin', eachCat);
  });
}

buttonDrow();

function findCategory(e) {
  e.preventDefault();
  if (e.target === e.currentTarget) return;

  if (e.target.dataset.name === 'clear') {
    services.trigerShe='all'
    services.refs.adsContainer.innerHTML = '';
    services.resetPage();
    services.getAds().then(data => {
      services.drawHTMLAllAdsByPage(data);
    });
  } else if (e.target.classList.contains('btnCategory')) {
    services.trigerShe='category';
    let chosenBut = event.target;
    if (chosenBut.classList.contains('isActiveCategory')) {
        } else {
          let allBut = services.refs.categoryList.querySelectorAll('button');
          allBut.forEach(element => {
            element.classList.remove('isActiveCategory');
          });
          chosenBut.classList.add('isActiveCategory');
        }
    services.resetPage();
    services.setCategory(e.target.id);
    services.getAdsByCategory().then(data => {
      services.hasNextPage = data.hasNextPage;

      if (!services.hasNextPage) {
        services.refs.addPageBtn.style.display = 'none';
      } else {
        services.refs.addPageBtn.style.display = 'inline-block';
      }

      const collectPage = data.docs
        .map(elem => {
          return template(elem, {
            ...(elem.images = elem.images[0]),
          });
        })
        .join('');
      services.nextPage();
      services.refs.adsContainer.innerHTML = '';
      services.refs.adsContainer.insertAdjacentHTML('beforeend', collectPage);
      services.hasNextPage = data.hasNextPage;
    });
  }
}

services.refs.categoryList.addEventListener('click', findCategory);

// services.refs.categoryList.addEventListener('click', findCategory);
// // services.refs.addPageBtn.addEventListener('click', addNewPage);

// let privateCounter = 1;

// function buttonDrow() {
//   services.getAds().then(data => {
//     let eachCat = data.categories.map(elem => {
//       return `<button id='${elem._id}'>${elem.category}</button>`;
//     });

//     eachCat.forEach(elem => {
//       services.refs.categoryList.insertAdjacentHTML('afterbegin', elem);
//     });
//   });
// }

// buttonDrow();

// function findCategory(event) {
//   event.preventDefault();

//   let chosenBut = event.target;
//   let chosenOne = event.target.getAttribute('id');
//   let ClearButt = event.target.dataset.name;

//   if (chosenBut === event.currentTarget) {
//     return;
//   }

//   if (chosenBut.classList.contains('disabled')) {
//   } else {
//     let allBut = services.refs.categoryList.querySelectorAll('button');
//     allBut.forEach(element => {
//       element.removeAttribute('disabled');
//     });
//     chosenBut.setAttribute('disabled', 'disabled');
//   }

//   if (ClearButt === 'clear') {
//     services.refs.adsContainer.innerHTML = ' ';
//     services.getAds().then(data => {
//       let renderToHtml = data.docs.map(elem => {
//         return template(elem);
//       });
//       services.refs.adsContainer.insertAdjacentHTML('beforeend', renderToHtml);
//     });
//     chosenOne = '';
//   }
//   services.categoryId = chosenOne;

//   services
//     .getAdsByCategory(chosenOne)
//     .then(data => {

//       services.refs.adsContainer.innerHTML = ' ';
//       let eachObj = data.forEach(elem => {

//         services.refs.adsContainer.insertAdjacentHTML(
//           'beforeend',
//           template(elem),
//         );
//       });
//     })
// .catch(alert => console.log(alert));
// }

// function addNewPage(e) {
//   e.preventDefault();
//   services.refs.addPageBtn.setAttribute('page', ++privateCounter);
//   let counter = e.target.attributes.page.value;

//   services.getAdsByCategory(counter).then(data => {

//     let renderToHtml = data.map(elem => {
//       return template(elem);
//     });
//     services.refs.adsContainer.insertAdjacentHTML('beforeend', renderToHtml);

//     if (data.totalPages <= counter) {
//       e.target.setAttribute('disabled', 'disabled');
//     }
//   });
// }
