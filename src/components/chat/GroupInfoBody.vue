<template>
<div class="group-info-body-wrap">
	<div class="-bar"></div>
	<!--<div class="-members" >-->
		<!--<div class="-member" v-for="userObj in CHAT.onlineUsers" @click="showWeiChat(userObj)">-->
      <!--<img class="-header" :src="userObj.photo" />-->
			<!--<span class="-name">-->
				<!--{{userObj.username.slice(0,4)}}-->
			<!--</span>-->
		<!--</div>-->
		<!--&lt;!&ndash; 占位 &ndash;&gt;-->
		<!--<div class="-member" v-for="i in 9">-->
		<!--</div>-->
	<!--</div>-->
	<div class="-bar"></div>
	<div class="-self">
		<div class="-title">
			我在本群的信息
		</div>
		<div class="-info">
      <img class="-header" :src="photo" />
			<span class="-name">{{name}}</span>
			<span class="-modify" @click="show()">修改</span>
		</div>
		<div class="-notice">
		</div>
	</div>
	<div class="-bar"></div>
	<div class="-del" @click="del()">删除并退出</div>
	<div class="-bar"></div>
	<div class="-bar"></div>
  <DialogUtil v-if="isShow" :fast-close="false">
    <div class="modify-box">
      <div class="-header" @click="changePhoto()">
        <img class="-img" :src="photo" />
        <span class="-notice">点击更换头像</span>
      </div>
      <div class="-name">
        <label>群昵称：</label>
        <input type="text" v-model="name" placeholder="10字以内">
      </div>
      <div class="-save">
        <span class="-btn" @click="save()">保存</span>
      </div>
    </div>
  </DialogUtil>
  <DialogUtil v-if="isShowF">
    <div class="f-info">
      <div class="-name">
        <label>群昵称：</label>
        <input disabled="true" type="text" v-model="fname" placeholder="">
      </div>
      <div class="-save">
        <span class="-btn" @click="closeF()">关闭</span>
      </div>
    </div>
  </DialogUtil>
</div>


