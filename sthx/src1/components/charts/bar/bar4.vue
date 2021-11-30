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
          show: false,
          data: ['排放量'],
          left: "center",
          icon: 'circle',
          // itemWidth: 8,
          itemWidth: 8,
          textStyle: { color: "rgba(255,255,255)",fontWeight: 'bolder',
                    fontFamily : '微软雅黑', }
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
              color: "rgba(255, 255, 255)",
              fontSize: 14,
              padding: [0, 10, 0, 0],
              interval:0,
              fontWeight: 'bolder',
                    fontFamily : '微软雅黑',
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
              color: "rgba(255, 255, 255)",
              fontSize: 14,
              padding: [0, 10, 0, 0],
              interval:0,
              fontWeight: 'bolder',
                    fontFamily : '微软雅黑',
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
            name:'排放量',
            type: 'bar',
            color: ['#f09960'],
            barMaxWidth: 15,
            barGap: "1",
            // itemStyle: {
            //   normal: {
            //     //barBorderRadius: 30,
            //     shadowBlur: 1,
            //     barBorderWidth: 1,
            //     barBorderColor: "#eee",
            //     shadowColor: "rgba(188,235,127,0.05)",
            //     shadowOffsetX: 22
            //   },
            //   emphasis: {
            //     opacity: 1
            //   }
            // },
        //     itemStyle: {
        //     normal: {
        //         color: new echarts.graphic.LinearGradient(
        //             0, 0, 0, 1,
        //             [
        //                 {offset: 0, color: '#06B5D7'},                   //柱图渐变色
        //                 {offset: 0.5, color: '#44C0C1'},                 //柱图渐变色
        //                 {offset: 1, color: '#71C8B1'},                   //柱图渐变色
        //             ]
        //         )
        //     },
        //     emphasis: {
        //         color: new echarts.graphic.LinearGradient(
        //             0, 0, 0, 1,
        //             [
        //                 {offset: 0, color: '#71C8B1'},                  //柱图高亮渐变色
        //                 {offset: 0.7, color: '#44C0C1'},                //柱图高亮渐变色
        //                 {offset: 1, color: '#06B5D7'}                   //柱图高亮渐变色
        //             ]
        //         )
        //     }
        // },
            itemStyle: {
                            normal: {
                            //柱状图渐变
                            color: new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1, [
                                        { offset: 0, color: '#55c8fe' },
                                        { offset: 0.3, color: '#4dbcf6' },
                                        { offset: 0.5, color: '#3ca3e6' },
                                        { offset: 0.7, color: '#3193db' },
                                        { offset: 1, color: '#2683d0' },
                                        // { offset: 0.5, color: '#5cc2e8' },
                                        // { offset: 1, color: '#28a5e8' }
                                    ]
                            ),
                            //刻度显示在顶部
                            label: {
                                    show: true,
                                    color: 'rgb(255,255,255)',
                                    position: 'top',
                                    fontWeight: 'bolder',
                                    fontFamily : '微软雅黑',
                                }
                            },
                    },
            data: this.data.yAxis
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
                            data: this.data.yAxis
              }  
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
