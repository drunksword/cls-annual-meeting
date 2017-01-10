<script>
  import $ from 'jquery'
  import CHAT from '../api/Client'

  export default {
    name: 'Danmu',
    data () {
      return {
        CHAT,
        msg: '',
        showButton: false
      }
    },
    created () {
      if ((window.navigator.appVersion.match(/iphone/gi) || window.navigator.appVersion.match(/ipad/gi) || window.navigator.appVersion.match(/android/gi)) && !window.navigator.appVersion.match(/windows/gi)) {
        $('body').css('background-size', '100% 100%')
        $('body').css('background-image', 'url(/static/img/beijingsj1.jpg)')
      }
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
      if (window.localStorage) {
        console.log('浏览支持localStorage')
      } else {
        console.log('浏览暂不支持localStorage')
      }
      if (window.localStorage) {
        window.localStorage.setItem('name', '弹幕')
        window.localStorage.setItem('userid', CHAT.genUid())
        window.localStorage.setItem('color', CHAT.randomColor())
        window.localStorage.setItem('photo', CHAT.randomPhoto())
      }
      CHAT.init('name')
    }
  }
</script>

<style scoped>
  .hello{
    bottom: 20px;
    height: 76px;
    border-radius: 4px;
    border: 20px solid transparent;
    overflow: hidden;
    box-sizing: border-box;
    position: fixed;
    width: 100%;
  }
  .hello .msg{
    width: 80%;
    height: 36px;
    float: left;
    overflow: hidden;
    background-color: #fff;
  }
  .hello .msg input{
    width: 100%;
    font-size: 22px;
    border: none;
    color: #999;
    -webkit-appearance: none;
    vertical-align: middle;
    height: 36px;
    box-shadow: none;
    float: left;
    margin-top: -1px;
  }
  .hello .button{
    height: 36px;
    width: 20%;
    float: right;
    font-size: 20px;
    line-height: 36px;
    color: #fff;
    background-color: #ff9c00;
    border: none;
  }
</style>
