<template>
  <header class="header">
    <h1 class="logo">
      <img class="logo-img" src="../../../assets/images/huyilogo666.png" height="55" width="55"/>
      <a class="logo-title" href="#/show" style="line-height: 250%">  鄠邑区秦岭保护天空地一体化管理系统</a>
        <nav class="navLeft">
            <router-link v-for="(item, $index) in routerListLeft" :key="$index" :to="{name:item.link, params:{index: $index}}">{{item.text}}</router-link>
        </nav>
        <nav class="navRight">
            <router-link v-for="(item, $index) in routerListRight" :key="$index" :to="{name:item.link, params:{index: $index}}">{{item.text}}</router-link>
        </nav>
    </h1>

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
        {link: 'tuji', text: '数据展示'},
        // {link: 'stzlview', text: '生态质量'},
        {link: 'xykhview', text: '监测统计'},
      ],
      routerListRight: [
        // {link: 'zrbhdview', text: '自然保护地'},
        {link: 'stdmview', text: '生态地面'},
        {link: 'mywrview', text: '视频监控'},
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
  width: 100%;
  height: 12.5%;

  display: flex;
  //border-bottom: 1px solid rgba(117, 239, 255, 0.3);
  position: absolute;
   // position: relative;
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
    width: 100%;
    height: 100%;
    margin: 0 auto;
    color: #fff;
    background:url("../../../assets/er/images/main_up.png");
    background-size: 100% 100%;
    //line-height: 120px;
    position: relative;
    z-index: 1;
    white-space: nowrap;
    text-align: center;
    a {
      z-index: 3;
      font-family: PingFangSC-Semibold;
      font-size: 2.0em;
      color: #fff;
      letter-spacing: 5px;
      line-height: 130px;
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
    width: 28%;
    left:-80px;
    top:-20px;
    /*text-align: right;*/
    a {
      text-decoration: none;
      display: inline;
      background: url("../../../assets/er/images/nav-select.png");
      background-size: 100% 100%;
      width:30%;
      padding: 10px 30px;
      margin: 10px;
      height: 100%;
      font-size: 2rem;
      font-style: normal;
      font-stretch: normal;
     // line-height: 100px;
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
    }

  }
  .navRight {
    position: absolute;
    width: 28%;
    right: -80px;
    top:-20px;
    height: 100%;
    /*text-align: left;*/
    a {
      background: url("../../../assets/er/images/nav-select.png");
      background-size: 100% 100%;
      text-decoration: none;
      display: inline;
      width:30%;
      padding: 10px 30px;
      margin: 10px;
      height: 100%;
      font-size: 2rem;
      font-style: normal;
      font-stretch: normal;
     // line-height: 100px;
      letter-spacing: 2px;
      text-align: center;
      color: #ffffff;
      text-indent: 0;
    }
    .router-link-active {
      font-family: PingFangSC-Light;
      color: #87dfd7;
      font-weight: 500;
    }

  }
}
</style>
