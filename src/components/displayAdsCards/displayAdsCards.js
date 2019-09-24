import services from '../../services/index';

services.getAds().then(data => {
  console.log(data);
  
  services.drawHTMLAllAdsByPage(data);
  services.spinnerOff();
});



