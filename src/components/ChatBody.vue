<template>
  <div class="body-wrapper" id="body-wrapper">
    <template v-for="msgObj in CHAT.msgArr">
      <template v-if="msgObj.login">
        <system-msg :msg="msgObj.user.username"></system-msg>
      </template>
      <template v-if="!msgObj.login&&!msgObj.logout">
        <other-msg v-if="msgObj.userid!=CHAT.userid" :name="msgObj.username" :msg="msgObj.msg" :color="msgObj.color" :photo="msgObj.photo"></other-msg>
      <self-msg v-if="msgObj.userid==CHAT.userid" :msg="msgObj.msg" :color="msgObj.color" :photo="msgObj.photo" ></self-msg>
      </template>
    </template>
    <!-- <other-msg></other-msg> -->
  </div>

</template>

<script>
  import OtherMsg from './OtherMsg'
  import SelfMsg from './SelfMsg'
  import SystemMsg from './SystemMsg'
  import CHAT from '../api/Client'

  export default {
    name: 'ChatBody',
    data () {
      return {
        CHAT
      }
    },
    ready () {
      if (!localStorage.getItem('name')) {
        this.$router.go('/login')
      }
  //    this.visit()
    },
    components: {
      OtherMsg,
      SelfMsg,
      SystemMsg
    },
    methods: {
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.body-wrapper{
  background-color: #f6f6f6;
  height: calc(100% - 90px);
  overflow-y: scroll;
  overflow-x: hidden;
  background: url(../assets/bj.jpg) no-repeat;
  background-size: 100%;
}
</style>
