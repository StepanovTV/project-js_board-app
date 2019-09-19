import services from '../../services/';
import templateAd from '../../template/renderingAd.hbs'
import './renderingAd.css';



services.refs.renderingAd.onclick = () => {
const idAd = event.target.id;
const instance = services.basicLightbox.create(templateAd())
instance.show()
console.log(idAd)

services
  .getAd(idAd)
  .then(data => {
    console.log(data);
    const renderToHtml = templateAd(data);
  })
  .catch(error => console.log(error));
}
