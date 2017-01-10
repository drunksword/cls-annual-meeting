<template>
  <transition name="slide">
    <div class="group-info-wrap">
      <group-info-head></group-info-head>
      <group-info-body></group-info-body>
    </div>
  </transition>
</template>
<script>
import GroupInfoHead from './GroupInfoHead'
import GroupInfoBody from './GroupInfoBody'
export default{
  name: 'GroupInfo',
  data () {
    return {

    }
  },
  ready () {
    console.log(77)
  },
  components: {
    GroupInfoHead,
    GroupInfoBody
  }
}
</script>
<style scoped>
	.group-info-wrap{
		height: 100%;
		background-color: #eee;
    transition: all .3s ease;
    transform: translate(0);
	}
	/* .slide-enter 定义进入的开始状态 */
	/* .slide-leave 定义离开的结束状态 */
	.slide-enter, .slide-leave {
		transform: translate(100%,-100%);
	}
</style>
