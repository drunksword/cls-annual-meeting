import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    voteProList: [0, 0, 0, 0, 0, 0], // 已选中的节目
  },
  mutations: {
    voteChange (state, proId) {
      var temp = state.voteProList[proId]
      state.voteProList.splice(proId, 1, (temp + 1) % 2)
    },
    cleanVote (state) {
      state.voteProList.splice(0)
    }
  }
})
