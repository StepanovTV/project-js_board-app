import services from '../../services/index';

const refs = {
  outputMult: document.getElementById('outputMulti'),
  fileMult: document.querySelector('#fileMulti'),
};

// Функція записує в масив images[] загружені фотографії користувача
function handleFileSelect(evt) {
  let file = evt.target.files; // FileList object
  //   console.log(file);

  let f;
  for (let i = 0; (f = file[i]); i++) {
    // Перевірка. Загружати тільки IMG
    if (!f.type.match('image.*')) {
      alert('Image only please....');
    }
    let reader = new FileReader();
    //
    reader.onload = (function(theFile) {
      console.log(theFile);
      return function(e) {
        // Вимальовка image ескіза-зразка-шаблона в HTML.
        let span = document.createElement('span');
        span.innerHTML = [
          '<img class="thumb" title="',
          escape(theFile.name),
          '" src="',
          e.target.result,
          '" />',
        ].join('');
        refs.outputMult.insertBefore(span, null);
        // console.log(e.target.result);

        // запис фотографії в масив фотографій
        services.image.push(e.target.result);
      };
    })(f);
    // читає дані файлу-(f), а результатом є Data URL
    reader.readAsDataURL(f);
  }
  console.log(services);
}
refs.fileMult.addEventListener('change', handleFileSelect);



// Шаблон для вставки в HTML для загрузчика файлів

{/* <div class="wrap_mult_img">
  <label>Загрузити файли:</label>
  <input
    type="file"
    id="fileMulti"
    name="fileMulti[]"
    multiple
    accept="image/x-png,image/gif,image/jpeg"
  />
  <!--accept: для того щоб ігнорувати всі файли не вказаного формату в accept-->
</div>
<!-- місце для вставки фото -->
<div class="wrap_img_add">
  <span id="outputMulti"></span>
</div> */}

