// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import VueRouter from 'vue-router'

import '../static/css/barrager.css'
import ChatInfo from './components/ChatInfo'
import GroupInfo from './components/GroupInfo'
import Login from './components/Login'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/', component: Login},
    {path: '/chatInfo', component: ChatInfo},
    {path: '/groupInfo', component: GroupInfo},
    {path: '/voteHome', name: 'home', component: resolve => require(['./components/Home'], resolve)},
    {path: '/vote', name: 'vote', component: resolve => require(['./components/Vote'], resolve)},
    {path: '/voteRule', name: 'voteRule', component: resolve => require(['./components/VoteRule'], resolve)},
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
