import services from '../../services/';
import templateAd from '../../template/abd.hbs'
import './renderingAd.css';

services.getAll().then(data => console.log(data.docs))
services.getAll().then(data => console.log(data.docs[3]._id))



services.refs.renderingAd.onclick = (e) => {
// console.log(event.target.docs[id])

services.getAll().then(data=> {
  // console.log(data.docs[5])
  // return templateAd(data.docs[1]);
  const instance = services.basicLightbox.create(templateAd(data.docs[5]));

  instance.show();
})







// services
//   .getAd(idAd)
//   .then(data => {
//     console.log(data);
//     const renderToHtml = templateAd(data);
//   })
//   .catch(error => console.log(error));
}
