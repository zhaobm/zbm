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

      var labeltop = {
        position: 'top'
      };
      var labelBottom = {
        position: 'bottom'
      };
      var dataArr=[];
      for(var i=0;i<this.data.yAxis.length;i++){
        if(this.data.yAxis[i]<0){
          dataArr.push({value: this.data.yAxis[i], label: labelBottom});
        }
        else{
          dataArr.push({value: this.data.yAxis[i], label: labeltop});
        }
      }

      let option = {
        legend: {
          show: false,
          data: ["变化量"],
          left: "center",
          top:0,
          itemWidth :8,
          icon: 'circle',
          textStyle: { color: "rgba(255,255,255)",fontWeight: 'bolder',
            fontFamily : '微软雅黑', }
        },
        tooltip : {
          trigger: 'axis',
          formatter:function(datas) {
            //为了查看小圆点不出现
            // datas.forEach(function (item) {
            //   console.log("这是小圆点："+JSON.stringify(item))
            //   result += item.axisValue + "</br>" + item.marker + item.data
            // })
            var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#00aeff"></span>'
            // datas[i].marker

            let res = datas[0].name + '<br/>'
            let val
            let length = datas.length
            let i = 0
            for (; i < length; i++){
              val = datas[i].value.toFixed(3).replace(/\d(?=(\d{3})+\.)/g, '$&,')
              res += dotHtml+ datas[i].seriesName + '：' +val + '<br/>'
            }
            return res
          },

          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(0,46, 115, 0.3)'
            },
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
          left: '3%',
          right: '1%',
          bottom: '0%',
          top:'20%',
          containLabel: true
        },
        yAxis: [{
          type: "value",
          name: "平方公里",
          offset: 0,

          nameTextStyle: {
            color: "rgba(255, 255, 255, 1)",
            fontSize: 13,
            fontFamily : '微软雅黑',
            textShadowColor: "#000",
            textShadowOffsetY: 0,
            //padding:[20,65,5,0]
            padding:[20,65,5,30]
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
            fontSize: 13,
            padding:[30,-15,0,0],
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
            data: dataArr
          }
        ]
      }

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
  height: 100%;
}
</style>