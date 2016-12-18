<template>
  <div id="app">
    <h2>易积通2016年年会节目投票</h2>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  created () {
  }
}
</script>

<style>
html, body {height: 100%;}
body {margin: 0px;font-size: 32px;padding: 0 30px;}
ul {list-style: none; margin: 0; padding: 0;}
h2 {text-align: center;}
button{width: 100%;height: 80px;background-color: #00a1e9;border-radius: 8px;border: 1px solid #00a1e9;margin-top: 40px;font-size: 32px;color:white;outline: none;}

/* 弹出的提示层 */
#toast{padding: 16px 0px; position: fixed; top: 200px; z-index: 990; background-color: #666; font-size: 28px; border-radius: 8px; text-align: center; color: #FFF; transition: opacity 2s; }
.toastmessage{text-align:center; padding:50px 30px; transition: opacity 2s; }
</style>
