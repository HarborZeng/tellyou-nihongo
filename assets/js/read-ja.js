(function () {
  //pre-load
  speechSynthesis.getVoices();

  let docsContent = document.querySelector('.docs-content')
  if (!docsContent) {
    return
  }
  docsContent.querySelectorAll('ul > li').
    forEach((it) => {
      injectReadButton(it)
    })
  docsContent.querySelectorAll('p').
    forEach((it) => {
      if (it.textContent.startsWith('[speaker] ')) {
        if (it.firstChild.nodeName === '#text') {
          it.firstChild.nodeValue = it.firstChild.nodeValue.replace('[speaker] ', '')
        }
        injectReadButton(it, 'afterbegin')
      }
      if (it.textContent.endsWith(":")) {
        return
      }
      if (it.textContent.endsWith("：")) {
        return
      }
      if (it.textContent.indexOf("：")>0) {
        injectReadButton(it, 'afterbegin')
      }
      if (it.textContent.indexOf(":")>0) {
        injectReadButton(it, 'afterbegin')
      }
    })
  docsContent.querySelectorAll('.vocabulary').forEach((it) => {
    bindReadClick(it)
  })
})()

function injectReadButton(tag, where) {
  let originText = tag.innerHTML;
  if (!originText.match(/[ァ-ヶぁ-ん|ー]+/)) {
    return
  }
  const jaText = genJaText(tag.firstChild)
  if (!jaText) return
  let btn = document.createElement('button');
  btn.type = 'button'
  btn.title = '发音'
  btn.className = 'btn btn-translate no-print'
  btn.innerHTML = `<svg t="1659261787711" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="10598" width="25" height="25" ><path d="M438.279 874.891H190.054V826.76h200.094V749.32l-92.539-65.993a31.874 31.874 0 0 1-13.325-25.547c-0.106-10.13 4.676-19.788 12.785-25.828l93.079-69.424v-104.7l74.595-5.924L303.79 153.856l42.35-22.89 196.064 363.102-103.925 8.225v68.413c0 9.989-4.77 19.506-12.762 25.476l-81.716 60.964 81.151 57.862c8.367 5.993 13.326 15.652 13.326 25.875V874.89zM173.559 282.381a43.988 43.988 0 1 0 87.976 0 43.988 43.988 0 1 0-87.976 0zM554.742 731.153c-10.54 0-20.21-6.98-23.172-17.626-3.56-12.809 3.936-26.064 16.733-29.636 12.15-3.36 20.635-14.524 20.635-27.144 0-12.503-8.015-23.338-19.941-26.957-12.726-3.878-19.894-17.32-16.04-30.035 3.877-12.738 17.38-19.86 30.023-16.028 32.35 9.847 54.089 39.177 54.089 73.02 0 34.147-22.973 64.37-55.863 73.536-2.163 0.589-4.337 0.87-6.464 0.87z" p-id="10599"></path><path d="M625.635 820.53c-8.66 0-17.015-4.676-21.328-12.878-6.18-11.751-1.656-26.298 10.107-32.48 44.3-23.29 71.821-68.813 71.821-118.802 0-49.19-26.886-94.36-70.152-117.885-11.68-6.345-16.005-20.963-9.648-32.643 6.345-11.68 20.94-15.981 32.632-9.66 58.778 31.963 95.3 93.35 95.3 160.19 0 67.919-37.38 129.776-97.556 161.386a23.945 23.945 0 0 1-11.176 2.773z" p-id="10600"></path><path d="M697.727 893.034c-8.66 0-17.016-4.676-21.328-12.88-6.18-11.75-1.656-26.298 10.106-32.479C757.94 810.12 802.31 736.7 802.31 656.09c0-79.342-43.35-152.174-113.114-190.106-11.68-6.37-16.005-20.964-9.648-32.644 6.345-11.703 20.963-15.98 32.632-9.659 85.288 46.37 138.261 135.418 138.261 232.41 0 98.567-54.23 188.296-141.54 234.171a23.94 23.94 0 0 1-11.174 2.773z" p-id="10601"></path></svg>`
  btn.addEventListener('click', ()=>{
    addVoiceHandler(btn, jaText)
  }, false)
  tag.insertAdjacentElement(where ? where : 'beforeend', btn);
}

