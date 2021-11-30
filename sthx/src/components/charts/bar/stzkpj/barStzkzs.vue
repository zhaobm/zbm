<template>
  <div ref="myChart" class="myChart-wrapper">
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
require("echarts/lib/component/legend.js");
require("echarts/lib/component/tooltip.js");
// 引入柱状图组件
require("echarts/lib/chart/bar");
export default {
  name: 'myChart',
  props: {
    title: {
      type: String
    },
    data:{
      type:Object,
      default:()=>{
        return{
          xAxis:[],
          yAxis:[],
          color:[188,235,127],
          legendData:[''],
          option:{},
          yUnit:'',
        }
      }
    }
  },
  mounted() {
    this.initChart()
  },
  watch: {
    data: {
      handler: function (val, oldVal) {
        this.$nextTick(() => {
          this.initChart();
        })
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(this.$refs.myChart);
      this.option = {
        legend: {
          show: false,
          data: ["EI值"],
          left: "center",
          top:0,
          itemWidth :8,
          icon: 'circle',
          textStyle: { color: "rgba(255,255,255)",fontWeight: 'bolder',
            fontFamily : '微软雅黑', }
        },
        tooltip : {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(0,46, 115, 0.3)'
            }
          },

          textStyle: {
            align: 'left',
            color: '#fff',
            fontSize: '16'
          },
        },
        label: {
          normal: {
            textStyle: {
              color: "#ff3b00",
              fontWeight: 'bolder',
              fontFamily : '微软雅黑',
            }
          },
          emphasis:{
            textStyle:{
              color:"#ff3b00",
              fontWeight: 'bolder',
              fontFamily : '微软雅黑',
            }
          }
        },
        dataZoom: [

          {
            xAxisIndex: 0,// 这里是从X轴的0刻度开始
            show: true, // 是否显示滑动条
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: 10, // 一次性展示多少个。
          },
        ],

        grid: {
          left: '1%',
          right: '1%',
          bottom: '1%',
          top:'20%',
          containLabel: true
        },
        yAxis: [{
          type: "value",
          name: "",
          offset: 0,
          nameTextStyle: {
            color: "rgba(255, 255, 255, 0.65)",
            fontSize: 15,
            textShadowColor: "#000",
            textShadowOffsetY: 0,
            padding:[10,0,0,0]
          },
          position:'top',
          axisTick : {show: false},
          axisLine: {
            show: false,
            lineStyle:{
              color:'#fff',
            }
          },
          axisLabel: {
            color: "rgba(255, 255, 255)",
            fontSize: 12,
            padding:[0,10,0,0],
            fontWeight: 'bolder',
            fontFamily : '微软雅黑',
          },
          splitLine: {
            show: true,
            lineStyle:{
              type:'dashed',
              color: "rgba(255,255,255,.1)"
            }
          },
        }],

        xAxis: {
          type: 'category',
          axisTick : {
            show: false,
            alignWithLabel: true,
            length:5,

          },
          axisLabel: {
            color: "rgba(255, 255, 255)",
            fontSize: 15,
            padding:[10,-16,0,0],
            fontWeight: 'bolder',
            fontFamily : '微软雅黑',
            interval: 0,
            rotate:1,
          },
          //inverse:'true', //排序
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.5)"
            }
          },
          data : this.data.xAxis,
        },
        series: [
          {
            name: "量值",
            type: 'bar',
            barWidth : 15,
            color:['#50c767'],
            itemStyle: {
              normal: {
                //柱状图渐变
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0, [
                      { offset: 0, color: '#06B5D7' },
                      { offset: 0.3, color: '#4dbcf6' },
                      { offset: 0.5, color: '#3ca3e6' },
                      { offset: 0.7, color: '#3193db' },
                      { offset: 1, color: '#2683d0' }
                      //{ offset: 0.5, color: '#44C0C1' },
                      //{ offset: 1, color: '#71C8B1' }
                    ]
                ),
             /*   color:function(params){
                  console.log(params.value);
                  if(parseFloat(params.value)>75){
                    return '#264321'
                  }else if(parseFloat(params.value)>55){
                    return '#558848'
                  }else if(parseFloat(params.value)>35){
                    return '#9da385'
                  }else if(parseFloat(params.value)>25){
                    return '#c1a173'
                  }else {
                    return '#b4533c'
                  }
                },*/
                //刻度显示在顶部
                label: {
                  show: true,
                  color: 'rgb(255,255,255)',
                  position: 'top',
                  fontWeight: 'bolder',
                  fontFamily : '微软雅黑',
                  formatter:function(value){
                    return (value.data).toFixed(2);
                  }
                }
              },
            },
            zlevel:0,
            // 顺序 从下向上 传入
            data:this.data.yAxis
          },
          {
            type: 'pictorialBar',
            symbol: 'rect',
            symbolSize: [15, 2],
            symbolMargin: 2,
            symbolRepeat: true,
            itemStyle: {
              normal: {
                color: '#101634'
              }
            },
            tooltip: {
              show: false
            },
            zlevel:1,
            data: this.data.yAxis
          }
        ]
      }

      this.myChart.setOption(this.option);
      // this.myChart.setOption(this.option);
      window.addEventListener('resize',()=>{
        this.myChart.resize();
      },true)
/*      this.myChart.on('mouseover',this.stop);
      this.myChart.on('mouseout',this.goMove);*/
      console.log('this.data.xAxis.length',this.data.xAxis.length)
/*      if(this.data.xAxis.length <=10){
        console.log('小length',this.data.xAxis.length);
        this.stop();

      }
      else{
        console.log('滚动');
        this.autoMove();
      }*/
      this.myChart.on('click',this.stop);

    },
    //自动滚动
    autoMove(){
      //this.dataList.seriesData为柱形图数据
      this.timeOut=setInterval(()=>{
        // clearInterval(this.timeOut)
        // 每次向后滚动一个，最后一个从头开始。
        // if(this.stopMove){ return }
        if (Number(this.option.dataZoom[0].endValue) == this.data.xAxis.length-1) {

          this.option.dataZoom[0].endValue = 10;
          this.option.dataZoom[0].startValue = 0;
        } else {
          this.option.dataZoom[0].endValue =  this.option.dataZoom[0].endValue + 1;
          this.option.dataZoom[0].startValue =  this.option.dataZoom[0].startValue + 1;
        }
        this.myChart.setOption(this.option)
      }, 1200);
    },
    //停止滚动
    stop(){
      console.log("11");
      // this.stopMove=true
      clearInterval(this.timeOut)
    },
    //继续滚动
    goMove(){
      console.log("333333")
      //  this.stopMove=false
      if(this.data.xAxis.length >=10){
        this.autoMove()
      }
    },


  }
}
</script>

<style lang="scss" scoped>
.myChart-wrapper {
  width: 100%;
  height: 100%;
}
</style>