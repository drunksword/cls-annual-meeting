<template>
	<div class="sys-wrap">
		<div class="sys-msg">
			{{msg}} 加入群聊
		</div>
	</div>
</template>
<script>
  export default {
    name: 'SystemMsg',
    data () {
      return {
      }
    },
    props: ['msg']
  }
</script>
<style scoped>
  .sys-wrap {
    /*background-color: #fff;*/
    padding: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .sys-wrap .sys-msg {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.05);
    border-radius: 10px;
    min-width: 40%;
    color: #999;
    font-size: 12px;
    padding: 3px;
  }

</style>
