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
          data: ["水域","林地","耕地"],

          x:'left',
          padding:[10,0,0,0],
          icon: 'roundRect',
          itemWidth: 6,
          textStyle: {
            fontSize:15,
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
          // formatter: function (params) {
          //   var str = params[0].name + "<br>";
          //   params.forEach(function (v, i) {
          //     str += "数量" + ": " + v.value  + "<br>";
          //   });
          //   return str;
          // }
        },
        grid: {
          left: '5%',
          right: '20%',
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
            position:'right',
            axisLabel: {
              show:false,
              // color: "rgba(255, 255, 255, 0.65)",
              fontSize: 15,
              color: 'rgba(255,255,255,0.85)',
              padding: [0, 10, 0, 0],
              fontWeight: 'bolder',
              fontFamily : '微软雅黑',
              interval:0,

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
              color: "rgba(255, 255, 255)",
              fontSize: 13,
              padding: [0, 0, 0, 0],
              fontWeight: 'bolder',
              fontFamily : '微软雅黑',
              rotate:1,

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
         /* {
            name:'未变化',
            type: 'bar',
            stack:"广告",
            color: ['#CCFFFF'],
            barWidth: 15,
            barGap: "1",
            itemStyle: {
              normal: {
                //柱状图渐变
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0, [
                      { offset: 0, color: '#CCFFFF' },
                      // { offset: 0.3, color: '#4dbcf6' },
                      { offset: 0.5, color: '#99CCCC' },
                      // { offset: 0.7, color: '#3193db' },
                      { offset: 1, color: '#669999' }
                      //{ offset: 0.5, color: '#44C0C1' },
                      //{ offset: 1, color: '#71C8B1' }
                    ]
                ),
                //刻度显示在顶部
                label: {
                  show: false,
                  color: '#fff',
                  position: 'right',

                  padding:[0,0,0,0],
                  fontWeight: 'bolder',
                  fontFamily : '微软雅黑',
                  formatter: function (value) {
                    return value.data.toFixed(2);
                  },
                }
              },
            },
            zlevel:0,
            data: this.data.BB
          },*/
          {
            name:'草地',
            type: 'bar',
            stack:"广告",
            color: ['#659df0'],
            barWidth: 15,
            barGap: "1",
            itemStyle: {
              normal: {
                //柱状图渐变
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0, [
                      { offset: 0, color: '#06B5D7' },
                      // { offset: 0.3, color: '#4dbcf6' },
                      { offset: 0.5, color: '#3ca3e6' },
                      // { offset: 0.7, color: '#3193db' },
                      { offset: 1, color: '#2683d0' }
                      //{ offset: 0.5, color: '#44C0C1' },
                      //{ offset: 1, color: '#71C8B1' }
                    ]
                ),
                //刻度显示在顶部
                label: {
                  show: false,
                  color: '#fff',
                  position: 'right',

                  padding:[0,0,0,0],
                  fontWeight: 'bolder',
                  fontFamily : '微软雅黑',
                  formatter: function (value) {
                    return value.data.toFixed(2);
                  },
                }
              },
            },
            zlevel:0,
            data: this.data.cd
          },
          {
            name:'建设用地',
            type: 'bar',
            stack:"广告",
            color: ['#FFCC66'],
            barWidth: 15,
            barGap: "1",
            itemStyle: {
              normal: {
                //柱状图渐变
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0, [
                      { offset: 0, color: '#FFCC66' },
                      // { offset: 0.3, color: '#4dbcf6' },
                      { offset: 0.5, color: '#FF9900' },
                      // { offset: 0.7, color: '#3193db' },
                      { offset: 1, color: '#996633' }
                      //{ offset: 0.5, color: '#44C0C1' },
                      //{ offset: 1, color: '#71C8B1' }
                    ]
                ),
                //刻度显示在顶部
                label: {
                  show: false,
                  color: '#fff',
                  position: 'right',

                  padding:[0,0,0,0],
                  fontWeight: 'bolder',
                  fontFamily : '微软雅黑',
                  formatter: function (value) {
                    return value.data.toFixed(2);
                  },
                }
              },
            },
            zlevel:0,
            data: this.data.jsyd
          },
          {
            name:'未利用',
            type: 'bar',
            stack:"广告",
            color: ['#CCCC66'],
            barWidth: 15,
            barGap: "1",
            itemStyle: {
              normal: {
                //柱状图渐变
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0, [
                      { offset: 0, color: '#CCCC66' },
                      // { offset: 0.3, color: '#4dbcf6' },
                      { offset: 0.5, color: '#999933' },
                      // { offset: 0.7, color: '#3193db' },
                      { offset: 1, color: '#666600' }
                      //{ offset: 0.5, color: '#44C0C1' },
                      //{ offset: 1, color: '#71C8B1' }
                    ]
                ),
                //刻度显示在顶部
                label: {
                  show: false,
                  color: '#fff',
                  position: 'right',

                  padding:[0,0,0,0],
                  fontWeight: 'bolder',
                  fontFamily : '微软雅黑',
                  formatter: function (value) {
                    return value.data.toFixed(2);
                  },
                }
              },
            },
            zlevel:0,
            data: this.data.wly
          },
          {
            name:'水域',
            type: 'bar',
            stack:"广告",
            color: ['#66FFFF'],
            barWidth: 15,
            barGap: "1",
            itemStyle: {
              normal: {
                //柱状图渐变
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0, [
                      { offset: 0, color: '#66FFFF' },
                      // { offset: 0.3, color: '#4dbcf6' },
                      { offset: 0.5, color: '#66CCCC' },
                      // { offset: 0.7, color: '#3193db' },
                      { offset: 1, color: '#33CCCC' }
                      //{ offset: 0.5, color: '#44C0C1' },
                      //{ offset: 1, color: '#71C8B1' }
                    ]
                ),
                //刻度显示在顶部
                label: {
                  show: false,
                  color: '#fff',
                  position: 'right',

                  padding:[0,0,0,0],
                  fontWeight: 'bolder',
                  fontFamily : '微软雅黑',
                  formatter: function (value) {
                    return value.data.toFixed(2);
                  },
                }
              },
            },
            zlevel:0,
            data: this.data.sy
          },
          {
            name:'林地',
            type: 'bar',
            stack:"广告",
            color: ['#99FF00'],
            barWidth: 15,
            barGap: "1",
            itemStyle: {
              normal: {
                //柱状图渐变
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0, [
                      { offset: 0, color: '#99FF00' },
                      // { offset: 0.3, color: '#4dbcf6' },
                      { offset: 0.5, color: '#66CC00' },
                      // { offset: 0.7, color: '#3193db' },
                      { offset: 1, color: '#009933' }
                      //{ offset: 0.5, color: '#44C0C1' },
                      //{ offset: 1, color: '#71C8B1' }
                    ]
                ),
                //刻度显示在顶部
                label: {
                  show: false,
                  color: '#fff',
                  position: 'right',

                  padding:[0,0,0,0],
                  fontWeight: 'bolder',
                  fontFamily : '微软雅黑',
                  formatter: function (value) {
                    return value.data.toFixed(2);
                  },
                }
              },
            },
            zlevel:0,
            data: this.data.ld
          },
          {
            name:'耕地',
            type: 'bar',
            stack:"广告",
            color: ['#CC6633'],
            barWidth: 15,
            barGap: "1",
            itemStyle: {
              normal: {
                //柱状图渐变
                color: new echarts.graphic.LinearGradient(
                    0, 0, 1, 0, [
                      { offset: 0, color: '#CC6633' },
                      // { offset: 0.3, color: '#4dbcf6' },
                      { offset: 0.5, color: '#993300' },
                      // { offset: 0.7, color: '#3193db' },
                      { offset: 1, color: '#330000' }
                      //{ offset: 0.5, color: '#44C0C1' },
                      //{ offset: 1, color: '#71C8B1' }
                    ]
                ),
                //刻度显示在顶部
                label: {
                  show: false,
                  color: '#fff',
                  position: 'right',

                  padding:[0,0,0,0],
                  fontWeight: 'bolder',
                  fontFamily : '微软雅黑',
                  formatter: function (value) {
                    return value.data.toFixed(2);
                  },
                }
              },
            },
            zlevel:0,
            data: this.data.gd
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
            zlevel:1,
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
  margin-left: 13px;
  width: 240px;
  height: 320px;
  //background-color: red;
}
</style>
