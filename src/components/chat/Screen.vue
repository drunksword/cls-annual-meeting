<template>
</template>

<script>
  import $ from 'jquery'
  import CHAT from './api/Client'
  import {randomColor, genUid, randomPhoto} from './util/index'

  export default {
    name: 'Screen',
    created () {
      $('body').css('background-size', '100% 100%')
      $('body').css('background-image', 'url(/vote/static/img/bg_screen.jpg)')
      
      if (window.localStorage) {
        console.log('浏览支持localStorage')
      } else {
        console.log('浏览暂不支持localStorage')
      }
      if (window.localStorage) {
        window.localStorage.setItem('name', '弹幕')
        window.localStorage.setItem('userid', genUid())
        window.localStorage.setItem('color', randomColor())
        window.localStorage.setItem('photo', randomPhoto())
      }
      CHAT.init('name')
    }
  }
</script>
