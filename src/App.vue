<template>
  <div id="app">
    <h2>易积通2016年年会节目投票</h2>
    <div v-show="state.currentPage == 'index'">
      <div class="dishBox" >
        <program v-for="item in programList" :data="item">
      </div>
      <div class="hasSelected">已选节目: <span>{{ count }}</span></div>
      <button class="button button-raised button-primary button-pill" v-on:click="submitVote">投　票</button>
    </div>
    <div v-show="state.currentPage == 'voteRlt'">
      <div class="voteSuccess">投票成功。</div>
    </div>
  </div>
</template>

<script>
import Program from './components/Program'
import CommonUtil from './CommonUtil.js'

export default {
  name: 'app',
  components: {
    Program
  },
  data () {
    return {
      state: this.$store.state,
      programList: [{id: 1, name: '大变活人1', img: require('./assets/logo.png')},
                    {id: 2, name: '大变活人2', img: require('./assets/logo.png')},
                    {id: 3, name: '大变活人3', img: require('./assets/logo.png')},
                    {id: 4, name: '大变活人4', img: require('./assets/logo.png')},
                    {id: 5, name: '大变活人5', img: require('./assets/logo.png')}]
    }
  },
  computed: {
    count () {
      if (this.$store.state.voteProList.length === 0) {
        return '未选择'
      }
      return this.$store.state.voteProList.toString()
    }
  },
  methods: {
    submitVote: function () {
      var voteProList = this.$store.state.voteProList
      if (voteProList.length === 0) {
        console.log('您尚未选择节目')
        // alert('您尚未选择节目')
      } else if (voteProList.length > 2) {
        console.log('您最多只能选择两个节目')
        // alert('您最多只能选择两个节目')
      } else {
        var con = this
        CommonUtil.callRestAPI('/vote/vote', 'POST', {'voteProList': voteProList}, function (status, respJson) {
          if (respJson.succ === 0) {
            console.log(respJson.message)
            return
          }
          con.$store.state.currentPage = 'voteRlt'
        })
      }
    }
  }
}
</script>

<style>
html, body {height: 100%;}
body {margin: 0px;}
h2 {text-align: center;}
.dishBox {-webkit-columns: auto 2;-webkit-column-gap: 30px;column-span: none; margin: 0px 30px;}
div.hasSelected {text-align: center;font-size: 25px;margin-top: 20px;}
div.hasSelected span{color:red;font-size: 30px;}
div.voteSuccess {font-size: 40px;text-align: center;margin-top: 80px;}

/* 弹出的提示层 */
#toast{padding: 16px 5px; position: fixed; top: 200px; z-index: 990; background-color: #666; font-size: 28px; border-radius: 8px; text-align: center; color: #FFF; transition: opacity 2s; }
.toastmessage{text-align:center; padding:50px 30px; transition: opacity 2s; }

.button {
  color: #fff;
  background-color: #EEE;
  border-color: #EEE;
  font-weight: 300;
  font-family: "Helvetica Neue Light", "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif;
  text-decoration: none;
  text-align: center;
  line-height: 40px;
  height: 40px;
  padding: 0 40px;
  margin: 0;
  display: inline-block;
  appearance: none;
  cursor: pointer;
  border: none;
  -webkit-box-sizing: border-box;
     -moz-box-sizing: border-box;
          box-sizing: border-box;
  -webkit-transition-property: all;
          transition-property: all;
  -webkit-transition-duration: .3s;
          transition-duration: .3s;
  width:60%;
  margin-left: 20%;
  margin-top: 40px;
  height:60px; 
  font-size: 32px;
  }
  .button:visited {
    color: #666; }
  .button:hover, .button:focus {
    background-color: #f6f6f6;
    color: #f6f6f6;
    text-decoration: none;
    outline: none; }
  .button:active, .button.active, .button.is-active {
    text-shadow: 0 1px 0 rgba(255, 255, 255, 0.3);
    text-decoration: none;
    background-color: #eeeeee;
    border-color: #cfcfcf;
    color: #d4d4d4;
    -webkit-transition-duration: 0s;
            transition-duration: 0s;
    -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2);
            box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.2); }
  .button.disabled, .button.is-disabled, .button:disabled {
    top: 0 !important;
    background: #EEE !important;
    border: 1px solid #DDD !important;
    text-shadow: 0 1px 1px white !important;
    color: #CCC !important;
    cursor: default !important;
    appearance: none !important;
    -webkit-box-shadow: none !important;
            box-shadow: none !important;
    opacity: .8 !important; }

