<template>
  <div class="chat">
    <div class="head-wrapper">
      <div class="-left">
        <router-link to="/voteHome" style="color:white;">
          <div class="voteText">去投票</div>
          <i class="iconfont icon-vote"></i>
        </router-link>
      </div>
      <div class="-mid">
        <p class="group-name">易积通({{CHAT.onlineCount}})</p>
      </div>
      <router-link class="-right" to="/groupInfo" >
        <i class="iconfont icon-group"></i>
      </router-link>
    </div>
    <ChatBody></ChatBody>
    <ChatFoot></ChatFoot>
  </div>
</template>

<script>
import CHAT from '../../api/chat'
import ChatBody from './ChatBody'
import ChatFoot from './ChatFoot'

export default {
  name: 'ChatHead',
  data () {
    return {
      msg: '',
      CHAT: CHAT
    }
  },
  ready () {
    console.log(11, CHAT.onlineCount)
  },
  components: {
    ChatBody,
    ChatFoot
  }
}
</script>

<style scoped>
  .chat{
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
  }
  .head-wrapper{
    background-color: #34352c;
    height: 100px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
    font-size: 32px;
  }
  .head-wrapper .-left{
    display: flex;
    flex-shrink: 0;
    height: 100%;
    width:170px;
    min-width: 140px;
    align-items: center;
    justify-content: space-around;
  }
  .head-wrapper .-left div.voteText{
    display: inline;
    vertical-align: super;
    margin-left: 5px;
    margin-right: -5px;
  }
  .head-wrapper a {
    text-decoration: none;
  }
  .head-wrapper .-mid{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color: #fff;
  }
  .head-wrapper .-right{
    display: flex;
    align-items: center;
    height: 100%;
    width: 100px;
    margin-left: 70px;
    justify-content: center;
  }
  .head-wrapper .icon-group, .icon-vote{
    font-size: 60px !important;
    color: #fff;
  }
</style>
