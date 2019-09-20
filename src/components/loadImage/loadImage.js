import services from '../../services/index';

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
        services.refs.outputMult.insertBefore(span, null);
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
services.refs.fileMult.addEventListener('change', handleFileSelect);

