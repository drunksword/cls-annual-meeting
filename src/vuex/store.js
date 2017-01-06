import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    voteProList: [0, 0, 0, 0, 0, 0], // 已选中的节目
    currentPage: '', // 当前页面
    test: 1 // 是否是测试环境，1是0否
  },
  mutations: {
    voteChange (state, proId) {
      var temp = state.voteProList[proId - 1]
      state.voteProList.splice(proId - 1, 1, (temp + 1) % 2)
    },
    cleanVote (state) {
      state.voteProList.splice(0)
    },
    setPage (state, currentPage) {
      state.currentPage = currentPage
    }
  }
})
