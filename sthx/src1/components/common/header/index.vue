<template>
  <header class="header">
    <h1 class="logo">
      <img class="logo-img" src="../../../assets/images/huyilogo.png" height="55" width="55"/>
      <a class="logo-title" href="javascript:;">  鄠邑区秦岭保护综合管控平台</a>
    </h1>
    <nav class="navLeft">
      <router-link v-for="(item, $index) in routerListLeft" :key="$index" :to="{name:item.link, params:{index: $index}}">{{item.text}}</router-link>
    </nav>
    <nav class="navRight">
      <router-link v-for="(item, $index) in routerListRight" :key="$index" :to="{name:item.link, params:{index: $index}}">{{item.text}}</router-link>
    </nav>
  </header>
</template>
<script>
export default {
  name: "bigHeader",
  props: {
    msg: String,
  },
  data () {
    return {
      routerListLeft: [
        {link: 'zrbhdview', text: '政务要闻'},
        {link: 'xykhview2', text: '应急管理'},
      ],
      routerListRight: [

        {link: 'xykhview', text: '生态保护'},

        {link: 'BmapShow', text: '文化旅游'},

      ]
    }
  },
  mounted () {
  },
  methods: {

  },
  watch: {

  },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.header {
  //height: 180px;
  height: 80px;

  display: flex;
  //border-bottom: 1px solid rgba(117, 239, 255, 0.3);
  position: relative;
  .tab-box {
    position: absolute;
    height: 100%;
    right: 2.2rem;
    align-items: center;
    display: -webkit-flex;
    span {
      display: inline-block;
      height: 2.2rem;
      line-height: 2.2rem;
      width: 6.5rem;
      color: #769bad;
      //background-color: #f111e6;
      font-size: 1.6rem;
      vertical-align: middle;
    }
    & > div {
      display: inline-block;
      vertical-align: middle;
      border-radius: 1.1rem;
      width: 3.5rem;
      height: 2.2rem;
      cursor: pointer;
    }
    & > div span {
      border-radius: 1.1rem;
      line-height: 2.2rem;
      text-align: center;
      width: 2rem;
      background: #fff;
      border-radius: 2.2rem;
      font-size: 2rem;
      display: none;
    }
    & > div {
      background-color: #e9e9e9;
      span:last-child {
        display: none;
        color: #60dbd1;
        background: #e9e9e9;
        border: 0 solid rgba(0, 0, 0, 0.08);
        border-radius: 1.1rem;
        float: left;
      }
      span:first-child {
        color: #e9e9e9;
        display: inline-block;
        background: #fff;
        border: 0 solid rgba(0, 0, 0, 0.08);
        border-radius: 1.6rem;
        float: right;
      }
    }
    & > div.active {
      background-color: #60dbd1;
      span:last-child {
        display: inline-block;
        color: #60dbd1;
        background: #e9e9e9;
        border: 0 solid rgba(0, 0, 0, 0.08);
        border-radius: 1.1rem;
        // float: left;
      }
      span:first-child {
        color: #e9e9e9;
        display: none;
        background: #fff;
        border: 0 solid rgba(0, 0, 0, 0.08);
        border-radius: 1.1rem;
        //  float: right;
      }
    }
  }
  .logo {
    width: 35%;
    height: 100%;
    margin: 0 auto;
    //color: #fff;
    color: #fff;

    //background-color: #60dbd1;
    line-height: 101px;
    position: relative;
    z-index: 1;
    white-space: nowrap;
    text-align: center;
    a {
      z-index: 3;
      font-family: PingFangSC-Semibold;
      font-size: 4.4rem;
      color: #fff;
      letter-spacing: 5px;
      line-height: 101px;
      text-decoration: none;

    }
    .logo-img{
      //margin-top:8px;
      margin-left: 4px;
      margin-bottom: -10px;

    }
   /* .logo-title{
      margin: 0 auto;
    }*/
  }
  .navLeft {
    position: absolute;
    //background-color: #60dbd1;
    width: 28%;
    left: 0%;
    height: 100%;
    text-align: left;
    text-indent: 12%;
    a {
      text-decoration: none;
      display: inline-block;
      width: 186px;
      margin: 0 20px;
      height: 100%;
      font-family: PingFangSC;
      font-size: 2.55rem;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: 100px;
      letter-spacing: 2px;
      text-align: center;
      color: #ffffff;
      text-indent: 0;
      font-weight: 400;
    }

    .router-link-active {
      font-family: PingFangSC-Light;
      color: #87dfd7;
      font-weight: 500;
      //background: url(../../../assets/images/tabBg.svg) no-repeat;
    }

  }
  .navRight {
    position: absolute;
    //background-color: #60dbd1;
    width: 28%;
    right: 0%;
    height: 100%;
    text-align: left;
    text-indent: 12%;
    a {
      text-decoration: none;
      display: inline-block;
      width: 186px;
      margin: 0 20px;
      height: 100%;
      font-family: PingFangSC;
      font-size: 2.55rem;
      font-weight: 500;
      font-style: normal;
      font-stretch: normal;
      line-height: 80px;
      letter-spacing: 2px;
      text-align: center;
      color: #ffffff;
      text-indent: 0;
      font-weight: 400;
    }
    .router-link-active {
      font-family: PingFangSC-Light;
      color: #87dfd7;
      font-weight: 500;
      //background: url(../../../assets/images/tabBg.svg) no-repeat;
    }

  }
}
</style>
