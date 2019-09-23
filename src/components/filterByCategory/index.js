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


// services
//   .getAdsByCategory(idCat, page)
//   .then(data => {
//     let eachObj = data.map(elem => {
//       return services.hbs(elem);
//     });
//     services.refs.addsContainer.insertAdjacentHTML('beforeend', eachObj);
//   })
//   .catch(alert =>
//     alert('Виникла помилка, будь ласка спробуйте перезавантажити сторінку ;)'),
//   );

//   services.refs.categoryList.addEventListener('click', getAdsByCategory)
//       getAdsByCategory(idCat, page).then(event=>{
//         event.preventDefault();

//               const activelink = services.refs.categoryList.querySelector('.activeCategory')
//               if(event.currentTarget===event.target){
//                   return
//               }
//               if(activelink){
//                   activelink.classList.remove('.activeCategory')
//               }
//               event.target.classList.add('activeCategory')
//       } ).catch(err=>console.log('Виникла помилка, будь ласка спробуйте перезавантажити сторінку ;)')
//       )

//   function filterCat(event){
//       event.preventDefault();

//       const activelink = services.refs.categoryList.querySelector('.activeCategory')
//       if(event.currentTarget===event.target){
//           return
//       }
//       if(activelink){
//           activelink.classList.remove('.activeCategory')
//       }
//       event.target.classList.add('activeCategory')
//    }

function addNewPage(e) {
  e.preventDefault();
  services.refs.addPageBtn.setAttribute('page', ++privateCounter);
  let counter = e.target.attributes.page.value;




  services.getAdsByCategory(counter).then(data => {

    let renderToHtml = data.map(elem => {
      return template(elem);
    });
    services.refs.adsContainer.insertAdjacentHTML('beforeend', renderToHtml);

    if (data.totalPages <= counter) {
      e.target.setAttribute('disabled', 'disabled');
    }
  });
}

