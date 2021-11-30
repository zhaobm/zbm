<!--不动版本。并且中间数字无法显示为小数形式-->
<template>
  <div ref="myChart" class="myChart-wrapper">
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/pie");
require("echarts/lib/component/title.js");
require("echarts/lib/component/legend.js");
export default {
  name: "myChart",
  data() {
    return {
      cycle:null,
      xianyuLayer:null,//县域图层组

    }
  },
  props: {
    title: {
      type: String
    },
    data: {
      type: Number,
      /*      default: () => {
              return {
                this.data: [],
                title: [],
                color: [188, 235, 127],
                itemGap:30,
                legendHeight:0,
                itemWidth:15

              };
            }*/
    }
  },
  mounted() {
    this.initChart();
  },
  watch:{
    data:{
      handler: function (val, oldVal) {
        this.$nextTick(()=>{
          this.initChart();
        })
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      this.myChart = echarts.init(this.$refs.myChart);

      //lee 先清除动态循环效果。否则会有冲突
      if(this.cycle){
        var that = this;
        clearInterval(that.cycle);
      }

      var that = this;
      // let this.data=this.data.this.data
      this.itemGap=parseInt(document.getElementsByTagName('html')[0].style['font-size'])

      /*      let total=0;
            this.data.forEach(v=>total=parseInt(v.value)+total);*/

      let angle = 0;//角度，用来做简单的动画效果的

      var colorSet = {
        color: '#0063E7'
      };

      var option = {
        // backgroundColor:'#021434',
        tooltip: {
          formatter: "%"
        },
        title: {
          text: '{a|'+ this.data +'}{c| }',
          x: 'center',
          y: 'center',
          textStyle: {
            rich:{
              a: {
                fontSize: 38,
                color: '#0063E7'
              },

              c: {
                fontSize: 20,
                color: '#021434',
                // padding: [5,0]
              }
            }
          }
        },
        series: [
            //动态效果
          {
          name: "ring5",
          type: 'custom',
          coordinateSystem: "none",
          renderItem: function(params, api) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8,
                startAngle: (0+angle) * Math.PI / 180,
                endAngle: (90+angle) * Math.PI / 180
              },
              style: {
                stroke: "#0CD3DB",
                fill: "transparent",
                lineWidth: 1.5
              },
              silent: true
            };
          },
          data: [0]
        }, {
          name: "ring5",
          type: 'custom',
          coordinateSystem: "none",
          renderItem: function(params, api) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.8,
                startAngle: (180+angle) * Math.PI / 180,
                endAngle: (270+angle) * Math.PI / 180
              },
              style: {
                stroke: "#0CD3DB",
                fill: "transparent",
                lineWidth: 1.5
              },
              silent: true
            };
          },
          data: [0]
        }, {
          name: "ring5",
          type: 'custom',
          coordinateSystem: "none",
          renderItem: function(params, api) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85,
                startAngle: (270+-angle) * Math.PI / 180,
                endAngle: (40+-angle) * Math.PI / 180
              },
              style: {
                stroke: "#0CD3DB",
                fill: "transparent",
                lineWidth: 1.5
              },
              silent: true
            };
          },
          data: [0]
        }, {
          name: "ring5",
          type: 'custom',
          coordinateSystem: "none",
          renderItem: function(params, api) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85,
                startAngle: (90+-angle) * Math.PI / 180,
                endAngle: (220+-angle) * Math.PI / 180
              },
              style: {
                stroke: "#0CD3DB",
                fill: "transparent",
                lineWidth: 1.5
              },
              silent: true
            };
          },
          data: [0]
        }, {
          name: "ring5",
          type: 'custom',
          coordinateSystem: "none",
          renderItem: function(params, api) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85;
            let point = getCirlPoint(x0, y0, r, (90+-angle))
            return {
              type: 'circle',
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4
              },
              style: {
                stroke: "#0CD3DB",//粉
                fill: "#0CD3DB"
              },
              silent: true
            };
          },
          data: [0]
        }, {
          name: "ring5",  //绿点
          type: 'custom',
          coordinateSystem: "none",
          renderItem: function(params, api) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = Math.min(api.getWidth(), api.getHeight()) / 2 * 0.85;
            let point = getCirlPoint(x0, y0, r, (270+-angle))
            return {
              type: 'circle',
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4
              },
              style: {
                stroke: "#0CD3DB",      //绿
                fill: "#0CD3DB"
              },
              silent: true
            };
          },
          data: [0]
        }, /*{
            name: "最外部进度条",
            type: "gauge",
            radius: '85%',
            splitNumber: 8,
            axisLine: {
                lineStyle: {
                    color: [
                        [(this.data+4) / 8, new echarts.graphic.LinearGradient(
                            0, 1, 0, 0, [{
                                    offset: 0,
                                    color: 'rgba(145,207,255,0)',
                                }, {
                                    offset: 0.5,
                                    color: 'rgba(145,207,255,0.2)',
                                },
                                {
                                    offset: 1,
                                    color: 'rgba(145,207,255,1)',
                                }
                            ]
                        )],
                        [
                            1, 'rgba(28,128,245,.0)'
                        ]
                    ],
                    width: 6

                },
            },
            axisLabel: {
                show: false,
            },
            axisTick: {
                show: false,

            },
            splitLine: {
                show: false,
            },
            itemStyle: {
                show: false,
            },
            detail: {
                show: false
            },
            title: { //标题
                show: false,
            },
            data: [{
                name: "title",
                value: this.data,
            }],
            pointer: {
                show: false,
            },
            animationDuration: 4000,
        },*/ {
          name: "内部阴影",
          type: "gauge",
          // center: ['20%', '50%'],
          radius: '70%',
          z: 4,
          splitNumber: 8,
          axisLine: {
            lineStyle: {
              color: [
                [(this.data+4) / 8, new echarts.graphic.LinearGradient(
                    0, 1, 0, 0, [{
                      offset: 0,
                      color: 'rgba(145,207,255,0)',
                    }, {
                      offset: 0.5,
                      color: 'rgba(145,207,255,0.1)',
                    },
                      {
                        offset: 1,
                        color: 'rgba(13,138,177,0.8)',
                      }
                    ]
                )],
                [
                  1, 'rgba(28,128,245,.0)'
                ]
              ],
              width: 80,
            }
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,

          },
          splitLine: {
            show: false,
          },
          itemStyle: {
            show: false,
          },
          /*            detail: {
                          formatter: function(value) {
                              if (value !== 0) {
                                  return parseInt(value);
                              } else {
                                  return 0;
                              }
                          },
                          offsetCenter: [0, 5],
                          textStyle: {
                              padding: [0, 0, 0, 0],
                              fontSize: 18,
                              color: '#EDFFFD'
                          }
                      },*/
          title: { //标题
            show: false,
          },
          /*            data: [{
                          name: "title",
                          value: this.data,
                      }],*/
          pointer: {
            show: false,
          },
        }, /*{
          name: '内部圈',
          type: 'gauge',
          z: 2,
          min: -4,
          max: 4,
          splitNumber: 8,
          radius: '70%',
          axisLine: {
            lineStyle: {
              color: [
                [(this.data+4) / 8, new echarts.graphic.LinearGradient(
                    0, 1, 0, 0, [{
                      offset: 0,
                      color: 'rgb(153,11,7,0.1)',
                    }, /!*{
                      offset: 0.5,
                      color: 'rgba(145,207,255,0.1)',
                    },*!/
                      {
                        offset: 1,
                        color: 'rgb(15,76,2)',
                      }
                    ]
                )],
              ],
              width: 3,
              shadowColor: 'rgba(145,207,255,.5)',
              shadowBlur: 6,
              shadowOffsetX: 0,
            }
          },
          tooltip: {
            show: false
          },
          axisLabel: {
            show: false,
          },
          axisTick: {
            show: false,

          },
          splitLine: {
            show: false,
          },
/!*          itemStyle: {
            show: false,
          },*!/
          detail: {
            show: false
          },
          title: { //标题
            show: false,
          },
          data: [{
            name: "title",
            value: this.data,
          }],
          itemStyle: {
            normal: {
              color: 'rgba(144,207,255,1)'
            }
          },
          pointer: {
            show: false,
            length: '70%',
            radius: '50%',
            width: 2, //指针粗细
          },
          animationDuration: 4000,
        },*/
          {
            name: '内部圈',
            type: 'gauge',
            z: 20,

            min: 0,
            max: 10,
            splitNumber: 10,
            radius: '70%',
            axisLine: {
              lineStyle: {
/*                color: [

                  [1, colorSet.color]
                ],*/
                color: [
                  [1, new echarts.graphic.LinearGradient(
                      0, 0, 1, 0, [{
                        offset: 0,
                        color: 'rgba(234,18,12,0.5)',
                      }, /*{
                      offset: 0.5,
                      color: 'rgba(145,207,255,0.1)',
                    },*/
                        {
                          offset: 0.5,
                          color: 'rgba(194,177,8,0.5)',
                        },
                        {
                          offset: 1,
                          color: 'rgba(36,130,16,0.7)',
                        }
                      ]
                  )],
                ],
                width: 10,
                shadowColor: '#FFF',
                shadowBlur: 2,
                shadowOffsetX: 0,
              }
            },
            tooltip: {
              show: false
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,

            },
            splitLine: {
              show: false,
            },
            itemStyle: {
              show: false,
            },
            detail: {
              show: false
            },
            title: { //标题
              show: false,
            },
            data: [{
              name: "title",
              value: this.data,
            }],
/*            itemStyle: {
              normal: {
                color: 'rgba(145,207,255,1)'
              }
            },*/
            pointer: {
              show: false,
              length: '80%',
              radius: '20%',
              width: 3, //指针粗细
            },
            animationDuration: 4000,
          },
          {
            name: '最内部圈',
            type: 'gauge',
            z: 2,
            min: -4,
            max: 4,
            splitNumber: 8,
            radius: '50%',
            axisLine: {
              lineStyle: {
                color: [
                  [(this.data+4) / 8, colorSet.color]
                ],
                width: 2,
                shadowColor: 'rgba(145,207,255,.6)',
                shadowBlur: 2,
                shadowOffsetX: 0,
              }
            },
            tooltip: {
              show: false
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,

            },
            splitLine: {
              show: false,
            },
            itemStyle: {
              show: false,
            },
            detail: {
              show: false
            },
            title: { //标题
              show: false,
            },
            data: [{
              name: "title",
              value: this.data,
            }],
            /*            itemStyle: {
                            normal: {
                                color: 'rgba(145,207,255,0.3)'
                            }
                        },*/
            pointer: {
              show: false,
              length: '80%',
              radius: '20%',
              width: 4, //指针粗细
            },
            animationDuration: 4000,
          },
          {
            name: '内部刻度',
            type: 'gauge',
            radius: '65%',
            min: -4, //最小刻度
            max: 4, //最大刻度
            splitNumber: 8, //刻度数量
            startAngle: 225,
            endAngle: -45,
            axisLine: {
              show: false,
              lineStyle: {
                width: 5,
                color: [
                  [1, '#1087e2']
                ],
              }
            }, //仪表盘轴线
            axisLabel: {
              show: true,
              color: 'rgba(172,207,255,.5)',
              distance: 2,
              fontSize: 12,
              formatter: function(v) {
                switch (v + '') {
                  case '0':
                    return '0';
                  case '1':
                    return '1';
                  case '2':
                    return '2';
                  case '3':
                    return '3';
                  case '4':
                    return '4';
                  case '-1':
                    return '-1';
                  case '-2':
                    return '-2';
                  case '-3':
                    return '-3';
                  case '-4':
                    return '-4';
                }
              }
            }, //刻度标签。
            axisTick: {
              show: true,
              splitNumber: 7,
              lineStyle: {
                color: "#1C3164", //用颜色渐变函数不起作用
                width: 1,
              },
              length: 4
            }, //刻度样式
            splitLine: {
              show: true,
              length: 8,
              lineStyle: {
                color: '#1C3164', //用颜色渐变函数不起作用
              }
            }, //分隔线样式
            detail: {
              show: false
            },
            pointer: {
              show: false
            }
          }, /*{ //指针上的圆
            type: 'pie',
            tooltip: {
                show: false
            },
            hoverAnimation: false,
            legendHoverLink: false,
            radius: ['0%', '20%'],
            center: ['50%', '50%'],
            label: {
                normal: {
                    show: false
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [{
                value: 120,
                itemStyle: {
                    normal: {
                        color: "rgb(14,31,73)",
                    },
                }
            }]
        },*/
        ]
      };

