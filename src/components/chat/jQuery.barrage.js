$.fn.barrager = function (barrage) {
  barrage = $.extend({
    close: true,
    bottom: 0,
    max: 10,
    speed: 6,
    color: '#fff',
    old_ie_color: '#000000'
  }, barrage || {})
  var time = new Date().getTime()
  var barragerId = 'barrage_' + time
  var id = '#' + barragerId
  var divBarrager = $("<div class='barrage' id='" + barragerId + "'></div>").appendTo($(this))
  var windowHeight = $(window).height() - 100
  var bottom = (barrage.bottom === 0) ? Math.floor(Math.random() * windowHeight + 40) : barrage.bottom
  divBarrager.css('bottom', bottom + 'px')
  var divBarragerBox = $("<div class='barrage_box cl'></div>").appendTo(divBarrager)
  if (barrage.img) {
    divBarragerBox.append("<a class='portrait z' href='javascript:;'></a>")
    var img = $("<img src='' >").appendTo(id + ' .barrage_box .portrait')
    img.attr('src', barrage.img)
  }
  divBarragerBox.append(" <div class='z p'></div>")
  if (barrage.close) {
    divBarragerBox.append(" <div class='close z'></div>")
  }
  var content = $("<a title='' href='' target='_blank'></a>").appendTo(id + ' .barrage_box .p')
  content.attr({
    'href': barrage.href,
    'id': barrage.id
  }).empty().append(barrage.info)
  console.log(barrage.info)
  console.log(content)
  if (navigator.userAgent.indexOf('MSIE 6.0') > 0 || navigator.userAgent.indexOf('MSIE 7.0') > 0 || navigator.userAgent.indexOf('MSIE 8.0') > 0) {
    content.css('color', barrage.old_ie_color)
  } else {
    content.css('color', barrage.color)
  }
  var i = 0
  divBarrager.css('margin-right', i)
  var width = parseInt(divBarrager.css('width'))
  if (width > $(window).width()) {
    width = width + 50
  }
  var windowWidth = $(window).width() + width
  var speed = 100
  var t = windowWidth / speed
  divBarrager.css('transition', 'margin-right ' + t + 's linear')
  console.log('width' + width)
  divBarrager.css('right', -width)
  divBarragerBox.css('width', width)
  divBarrager.css('margin-right', windowWidth)
  setTimeout(function () { $(id).remove() }, t * 1000)
}
$.fn.barrager.removeAll = function () {
  $('.barrage').remove()
}