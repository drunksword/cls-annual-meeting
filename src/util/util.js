/*
 * 一些全局公用函数
 * 需要使用这些公共函数的component，先
 * import CommonUtil from '../CommonUtil.js'
 * 然后 CommonUtil.setTitle('要更改的页面标题') 这样引用即可
 */

 console.log('CommonUtil JS loaded')

/**
 * 显示提示信息；需要配合css里的 #toast .toastmessage一起使用
 */
 var timeoutCallback = ''
 function showToast (msg, ms) {
  var ele = document.getElementById('toast')
  if (ele == null) {
    ele = document.createElement('div')
    ele.id = 'toast'
    ele.style.display = 'block'
    ele.style.zIndex = 665
    ele.style.width = (document.body.offsetWidth - 60) + 'px'
    document.body.appendChild(ele)
    var eleChild = document.createElement('div')
    eleChild.className = 'toastmessage'
    ele.addEventListener('click', closeToast, false)
    ele.appendChild(eleChild)
  }
  ele.style.display = 'block'
  ele.style.opacity = '1'
  var child = ele.getElementsByTagName('div')[0]
  child.innerHTML = msg
  child.style.opacity = '0.9'
  if (timeoutCallback != null) {
    window.clearTimeout(timeoutCallback)
  }
  timeoutCallback = window.setTimeout(closeToast, ms == null ? 3000 : ms)
}

function closeToast () {
  window.clearTimeout(timeoutCallback)
  var e = document.getElementById('toast')
  if (e) {
    e.style.opacity = '0'
    e.getElementsByTagName('div')[0].style.opacity = '0'
    window.setTimeout(function () { e.style.display = 'none' }, 900)
  }
}

 /**
 * 更改页面标题
 */
 function setTitle (title) {
  var u = navigator.userAgent
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
  if (isiOS) {
    document.title = title
    var iframe = document.createElement('IFRAME')
    iframe.src = '/static/favicon.ico'
    iframe.style.width = '1px'
    iframe.style.height = '1px'
    iframe.style.display = 'none'
    iframe.onload = function () {
      window.setTimeout(function () {
        document.body.removeChild(iframe)
      }, 1)
    }
    document.body.appendChild(iframe)
  } else {
    document.title = title
  }
}

/**生成uuid*/
function genUUid () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16).substring(1)
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
  s4() + '-' + s4() + s4() + s4()
}

/** 弹幕字体随机颜色*/
function randomColor () {
  var colors = ['#ff0000', '#ff00f0', '#0000ff', '#00ff00', '#fff000', '#fff']
  return colors[parseInt(6 * Math.random())]
}

/** 弹幕用户随机头像*/
function randomPhoto () {
  var photos = ['./static/photo/cute.png', './static/photo/haha.png', './static/photo/heisenberg.png',
  './static/photo/mj.png', './static/photo/ji.png', './static/photo/qwe.png',
  './static/photo/niu.png', './static/photo/shu.png', './static/photo/yaseng.png',
  './static/photo/1.png', './static/photo/2.png', './static/photo/3.png',
  './static/photo/4.png', './static/photo/5.png', './static/photo/6.png', './static/photo/7.png']
  return photos[parseInt(9 * Math.random())]
}

// ---------------------方法/函数定义完毕，下面是导出public方法------------------------
module.exports = {
  showToast: showToast,
  setTitle: setTitle,
  randomColor: randomColor,
  randomPhoto: randomPhoto,
  genUUid: genUUid
}
