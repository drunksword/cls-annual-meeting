<template>
  <div class="chat">
    <div class="head-wrapper">
      <div class="-left">
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
import CHAT from '../api/Client'
import ChatBody from '../components/ChatBody'
import ChatFoot from '../components/ChatFoot'
//  import GroupInfo from '../components/GroupInfo'
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
    height: 50px;
    flex-shrink: 0;
    display: flex;
    justify-content: space-between;
  }
  .head-wrapper .-left{
    display: flex;
    flex-shrink: 0;
    height: 100%;
    width:70px;
    min-width: 70px;
    align-items: center;
    justify-content: space-around;
  }
  .head-wrapper .icon-keaide,.icon-tree{
    font-size: 28px !important;
    color: #fff;
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
    width: 50px;
    justify-content: center;
  }
  .head-wrapper .icon-group{
    font-size: 30px !important;
    color: #fff;
  }
</style>
