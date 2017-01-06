<template>
  <div id="app">
    <h2 class="head" v-if="isWeixinBrowser">上海易积通电子商务有限公司<br>2016年会节目投票<div v-if="isHome">(本页面数据实时变化，无需刷新页面)</div></h2>
    <router-view></router-view>
  </div>
</template>

<script>
import VOTE from './Socket.js'

export default {
  name: 'app',
  data () {
    return {
      isWeixinBrowser: false
    }
  },
  created () {
    var uA = navigator.userAgent.toLowerCase()
    this.isWeixinBrowser = (/micromessenger/).test(uA)
    if (this.$store.state.test === 1) {
      this.isWeixinBrowser = true
    }
    if (!this.isWeixinBrowser) {
      this.$router.push({ name: 'unsupported' })
      return
    }
    if (typeof window.localStorage.viewRule === 'undefined' || window.localStorage.viewRule === 0) { // 只有没看过规则才跳到规则页
      this.$router.push({ name: 'voteRule' })
      return
    }
    // 连接websocket及初始化
    var con = this
    VOTE.init(con)
  },
  computed: {
    isHome () {
      return this.$store.state.currentPage === 'home'
    }
  }
}
</script>

<style>
html{min-height: 100%;}
body {margin: 0px;font-size: 32px;padding: 0 30px;background: url(./assets/bg.jpg) no-repeat;background-size: 100% 100%;}
body *{max-height:999999px;}/*该行是为了消除 Font Boosting特性(字体增强，在手机上界面‘标签数’或‘文本数’大于某个值，就会触发) */
ul {list-style: none; margin: 0; padding: 0;}
h2.head {text-align: center;color: #f43531;font-size: 35px;line-height: 40px; margin-top: 120px;font-weight: 900;}
h2.head div{font-size: 25px;color:#999;margin-top: 5px;font-weight: normal;}
/*button{width: 100%;height: 80px;background-color: #00a1e9;border-radius: 8px;border: 1px solid #00a1e9;margin-top: 40px;font-size: 32px;color:white;outline: none;margin-bottom: 60px;}*/

/* 弹出的提示层 */
#toast{padding: 16px 0px; position: fixed; top: 200px; z-index: 990; background-color: #666; font-size: 28px; border-radius: 8px; text-align: center; color: #FFF; transition: opacity 2s; }
.toastmessage{text-align:center; padding:50px 30px; transition: opacity 2s; }
</style>
