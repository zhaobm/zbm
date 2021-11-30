<template>
  <div id="app">
    <!--    用于显示全部router的内容，即整个页面-->
    <router-view/>
  </div>

</template>
<script type="text/javascript">
// <!--第三步，屏幕有变化，再次改变-->
window.onresize = function() {
  change()
}
//第一步。适应屏幕
change()
//第二步，调用函数
function change() {
  var html = document.documentElement;
  var bl = html.clientWidth / (1920 / 100);
  html.style.fontSize = bl + "px";
}

</script>
<style lang="scss">
#app{
  width: 100vw;
  min-height: 100vh;
  background-color:#002336;
  //background: url("../src/assets/images/bg18.jpg") no-repeat;
  background: url("../src/assets/images/bg18.png") no-repeat;
  //背景按比例缩放
  background-size: 100% 100%;
  font-family:"微软雅黑";
  font-weight:bold;
  box-sizing: border-box;
}
*{
  font-family:"微软雅黑" !important;;
  font-weight:bold !important;;
}
</style>
