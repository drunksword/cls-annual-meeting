<template>
</template>

<script>
  import $ from 'jquery'
  import CHAT from '../../api/chat'
  import {randomColor, genUUid, randomPhoto} from '../../util/util'

  export default {
    name: 'Screen',
    created () {
      var bg = require('../../assets/bg_screen.jpg')
      $('body').css('background-size', '100% 100%')
      $('body').css('background-image', 'url(' + bg+ ')')
      
    }
  }
</script>

<style type="text/css">
</style>
