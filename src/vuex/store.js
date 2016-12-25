import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    voteProList: [], // 已选中的节目
    currentPage: '', // 当前页面
    test: 1 // 是否是测试环境，1是0否
  },
  mutations: {
    voteChange (state, proId) {
      var temp = state.voteProList
      for (var i = 0; i < temp.length; i++) {
        if (proId === temp[i]) {
          temp.splice(i, 1)
          return
        }
      }
      temp.push(proId)
    },
    cleanVote (state) {
      state.voteProList.splice(0)
    },
    setPage (state, currentPage) {
      state.currentPage = currentPage
    }
  }
})
