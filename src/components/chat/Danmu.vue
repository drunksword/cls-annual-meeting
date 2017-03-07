<template>
  <ul>
    <li class="bar-wrap">
      <div class="barBox"><div class="bar green" v-bind:data-percentage="voteCount[0].num + '票'" v-bind:style="{ height: voteCount[0].num + '%' }"></div></div>
      <label>开场童谣 <div class="actors">表演者：邓鸣贺</div></label>
    </li>
    <li class="bar-wrap">
      <div class="barBox"><div class="bar red" v-bind:data-percentage="voteCount[1].num + '票'" v-bind:style="{ height: voteCount[1].num + '%' }"></div></div>
      <label>小拜年<div class="actors">表演者：胡海泉家、陈羽凡、白百何夫妇</div></label>
    </li>
    <li class="bar-wrap">
      <div class="barBox"><div class="bar blue" v-bind:data-percentage="voteCount[2].num + '票'" v-bind:style="{ height: voteCount[2].num  + '%'}"></div></div>
      <label>小品《今天的幸福》<div class="actors">表演者：沈腾、黄杨、艾伦</div></label>
    </li>
    <li class="bar-wrap">
      <div class="barBox"><div class="bar purple" v-bind:data-percentage="voteCount[3].num + '票'" v-bind:style="{ height: voteCount[3].num  + '%'}"></div></div>
      <label>《魔术》 <div class="actors">表演者：刘谦</div></label>
    </li>
    <li class="bar-wrap">
      <div class="barBox"><div class="bar gray" v-bind:data-percentage="voteCount[4].num + '票'" v-bind:style="{ height: voteCount[4].num  + '%'}"></div></div>
      <label>相声《奋斗》 <div class="actors">表演者：曹云金、刘云天</div></label>
    </li>
  </ul>
</template>

<script>
  import $ from 'jquery'
  import CHAT from '../../api/chat'
  import VOTE from '../../api/vote.js'
  import {randomColor, genUUid, randomPhoto} from '../../util/util' 

  export default {
    name: 'Danmu',
    data () {
      return {
        CHAT,
        msg: '',
        showButton: false,
        voteCount: VOTE.voteDetail
      }
    },
    created () {
      var bg = require('../../assets/bg_screen.jpg')
      $('body').css('background-size', '100% 100%')
      $('body').css('background-image', 'url(' + bg+ ')')

      VOTE.init(this)
    VOTE.getVoteInfo()

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
        window.localStorage.setItem('name', '弹幕')
        window.localStorage.setItem('userid', genUUid())
        window.localStorage.setItem('color', randomColor())
        window.localStorage.setItem('photo', randomPhoto())
      }
      CHAT.init('name')
    }
  }
</script>

<style scoped>
  *, *:before, *:after {
    box-sizing: border-box;
  }
  ul{padding: 50px 0px 0px 0px;margin:0 80px;height: 100%;}
  ul li{width:20%;float: left;height: 100%;}
  ul li div.barBox{height: 80%;width: 80px;margin:auto;position: relative;}
  ul li div.bar{position: absolute;bottom: 0px;width: 100%;}
  li.bar-wrap label {
    height: 20%;
    font-size: 24px;
    color: #333;
    display: block;
    font-weight: bold;
    text-align: center;
    margin: 0 10px;
    padding-top: 15px;
  }
  li.bar-wrap label .actors{
    font-size: 20px;
    line-height: 24px;
    margin-top: 8px;
    color: #666;
  }
  li.bar-wrap div.head{width: 70px;height: 97px;float: left;}
  li.bar-wrap div.bar:after {
    content: attr(data-percentage);
    display: block;
    text-align: center;
    line-height: 40px;
    color: #FFF;
  }
  li.bar-wrap div.bar.blue {
    background-color: #61a7c4;
    border-top: 3px solid #4290b0;
  }
  li.bar-wrap div.bar.green {
    background-color: #61c471;
    border-top: 3px solid #42b054;
  }
  li.bar-wrap div.bar.red {
    background-color: #c46161;
    border-top: 3px solid #b04242;
  }
  li.bar-wrap div.bar.purple {
    background-color: #a461c4;
    border-top: 3px solid #8d42b0;
  }
  li.bar-wrap div.bar.gray {
    background-color: rgb(147,147,147);
    border-top: 3px solid rgb(100,100,100);
  }
</style>
