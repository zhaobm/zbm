<template>
  <div ref="myChart"
       class="myChart-wrapper">
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
require("echarts/lib/component/legend/LegendView.js");
require("echarts/lib/component/tooltip.js");
export default {
  name: 'myChart',
  props: {
    title: {
      type: String
    },
    data: {
      type: Object,
      default: () => {
        return {
          xAxis: [],
          yAxis: [],
          yAxis1: [],
          color: [188, 235, 127]
        }
      }
    }
  },
  mounted () {
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
    initChart () {
      this.myChart = echarts.init(this.$refs.myChart)
      let option = {
        legend: {
          show: true,
          data: ['加油站数量'],
          left: "center",
          icon: 'circle',
          itemWidth: 8,
          itemWidth: 8,
          textStyle: { color: "rgba(255,255,255,0.65)" }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            shadowStyle: {
              color: "rgba(255,255,255,0.1)"
            },
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function (params) {
            var str = params[0].name + "<br>";
            params.forEach(function (v, i) {
              str += v.seriesName + ": " + v.value  + "<br>";
            });
            return str;
          }
        },
        grid: {
          left: 0,
          right: '2%',
          bottom: '3%',
          top: '13%',
          containLabel: true
        },
        xAxis: [
          {
            type: 'category',
            axisTick: {
              show: false,
              alignWithLabel: true,
              length: 5,

            },
            axisLabel: {
              rotate:40,
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: 12,
              padding: [0, 10, 0, 0],
            },
            //inverse:'false', //排序
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.5)"
              }
            },
            data: this.data.xAxis
          }
        ],
        yAxis: [
          {
            type: "value",
            //name: "(万吨)",
            offset: 0,
            nameTextStyle: {
              color: "rgba(255, 255, 255, 0.8)",
              fontSize: 14,
              textShadowColor: "#000",
              textShadowOffsetY: 0,
              //padding:[5,0,0,0]
            },
            position: 'top',
            axisTick: { show: false },
            axisLine: {
              show: false,
              lineStyle: {
                color: '#fff',
              }
            },
            axisLabel: {
              //color: "rgba(255,255,255,.5)",
              color: "rgba(255, 255, 255, 0.65)",
              fontSize: 14,
              padding: [0, 10, 0, 0],
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: 'dashed',
                color: "rgba(255,255,255,.1)"
              }
            },
          }
        ],
        series: [
          /*
          {
            name:'固废排放量',
            type: 'bar',
            color: ['#9dee5b'],
            barMaxWidth: 8,
            barGap: "1",
            itemStyle: {
              normal: {
                //barBorderRadius: 30,
                shadowBlur: 1,
                barBorderWidth: 1,
                barBorderColor: "#eee",
                shadowColor: "rgba(188,235,127,0.05)",
                shadowOffsetX: 22
              },
              emphasis: {
                opacity: 1
              }
            },
            data: this.data.yAxis
          },
          */
          
          {
            name:'加油站数量',
            type: 'bar',
            color: ['#f09960'],
            barMaxWidth: 8,
            barGap: "1",
            itemStyle: {
              normal: {
                //barBorderRadius: 30,
                shadowBlur: 1,
                barBorderWidth: 1,
                barBorderColor: "#eee",
                shadowColor: "rgba(188,235,127,0.05)",
                shadowOffsetX: 22
              },
              emphasis: {
                opacity: 1
              }
            },
            data: this.data.yAxis
          },
          
        ]
      }

      this.myChart.setOption(option);
      window.addEventListener('resize', () => {
        this.myChart.resize();
      }, true)
    }

  }
}
</script>

<style lang="scss" scoped>
//@import "./../../../assets/css/_letiable.scss";
.myChart-wrapper {
  width: 100%;
  height: 100%;
}
</style>