//获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
      function getCirlPoint(x0, y0, r, angle) {
        let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
        let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
        return {
          x: x1,
          y: y1
        }
      }

      function draw(){
        angle = angle+3
        that.myChart.setOption(option, true)
        //window.requestAnimationFrame(draw);
      }
      this.myChart.setOption(option);


      this.cycle = setInterval(function() {
        //用setInterval做动画感觉有问题
        draw()
      }, 100);

      /*//获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
            function getCirlPoint(x0, y0, r, angle) {
              let x1 = x0 + r * Math.cos(angle * Math.PI / 180)
              let y1 = y0 + r * Math.sin(angle * Math.PI / 180)
              return {
                x: x1,
                y: y1
              }
            }

            function draw(){
              angle = angle+3
              that.myChart.setOption(option, true)
              //window.requestAnimationFrame(draw);
            }

            setInterval(function() {
              //用setInterval做动画感觉有问题
              draw()
            }, 100);
            if (window.innerHeight<800) {
              option.legend.itemWidth=7
              option.legend.itemGap=10
            }*/

      /*      this.myChart.on('click', function(params) {
              console.log(params);

              that.$emit('pieClick',{
                name:params.name
              });
            });*/

      /*      window.addEventListener(
                "resize",
                () => {
                  if (window.innerHeight<800) {
                    this.legendHeight=0;
                    this.itemGap=0
                    option.legend.itemGap=10
                    option.legend.itemWidth=7
                  }else{
                    this.itemGap=parseInt(document.getElementsByTagName('html')[0].style['font-size'])
                  }

                  this.myChart.setOption(option);
                  this.myChart.resize();
                },
                true
            );*/
    }
  }
};
</script>

<style lang="scss" scoped>

.myChart-wrapper {
  width: 365px;
  height: 100%;
  /*margin-top: 10px;*/
  position: relative;

}
</style>
