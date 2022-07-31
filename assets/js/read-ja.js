{{ $sp := .Site.Params.voice.speaker -}}

function readJA(jaText) {
  let voices = speechSynthesis.getVoices();
  let jaVoices = voices.filter(o => o.lang === 'lang: "ja-JP"');
  let index = Math.floor(Math.random() * jaVoices.length);
  console.log("voice is, id:", jaVoices[index], index)
  let utterThis = new SpeechSynthesisUtterance(jaText);
  utterThis.voice = jaVoices[index]; // 设置说话的声音
  utterThis.pitch = 1; // 设置音调高低
  utterThis.rate = 1; // 设置说话的速度
  window.speechSynthesis.speak(utterThis);
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

    li.addEventListener('click', function (e) {
      //prevent from multiple clicking
      li.disabled = true

      let jaText = ''
      let node = li.firstChild
      let lastNode
      while (node && node.nodeName !== 'BUTTON') {
        if (node.nodeName === '#text') {
          jaText += node.nodeValue
          if (lastNode) {
            node = lastNode
            lastNode = null
          }
        } else {
          lastNode = node
          node = node.firstChild
          continue
        }
        node = node.nextSibling
      }
      jaText = jaText.replaceAll(/（[^）]+）/g, '')

      if (!jaText) {
        return
      }

      readJA(jaText)

    }, false)
  }
})()
