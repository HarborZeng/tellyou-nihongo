// {{ $url := replace .Permalink ( printf "%s" .Site.BaseURL) "" -}}

function translateJAToZH(jaText) {
  console.log("translate", jaText);
  return fetch('/.netlify/functions/tmt-ja-zh', {
    method: 'POST',
    body: jaText,
  })
}

(function () {
  let docsContent = document.querySelector('.docs-content')
  if (!docsContent) {
    return
  }
  let lis = docsContent.querySelectorAll('ul > li');
  for (let i = 0; i < lis.length; i++) {
    let li = lis[i]
    let originText = li.innerHTML;
    if (!originText.match(/[ァ-ヶぁ-ん|ー]+/)) {
      continue
    }
    let btn = document.createElement('button');
    btn.type = 'button'
    btn.title = '翻译'
    btn.innerHTML = '<svg t="1657449403293" id="${id_holder}" class="icon bubbly-button" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" p-id="1380" width="25" height="25" data-spm-anchor-id="a313x.7781069.0.i6"><path d="M733.866667 853.333333H102.4c-58.026667 0-102.4-44.373333-102.4-102.4V102.4c0-58.026667 44.373333-102.4 102.4-102.4h341.333333c6.826667 0 13.653333 3.413333 17.066667 10.24l290.133333 819.2c3.413333 6.826667 0 10.24-3.413333 17.066667s-6.826667 6.826667-13.653333 6.826666zM102.4 34.133333c-37.546667 0-68.266667 30.72-68.266667 68.266667v648.533333c0 37.546667 30.72 68.266667 68.266667 68.266667h607.573333L430.08 34.133333H102.4z" fill="" p-id="1381"></path><path d="M921.6 1024H563.2c-6.826667 0-13.653333-3.413333-17.066667-10.24l-68.266666-170.666667c-3.413333-10.24 0-17.066667 10.24-23.893333 10.24-3.413333 17.066667 0 23.893333 10.24l64.853333 160.426667H921.6c37.546667 0 68.266667-30.72 68.266667-68.266667V273.066667c0-37.546667-30.72-68.266667-68.266667-68.266667H508.586667c-10.24 0-17.066667-6.826667-17.066667-17.066667s6.826667-17.066667 17.066667-17.066666H921.6c58.026667 0 102.4 44.373333 102.4 102.4v648.533333c0 58.026667-44.373333 102.4-102.4 102.4z" fill="" p-id="1382" data-spm-anchor-id="a313x.7781069.0.i5" class="selected"></path><path d="M563.2 1024c-3.413333 0-10.24 0-13.653333-3.413333-6.826667-6.826667-6.826667-17.066667 0-23.893334l170.666666-170.666666c6.826667-6.826667 17.066667-6.826667 23.893334 0s6.826667 17.066667 0 23.893333l-170.666667 170.666667c0 3.413333-6.826667 3.413333-10.24 3.413333zM392.533333 580.266667c-6.826667 0-13.653333-3.413333-17.066666-10.24L290.133333 310.613333 204.8 570.026667c-3.413333 10.24-13.653333 13.653333-20.48 10.24-10.24-3.413333-13.653333-13.653333-10.24-20.48l102.4-307.2c3.413333-13.653333 27.306667-13.653333 30.72 0l102.4 307.2c3.413333 10.24-3.413333 17.066667-10.24 20.48h-6.826667z" fill="" p-id="1383"></path><path d="M358.4 477.866667h-136.533333c-10.24 0-17.066667-6.826667-17.066667-17.066667s6.826667-17.066667 17.066667-17.066667h136.533333c10.24 0 17.066667 6.826667 17.066667 17.066667s-6.826667 17.066667-17.066667 17.066667zM904.533333 477.866667H614.4c-10.24 0-17.066667-6.826667-17.066667-17.066667s6.826667-17.066667 17.066667-17.066667h290.133333c10.24 0 17.066667 6.826667 17.066667 17.066667s-6.826667 17.066667-17.066667 17.066667z" fill="" p-id="1384"></path><path d="M733.866667 477.866667c-10.24 0-17.066667-6.826667-17.066667-17.066667v-68.266667c0-10.24 6.826667-17.066667 17.066667-17.066666s17.066667 6.826667 17.066666 17.066666v68.266667c0 10.24-6.826667 17.066667-17.066666 17.066667zM682.666667 716.8c-6.826667 0-10.24-3.413333-13.653334-6.826667-6.826667-6.826667-3.413333-17.066667 3.413334-23.893333 88.746667-64.853333 146.773333-184.32 146.773333-225.28 0-10.24 6.826667-17.066667 17.066667-17.066667s17.066667 6.826667 17.066666 17.066667c0 54.613333-64.853333 184.32-160.426666 252.586667-3.413333 3.413333-6.826667 3.413333-10.24 3.413333z" fill="" p-id="1385"></path><path d="M836.266667 750.933333c-3.413333 0-10.24 0-13.653334-3.413333-6.826667-6.826667-150.186667-150.186667-174.08-211.626667-3.413333-10.24 0-17.066667 10.24-23.893333 10.24-3.413333 17.066667 0 23.893334 10.24 17.066667 44.373333 126.293333 160.426667 167.253333 197.973333 6.826667 6.826667 6.826667 17.066667 0 23.893334-3.413333 6.826667-10.24 6.826667-13.653333 6.826666z" fill="" p-id="1386"></path></svg>'
      .replace('${id_holder}', 't' + i)
    btn.className = 'btn btn-translate no-print'
    btn.addEventListener('click', function (e) {
      //prevent from multiple clicking
      btn.disabled = true

      let jaText = '';
      let node = li.firstChild;

      while (node) {
        if (node.nodeName === '#text') {
          jaText += node.nodeValue;
        } else if (node.nodeName !== 'BUTTON') {
          // 如果是元素节点，递归提取其子节点的文本
          let childNode = node.firstChild;
          while (childNode) {
            if (childNode.nodeName === '#text') {
              jaText += childNode.nodeValue;
            } else if (childNode.nodeName === "RUBY") {
              // 特殊处理ruby标签
              jaText += childNode.firstChild.textContent;
            }
            childNode = childNode.nextSibling;
          }
        }
        node = node.nextSibling;
      }

      jaText = jaText.replaceAll(/（[^）]+）/g, '')

      if (!jaText) {
        return
      }

      let div1 = document.createElement('div');
      div1.classList.add('content-wrapper')
      let div2 = document.createElement('div');
      div2.classList.add('t-placeholder')
      let div3 = document.createElement('div');
      div3.classList.add('t-animated-background')
      div3.innerText = '翻译中...'
      let bq = document.createElement('blockquote');
      bq.appendChild(div1).appendChild(div2).appendChild(div3)

      translateJAToZH(jaText).then(function (response) {
        if (response.status !== 200) {
          return
        }
        return response.text();
      }).then(function (text) {
        if (text) {
          let bqi = document.createElement('blockquote');
          bqi.innerText = text
          li.replaceChild(bqi, li.lastChild)
        }
      }).catch(function (err) {
        btn.disabled = false
        bq.remove()
      }).finally(function () {
        e.target.classList.remove('doflip');
      })
      li.insertAdjacentElement('beforeend', bq)

      //reset animation
      e.target.classList.remove('doflip');
      e.target.classList.add('doflip');
      setTimeout(function () {
        e.target.classList.remove('doflip');
      }, 5000);
    }, false)
    li.insertAdjacentElement('beforeend', btn);
  }
})()
