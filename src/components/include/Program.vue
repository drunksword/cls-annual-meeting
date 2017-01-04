<template>
	<div class="program" v-on:click="voteChange(data.id)" v-bind:class="{topLine: data.id < 3}">
    <div class="head icon"></div>
    <div class="body"><div>{{ data.name }}</div></div>
    <div class="foot icon"></div>

    <div class="actorLine">表演者：{{data.actor}}</div>
    <div class="voteLine"><span class="left">给他投票</span><span class="select icon" v-bind:class="{selected: selected}"></span></div>
	</div>
</template>

<script>
export default {
  name: 'program',
  props: ['data'],
  data () {
    return {
      selected: false,
      props: this.data
    }
  },
  created () {
    for (var i = this.$store.state.voteProList.length - 1; i >= 0; i--) {
      if (this.$store.state.voteProList[i] === this.props.id) {
        this.selected = true
      }
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
	.program{padding-bottom: 30px;text-align: center;display: inline-block;width: 33%;color: red;font-weight: bold;font-size: 25px;}
  .topLine{margin-left: 11%;}
  .program .icon{background: url(../../assets/icons.png) no-repeat; background-size: 200px 500px;}
	.program .head{background-position: -15px -319px;height: 75px;}
  .program .body{background: url(../../assets/icon_bg.png) repeat-y;background-position: 47px 0px; height: 150px;background-size: 77px 25px;
    color:white;font-weight: bold;width: 100%;}
  .program .body div{position: relative;margin: 0 auto; writing-mode: vertical-rl;}
  .program .foot{background-position: -14px -455px;height: 30px;}

  .program .actorLine{margin-top: 15px;} 
  .program .voteLine .left{top:-25px;position: relative;}
	.program .select{background-position: -72px -76px;height: 67px;width: 57px;display: inline-block;}
  .program .selected{background-position: -72px -5px;}
</style>
