// import services from '../../services';

// services.refs.categoryList.addEventListener('click', findCategory);
// services.refs.addPageBtn.addEventListener('click', addNewPage);

// let privateCounter = 1;
// function addNewPage(e) {
//   e.preventDefault();
//   services.refs.addPageBtn.setAttribute('page', ++privateCounter);
//   console.log(e.target.attributes.page.value);
// }

// // poopa.then(data =>data.map(elem => {
// //   console.log('each buttom' + elem);
// //     return elem.category;
// //   }));



// function findCategory(event) {


//   event.preventDefault();
//   //   console.log(event.target);
//   let chosenBut = event.target;
//   let chosenOne = event.target.dataset.name;
//   if (chosenBut === event.currentTarget) {
//     return;
//   }

//   if (chosenBut.classList.contains('disabled')) {
//   } else {
//     let allBut = services.refs.categoryList.querySelectorAll('button');
//     allBut.forEach(element => {
//       element.removeAttribute('disabled');
//     });
//     chosenBut.setAttribute('disabled', 'disabled');
//   }

//   if (chosenOne === 'clear') {
//     services.refs.addsContainer.innerHTML(' ');
//     services.getAds(page).then(data => {
//       let renderToHtml = data.map(elem => {
//         return services.hbs(elem);
//       });
//       services.refs.addsContainer.insertAdjacentHTML('beforeend', renderToHtml);
//     });
//     chosenOne = '';
//   }
//   services.getCategory(chosenOne);
//   return chosenOne;

// }

// services
//   .getAdsByCategory(idCat, page)
//   .then(data => {
//     let eachObj = data.map(elem => {
//       return services.hbs(elem);
//     });
//     services.refs.addsContainer.insertAdjacentHTML('beforeend', eachObj);
//   })
//   .catch(alert =>
//     alert('Виникла помилка, будь ласка спробуйте перезавантажити сторінку ;)'),
//   );

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
