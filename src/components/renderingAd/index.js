import services from '../../services/';
import templateAd from '../../template/renderingAd.hbs'
import './renderingAd.css';




console.log(services.refs.renderingAd)



services.refs.renderingAd.onclick = () => {
const idAd = event.target.getAttribute("data-adId");
services.getAd(idAd).then(data=>{
const instance = services.basicLightbox.create(templateAd(data));
instance.show();
    });
};
