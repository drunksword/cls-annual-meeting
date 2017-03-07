import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import VueRouter from 'vue-router'

import './assets/css/barrager.css'
import Login from './components/Login'
import ChatInfo from './components/chat/ChatInfo'
import GroupInfo from './components/chat/GroupInfo'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
  {path: '/', component: Login},
  {path: '/chatInfo', component: ChatInfo},
  {path: '/groupInfo', component: GroupInfo},
  {path: '/danmu', name : 'danmu', component: resolve => require(['./components/chat/Danmu'], resolve)},
  {path: '/rank', name : 'rank', component: resolve => require(['./components/chat/Rank'], resolve)},
  {path: '/voteHome', name: 'home', component: resolve => require(['./components/vote/Home'], resolve)},
  {path: '/vote', name: 'vote', component: resolve => require(['./components/vote/Vote'], resolve)},
  {path: '/voteRule', name: 'voteRule', component: resolve => require(['./components/vote/VoteRule'], resolve)},
  {path: '/unsupported', name: 'unsupported', component: resolve => require(['./components/Unsupported'], resolve)}
  ]
})
/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  render: h => h(App)
})

app.$mount('#app')
