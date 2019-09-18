import services from '../../services'

const refs = {
  categoryList: document.querySelector('.filter-wrap'),
//   chooseCategory: 
};

refs.categoryList.addEventListener('click', findCategory);

function findCategory(event) {
  event.preventDefault();
  // console.log(event.target.dataset.name);
  let chosenOne = event.target.dataset.name;
  services.getCategory(chosenOne)
  console.log(chosenOne);
  
  return chosenOne;
  
}

//   refs.categoryList.addEventListener('click', getAdsByCategory)
//       getAdsByCategory(idCat, page).then(event=>{
//         event.preventDefault();

//               const activelink = refs.categoryList.querySelector('.activeCategory')
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

//       const activelink = refs.categoryList.querySelector('.activeCategory')
//       if(event.currentTarget===event.target){
//           return
//       }
//       if(activelink){
//           activelink.classList.remove('.activeCategory')
//       }
//       event.target.classList.add('activeCategory')
//    }
