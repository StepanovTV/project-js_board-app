import services from '../../services/';
import './authorization.css';


const instance = services.basicLightbox.create(`
<section class="login-widows">
      <div class="wraper-login">
        <div class="changers">
          <div class="change_options_login activ-color">
            <p class="but_title_login">
              Вход
            </p>
          </div>
          <div class="change_options_registration disactiv-color">
            <p class="but_title_registration">
              Регистрация
            </p>
          </div>
        </div>
      </div>

      <form action="#" class="signIn-form activ-form">
        <input
          name="mail"
          type="email"
          class="form_input email"
          placeholder="ваш меил *"
          required
        />
        <input
          name="pass1"
          type="password"
          class="form_input style-pass-1"
          placeholder="пароль *"
          required
        />

        <button class="form_sedn_btn1" type="submit">
          ВОЙТИ
        </button>
      </form>

      <form action="#" class="registration-form disactiv-form">
        <input
          name="login"
          type="text"
          class="form_input login"
          placeholder="ваше имя *"
          required
        />

        <input
          name="mail"
          type="email"
          class="form_input email"
          placeholder="ваш меил *"
          required
        />
        <input
          name="pass1"
          type="password"
          class="form_input style-pass-1"
          placeholder="пароль *"
          required
        />

        <input
          name="pass2"
          type="password"
          class="form_input style-pass-2"
          placeholder="повторите пароль *"
          required
        />

        <button class="form_sedn_btn2" type="submit">
          ЗАРЕГЕСТРИРОВАТЬСЯ
        </button>
      </form>
    </section>
`);


instance.show();// втроенная функция лайтбокса для отображения 

// выбираю элементы формы что бы потом на них вешать класы и листенеры
const refs = {
  htmlDivLogin: document.querySelector('.change_options_login'),
  htmlDivRegistration: document.querySelector('.change_options_registration'),
  htmlButLogin: document.querySelector('.but_title_login'),
  htmlButRegistration: document.querySelector('.but_title_registration'),
  htmlSignInForm: document.querySelector('.signIn-form'),
  htmlRegistrationForm: document.querySelector('.registration-form'),
  htmlformSednBtn1: document.querySelector('.form_sedn_btn_1'),
  htmlformSednBtn2: document.querySelector('.form_sedn_btn_2'),
  htmlChangers: document.querySelector('.changers'),
};

// отслеживаю нажатие кнопок выбора форм
refs.htmlChangers.addEventListener('click', e => {
  if (e.target == refs.htmlButRegistration) {
    //скрываю форму входа
    refs.htmlSignInForm.classList.remove('activ-form');
    refs.htmlSignInForm.classList.add('disactiv-form');
    //отображаю форму регистрации
    refs.htmlRegistrationForm.classList.add('activ-form');
    refs.htmlRegistrationForm.classList.remove('disactiv-form');
    // меняю цвета верхних кнопочек с зеленой на серую
    refs.htmlDivLogin.classList.remove('activ-color');
    refs.htmlDivLogin.classList.add('disactiv-color');
    refs.htmlDivRegistration.classList.add('activ-color');
    refs.htmlDivRegistration.classList.remove('disactiv-color');
  } else {
    //скрываю форму регистрации
    refs.htmlSignInForm.classList.add('activ-form');
    refs.htmlSignInForm.classList.remove('disactiv-form');
    //отображаю форму входа
    refs.htmlRegistrationForm.classList.remove('activ-form');
    refs.htmlRegistrationForm.classList.add('disactiv-form');
    // меняю цвета верхних кнопочек с зеленой на серую
    refs.htmlDivLogin.classList.add('activ-color');
    refs.htmlDivLogin.classList.remove('disactiv-color');
    refs.htmlDivRegistration.classList.remove('activ-color');
    refs.htmlDivRegistration.classList.add('disactiv-color');
  }
});

// слушатели на отправку форм
refs.htmlRegistrationForm.addEventListener('submit', FormAnaliz);
refs.htmlSignInForm.addEventListener('submit', FormAnaliz);

//функция слушателя отправки формы
function FormAnaliz(event) {
  event.preventDefault();
  
  //тут будет блок проверок на длинну строк, повторяемость пароля и т.д.

  //
  if (event.target == refs.htmlRegistrationForm) {
    const dataRegistration = {
      mode: 'registration',
      login: event.target.elements.login.value,
      mail: event.target.elements.mail.value,
      pass1: event.target.elements.pass1.value,
      pass2: event.target.elements.pass2.value,
    };
  } else {
    const dataRegistration = {
      mode: 'signIn',
      mail: event.target.elements.mail.value,
      pass1: event.target.elements.pass1.value,
    };

    console.log(dataRegistration);
  }

  instance.close();
}
