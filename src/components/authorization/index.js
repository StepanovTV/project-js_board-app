import services from '../../services/';
import './authorization.css';
import tplAutoFofm from '../../template/authorization.hbs';

const instanseLb = services.basicLightbox.create(tplAutoFofm());

// activ-form
function FormAnaliz(event) {
  event.preventDefault();
  const formData = new FormData(event.currentTarget);
  const formDataObj = {};
  formData.forEach((val, key) => {
    formDataObj[key] = val;
  });
  if (formDataObj.pass1 !== formDataObj.pass2) {
    services.error('Помилка!', 'Паролі не співпадають');
    return;
  }
  services
    .register(formDataObj.mail, formDataObj.pass1, formDataObj.login)
    .then(data => {
      if (data.status == 'error') {
        if ('E11000' == data.error.slice(0, 6)) {
          services.error(
            'Помилка!',
            'Користувач з таким емейлом вже існує, Авторизуйтесь, або вкажіть інший емейл.',
          );
          // data: {status: "error", error: "E11000 duplicate key error collection: test.users …ail_1 dup key: { : "stvstudio.com.ua@gmail.com" }"}
          return;
        }
        services.error('Помилка!', 'Нажаль в нас технічна проблема!');
        return;
      }
      services.userName = data.userData.name;
      services.userToken = data.token;
      localStorage.setItem('userToken', data.token);
      localStorage.setItem('userName', data.userData.name);
      services.success(
        'Ви успішно зареєстровані',
        'Тепер ви можете почати продавати свої оголошення',
      );
      instanseLb.close();
      document.querySelector('.authorization').style.display = 'none';
      document.querySelector('.userCabinet').style.display = 'flex';
      //   {
      //     "status": "success",
      //     "userData": {
      //         "userId": "5d836b3eca3ed838fd535223",
      //         "name": "Taras",
      //         "email": "lodddgin@gmail.com"
      //     },
      //     "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODM2YjNlY2EzZWQ4MzhmZDUzNTIyMyIsImlhdCI6MTU2ODg5Mzc1OH0.VVbUkGqO9Zom3G8QsX-1JaihoINgm4mvGmJRfR9T7KA"
      // }
    })
    .catch(err => {
      console.error(err);
      services.error(
        'Помилка!',
        'Нажаль в нас технічна проблема на сервері. Спробуйте пізніше!!!',
      );
      instanseLb.close();
  
    });
  //   {
  //     "status": "success",
  //     "userData": {
  //         "userId": "5d834f8781406f3911bff598",
  //         "name": "Taras",
  //         "email": "login@gmail.com"
  //     },
  //     "token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODM0Zjg3ODE0MDZmMzkxMWJmZjU5OCIsImlhdCI6MTU2ODg4NjY2M30.iXv_Ou8VR8zG1bvd1LpWHZFuaj6xzCMyUYyua39qJP0"
  // }
}

// const getUser = () => {
//   services.axios.get("https://dash-ads.goit.co.ua/api/v1/ads",
//       {headers: {
//           Authorization:
//             "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkODM1MWU1Y2EzZWQ4MzhmZDUzNTIxOCIsImlhdCI6MTU2ODg5MzkwMX0.iqW2YHtcpb4D2723V0W9aLanX_2FFU6sCfbQKKNUgXw"
//         }
//       }
//     ).then(data => console.log(data))
// }
// getUser();

function hendalClicReg(e) {
  e.preventDefault();
  instanseLb.show();
  const tgagleFormBtn = document.querySelector('.wraper-login');
  tgagleFormBtn.addEventListener('click', e => {
    e.preventDefault();
    if (e.target.classList.contains('autoriz')) {
      if (e.target.classList.contains('activ-btn')) return;
      e.target.classList.add('activ-btn');
      e.currentTarget.querySelector('.registra').classList.remove('activ-btn');
      document.querySelector('.signIn-form').classList.add('activ-form');
      document
        .querySelector('.registration-form')
        .classList.remove('activ-form');
    } else if (e.target.classList.contains('registra')) {
      if (e.target.classList.contains('activ-btn')) return;
      e.target.classList.add('activ-btn');
      e.currentTarget.querySelector('.autoriz').classList.remove('activ-btn');
      document.querySelector('.registration-form').classList.add('activ-form');
      document.querySelector('.signIn-form').classList.remove('activ-form');
    }
  });
  const RegistrationForm = document.querySelector('.registration-form');
  RegistrationForm.addEventListener('submit', FormAnaliz);
}
services.refs.btnRegAutoriz.addEventListener('click', hendalClicReg);



if(localStorage.getItem("userToken")){
  services.isAuthorized = true;
};



if(services.isAuthorized){
  document.querySelector('.authorization').style.display = 'none';
  document.querySelector('.userCabinet').style.display = 'flex';
}else{
  document.querySelector('.authorization').style.display = 'flex';
  document.querySelector('.userCabinet').style.display = 'none';
}
