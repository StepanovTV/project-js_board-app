import services from '../../services/index';

services.getAds().then(data => {
  services.drawHTMLAllAdsByPage(data);
  services.spinnerOff();
});



