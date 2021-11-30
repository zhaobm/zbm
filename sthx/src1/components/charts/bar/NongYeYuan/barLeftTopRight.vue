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
      var that = this;
      this.myChart = echarts.init(this.$refs.myChart)
      let option = {
        legend: {
          show: true,
          data: ['养殖量(万)'],
          left: "center",
          icon: 'circle',
          itemWidth: 5,
          textStyle: {
              fontSize:13,
              color: "rgba(255,255,255)" ,
              fontWeight: 'bolder',
                                    fontFamily : '微软雅黑',
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
              str += "数量" + ": " + v.value  + "<br>";
            });
            return str;
          }
        },
        grid: {
          left: 0,
          right: '20%',
          bottom: '3%',
          top: '8%',
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
            position:'right',
            axisLabel: {
              show:false,
              // color: "rgba(255, 255, 255, 0.65)",
              fontSize: 15,
              color: 'rgba(255,255,255,0.85)',
              padding: [0, 10, 0, 0],
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
        xAxis: [
          {
            type: "value",
            name: "",
            offset: 0,   
            splitNumber:2,         
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
              rotate:1,
              color: "rgba(255, 255, 255)",
              fontSize: 12,
              padding: [0, 0, 0, 0],
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
          {
            name:'养殖量(万)',
            type: 'bar',
            color: ['#659df0'],
            barWidth: 12,
            barGap: "1",
            // itemStyle: {
            //   normal: {
            //     barBorderWidth: 1,
            //     barBorderColor: "#eee",
            //   },
            //   emphasis: {
            //     opacity: 1
            //   }
            // },
        //     itemStyle: {
        //     normal: {
        //         color: new echarts.graphic.LinearGradient(
        //             1, 0, 0, 0,
        //             [
        //                 {offset: 0, color: '#06B5D7'},                   //柱图渐变色
        //                 {offset: 0.5, color: '#44C0C1'},                 //柱图渐变色
        //                 {offset: 1, color: '#71C8B1'},                   //柱图渐变色
        //             ]
        //         )
        //     },
        //     emphasis: {
        //         color: new echarts.graphic.LinearGradient(
        //             1, 0, 0, 0,
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
                                    color: '#fff',
                                    position: 'right',
                                    
                                    padding:[0,0,0,0],
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
                        symbolSize: [2, 15],
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
      this.myChart.on('click', function(params) {
          //console.log(params); 
          
          that.$emit('barClick',{
            name:params.name
          });
      });
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
  height: 95%;
}
</style>
