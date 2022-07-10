// {{ $url := replace .Permalink ( printf "%s" .Site.BaseURL) "" -}}

function translate_ja_to_zh(e) {
  return fetch('https://ja.tellyouwhat.cn/.netlify/functions/tmt-ja-zh', {
    method: 'POST',
    body: e.innerText,
  }).then(function (response) {
    return response.text();
  }).then(function (data) {
    console.log(data);
    return data;
  }).catch(function () {
    console.log('Booo');
  });
}

let docsContent = document.querySelector('.docs-content')
let lis = docsContent.querySelectorAll('ul > li');
for (let li of lis) {
  let btn = document.createElement('button');
  btn.innerText = '翻译'
  btn.className = 'btn'
  btn.addEventListener('click', function () {
    translate_ja_to_zh(li).then(r => {
      li.innerHTML += r
    })
  })
  li.parentNode.insertBefore(btn, li.nextSibling);
}
