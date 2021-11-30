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
          yUnit:''
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
      let option = {
        legend: {
          show: true,
          data: ["优","良","一般","较差"],
          left: "center",
          top:0,
          itemWidth :10,
          icon: 'circle',
          textStyle: { color: "rgba(255,255,255)",fontWeight: 'bolder',
            fontFamily : '微软雅黑', fontSize: '15'}
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
        grid: {
          left: '1%',
          right: '1%',
          bottom: '1%',
          top:'20%',
          containLabel: true
        },
        yAxis: [{
          type: "value",
          name: "个",
          offset: 0,
          nameTextStyle: {
            color: "rgba(255, 255, 255, 1)",
            fontSize: 12,
            textShadowColor: "#000",
            textShadowOffsetY: 0,
            padding:[30,50,0,0]
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
            padding:[10,-10,0,0],
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
            name: "优",
            type: 'bar',
            barWidth : 15,
            stack: '广告',
            color:['#32ec7c'],
            itemStyle: {
              normal: {
                //柱状图渐变
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0, [
                      { offset: 0, color: '#32ec7c' },
                      { offset: 0.5, color: '#32ec7c' },
                      { offset: 1, color: '#32ec7c' }
                    ]
                ),

                //刻度显示在顶部
                label: {
                  // show: true,
                  show: false,
                  position: 'inside',
                  color: 'rgb(255,255,255)',
                  fontWeight: 'bolder',
                  fontFamily : '微软雅黑',
                  formatter:function(params){
                    var index=params.dataIndex;//x轴序列顺序
                    var total = 0;
                    for (var i = 0; i < option.series.length; i++) {
                      if(undefined!=option.series[i].data)
                      {
                        total += option.series[i].data[index];
                      }
                    }
                    return total;
                  }
                }
              },
            },
            // 顺序 从下向上 传入
            data:this.data.xqgsyou
          },
          {
            name: "良",
            type: 'bar',
            barWidth : 15,
            stack: '广告',
            color:['#f6cf2f'],
            itemStyle: {
              normal: {
                //柱状图渐变
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0, [
                      { offset: 0, color: '#f6cf2f' },
                      { offset: 0.3, color: '#f6cf2f' },
                      { offset: 0.5, color: '#f6cf2f' },
                      { offset: 0.7, color: '#f6cf2f' },
                      { offset: 1, color: '#f6cf2f' }
                    ]
                ),
                //刻度显示在顶部
                label: {
                  // show: true,
                  show: false,
                  position: 'top',
                  color: 'rgb(255,255,255)',
                  fontWeight: 'bolder',
                  fontFamily : '微软雅黑',
                  formatter:function(params){
                    return params.value;
                  }
                }
              },
            },
            // 顺序 从下向上 传入
            data:this.data.xqgsliang
          },
          {
            name: "一般",
            type: 'bar',
            barWidth : 15,
            stack: '广告',
            color:['#7a9df1'],
            // 顺序 从下向上 传入
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
                    ]
                ),
                //刻度显示在顶部
                label: {
                  // show: true,
                  show: true,
                  position: 'top',
                  color: 'rgb(255,255,255)',
                  fontWeight: 'bolder',
                  fontFamily : '微软雅黑',
                  formatter:function(params){
                    var index=params.dataIndex;//x轴序列顺序
                    var total = 0;
                    for (var i = 0; i < option.series.length; i++) {
                      if(undefined!=option.series[i].data)
                      {
                        total += option.series[i].data[index];
                      }
                    }
                    return total;
                  }
                }
              },
            },
            // 顺序 从下向上 传入
            data:this.data.xqgsyiban
          },
          {
            name: "较差",
            type: 'bar',
            barWidth : 15,
            stack: '广告',
            color:['#43dce8'],
            itemStyle: {
              normal: {
                //柱状图渐变
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0, [
                      { offset: 0, color: '#f35454' },
                      { offset: 0.3, color: '#f35454' },
                      { offset: 0.5, color: '#f35454' },
                      { offset: 0.7, color: '#f35454' },
                      { offset: 1, color: '#f35454' }
                    ]
                ),
                //刻度显示在顶部
                label: {
                  // show: true,
                  show: false,
                  position: 'top',
                  color: 'rgb(255,255,255)',
                  fontWeight: 'bolder',
                  fontFamily : '微软雅黑',
                  formatter:function(params){
                    return params.value;
                  }
                }
              },
            },
            // 顺序 从下向上 传入
            data:this.data.xqgsjiaocha
          },
        ]
      }

      ////求和
      // var tt = option["series"];
      //
      // var fun = function(params) {
      //   console.log("zqq:000");
      //   console.log(params);
      //
      //   var datavalue = 0;
      //   for (var i = 0; i < tt.length; i++) {
      //     datavalue += parseInt(tt[i].data[params.dataIndex]);
      //     console.log("这是series的value:",tt.length);
      //   }
      //   return datavalue;
      // }
      // if(tt[tt.length-1]){
      //   console.log("zqq:111");
      //   tt[tt.length-1]["itemStyle"]["normal"]["label"]["formatter"] = 100;
      // }

      this.myChart.setOption(option);
      window.addEventListener('resize',()=>{
        this.myChart.resize();
      },true)
    }

  }
}
</script>

<style lang="scss" scoped>
.myChart-wrapper {
  width: 100%;
  height: 85%;
}
</style>