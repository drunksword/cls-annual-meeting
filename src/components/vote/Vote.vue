<template>
  <div class="main">
    <div class="dishBox">
      <program v-for="(item, index) in programList" :data="item" :index="index"></program>
    </div>
    <button v-on:click="goDetail"></button>
  </div>
</template>

<script>
import Program from './include/Program'
import programList from '../../programList.js'

export default {
  name: 'vote',
  components: {
    Program
  },
  data () {
    return {
      state: this.$store.state,
      programList: programList
    }
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
.dishBox {margin-bottom: 20px; padding-top: 120px;}
button{background: url(../../assets/icons.png) -54px -238px no-repeat; background-size: 300px 800px;height: 80px;width:202px;display: block;margin: auto; border:none;margin-bottom: 60px;}
</style>