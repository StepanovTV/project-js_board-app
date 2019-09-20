import services from '../../services/';
import templateAd from '../../template/renderingAd.hbs'
import './renderingAd.css';

services.getAll().then(data => console.log(data))




services.refs.renderingAd.onclick = () => {
  services.getAll().then(data =>{
  const idAd = data.docs[0]._id;
  services.getAd(idAd).then(data=> {
  console.log(data)
  const instance = services.basicLightbox.create(templateAd(data));
  instance.show();
});
});
};




// services.refs.renderingAd.onclick = (e) => {
//   // console.log(event.target.docs[id])

//   services.getAll().then(data=> {
//     // console.log(data.docs[5])
//     // return templateAd(data.docs[1]);
//     const instance = services.basicLightbox.create(templateAd(data.docs[5]));

//     instance.show();
//   })


// services
//   .getAd(idAd)
//   .then(data => {
//     console.log(data);
//     const renderToHtml = templateAd(data);
//   })
//   .catch(error => console.log(error))
