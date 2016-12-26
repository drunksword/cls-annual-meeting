<template>
  <div>
    <div class="dishBox" >
      <program v-for="item in programList" :data="item">
    </div>
    <div class="hasSelected">已选节目: <span>{{ count }}</span></div>
    <button v-on:click="submitVote">投　票</button>
  </div>
</template>

<script>
import Program from './include/Program'
import CommonUtil from '../CommonUtil.js'
import VOTE from '../Socket.js'

export default {
  name: 'vote',
  components: {
    Program
  },
  data () {
    return {
      state: this.$store.state,
      programList: [{id: 1, name: '大变活人1', img: require('../assets/logo.png')},
                    {id: 2, name: '大变活人2', img: require('../assets/logo.png')},
                    {id: 3, name: '大变活人3', img: require('../assets/logo.png')},
                    {id: 4, name: '大变活人4', img: require('../assets/logo.png')},
                    {id: 5, name: '大变活人5', img: require('../assets/logo.png')}]
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
    submitVote: function () {
      var voteProList = this.$store.state.voteProList
      if (voteProList.length === 0) {
        CommonUtil.showToast('您尚未选择节目')
      } else if (voteProList.length > 2) {
        CommonUtil.showToast('您最多只能选择两个节目')
      } else {
        var con = this
        VOTE.vote(voteProList, con)
        // CommonUtil.callRestAPI('/vote/vote', 'POST', {'voteProList': voteProList}, function (status, respJson) {
        //   if (respJson.succ === 0) {
        //     console.log(respJson.message)
        //     return
        //   }
        //   con.$router.push({name: 'voteRlt'})
        // })
      }
    }
  }
}
</script>

<style scoped>
.dishBox {margin: 0px 30px;}
div.hasSelected {text-align: center;font-size: 25px;margin-top: 20px;}
div.hasSelected span{color:red;font-size: 30px;}
</style>