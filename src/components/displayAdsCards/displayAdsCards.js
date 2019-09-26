import services from '../../services/index';

services.getAds().then(data => {
  services.drawHTMLAllAdsByPage(data);
  services.spinnerOff();
});


services.refs.contLogo.addEventListener('click', () => {
  services.resetPage();
  services.refs.adsContainer.innerHTML = '';
  services.getAds().then(data => {
    services.drawHTMLAllAdsByPage(data);
    services.spinnerOff();
  });
 });