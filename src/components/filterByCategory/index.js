import services from '../../services';

services.refs.categoryList.addEventListener('click', findCategory);

function findCategory(event) {
  event.preventDefault();
  // console.log(event.target.dataset.name);
  let chosenOne = event.target.dataset.name;
  console.log(chosenOne);
  if (chosenOne === 'clear') {
    services.refs.addsContainer.innerHTML(' ');
    services.getAds(page).then(data => {
      let renderToHtml = data.map(elem => {
        return services.hbs(elem);
      });
      services.refs.addsContainer.insertAdjacentHTML('beforeend', renderToHtml);
    });
    chosenOne = '';
  }
  services.getCategory(chosenOne);
  return chosenOne;
}

services
  .getAdsByCategory(idCat, page)
  .then(data => {
    let eachObj = data.map(elem => {
      return services.hbs(elem);
    });
    services.refs.addsContainer.insertAdjacentHTML('beforeend', data);
  })
  .catch(alert =>
    alert('Виникла помилка, будь ласка спробуйте перезавантажити сторінку ;)'),
  );


  

//   services.refs.categoryList.addEventListener('click', getAdsByCategory)
//       getAdsByCategory(idCat, page).then(event=>{
//         event.preventDefault();

//               const activelink = services.refs.categoryList.querySelector('.activeCategory')
//               if(event.currentTarget===event.target){
//                   return
//               }
//               if(activelink){
//                   activelink.classList.remove('.activeCategory')
//               }
//               event.target.classList.add('activeCategory')
//       } ).catch(err=>console.log('Виникла помилка, будь ласка спробуйте перезавантажити сторінку ;)')
//       )

//   function filterCat(event){
//       event.preventDefault();

//       const activelink = services.refs.categoryList.querySelector('.activeCategory')
//       if(event.currentTarget===event.target){
//           return
//       }
//       if(activelink){
//           activelink.classList.remove('.activeCategory')
//       }
//       event.target.classList.add('activeCategory')
//    }
