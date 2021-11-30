<template>
    <div ref='myChart'></div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/line");
require("echarts/lib/component/legend.js");
require("echarts/lib/component/tooltip.js");
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
                color:[188,235,127],
                yUnit:'',
                legendData:[]
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
      let option = {
        //backgroundColor: "rgba(0,0,0,0)",
        grid: {
          left: 10,
          right: 20,
          bottom: 10,
          top: '20%',
          containLabel: true
        },
        tooltip : {
          trigger: 'axis'
        },
        legend: {
          show: true,
          data:[this.data.seriseData.name1,this.data.seriseData.name2],
          left: "center",
          top:0,
          icon: "circle",
          itemWidth: 8,
          itemWidth: 8,
          textStyle: { color: "rgba(255,255,255,0.65)" }
        },
        xAxis: [
          {
            type: "category",
            data: this.data.xAxis,
            axisLabel: {
              show: true,
              interval: 0,
              fontSize: "1.2rem",
              color: "rgba(255, 255, 255, 0.45);"
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
          name: this.data.yUnit,
          //max:500,
          offset: 0,
          nameTextStyle: {
            color: "rgba(255, 255, 255, 0.65)",
            fontSize: '1.2rem',
            textShadowColor: "#000",
            textShadowOffsetY: 0,
            padding:[10,0,0,0]
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
            color: "rgba(255, 255, 255, 0.45);",
            fontSize: "1.2rem",
            padding:[0,10,0,0],
          }
        },
        series: [
          {
            name: this.data.seriseData.name1,
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            showSymbol: true,
            lineStyle: {
              normal: {
                width: 1,
                color: `rgba(${this.data.color.color1[0]},${this.data.color.color1[1]},${this.data.color.color1[2]},1)`,
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [
                  {
                    offset: 0,
                    color: `rgba(${this.data.color.color1[0]},${this.data.color.color1[1]},${this.data.color.color1[2]}, 0)`
                  },
                  {
                    offset: 1,
                    color: `rgba(${this.data.color.color1[0]},${this.data.color.color1[1]},${this.data.color.color1[2]}, 0.2)`
                  }
                ])
              }
            },
            itemStyle: {
              normal: {
                color: `rgba(${this.data.color.color1[0]},${this.data.color.color1[1]},${this.data.color.color1[2]},1)`,
              }
            },
            data: this.data.seriseData.data1
          },
          {
            name:  this.data.seriseData.name2,
            type: "line",
            smooth: true,
            symbol: "circle",
            symbolSize: 8,
            showSymbol: true,
            lineStyle: {
              normal: {
                width: 1,
                color: `rgba(${this.data.color.color2[0]},${this.data.color.color2[1]},${this.data.color.color2[2]},1)`,
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [
                  {
                    offset: 0,
                    color: `rgba(${this.data.color.color2[0]},${this.data.color.color2[1]},${this.data.color.color2[2]}, 0)`
                  },
                  {
                    offset: 1,
                    color: `rgba(${this.data.color.color2[0]},${this.data.color.color2[1]},${this.data.color.color2[2]}, 0.2)`
                  }
                ])
              }
            },
            itemStyle: {
              normal: {
                 color: `rgba(${this.data.color.color2[0]},${this.data.color.color2[1]},${this.data.color.color2[2]},1)`,
              }
            },
            data: this.data.seriseData.data2
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
  height: 100%;
}
</style>

