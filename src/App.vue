<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import config from './config.js'
import util from './util/util.js'
import CHAT from './api/chat.js'

export default {
  name: 'app',
  created () {
    var isMobile = (window.navigator.appVersion.match(/iphone/gi) || window.navigator.appVersion.match(/ipad/gi) || window.navigator.appVersion.match(/android/gi)) && !window.navigator.appVersion.match(/windows/gi)
    if (!isMobile) {
      this.$router.push({ name: 'danmu' })
      return
    }

    var uA = navigator.userAgent.toLowerCase()
    var isWeixinBrowser = (/micromessenger/).test(uA) || config.isTest
    if (!isWeixinBrowser) {
      this.$router.push({ name: 'unsupported' })
      return
    }
    if(!localStorage.getItem('hasLogined')){
      this.$router.push('/login')
    }
  }
}
</script>

<style>
html{height: 100%;}
body{margin: 0;height: 100%;}
body *{max-height:999999px;}/*该行是为了消除 Font Boosting特性(字体增强，在手机上界面‘标签数’或‘文本数’大于某个值，就会触发) */
#app{height: 100%;}
ul {list-style: none; margin: 0; padding: 0;}

/* 弹出的提示层 */
#toast{padding: 16px 0px; position: fixed; top: 200px; z-index: 990; background-color: #666; font-size: 28px; border-radius: 8px; text-align: center; color: #FFF; transition: opacity 2s; }
.toastmessage{text-align:center; padding:50px 30px; transition: opacity 2s; }

/* 副页面背景 */
.main {min-height:100%;margin: 0px;font-size: 32px;padding: 0 30px;background: url(./assets/bg.jpg) no-repeat;background-size: 100% 100%;}
</style>
