<template>
    <div ref='myChart'></div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/line");
require("echarts/lib/component/tooltip.js");
import tootip from "../../../assets/images/tooltip.png";
// 引入提示框和title组件
export default {
  name: "myChart",
  props: {
    title: {
      type: String
    },
    data:{
        type:Object,
        default:()=>{
            return{
                yAxis:[],
                color:[188,235,127],
                legendData:[''],
                yUnit:''

            }
        }
    }
  },
  data(){
    return{
      xAxis:['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
      color:[188,235,127]
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
        backgroundColor: "rgba(0,0,0,0)",
        grid: {
          left: 10,
          right: 20,
          bottom: 10,
          top: 40,
          containLabel: true
        },
        tooltip : {
          trigger: 'axis'
        },
        xAxis: [
          {
            type: "category",
            data: this.xAxis,
            axisLabel: {
              show: true,
              interval: 0,
              fontSize: "1.2rem",
              color: "rgba(255,255,255,.5)"
            },
            axisTick: {
              show: false
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255, 255, 255, 0.65)"
              }
            },
            // splitNumber:7,
            // interval:10,
            boundaryGap: false
          }
        ],
        yAxis: {
          name: "温度: ℃",
          //max:30,
          offset: 0,
          // nameLocation:'middle',
          nameTextStyle: {
            color: "rgba(255, 255, 255, 0.65)",
            fontSize: '1.2rem',
            textShadowColor: "#000",
            textShadowOffsetY: 0,
            padding:[0,0,0,-20]
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
            color: "rgba(255,255,255,.5)",
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
            symbolSize: 0,
            showSymbol: true,
            lineStyle: {
              normal: {
                width: 1,
                color: `rgba(${this.color[0]},${this.color[1]},${this.color[2]},1)`,
                // shadowBlur: 1,
                // shadowColor: "rgba(188,235,127,0.2)",
                // shadowOffsetY: 32
              }
            },
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [
                  {
                    offset: 0,
                    color: `rgba(${this.color[0]},${this.color[1]},${this.color[2]}, 0)`
                  },
                  {
                    offset: 1,
                    color: `rgba(${this.color[0]},${this.color[1]},${this.color[2]}, 0.2)`
                  }
                ])
              }
            },
            itemStyle: {

              normal: {
                show:false,
                color: "#ffffff",
                // borderColor: "rgba(255,255,255,0.6)",
                borderColor: `rgba(${this.color[0]},${this.color[1]},${this.color[2]}, 0)`,
                borderWidth: 0
              }
            },
            data: this.data.yAxis
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

