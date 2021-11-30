<template>
    <div ref='myChart'></div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/line");
import tootip from "../../../assets/images/tooltip.png";
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
                yAxis1:[],
                color:[188,235,127]
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
        grid: {
          left: 10,
          right: 20,
          bottom: 10,
          top: '15%',
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: this.data.xAxis,
            axisLabel: {
              show: true,
              //interval: 0,
              fontSize: 14,
              color: "rgba(255, 255, 255, 0.8)"
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
          name: "（万吨）",
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
            name: "体重",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            showSymbol: true,
            lineStyle: {
              normal: {
                width: 1,
                color: `rgba(${this.data.color[0]},${this.data.color[1]},${this.data.color[2]},1)`,
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
                    color: `rgba(${this.data.color[0]},${this.data.color[1]},${this.data.color[2]}, 0)`
                  },
                  {
                    offset: 1,
                    color: `rgba(${this.data.color[0]},${this.data.color[1]},${this.data.color[2]}, 0.2)`
                  }
                ])
              }
            },
            itemStyle: {
              normal: {
                color: "#ffffff",
                // borderColor: "rgba(255,255,255,0.6)",
                borderColor: `rgba(${this.data.color[0]},${this.data.color[1]},${this.data.color[2]}, 0.2)`,
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
          {
            name: "体重",
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            showSymbol: true,
            lineStyle: {
              normal: {
                width: 1,
                color: `rgba(${this.data.color[0]},${this.data.color[1]},${this.data.color[2]},1)`,
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
                    color: `rgba(${this.data.color[0]},${this.data.color[1]},${this.data.color[2]}, 0)`
                  },
                  {
                    offset: 1,
                    color: `rgba(${this.data.color[0]},${this.data.color[1]},${this.data.color[2]}, 0.2)`
                  }
                ])
              }
            },
            itemStyle: {
              normal: {
                color: "#ffffff",
                // borderColor: "rgba(255,255,255,0.6)",
                borderColor: `rgba(${this.data.color[0]},${this.data.color[1]},${this.data.color[2]}, 0.2)`,
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

            data: this.data.yAxis1
          }
        ]
      };
      this.myChart.setOption(option);
        window.addEventListener('resize',()=>{
            this.myChart.resize();
        },true)
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

