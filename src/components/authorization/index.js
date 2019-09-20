import services from '../../services/';
import './authorization.css';
import tplAutoFofm from '../../template/authorization.hbs';

const instanseLb = services.basicLightbox.create(tplAutoFofm());

function FormAutorize(event) {
  event.preventDefault();
  if (services.isAuthorized) return;
  const formData = new FormData(event.currentTarget);
  const formDataObj = {};
  formData.forEach((val, key) => {
    formDataObj[key] = val;
  });
  services
    .userAutorization(formDataObj)
    .then(data => {
      if (data.status == 'success') {
        services.userName = data.userData.name;
        services.userToken = data.token;
        services.userAds = data.ads;
        services.categories = data.categories;

        localStorage.setItem('userToken', data.token);
        localStorage.setItem('userName', data.userData.name);
        localStorage.setItem('categories', JSON.stringify(data.categories));
        services.success(
          'Ви успішно авторізовані',
          'Тепер ви можете почати подавати свої оголошення',
        );
        instanseLb.close();
        document.querySelector('.authorization').style.display = 'none';
        document.querySelector('.userCabinet').style.display = 'flex';
        return;
      }
      services.error('Помилка!', 'Паролі та логін не свпівпадають');
      return;
    })
    .catch(err => {
      services.error('Помилка!', 'Паролі та логін не свпівпадають');
      console.error(err);
    });
}

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
      localStorage.setItem('categories', JSON.stringify(data.categories));
      services.success(
        'Ви успішно зареєстровані',
        'Тепер ви можете почати подавати свої оголошення',
      );
      instanseLb.close();
      document.querySelector('.authorization').style.display = 'none';
      document.querySelector('.userCabinet').style.display = 'flex';
    })
    .catch(err => {
      console.error(err);
      services.error(
        'Помилка!',
        'Нажаль в нас технічна проблема на сервері. Спробуйте пізніше!!!',
      );
      instanseLb.close();
    });
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
  const autorizationForm = document.querySelector('.signIn-form');
  autorizationForm.addEventListener('submit', FormAutorize);
}
services.refs.btnRegAutoriz.addEventListener('click', hendalClicReg);

if (localStorage.getItem('userToken')) {
  services.isAuthorized = true;
  services.userToken = localStorage.getItem('userToken');
  services.userName = localStorage.getItem('userName');
  services.categories = JSON.parse(localStorage.getItem('categories'))
  services.getUser().then(data => {
    if (data.status == 'success') {
      services.userAds = data.ads;
    }
  });
}

if (services.isAuthorized) {
  document.querySelector('.authorization').style.display = 'none';
  document.querySelector('.userCabinet').style.display = 'flex';
} else {
  document.querySelector('.authorization').style.display = 'flex';
  document.querySelector('.userCabinet').style.display = 'none';
}


console.log(services);
