import services from '../../services';


function handleButtonMore(e) {
  e.preventDefault();

  switch(services.trigerShe) {
    case 'all':
        services.getAds().then(data => {
          services.drawHTMLAllAdsByPage(data)
        });
  }

}

services.refs.addPageBtn.addEventListener('click', handleButtonMore);
