<template>
  <div class="main">
    <div class="titleBox"><h2></h2></div>
    <ul class="rules">
      <li>1.每名员工可以投3票，支持自己喜欢的节目。</li>
      <li>2.年会活动结束前，你都可以在投票页面修改你的选择。</li>
      <li>3.投票采用匿名制。</li>
    </ul>
    <button v-on:click="goVote()"></button>
  </div>
</template>

<script>
  export default {
    name: 'voteRule',
    data () {
      return {
      }
    },
    created () {
      this.$store.commit('setPage', 'voteRlt')
      window.localStorage.viewRule = 1
    },
    methods: {
      goVote () {
        localStorage.setItem('hasReadRule', true)
        this.$router.push({ path: '/vote' })
      }
    }
  }
</script>

<style scoped>
  .titleBox{padding-top:150px;margin-bottom: 30px;}
  h2{background: url(../../assets/icons.png) -41px -338px no-repeat; background-size: 323px 852px;height: 100px;width: 245px; margin: 0px auto;}
  ul{list-style: none;font-weight:bold;margin: 0px 30px;}
  ul li{margin-bottom: 15px;line-height: 40px;}
  button{background: url(../../assets/icons.png) -23px -412px no-repeat; background-size: 300px 800px;height: 80px;width:245px;border:none;margin: 150px auto 0 auto;display: block;}
</style>