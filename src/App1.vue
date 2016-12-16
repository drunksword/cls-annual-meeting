<template>
  <div id="app">
    <div class="bar-wrap">
      <label>Data 1</label>
      <div class="bar green" data-percentage="21" style="width: 21%;"></div>
    </div>
    <div class="bar-wrap">
      <label>Data 2</label>
      <div class="bar red" data-percentage="78.95" style="width: 78.95%;"></div>
    </div>
    <div class="bar-wrap">
      <label>Data 3</label>
      <div class="bar blue" data-percentage="94.7" style="width: 94.7%;"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      state: this.$store.state,
      programList: [{id: 1, name: '大变活人1', img: require('./assets/logo.png')},
                    {id: 2, name: '大变活人2', img: require('./assets/logo.png')},
                    {id: 3, name: '大变活人3', img: require('./assets/logo.png')},
                    {id: 4, name: '大变活人4', img: require('./assets/logo.png')},
                    {id: 5, name: '大变活人5', img: require('./assets/logo.png')}]
    }
  }
}
</script>

<style>
html, body {height: 100%;}
body {margin: 0px;}

/* 弹出的提示层 */
#toast{padding: 16px 5px; position: fixed; top: 200px; z-index: 990; background-color: #666; font-size: 28px; border-radius: 8px; text-align: center; color: #FFF; transition: opacity 2s; }
.toastmessage{text-align:center; padding:50px 30px; transition: opacity 2s; }

*, *:before, *:after {
  box-sizing: border-box;
}


@keyframes myfirst
{
  from {width:0;}
  to {width:94.7%;}
}

body {
  font-family: 'Source Sans Pro', sans-serif;
  font-weight: 300;
  font-size: 14px;
  padding: 30px;
  background: #eaeaea;
}

div.bar-wrap {
  width: 100%;
  display: block;
  margin: 0 0 20px 0;
  overflow: hidden;
}
div.bar-wrap label {
  font-size: 0.8em;
  color: #8a8a8a;
  text-transform: uppercase;
  margin: 0 0 2px 0;
  display: block;
}
div.bar-wrap div.bar {
  height: 40px;
  width: 0;
  position: relative;
}
div.bar-wrap div.bar:after {
  content: attr(data-percentage) "%";
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  height: 40px;
  padding: 10px;
}
div.bar-wrap div.bar.blue {
  background-color: #61a7c4;
  border-bottom: 3px solid #4290b0;
  animation: myfirst 2s; 
}
div.bar-wrap div.bar.blue:after {
  color: #FFF;
}
div.bar-wrap div.bar.green {
  background-color: #61c471;
  border-bottom: 3px solid #42b054;
}
div.bar-wrap div.bar.green:after {
  color: #FFF;
}
div.bar-wrap div.bar.red {
  background-color: #c46161;
  border-bottom: 3px solid #b04242;
}
div.bar-wrap div.bar.red:after {
  color: #FFF;
}
div.bar-wrap div.bar.purple {
  background-color: #a461c4;
  border-bottom: 3px solid #8d42b0;
}
div.bar-wrap div.bar.purple:after {
  color: #FFF;
}
</style>
