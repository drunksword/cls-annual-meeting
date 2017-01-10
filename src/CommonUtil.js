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

// ---------------------方法/函数定义完毕，下面是导出public方法------------------------

/**
 * 需要导出的public 的方法
 */
module.exports = {
  showToast: showToast,
  setTitle: setTitle
}
