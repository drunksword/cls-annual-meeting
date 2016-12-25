<template>
  <div id="app">
    <h2 v-if="isWeixinBrowser">易积通2016年年会节目投票<div v-if="isHome">(本页面数据实时变化，无需刷新页面)</div></h2>
    <router-view></router-view>
  </div>
</template>

<script>
import VOTE from './Socket.js'

export default {
  name: 'app',
  created () {
    var uA = navigator.userAgent.toLowerCase()
    this.isWeixinBrowser = (/micromessenger/).test(uA)
    if (this.$store.state.test === 1) {
      this.isWeixinBrowser = true
    }
    if (!this.isWeixinBrowser) {
      this.$router.push({ path: 'unsupported' })
      return
    }
    // 连接websocket及初始化
    VOTE.init()
  },
  data () {
    return {
      isWeixinBrowser: false
    }
  },
  computed: {
    isHome () {
      return this.$store.state.currentPage === 'home'
    }
  }
}
</script>

<style>
html, body {height: 100%;}
body {margin: 0px;font-size: 32px;padding: 0 30px;}
ul {list-style: none; margin: 0; padding: 0;}
h2 {text-align: center;}
h2 div{font-size: 20px;color:#999;margin-top: 10px;font-weight: normal;}
button{width: 100%;height: 80px;background-color: #00a1e9;border-radius: 8px;border: 1px solid #00a1e9;margin-top: 40px;font-size: 32px;color:white;outline: none;}

/* 弹出的提示层 */
#toast{padding: 16px 0px; position: fixed; top: 200px; z-index: 990; background-color: #666; font-size: 28px; border-radius: 8px; text-align: center; color: #FFF; transition: opacity 2s; }
.toastmessage{text-align:center; padding:50px 30px; transition: opacity 2s; }
</style>
