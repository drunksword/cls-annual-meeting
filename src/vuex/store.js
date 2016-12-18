import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    voteProList: [], // 已选中的节目
    chatClient: null // webSocket客户端
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
    }
  }
})
