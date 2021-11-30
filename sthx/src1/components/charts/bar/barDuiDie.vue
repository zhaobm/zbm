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
          data: ['工业源','农业源','集中式','移动源','生活源'],
          left: "center",
          icon: 'circle',
          itemWidth: 5,
          textStyle: {
              fontSize:13,
              color: "rgba(255,255,255,0.65)" 
            }
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
        yAxis: [
          {
            type: 'category',
            axisTick: {
              show: false,
              alignWithLabel: true,
              length: 5,

            },
            axisLabel: {
              color: "rgba(255, 255, 255, 0.65)",
              fontSize: 13,
              color: 'rgba(255,255,255,0.85)',
              padding: [0, 10, 0, 0],
              interval:0
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
        xAxis: [
          {
            type: "value",
            name: "(千米)",
            offset: 0,
            nameTextStyle: {
              color: "rgba(255, 255, 255, 0.65)",
              fontSize: 13,
              textShadowColor: "#000",
              textShadowOffsetY: 0,
              //padding:[5,0,0,0]
            },
            position: 'bottom',
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
              fontSize: 11,
              padding: [0, 10, 0, 0],
              interval:0
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
          {
            name:'工业源',
            type: 'bar',
            color: ['#31ada5'],
            barWidth: 7,
            barGap: "1",
            stack:"地市五类源",
            itemStyle: {
              normal: {
                barBorderWidth: 0.5,
                barBorderColor: "#eee",
              },
              emphasis: {
                opacity: 1
              }
            },
            data: this.data.gyyData
          },
          {
            name:'农业源',
            type: 'bar',
            //color: ['rgba(102,60,78)'],
            color: ['#9dee5b'],
            barWidth: 7,
            barGap: "1",
            stack:"地市五类源",
            itemStyle: {
              normal: {
                barBorderWidth: 0.5,
                barBorderColor: "#eee",
              },
              emphasis: {
                opacity: 1
              }
            },
            data: this.data.nyyData
          },
          {
            name:'集中式',
            type: 'bar',
            //color: ['rgba(188, 235, 127)'],
            color: ['#659df0'],
            barWidth: 7,
            barGap: "1",
            stack:"地市五类源",
            itemStyle: {
              normal: {
                barBorderWidth: 0.5,
                barBorderColor: "#eee",
              },
              emphasis: {
                opacity: 1
              }
            },
            data: this.data.jzsData
          },
          {
            name:'移动源',
            type: 'bar',
            //color: ['rgba(240,155,96)'],
            color: ['#f09960'],
            barWidth: 7,
            barGap: "1",
            stack:"地市五类源",
            itemStyle: {
              normal: {
                barBorderWidth: 0.5,
                barBorderColor: "#eee",
              },
              emphasis: {
                opacity: 1
              }
            },
            data: this.data.ydyData
          },
          {
            name:'生活源',
            type: 'bar',
            //color: ['rgba(49,173,165)'],
            color: ['#50c767'],
            barWidth: 7,
            barGap: "1",
            stack:"地市五类源",
            itemStyle: {
              normal: {
                barBorderWidth: 0.5,
                barBorderColor: "#eee",
              },
              emphasis: {
                opacity: 1
              }
            },
            data: this.data.shyData
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
