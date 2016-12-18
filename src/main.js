// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './vuex/store'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/', name: 'home', component: resolve => require(['./components/Home'], resolve)},
    {path: '/vote', name: 'vote', component: resolve => require(['./components/Vote'], resolve)},
    {path: '/voteRlt', name: 'voteRlt', component: resolve => require(['./components/VoteRlt'], resolve)}
  ]
})
/* eslint-disable no-new */
const app = new Vue({
  router,
  store,
  render: h => h(App),
  methods: {
    setTitle: function (newTitle) {
      console.log('will change title to ' + newTitle)
    }
  }
})

app.$mount('#app')
