<template>
  <div class="data-zoom">
    <a href="javascript:;" class="paly-btn btn" @click="play" :class="{'stop':state}">播放</a>
    <a href="javascript:;" class="prev-btn btn" @click="prev"></a>
    <a href="javascript:;" class="next-btn btn" @click="next"></a>
    <div class="date-box">
      <a href="javascript:;" class="date-item" v-for="(item ,index) in dataYears" :key="item" :class="{active:index==current}" @click="itemClick(index)">
        <span class="icon"></span>
        <span class="text">{{item}}</span>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "date-zoom",
  data() {
    return {
      dataYears:[],
      dataUrls:[],
      current:0,
      timer:0,
      state:false
    };
  },

  props: {
    timeDataNode : {
      type: Object,
      default: () => {
        return {
          dataArr: [
            { url: [] , year: 0 }
          ],
        };
      },
    },
/*    dataYears: {
      type: Array,
      default: function() {
        return [2017];
      }
    },
    dataUrls: {
      type: Array,
      default: function() {
        return [];
      }
    },*/
    currentYear: {
      type: Number,
      default: function() {
        return 0;
      }
    },
    isStop :{
      type: Boolean,
      default: function() {
        return false;
      }
    }
  },
  watch:{
/*    timeDataNode:{
      handler:function (val,val2) {
        this.dataYears = [];
        for(var i=0;i<val.dataArr.length;i++){
          this.dataYears.push(val.dataArr[i].year);
          this.dataUrls.push(val.dataArr[i].url);
        }
      },
      deep:true
    },*/
/*    dataYears:{
      handler:function (val,val2) {
        this.$emit('callBack',this.dataYears[this.current],this.dataUrls[this.current])
      },
      deep:true
    },*/
    currentYear:{
      handler:function (val,val2) {
        this.current=val;
        this.$emit('callBack',this.dataYears[this.current],this.dataUrls[this.current])
      },
      deep:true
    },
    isStop:{
      handler:function (val,val2) {
        if(val == true){
          clearInterval(this.timer)
          this.state=false
        }
      },
      deep:true
    }
  },
  methods:{
    //初始化时间轴组件
    initDataZoom(){
      var dataObj = this.timeDataNode;//继承从父组件传来的时间数组
      this.current = this.currentYear;//继承从父组件传来的初始时间
      for(var i=0;i<dataObj.dataArr.length;i++){
        this.dataYears.push(dataObj.dataArr[i].year);
        this.dataUrls.push(dataObj.dataArr[i].url);
      }
    },
    next(){
      clearInterval(this.timer)
      this.state=false
      this.current++
      if (this.current>this.dataYears.length-1) {
        this.current=0
      }
      this.$emit('callBack',this.dataYears[this.current],this.dataUrls[this.current])
    },
    itemClick(i){
      this.current=i
      this.$emit('callBack',this.dataYears[this.current],this.dataUrls[this.current])
    },
    prev(){
      clearInterval(this.timer)
      this.state=false
      this.current--
      if (this.current<0) {
        this.current=this.dataYears.length-1
      }
    },
    play(){
      if (!this.state) {
        this.timer=setInterval(()=>{
          this.current++

          if (this.current>this.dataYears.length-1) {
            this.current=0
          }
          this.$emit('callBack',this.dataYears[this.current],this.dataUrls[this.current])
        },2000)
        this.state=true
      }else{
        clearInterval(this.timer)
        this.state=false
      }

    },

  },
  mounted() {
    this.initDataZoom();
  }
};
</script>
<style lang="scss" scoped>
.data-zoom {
  position: absolute;
  bottom: 360px;
  height: 64px;
  border-radius: 12px;
  //background-color: rgba(17, 34, 46, 0.35);
  //border: 1px solid rgba(255, 255, 255, 0.15);
  padding: 0 44px 0 93px;
  left: 30%;
  //   right: 336px;
  right: 30%;

  .btn {
    position: absolute;
  }
  &.up{
    right: 16px;
  }
  .paly-btn {
    width: 32px;
    height: 32px;
    background: url(../../../assets/images/icon-con-play.svg) no-repeat center;
    background-size: contain;
    left: 36px;
    top: 16px;
    text-indent: -9999px;
    &.stop {
      background: url(../../../assets/images/icon-con-stop.svg) no-repeat center;
      background-size: cover;
    }
  }
  .prev-btn {
    width: 16px;
    height: 16px;
    background: url(../../../assets/images/icon-con-arrow.svg) no-repeat center;
    background-size: cover;
    left: 80px;
    top:25px;
    //text-indent: -9999px;
    transform: rotate(90deg);
  }
  .next-btn {
    width: 16px;
    height: 16px;
    background: url(../../../assets/images/icon-con-arrow.svg) no-repeat center;
    background-size: cover;
    right:35px;
    top:25px;
    //text-indent: -9999px;
    transform: rotate(270deg);
  }
  .date-box{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    &::after{
      display: inline-block;
      content: '';
      border-top:1px solid rgba(255, 255, 255, 0.15);
      position: absolute;
      height: 1px;
      left:114px;
      right: 74px;
      top:31px;
      z-index: 1;
    }
    a{
      display: inline-block;
      display: flex;
      flex-direction: column;
      align-items: center;
      position: relative;
      z-index: 2;
      height:100%;

      .icon{
        display: inline-block;
        border-radius: 50%;
        width: 8px;
        height: 8px;
        box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.09);
        //background-color: #9ea5ab;#2683d0
        background-color: #058bc9;
        //background-color: #2683d0;


        // transition: width,height,border 0.3s ease-in-out;
        position: absolute;
        top:50%;
        margin-top:-5px;
      }
      .text{
        position: absolute;
        bottom:5px;
      /* width: 480px;*/
        height: 12px;
        font-family: Helvetica;
        font-size: 16px;
        font-weight: 300;
        font-style: normal;
        font-stretch: normal;
        line-height: 1;
        letter-spacing: normal;
        color: rgba(255, 255, 255, 0.85);
        text-align: center;
      }
      &.active .icon{
        width: 12px;
        height: 12px;
        margin-top:-12px;
        border:6px solid rgba(0, 0, 0, 0.3);
        opacity: 0.8;
      }
    }
  }
}
</style>