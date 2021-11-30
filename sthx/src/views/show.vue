<template>
  <div class="bigScreen">

<!--    这个router-view是修饰下面变化部分的内容-->

    <router-view class="bigScreenContent"/>
      <HeaderBar/>
    <div  style="color:#FFFFFF;background-color: rgba(36,73,128,0.4);width: 99.5vw;">
      <!--     // <P style="margin:0 auto;width:350px;font-size:15px;">主 办 单 位： 陕 西 省 环 境 监 测 中 心 站</P>-->
      <p style="float: right;width:230px;font-size:4px;">主 办 单 位： 鄠 邑 区 秦 岭 保 护 局</p>

    </div>
  </div>
</template>

<script>
import HeaderBar from "../components/common/header/index2";
export default {
  name: "home",
  components: {
    HeaderBar
  }
};
</script>
<style lang="scss">
.bigScreen {
  width: 100vw;
  height: 99.5vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  .bigScreenContent {
    display: flex;
    flex: 1;
    justify-content: space-between;

   /* margin: 20px 16px;*/
   /* margin: 20px 16px 5px 16px;*/
    .left-bar {
      width: 23.5%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .box:nth-child(1){
          height: 56%;
          margin-bottom:12px;

      }
      .box:nth-child(2){
          flex: 1;

      }
    }
    .right-bar {
      width: 23.5%;
      display: flex;
      flex-direction: column;
      .box:nth-child(1){
          flex: 1;
      }
      .box:nth-child(2){
          height: 56%;
         margin-top:12px;
      }
    }
    .center {
      flex: 1;
      margin: 0 9px;
      display: flex;
      flex-direction: column;
      .box:nth-child(1){
          flex: 1;
      }
      .box:nth-child(2){
        height: 24.7%;
         margin-top:12px;
      }
    }
  }
}
</style>

