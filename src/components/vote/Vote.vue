<template>
  <div class="main">
    <div class="dishBox">
      <program v-for="item in programList" :data="item">
    </div>
    <button v-on:click="goDetail"></button>
  </div>
</template>

<script>
import Program from './include/Program'

export default {
  name: 'vote',
  components: {
    Program
  },
  data () {
    return {
      state: this.$store.state,
      programList: [{id: 1, name: '大变活人1', actor: 'xxx'},
                    {id: 2, name: '大变活人2', actor: 'xxx'},
                    {id: 3, name: '大变活人3', actor: 'xxx'},
                    {id: 4, name: '大变活人4', actor: 'xxx'},
                    {id: 5, name: '大变活人5', actor: 'xxx'}]
    }
  },
  created () {
    this.$store.commit('setPage', 'vote')
  },
  computed: {
    count () {
      if (this.$store.state.voteProList.length === 0) {
        return '未选择'
      }
      return this.$store.state.voteProList.toString()
    }
  },
  methods: {
    goDetail: function () {
      this.$router.push({name: 'home'})
    }
  }
}
</script>

<style scoped>
.main{padding: 120px 30px 0px 30px;}
.dishBox {margin: 0px 30px;}
button{background: url(../assets/icons.png) -54px -238px no-repeat; background-size: 300px 800px;height: 80px;width:202px;display: block;margin: auto; border:none;margin-bottom: 60px;}
</style>