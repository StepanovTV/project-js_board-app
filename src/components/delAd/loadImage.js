import services from '../index';
​
// Функція записує в масив images[] загружені фотографії користувача
export default function handleFileSelect(evt) {
  const refsImg = {
    outputMult: document.getElementById('outputMulti'),
    // fileMult: document.querySelector('#fileMulti'),
  }
  let file = evt.target.files; // FileList object
  //   console.log(file);
  refsImg.outputMult.innerHTML = "";
  let f;
  for (let i = 0; (f = file[i]); i++) {
    // Перевірка. Загружати тільки IMG
    if (!f.type.match('image.*')) {
      alert('Image only please....');
    }
    let reader = new FileReader();
    //
    reader.onload = (function(theFile) {
      // console.log(theFile);
      return function(e) {
        // Вимальовка image ескіза-зразка-шаблона в HTML.
        // let span = document.createElement('span');
        // span.innerHTML = [
        //   '<img class="thumb" title="',
        //   escape(theFile.name),
        //   '" src="',
        //   e.target.result,
        //   '" />',
        // ].join('');
        // refsImg.outputMult.insertBefore(span, null);
        // let span = document.createElement('span');
        refsImg.outputMult.insertAdjacentHTML("beforeend", [
          '<img class="thumb" title="',
          ,
          '" src="',
          e.target.result,
          '" />',
        ].join(''))
        // refsImg.outputMult.insertBefore(span, null);
        // refsImg.outputMult.insertAdjacentHTML('afterbegin', span);
        // console.log(e.target.result);
​
        // запис фотографії в масив фотографій

        services.image.push(e.target.result);
      };
    })(f);
    // читає дані файлу-(f), а результатом є Data URL
    reader.readAsDataURL(f);
  }
  // console.log(services);
  services.image = [];
}
// services.refs.fileMult.addEventListener('change', handleFileSelect);
