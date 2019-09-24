import services from '../../services';

function handleButtonMore(e) {
  e.preventDefault();

  switch (services.trigerShe) {
    case 'all':
      services.getAds().then(data => {
        services.drawHTMLAllAdsByPage(data);
      });
      break;
    case 'category':
      services.getAdsByCategory().then(data => {
        services.drawHTMLbyCategoryId(data);
      });
      break;
    case 'search':
      services.searchAds().then(data => {
        services.drawHtmlByInputSearch(data);
      });
      break;
    default:
      services.error('Oshibka', ' Neisvesnay');
  }
}
services.refs.addPageBtn.addEventListener('click', handleButtonMore);
