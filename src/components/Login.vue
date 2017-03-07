<template>
  <transition to="loginslide">
    <div class="login-wrapper" >
      <div class="header">
      </div>
      <div class="body">
        <div class="-title">
          给自己起个酷酷的外号去指点江山吧：
        </div>
        <div class="-name">
          <input type="text" v-model="name" placeholder="10字以内">
        </div>
        <div class="-login">
          <span class="-btn" @click="login()">准备好了</span>
        </div>
        <div class="-login">
          <span class="-btn default" @click="login()">我懒得起名</span>
        </div>
      </div>
      <div class="foot">
      </div>
    </div>
  </transition>
</template>

<script>
import CHAT from '../api/chat'
import util from '../util/util'

export default {
  name: 'Login',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    login () {
      this.name = this.name.slice(0, 10)
      if (localStorage) {
        localStorage.setItem('name', this.name || '编号' + parseInt(1000 * Math.random()))
        localStorage.setItem('color', util.randomColor())
        localStorage.setItem('userid', util.genUUid())
        localStorage.setItem('photo', util.randomPhoto())
      }
      CHAT.init(this.name)
      this.$router.push('/chatInfo')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login-wrapper {
    transition: all .3s ease;
    transform: translate(100%, 0);
    background-color: #fff;
    position: absolute;
    top: 0;
    left: -100%;
    right: 100%;
    bottom: 0;
  }
  .login-wrapper .header {
    width: 100%;
    height: 36%;
    max-height: 600px;
    background: url(../assets/2.jpg) no-repeat;
    background-size: 100%;
  }
  .login-wrapper .body {
    display: flex;
    flex-direction: column;
    padding: 30px;
  }
  .login-wrapper .body .-title {
    height: 160px;
    font-size: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
    color: #999;
    text-align: justify;
  }
  .login-wrapper .body .-name,
  .login-wrapper .body .-weichat {
    display: flex;
    height: 80px;
    justify-content: center;
    align-items: center;
    font-size: 32px;
    color: #999;
    border-top: solid 1px rgba(0, 0, 0, 0.05);
    margin-bottom: 30px;
  }
  .login-wrapper .body .-name lable,
  .login-wrapper .body .-weichat lable {
    color: #999;
  }
  .login-wrapper .body .-name input,
  .login-wrapper .body .-weichat input {
    box-sizing: border-box;
    height: 60px;
    border: none;
    outline: none;
    padding: 10px;
    color: #666;
    background-color: rgba(0, 0, 0, 0.05);
    font-size: 36px;
    line-height: 60px;
    width: 100%;
  }
  .login-wrapper .body .-login {
    display: flex;
    height: 130px;
    align-items: center;
    font-size: 32px;
    color: #999;
  }
  .login-wrapper .body .-login .-btn {
    background-color: #3CAF36;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 70px;
    margin: 20px 0px;
    color: #fff;
    font-weight: bolder;
    border-radius: 10px;
  }
    .login-wrapper .body .-login .default{
      background-color: white;
      color: #3CAF36;
      border: 1px solid #3CAF36;
      margin-top: -10px;
    }
  .login-wrapper .foot {
    height: 80px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 13px;
    color: #999;
  }
  .login-wrapper .foot span {
    display: inline-block;
  }
  .login-wrapper .foot span:first-child {
    font-size: 15px;
  }
  .login-wrapper a {
    color: #999;
  }
  /* .loginslide-enter 定义进入的开始状态 */
  /* .loginslide-leave 定义离开的结束状态 */
  .loginslide-leave,
  .loginslide-enter {
    transform: translate(0%, 0);
  }
</style>
