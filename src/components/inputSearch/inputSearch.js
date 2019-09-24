import services from '../../services';
import templateDisplayAdsCards from '../../template/templateDisplayAdsCards.hbs';
const handelSearchSubmit = e => {
  e.preventDefault();

  services.searchValue = e.target.elements.search.value;
  services.resetPage();
  services.searchAds().then(data => {
    if (data.docs.length === 0) {
      const sorryMsg =
        '<h3> По Вашому запиту нічого не знайдено. Спробуйте ще раз </h3>';
      services.refs.adsContainer.innerHTML = '';
      services.refs.adsContainer.insertAdjacentHTML('beforeend', sorryMsg);
      return;
    }
    const collectPage = data.docs
      .map(elem => {
        return templateDisplayAdsCards(elem, {
          ...(elem.images = elem.images[0]),
        });
      })
      .join('');
    services.nextPage();

    services.refs.adsContainer.innerHTML = '';
    services.refs.adsContainer.insertAdjacentHTML('beforeend', collectPage);
    services.trigerShe = 'search';
    services.hasNextPage = data.hasNextPage;

    if (!services.hasNextPage) {
      services.refs.addPageBtn.style.display = 'none';
    } else {
      services.refs.addPageBtn.style.display = 'inline-block';
    }
  });
};

services.refs.searchForm.addEventListener('submit', handelSearchSubmit);
