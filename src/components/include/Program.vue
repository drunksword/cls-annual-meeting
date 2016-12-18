<template>
	<div class="program" v-on:click="voteChange(data.id)">
		<img :src="data.img">
		<div class="name">{{ data.name	}}</div>
		<div>
			<button class="button button-raised button-action button-circle button-jumbo"><i class="fa fa-thumbs-up"></i></button>
			<img class="selected" v-show="selected" src="../../assets/king3fat.gif">
		</div>
	</div>
</template>

<script>
	export default {
	  name: 'program',
	  props: ['data'],
	  data () {
	    return {
	      selected: false
	    }
	  },
	  methods: {
	    voteChange (proId) {
	      this.selected = !this.selected
	      // this.$store.state.count += this.selected ? 1 : -1
	      this.$store.commit('voteChange', proId)
	    }
	  }
	}
</script>

<style scoped>
	.program{padding-bottom: 30px;text-align: center;break-inside: avoid-column;}
	.program img{width:140px; height: 140px;}
	.program img.selected{width:50px; height: 50px;position: relative;top: 10px;}
	div.name{text-align: center;font-size: 32px;line-height: 32px;}

.button{margin:10px 0 0 0 ;}
	.button-action,
.button-action-flat {
  background-color: #A5DE37;
  border-color: #A5DE37;
  color: #FFF; }
  .button-action:visited,
  .button-action-flat:visited {
    color: #FFF; }
  .button-action:hover, .button-action:focus,
  .button-action-flat:hover,
  .button-action-flat:focus {
    background-color: #b9e563;
    border-color: #b9e563;
    color: #FFF; }
  .button-action:active, .button-action.active, .button-action.is-active,
  .button-action-flat:active,
  .button-action-flat.active,
  .button-action-flat.is-active {
    background-color: #a1d243;
    border-color: #a1d243;
    color: #8bc220; }
.button-border.button-action, .button-action.button-border-thin, .button-action.button-border-thick,
  .button-border-thin.button-action,
  .button-border-thick.button-action {
    color: #A5DE37; }
    .button-border.button-action:hover, .button-action.button-border-thin:hover, .button-action.button-border-thick:hover, .button-border.button-action:focus, .button-action.button-border-thin:focus, .button-action.button-border-thick:focus,
    .button-border-thin.button-action:hover,
    .button-border-thin.button-action:focus,
    .button-border-thick.button-action:hover,
    .button-border-thick.button-action:focus {
      background-color: rgba(185, 229, 99, 0.9);
      color: rgba(255, 255, 255, 0.9); }
    .button-border.button-action:active, .button-action.button-border-thin:active, .button-action.button-border-thick:active, .button-border.button-action.active, .button-action.active.button-border-thin, .button-action.active.button-border-thick, .button-border.button-action.is-active, .button-action.is-active.button-border-thin, .button-action.is-active.button-border-thick,
    .button-border-thin.button-action:active,
    .button-border-thin.button-action.active,
    .button-border-thin.button-action.is-active,
    .button-border-thick.button-action:active,
    .button-border-thick.button-action.active,
    .button-border-thick.button-action.is-active {
      background-color: rgba(161, 210, 67, 0.7);
      color: rgba(255, 255, 255, 0.5);
      opacity: .3; }
  .button-circle {
  border-radius: 100%; }
  .button-circle,
.button-box,
.button-square {
  padding: 0 !important;
  width: 40px; }
  .button-circle.button-giant,
  .button-box.button-giant,
  .button-square.button-giant {
    width: 70px; }
  .button-circle.button-jumbo,
  .button-box.button-jumbo,
  .button-square.button-jumbo {
    width: 60px; }
  .button-circle.button-large,
  .button-box.button-large,
  .button-square.button-large {
    width: 50px; }
  .button-circle.button-normal,
  .button-box.button-normal,
  .button-square.button-normal {
    width: 40px; }
  .button-circle.button-small,
  .button-box.button-small,
  .button-square.button-small {
    width: 30px; }
  .button-circle.button-tiny,
  .button-box.button-tiny,
  .button-square.button-tiny {
    width: 24px; }  
    .button-border.button-jumbo, .button-jumbo.button-border-thin, .button-jumbo.button-border-thick,
  .button-border-thin.button-jumbo,
  .button-border-thick.button-jumbo {
    line-height: 56px; }
    .button-jumbo {
  font-size: 24px;
  height: 60px;
  line-height: 60px;
  padding: 0 60px; }
  .button-borderless.button-jumbo {
    font-size: 31.2px;
    height: 47.2px;
    line-height: 47.2px; }

.fa{    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;}
.fa-thumbs-up:before{content:'\f164';}
</style>
