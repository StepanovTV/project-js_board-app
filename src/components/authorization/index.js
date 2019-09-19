import services from '../../services/';
import './authorization.css';
import tplAutoFofm from '../../template/authorization.hbs';

const instanseLb = services.basicLightbox.create(tplAutoFofm());

//activ-form
function FormAnaliz(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataObj = {};
    formData.forEach((val, key) => {
      formDataObj[key] = val;
    });
    if(formDataObj.pass1 !== formDataObj.pass2){
      services.error('Помилка!', 'Паролі не співпадають');
      return
    }
  
    
    
    
//     {
//     login: "SHP_KD_LIFE_1", 
//     mail: "stvstudio.com.ua@gmail.com", 
//     pass1: "cxvcxcv",
//     pass2: "xcvxcv"
// }

    
}  
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
// instance.show();// втроенная функция лайтбокса для отображения

// // выбираю элементы формы что бы потом на них вешать класы и листенеры
// const refs = {
//   htmlDivLogin: document.querySelector('.change_options_login'),
//   htmlDivRegistration: document.querySelector('.change_options_registration'),
//   htmlButLogin: document.querySelector('.but_title_login'),
//   htmlButRegistration: document.querySelector('.but_title_registration'),
//   htmlSignInForm: document.querySelector('.signIn-form'),
//   htmlRegistrationForm: document.querySelector('.registration-form'),
//   htmlformSednBtn1: document.querySelector('.form_sedn_btn_1'),
//   htmlformSednBtn2: document.querySelector('.form_sedn_btn_2'),
//   htmlChangers: document.querySelector('.changers'),
// };

// // отслеживаю нажатие кнопок выбора форм
// refs.htmlChangers.addEventListener('click', e => {
//   if (e.target == refs.htmlButRegistration) {
//     //скрываю форму входа
//     refs.htmlSignInForm.classList.remove('activ-form');
//     refs.htmlSignInForm.classList.add('disactiv-form');
//     //отображаю форму регистрации
//     refs.htmlRegistrationForm.classList.add('activ-form');
//     refs.htmlRegistrationForm.classList.remove('disactiv-form');
//     // меняю цвета верхних кнопочек с зеленой на серую
//     refs.htmlDivLogin.classList.remove('activ-color');
//     refs.htmlDivLogin.classList.add('disactiv-color');
//     refs.htmlDivRegistration.classList.add('activ-color');
//     refs.htmlDivRegistration.classList.remove('disactiv-color');
//   } else {
//     //скрываю форму регистрации
//     refs.htmlSignInForm.classList.add('activ-form');
//     refs.htmlSignInForm.classList.remove('disactiv-form');
//     //отображаю форму входа
//     refs.htmlRegistrationForm.classList.remove('activ-form');
//     refs.htmlRegistrationForm.classList.add('disactiv-form');
//     // меняю цвета верхних кнопочек с зеленой на серую
//     refs.htmlDivLogin.classList.add('activ-color');
//     refs.htmlDivLogin.classList.remove('disactiv-color');
//     refs.htmlDivRegistration.classList.remove('activ-color');
//     refs.htmlDivRegistration.classList.add('disactiv-color');
//   }
// });

// // слушатели на отправку форм

// refs.htmlSignInForm.addEventListener('submit', FormAnaliz);

// //функция слушателя отправки формы
// function FormAnaliz(event) {
//   event.preventDefault();

//   //тут будет блок проверок на длинну строк, повторяемость пароля и т.д.

//   //
//   if (event.target == refs.htmlRegistrationForm) {
//     const dataRegistration = {
//       mode: 'registration',
//       login: event.target.elements.login.value,
//       mail: event.target.elements.mail.value,
//       pass1: event.target.elements.pass1.value,
//       pass2: event.target.elements.pass2.value,
//     };
//   } else {
//     const dataRegistration = {
//       mode: 'signIn',
//       mail: event.target.elements.mail.value,
//       pass1: event.target.elements.pass1.value,
//     };

//     console.log(dataRegistration);
//   }

//   instance.close();
// }
