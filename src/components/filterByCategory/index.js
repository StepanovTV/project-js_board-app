import services from '../../services';
import template from '../../template/templateDisplayAdsCards.hbs';


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