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
    ele.style.width = (document.body.offsetWidth - 50) + 'px'
    ele.style.margin = '0px 25px'
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

/**
 * 调用服务器端rest接口
 * options 可有几个参数
 *   {'datatype': 'JSON FORM 两种，默认是FORM'
 *    'showLoading': true,  是否显示loading，默认是true
 *    'showErrorMessage': true 当返回值不是200时，是否显示错误信息（通过toast mesage显示）默认是显示,
 *    'accessToken': string, 如果需要特别指定accessToken，一般通过cookie传递，不需要处理}
 */
function callRestAPI (url, method, data, onRespSuccess, onRespError, options) {
  if (options != null && options.showLoading != null && !options.showLoading) {
    // 不需要处理loadding
  } else {
    // show loading
    // loading.show();
  }

  var req = new window.XMLHttpRequest()
  req.open(method, 'http://' + 'shitao.clschina.com' + '/nianhui2016/rest' + url, true)
  req.setRequestHeader('Accept', 'application/json')
  req.onreadystatechange = function () {
    if (req.readyState === 4) {
      if (options != null && options.showLoading != null && !options.showLoading) {
        // 不需要处理loadding
      } else {
        // hide loading
      }
      var json = null
      try {
        if (req.responseText !== '') {
          json = JSON.parse(req.responseText)
        } else {
          json = {message: '服务器未返回任何数据。'}
        }
      } catch (ex) {
        console.log('ERROR:' + req.responseText)
        json = {message: '返回值格式不正确。'}
      }
      if (req.status !== 200) {
        if (options != null && options.showErrorMessage != null && !options.showErrorMessage) {
          // 不需要自动显示错误信息
        } else {
          showToast(json.message)
        }
        if (onRespError != null) {
          // 处理出错的函数
          onRespError(req.status, json)
        }
      } else {
        if (onRespSuccess != null) {
          onRespSuccess(req.status, json)
        }
      }
    }
  }
  var postData = null
  if (options != null && options.type === 'JSON') {
    req.setRequestHeader('Content-type', 'application/json;charset=UTF-8')
    if (data == null) {
      postData = ''
    } else {
      postData = JSON.stringify(data)
    }
  } else {
    // FORM DATA
    req.setRequestHeader('Content-type', 'application/x-www-form-urlencoded;charset=UTF-8')
    if (data == null) {
      postData = ''
    } else {
      var key
      for (key in data) {
        if (postData == null) {
          postData = ''
        } else {
          postData += '&'
        }
        postData += encodeURIComponent(key)
        postData += '='
        postData += encodeURIComponent(data[key])
      }
    }
  }
  req.send(postData)
}

// ---------------------方法/函数定义完毕，下面是导出public方法------------------------

/**
 * 需要导出的public 的方法
 */
module.exports = {
  showToast: showToast,
  setTitle: setTitle,
  callRestAPI: callRestAPI
}
