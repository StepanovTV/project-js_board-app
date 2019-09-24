import services from '../../services';

function handleButtonMore(e) {
  e.preventDefault();

  switch (services.trigerShe) {
    case 'all':
      services.getAds().then(data => {
        services.drawHTMLAllAdsByPage(data);
        services.spinnerOff();
      });
      break;
    case 'category':
      services.getAdsByCategory().then(data => {
        services.drawHTMLbyCategoryId(data);
        services.spinnerOff();
      });
      break;
    case 'search':
      services.searchAds().then(data => {
        services.drawHtmlByInputSearch(data);
        services.spinnerOff();
      });
      break;
    default:
      services.error('Oshibka', ' Neisvesnay');
      services.spinnerOff();
  }
}
services.refs.addPageBtn.addEventListener('click', handleButtonMore);