function bindReadClick(tag) {
  let originText = tag.innerHTML;
  if (!originText.match(/[ァ-ヶぁ-ん|ー]+/)) {
    return
  }
  const jaText = genJaText(tag.firstChild)
  if (!jaText) return
  tag.addEventListener('click', ()=>{
    addVoiceHandler(tag, jaText)
  }, false)
}

function genJaText(node) {
  let jaText = '';
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
  jaText = jaText.replaceAll('[speaker] ', '')
  jaText = jaText.substring(jaText.indexOf('：'))
  jaText = jaText.substring(jaText.indexOf(':'))
  return jaText
}

function addVoiceHandler(btn, jaText) {
    //prevent from multiple clicking
    btn.disabled = true
    resetSpeechSynthesis()

    {{ $sp := .Site.Params.voice.speaker -}}
    {{ $pitch := .Site.Params.voice.pitch -}}
    {{ $rate := .Site.Params.voice.rate -}}
    const voices = speechSynthesis.getVoices();
    // console.log(voices)
    const jaVoices = voices.filter(o =>
      o.lang === 'ja-JP' || o.lang === 'ja_JP' || o.name.indexOf('日语') >= 0 ||
      o.name.indexOf('日本語') >= 0 || o.name.indexOf('Japan') >= 0
    );
    if (!jaVoices) {
      alert('你的浏览器不支持日语发音')
      btn.disabled = false
      return
    }
    const jaVoicesLocal = jaVoices.filter(o => o.localService);
    const jaVoicesOnline = jaVoices.filter(o => !o.localService);

    const sentences = splitTextForSpeech(jaText);
    let i = 0;
    (function speakNext() {
      if (i >= sentences.length) {
        return
      }

      console.log("speak", sentences[i])
      const utterThis = new SpeechSynthesisUtterance(sentences[i]);
      utterThis.voice = jaVoicesOnline.length > 0 ? jaVoicesOnline[
          Math.floor(Math.random() * jaVoicesOnline.length)
        ] : jaVoicesLocal[
          Math.floor(Math.random() * jaVoicesLocal.length)
        ]; // 设置说话的声音
      utterThis.pitch = {{ $pitch }}; // 设置音调高低
      utterThis.rate = {{ $rate }}; // 设置说话的速度
      utterThis.onend = function () {
        if (i === sentences.length - 1) {
          btn.disabled = false; // 最后一个句子结束后启用按钮
        }
        i++;
        speakNext(); // 播放下一段
      };

      utterThis.onerror = function (event) {
        console.error('Speech synthesis error:', event.error);
        btn.disabled = false; // 发生错误后启用按钮
      };

      window.speechSynthesis.speak(utterThis);
    })()
}

function resetSpeechSynthesis() {
  window.speechSynthesis.cancel(); // 取消所有当前的朗读
}

function splitTextForSpeech(text) {
  const maxCharCount = 50
  // 首先按照句号分割文本
  let sentences = text.split('。');

  // 对于每个段落，如果超过maxCharCount个字符，进一步分割
  let segments = [];
  sentences.forEach(sentence => {
    // 如果段落超过maxCharCount个字符，按照顿号分割
    if (sentence.trim().length > maxCharCount) {
      let subSentences = sentence.split('、');
      subSentences.forEach(subSentence => {
        // 进一步确保每个子段落不超过maxCharCount个字符
        let words = subSentence.trim().split(' ');
        while (words.length > 0) {
          let segment = words.slice(0, maxCharCount).join(' ');
          segments.push(segment);
          words = words.slice(maxCharCount);
        }
      });
    } else {
      segments.push(sentence);
    }
  });

  return segments;
}