</template>
<script>
import CHAT from '../api/Client'
import DialogUtil from './util/DialogUtil'
import {randomPhoto} from '../util/index'
export default{
  name: 'GroupInfoBody',
  data () {
    return {
      CHAT: CHAT,
      photo: localStorage.getItem('photo') || './static/photo/cute.png',
      name: 'redream',
      weichat: 'redream',
      isShow: false,
      fname: 'redream',
      isShowF: false

    }
  },
  created () {
    console.log(CHAT.onlineUsers, 99)
    if (!localStorage) {
      alert('不支持本地保存')
      return
    }
    if (localStorage.getItem('name')) {
      this.name = localStorage.getItem('name')
    }
    if (localStorage.getItem('photo')) {
      this.photo = localStorage.getItem('photo')
    }
    if (localStorage.getItem('weichat')) {
      this.weichat = localStorage.getItem('weichat')
    }
  },
  components: {
    DialogUtil
  },
  methods: {
    changePhoto () {
      this.photo = randomPhoto()
      localStorage.setItem('photo', this.photo)
    },
    save () {
      this.name = this.name.slice(0, 10)
      if (localStorage) {
        localStorage.setItem('name', this.name)
        localStorage.setItem('photo', this.photo)
        localStorage.setItem('weichat', this.weichat)
      }
      this.isShow = false
      this.CHAT.changeInfo()
    },
    show () {
      this.isShow = true
    },
    del () {
      if (localStorage) {
        localStorage.removeItem('name')
        localStorage.removeItem('userid')
        localStorage.removeItem('photo')
        localStorage.removeItem('weichat')
      }
      this.CHAT.logout()
      this.$router.push('/')
    },
    showWeiChat (userObj) {
      console.log(userObj)
      this.fname = userObj.username
      this.fweichat = userObj.weichat
      this.isShowF = true
    },
    closeF () {
      this.isShowF = false
    }
  }
}
</script>
<style scoped>
  .group-info-body-wrap {
    display: flex;
    flex-direction: column;
  }
  .group-info-body-wrap .-bar {
    height: 20px;
    width: 100%;
    background-color: #eee;
  }
  .group-info-body-wrap .-members {
    display: flex;
    background-color: #fff;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .group-info-body-wrap .-members .-member {
    display: inline-flex;
    flex-direction: column;
    /*background-color: #798;*/

    box-sizing: border-box;
    padding: 10px 20px;
    width: 90px;
    min-width: 80px;
  }
  .group-info-body-wrap .-members .-member .-header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    width: 50px;
    /*background-color: #79f;*/

  }
  .group-info-body-wrap .-members .-member .-name {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
  .group-info-body-wrap .-members .-member:nth-last-child(10) ~ .-member {
    height: 0;
    padding: 0;
  }
  .group-info-body-wrap .-self {
    display: flex;
    flex-direction: column;
    padding: 0 10px;
    background-color: #fff;
  }
  .group-info-body-wrap .-self .-title {
    display: flex;
    align-items: center;
    height: 50px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .group-info-body-wrap .-self .-info {
    display: flex;
    align-items: center;
    height: 50px;
    position: relative;
    border-bottom: 1px solid rgba(0, 0, 0, 0.05);
  }
  .group-info-body-wrap .-self .-info .-header {
    height: 40px;
    width: 40px;
    background-color: #654;
    border-radius: 50%;
  }
  .group-info-body-wrap .-self .-info .-name {
    padding: 0 10px;
    font-size: 16px;
  }
  .group-info-body-wrap .-self .-info .-modify {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: #3CAF36;
    display: flex;
    height: 30px;
    justify-content: center;
    align-items: center;
    padding: 0 20px;
    color: #fff;
  }
  .group-info-body-wrap .-self .-notice {
    display: flex;
    flex-direction: column;
    height: 60px;
  }
  .group-info-body-wrap .-del {
    background-color: #e64340;
    margin: 0 10px;
    display: flex;
    height: 40px;
    color: #fff;
    justify-content: center;
    align-items: center;
    font-weight: bolder;
  }
  .group-info-body-wrap .-notice {
    display: flex;
    height: 40px;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #999;
  }
  .modify-box {
    background-color: #fff;
    height: 200px;
    width: 80%;
    padding: 10px;
  }
  .modify-box .-header {
    height: 80px;
    /*background-color: #777;*/

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .modify-box .-header .-img {
    display: block;
    height: 64px;
    width: 64px;
    background-color: #090;
    border-radius: 50%;
  }
  .modify-box .-header .-notice {
    display: block;
    font-size: 14px;
    color: #999;
  }
  .modify-box .-name,
  .modify-box .-weichat,
  .modify-box .-save {
    /*background-color: #eee;*/

    display: flex;
    height: 56px;
    align-items: center;
    font-size: 16px;
  }
  .modify-box .-name input,
  .modify-box .-weichat input,
  .modify-box .-save input {
    box-sizing: border-box;
    height: 25px;
    border: none;
    outline: none;
    padding: 5px;
    color: #666;
    background-color: rgba(0, 0, 0, 0.02);
    line-height: 25px;
    font-size: 18px;
  }
  .modify-box .-name .-btn,
  .modify-box .-weichat .-btn,
  .modify-box .-save .-btn {
    background-color: #3CAF36;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 40px;
    margin: 10px auto;
    color: #fff;
    font-weight: bolder;
    border-radius: 3px;
  }
  .f-info {
    background-color: #fff;
    height: 150px;
    width: 80%;
    padding: 10px;
  }
  .f-info .-header {
    height: 60px;
    /*background-color: #777;*/

    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }
  .f-info .-header .-img {
    display: block;
    height: 40px;
    width: 40px;
    background-color: #090;
    border-radius: 50%;
  }
  .f-info .-header .-notice {
    display: block;
    font-size: 14px;
    color: #999;
  }
  .f-info .-name,
  .f-info .-weichat,
  .f-info .-save {
    /*background-color: #eee;*/

    display: flex;
    height: 50px;
    align-items: center;
    font-size: 16px;
    justify-content: center;
  }
  .f-info .-name input,
  .f-info .-weichat input,
  .f-info .-save input {
    box-sizing: border-box;
    height: 25px;
    border: none;
    outline: none;
    padding: 5px;
    color: #666;
    background-color: rgba(0, 0, 0, 0.02);
  }
  .f-info .-name .-btn,
  .f-info .-weichat .-btn,
  .f-info .-save .-btn {
    background-color: #3CAF36;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 80%;
    height: 40px;
    margin: 10px auto;
    color: #fff;
    font-weight: bolder;
  }
  textarea {
    width: 400px;
    height: 300px;
    font-size: 12px;
  }

</style>
