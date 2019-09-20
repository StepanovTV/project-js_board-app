import services from '../../services';
import template from './template.hbs';

services.refs.categoryList.addEventListener('click', findCategory);
services.refs.addPageBtn.addEventListener('click', addNewPage);

let privateCounter = 1;

function addNewPage(e) {
  e.preventDefault();
  services.refs.addPageBtn.setAttribute('page', ++privateCounter);
  let counter = e.target.attributes.page.value;
  console.log(counter);
  services.getAdds(counter).then(data => {
    if (data.totalPages <= counter) {
      e.target.setAttribute('disabled', 'disabled');
    }
  });
}

// function addNewPage(e) {
//   e.preventDefault();
//   services.getAll().then(data => {
//     console.log(data);

//     e.preventDefault();
//     services.refs.addPageBtn.setAttribute('page', ++privateCounter);
//     let counter = e.target.attributes.page.value;
//     console.log(counter);

//     if (data.totalPages <= counter) {
//       data.page = +counter;
//     }
//     if(data.totalPages <= counter){
//       e.target.setAttribute('disabled', 'disabled');
//     }
//   });
// }

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
  // console.log(services.refs.addsContainer);

  if (ClearButt === 'clear') {
    services.refs.addsContainer.innerHTML = ' ';
    services.getAll().then(data => {
      let renderToHtml = data.docs.map(elem => {
        return template(elem);
      });
      services.refs.addsContainer.insertAdjacentHTML('beforeend', renderToHtml);
    });
    chosenOne = '';
  }

  services
    .getAdsByCategory(chosenOne)
    .then(data => {
      services.refs.addsContainer.innerHTML = ' ';
      let eachObj = data.forEach(elem => {
        // console.log(elem);

        services.refs.addsContainer.insertAdjacentHTML(
          'beforeend',
          template(elem),
        );
      });
    })
    .catch(alert => console.log(alert));
}
