<template>
  <div ref='myChart'></div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/line");
import tootip from "../../../../assets/images/tooltip.png";
// 引入提示框和title组件
export default {
  name: "line1",
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
          //yAxis1:[],
          color:[255,255,0]
        }
      }
    }
  },
  mounted() {
    this.initChart();
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
      //console.log(this.data.yAxis)
      /*  let max = this.data.yAxis.reduce(function(a,b){
          return b>a ? b : a
      })
      let maxData = (max*1.2).toFixed(0) */
      //console.log(max)
      let option = {
        backgroundColor: "rgba(0,0,0,0)",
/*        dataZoom: [
          {
            xAxisIndex: 0,// 这里是从X轴的0刻度开始
            show: true, // 是否显示滑动条
            type: "slider", // 这个 dataZoom 组件是 slider 型 dataZoom 组件
            startValue: 0, // 从头开始。
            endValue: 3, // 一次性展示多少个。
          },
        ],*/
        grid: {
          left: 20,
          right: 30,
          bottom: 10,
          top: '20%',
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.data.xAxis,
            axisLabel: {
              show: true,
              //interval: 0,
              fontSize: 15,
              fontWeight: 'bolder',
              color: "rgba(255, 255, 255)"
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.5)"
              }
            },
            // splitNumber:7,
            // interval:10,
            boundaryGap: false
          }
        ],
        yAxis: {
          name: "",
          //max:maxData,
          offset: 0,
          nameTextStyle: {
            color: "rgba(255, 255, 255, 0.8)",
            fontSize: 14,
            textShadowColor: "#000",
            textShadowOffsetY: 0,
            padding:[5,0,0,0]
          },
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
              type: "dashed",
              color: "rgba(255,255,255,.1)"
            }
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.65)",
            fontSize: "1.2rem",
            padding:[0,10,0,0],
          }
        },
        series: [
          {
            name: "",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            showSymbol: true,
            lineStyle: {
              normal: {
                width: 1,
                color: `rgba(${255},${232},${168}, 1)`,
                shadowBlur: 1,
                shadowColor: "rgba(188,235,127,0.2)",
                shadowOffsetY: 32
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [
                  {
                    offset: 0,
                    color: `rgba(${255},${232},${168}, 0)`
                  },
                  {
                    offset: 1,
                    color: `rgba(${255},${232},${168}, 0.2)`
                  }
                ])
              }
            },
            itemStyle: {
              normal: {
                color: "#ffffff",
                // borderColor: "rgba(255,255,255,0.6)",
                borderColor: `rgba(${255},${232},${168}, 0.2)`,
                borderWidth: 10
              }
            },
            label: {
              show: true,
              position: "top",
              backgroundColor: {
                image: tootip
              },
              color: "#71B2B4",
              fontSize: "1.2rem",
              padding:[6,10,10]
            },

            data: this.data.yAxis
          },

        ]
      };

      this.myChart.setOption(option);

      window.addEventListener('resize',()=>{
        this.myChart.resize();
      },true);
    }
  },
  components: {}
};
</script>
<style lang="scss" scoped>
div{
  width: 100%;
  height: 90%;
}
</style>
