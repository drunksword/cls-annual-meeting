<template>
  <div class="main">
    <h2 class="head">上海易积通电子商务有限公司<br>2016年会节目投票<div>(本页面数据实时变化，无需刷新页面)</div></h2>
    <ul>
      <li class="bar-wrap">
        <label>开场童谣（表演者：邓鸣贺）</label>
        <!-- <div class="head"></div> -->
        <div class="bar green" v-bind:data-percentage="voteCount[0].num + '票'" v-bind:style="{ width: voteCount[0].num + '%' }"></div>
      </li>
      <li class="bar-wrap">
        <label>小拜年（表演者：胡海泉一家、陈羽凡、白百何夫妇）</label>
        <div class="bar red" v-bind:data-percentage="voteCount[1].num" v-bind:style="{ width: voteCount[1].num + '%' }"></div>
      </li>
      <li class="bar-wrap">
        <label>小品《今天的幸福》（表演者：沈腾、黄杨、艾伦）</label>
        <div class="bar blue" v-bind:data-percentage="voteCount[2].num + '票'" v-bind:style="{ width: voteCount[2].num  + '%'}"></div>
      </li>
      <li class="bar-wrap">
        <label>《魔术》（表演者：刘谦）</label>
        <div class="bar purple" v-bind:data-percentage="voteCount[3].num" v-bind:style="{ width: voteCount[3].num  + '%'}"></div>
      </li>
      <li class="bar-wrap">
        <label>相声《奋斗》（表演者：曹云金、刘云天）</label>
        <div class="bar gray" v-bind:data-percentage="voteCount[4].num" v-bind:style="{ width: voteCount[4].num  + '%'}"></div>
      </li>
    </ul>
    <div class="tongji">投票人数：{{ VOTE.votePeople }}， 总票数：{{ VOTE.voteCount }}</div>
    <div class="online">在线人数：{{ VOTE.onlineCount }}</div>
    <div class="btnContainer"><button v-on:click="goVote()">去投票</button></div>
    <div class="btnContainer"><button v-on:click="goChat()">去聊天</button></div>
  </div>
</template>

<script>
import VOTE from '../../api/vote.js'

export default {
  name: 'home',
  data () {
    return {
      voteCount: VOTE.voteDetail,
      VOTE
    }
  },
  created () {
    VOTE.init(this)
    VOTE.getVoteInfo()
  },
  methods: {
    goVote () {
      this.$router.push({name: 'vote'})
    },
    goChat () {
      this.$router.push({path: 'chatInfo'})
    }
  }
}
</script>

<style scoped>
h2.head {text-align: center;color: #f43531;font-size: 35px;line-height: 40px; font-weight: 900;}
h2.head div{font-size: 25px;color:#999;margin-top: 5px;font-weight: normal;}

ul{padding-top: 10px;}
div.tongji{text-align: center;margin-top: 60px;}
div.online{color:gray;font-size: 25px;margin-top: 20px;text-align: center;}
div.btnContainer{width: 49%;text-align: center;display: inline-block;}
button{background: url(../../assets/icons.png) -51px -412px no-repeat; background-size: 300px 800px;height: 80px;width:202px;border:none;margin: 30px auto 60px auto;font-size: 32px;color: white;font-weight: bold;}

*, *:before, *:after {
  box-sizing: border-box;
}
li.bar-wrap {
  width: 100%;
  margin: 0 0 40px 0;
  overflow: hidden;
}
li.bar-wrap label {
  font-size: 28px;
  color: #8a8a8a;
  margin: 0 0 15px 0;
  display: block;
}
li.bar-wrap div.head{width: 70px;height: 97px;float: left;}
li.bar-wrap div.bar {
  height: 50px;
  width: 0;
  position: relative;
}
li.bar-wrap div.bar:after {
  content: attr(data-percentage);
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  padding-right: 10px;
  line-height: 50px;
  color: #FFF;
}
li.bar-wrap div.bar.blue {
  background-color: #61a7c4;
  border-bottom: 3px solid #4290b0;
}
li.bar-wrap div.bar.green {
  background-color: #61c471;
  border-bottom: 3px solid #42b054;
}
li.bar-wrap div.bar.red {
  background-color: #c46161;
  border-bottom: 3px solid #b04242;
}
li.bar-wrap div.bar.purple {
  background-color: #a461c4;
  border-bottom: 3px solid #8d42b0;
}
li.bar-wrap div.bar.gray {
  background-color: rgb(147,147,147);
  border-bottom: 3px solid rgb(100,100,100);
}
</style>