/*
* Raised Buttons
*
* A classic looking button that offers
* great depth and affordance.
*/
.button-raised {
  border-color: #e1e1e1;
  border-style: solid;
  border-width: 1px;
  line-height: 38px;
  background: -webkit-gradient(linear, left top, left bottom, from(#f6f6f6), to(#e1e1e1));
  background: linear-gradient(#f6f6f6, #e1e1e1);
  -webkit-box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.15);
          box-shadow: inset 0px 1px 0px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0, 0, 0, 0.15); }
  .button-raised:hover, .button-raised:focus {
    background: -webkit-gradient(linear, left top, left bottom, from(white), to(gainsboro));
    background: linear-gradient(top, white, gainsboro); }
  .button-raised:active, .button-raised.active, .button-raised.is-active {
    background: #eeeeee;
    -webkit-box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 0px white;
            box-shadow: inset 0px 1px 3px rgba(0, 0, 0, 0.2), 0px 1px 0px white; }

/*
* Raised Button Colors
*
* Create colors for raised buttons
*/
.button-raised.button-primary {
  border-color: #088ef0;
  background: -webkit-gradient(linear, left top, left bottom, from(#34a5f8), to(#088ef0));
  background: linear-gradient(#34a5f8, #088ef0); }
  .button-raised.button-primary:hover, .button-raised.button-primary:focus {
    background: -webkit-gradient(linear, left top, left bottom, from(#42abf8), to(#0888e6));
    background: linear-gradient(top, #42abf8, #0888e6); }
  .button-raised.button-primary:active, .button-raised.button-primary.active, .button-raised.button-primary.is-active {
    border-color: #0880d7;
    background: #2798eb; }
.button-raised.button-plain {
  border-color: #f2f2f2;
  background: -webkit-gradient(linear, left top, left bottom, from(white), to(#f2f2f2));
  background: linear-gradient(white, #f2f2f2); }
  .button-raised.button-plain:hover, .button-raised.button-plain:focus {
    background: -webkit-gradient(linear, left top, left bottom, from(white), to(#ededed));
    background: linear-gradient(top, white, #ededed); }
  .button-raised.button-plain:active, .button-raised.button-plain.active, .button-raised.button-plain.is-active {
    border-color: #e6e6e6;
    background: white; }
.button-raised.button-inverse {
  border-color: #151515;
  background: -webkit-gradient(linear, left top, left bottom, from(#2f2f2f), to(#151515));
  background: linear-gradient(#2f2f2f, #151515); }
  .button-raised.button-inverse:hover, .button-raised.button-inverse:focus {
    background: -webkit-gradient(linear, left top, left bottom, from(#363636), to(#101010));
    background: linear-gradient(top, #363636, #101010); }
  .button-raised.button-inverse:active, .button-raised.button-inverse.active, .button-raised.button-inverse.is-active {
    border-color: #090909;
    background: #222222; }
.button-raised.button-action {
  border-color: #9ad824;
  background: -webkit-gradient(linear, left top, left bottom, from(#afe24d), to(#9ad824));
  background: linear-gradient(#afe24d, #9ad824); }
  .button-raised.button-action:hover, .button-raised.button-action:focus {
    background: -webkit-gradient(linear, left top, left bottom, from(#b5e45a), to(#94cf22));
    background: linear-gradient(top, #b5e45a, #94cf22); }
  .button-raised.button-action:active, .button-raised.button-action.active, .button-raised.button-action.is-active {
    border-color: #8bc220;
    background: #a1d243; }
.button-raised.button-highlight {
  border-color: #fea502;
  background: -webkit-gradient(linear, left top, left bottom, from(#feb734), to(#fea502));
  background: linear-gradient(#feb734, #fea502); }
  .button-raised.button-highlight:hover, .button-raised.button-highlight:focus {
    background: -webkit-gradient(linear, left top, left bottom, from(#febc44), to(#f49f01));
    background: linear-gradient(top, #febc44, #f49f01); }
  .button-raised.button-highlight:active, .button-raised.button-highlight.active, .button-raised.button-highlight.is-active {
    border-color: #e59501;
    background: #f3ab26; }
.button-raised.button-caution {
  border-color: #ff2939;
  background: -webkit-gradient(linear, left top, left bottom, from(#ff5c69), to(#ff2939));
  background: linear-gradient(#ff5c69, #ff2939); }
  .button-raised.button-caution:hover, .button-raised.button-caution:focus {
    background: -webkit-gradient(linear, left top, left bottom, from(#ff6c77), to(#ff1f30));
    background: linear-gradient(top, #ff6c77, #ff1f30); }
  .button-raised.button-caution:active, .button-raised.button-caution.active, .button-raised.button-caution.is-active {
    border-color: #ff1022;
    background: #f64c59; }
.button-raised.button-royal {
  border-color: #665ce6;
  background: -webkit-gradient(linear, left top, left bottom, from(#9088ec), to(#665ce6));
  background: linear-gradient(#9088ec, #665ce6); }
  .button-raised.button-royal:hover, .button-raised.button-royal:focus {
    background: -webkit-gradient(linear, left top, left bottom, from(#9c95ef), to(#5e53e4));
    background: linear-gradient(top, #9c95ef, #5e53e4); }
  .button-raised.button-royal:active, .button-raised.button-royal.active, .button-raised.button-royal.is-active {
    border-color: #5246e2;
    background: #827ae1; }

.button-pill {
  border-radius: 200px; }
</style>
