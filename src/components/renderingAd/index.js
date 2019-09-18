import services from './../../services/';
import template from './../../template/renderingAd.hbs'
import * as basicLightbox from 'basiclightbox'


console.log('a.renderingAd')


document.querySelector('div.renderingAd').onclick = () => {
  basicLightbox.create(`
  <div class="list">
  <h2 class="title">Продам автомобиль</h2>
  <p class="author">Иванов</p>
  <p class="telphone">38067957485</p>
  <img src="{{image}}" alt="фото автомобиля" width = '300'>
  <p class="description">Супер авто</p>
  <p class="price">20 000,00 грн. </p>
</div>

	`).show()
}

document.querySelector('div.renderingAd1').onclick = () => {
  basicLightbox.create(`
  <div class="list">
  <h2 class="title">Продам автомобиль</h2>
  <p class="author">Иванов</p>
  <p class="telphone">38067957485</p>
  <img src="{{image}}" alt="фото автомобиля" width = '300'>
  <p class="description">Супер авто</p>
  <p class="price">20 000,00 грн. </p>
</div>

	`).show()
}


document.querySelector('div.renderingAd2').onclick = () => {
  basicLightbox.create(`
  <div class="list">
  <h2 class="title">Продам автомобиль</h2>
  <p class="author">Иванов</p>
  <p class="telphone">38067957485</p>
  <img src="{{image}}" alt="фото автомобиля" width = '300'>
  <p class="description">Супер авто</p>
  <p class="price">20 000,00 грн. </p>
</div>

	`).show()
}
