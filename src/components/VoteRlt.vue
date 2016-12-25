<template>
  <div>
    <div class="voteSuccess">投票成功。</div>
    <button v-on:click="backToHome">查看投票结果</button>
  </div>
</template>

<script>
  export default {
    name: 'voteRlt',
    data () {
      return {
      }
    },
    created () {
      this.$store.commit('setPage', 'voteRlt')
    },
    methods: {
      backToHome () {
        this.$router.push({ path: '/' })
      }
    }
  }
</script>

<style scoped>
  div.voteSuccess {font-size: 40px;text-align: center;margin-top: 80px;}
</style>