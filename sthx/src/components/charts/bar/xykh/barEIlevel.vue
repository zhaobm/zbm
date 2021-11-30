<template>
  <div ref="myChart" class="myChart-wrapper">
  </div>
</template>

<script>
// 引入基本模板


let echarts = require("echarts/lib/echarts");
require("echarts/lib/component/legend.js");
require("echarts/lib/component/tooltip.js");
// 引入柱状图组件
require("echarts/lib/chart/bar");
// 引入折线图组件

require("echarts/lib/chart/line");
import tootip from "../../../../assets/images/tooltip.png";
export default {
  name: 'myChart',
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
          legendData:[''],
          yUnit:''
        }
      }
    }
  },
  mounted() {
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
    initChart() {
      this.myChart = echarts.init(this.$refs.myChart);

      var labeltop = {
        position: 'top'
      };
      var labelBottom = {
        position: 'bottom'
      };
      var dataArr=[];
      var colorArr = [new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [
            { offset: 0, color: "rgb(236,167,48)" },
            { offset: 1, color: "rgba(0, 34, 66, 0.2)" }
            //{ offset: 0.5, color: '#44C0C1' },
            //{ offset: 1, color: '#71C8B1' }
          ]
      ),new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [
            { offset: 0, color: "rgb(236,195,48)" },
            { offset: 1, color: "rgba(0, 34, 66, 0.2)" }
            //{ offset: 0.5, color: '#44C0C1' },
            //{ offset: 1, color: '#71C8B1' }
          ]
      ),new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [
            { offset: 0, color: "rgb(217,236,48)" },
            { offset: 1, color: "rgba(0, 34, 66, 0.2)" }
            //{ offset: 0.5, color: '#44C0C1' },
            //{ offset: 1, color: '#71C8B1' }
          ]
      ),new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [
            { offset: 0, color: "rgb(158,236,48)" },
            { offset: 1, color: "rgba(0, 34, 66, 0.2)" }
            //{ offset: 0.5, color: '#44C0C1' },
            //{ offset: 1, color: '#71C8B1' }
          ]
      ),new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [
            { offset: 0, color: "rgb(48,236,166)" },
            { offset: 1, color: "rgba(0, 34, 66, 0.2)" }
            //{ offset: 0.5, color: '#44C0C1' },
            //{ offset: 1, color: '#71C8B1' }
          ]
      ),new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [
            { offset: 0, color: "rgba(48, 236, 166, 1)" },
            { offset: 1, color: "rgba(0, 34, 66, 0.2)" }
            //{ offset: 0.5, color: '#44C0C1' },
            //{ offset: 1, color: '#71C8B1' }
          ]
      ),new echarts.graphic.LinearGradient(
          0, 0, 0, 1, [
            { offset: 0, color: "rgb(20,246,111)" },
            { offset: 1, color: "rgba(0, 34, 66, 0.2)" }
            //{ offset: 0.5, color: '#44C0C1' },
            //{ offset: 1, color: '#71C8B1' }
          ]
      )];
      for(var i=0;i<this.data.yAxis.length;i++){
        if(this.data.yAxis[i]<=-4){
          dataArr.push({value: this.data.yAxis[i], label: labelBottom, color:colorArr[0], level:'变差'});
        }
        else if(this.data.yAxis[i]<-2){
          dataArr.push({value: this.data.yAxis[i], label: labelBottom, color:colorArr[1], level:'一般变差'});
        }
        else if(this.data.yAxis[i]<=-1){
          dataArr.push({value: this.data.yAxis[i], label: labelBottom, color:colorArr[2], level:'轻微变差'});
        }
        else if(this.data.yAxis[i]<=0){
          dataArr.push({value: this.data.yAxis[i], label: labelBottom, color:colorArr[2], level:'基本稳定'});
        }
        else if(this.data.yAxis[i]<1){
          dataArr.push({value: this.data.yAxis[i], label: labeltop, color:colorArr[3], level:'基本稳定'});
        }
        else if(this.data.yAxis[i]<=2){
          dataArr.push({value: this.data.yAxis[i], label: labeltop, color:colorArr[4], level:'轻微变好'});
        }
        else if(this.data.yAxis[i]<4){
          dataArr.push({value: this.data.yAxis[i], label: labeltop, color:colorArr[5], level:'一般变好'});
        }
        else{
          dataArr.push({value: this.data.yAxis[i], label: labeltop, color:colorArr[6], level:'变好'});
        }
      }

      let option = {
        legend: {
          show: false,
          data: ["变化量"],
          left: "center",
          top:0,
          itemWidth :8,
          icon: 'circle',
          textStyle: { color: "rgba(255,255,255)",fontWeight: 'bolder',
            fontFamily : '微软雅黑', }
        },
        tooltip : {
          trigger: 'axis',
          formatter:function(params) {
            var dotHtml = '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#00aeff"></span>'

            // console.info(params)
            let res = params[0].name + '<br/>'
            let val
            let length = params.length
            let i = 0
            for (; i < length; i++){
              val = params[i].value
              res +=dotHtml+ params[i].seriesName + '：' +val + '<br/>'  +dotHtml+ '变化等级' + '：' + params[i].data.level//
            }
            return res
          },

          axisPointer: {
            type: 'shadow',
            shadowStyle: {
              color: 'rgba(0,46, 115, 0.3)'
            },
          },
          textStyle: {
            align: 'left',
            color: '#fff',
            fontSize: '11'
          },
        },
        label: {
          normal: {
            textStyle: {
              color: "#ff3b00",
              fontWeight: 'bolder',
              fontFamily : '微软雅黑',
            }
          },
          emphasis:{
            textStyle:{
              color:"#ff3b00",
              fontWeight: 'bolder',
              fontFamily : '微软雅黑',
            }
          }
        },
        grid: {
          left: '3%',
          right: '1%',
          bottom: '0%',
          top:'20%',
          containLabel: true
        },
        yAxis: [{
          type: "value",
          name: "平方公里",
          offset: 0,

          nameTextStyle: {
            color: "rgba(255, 255, 255, 1)",
            fontSize: 13,
            fontFamily : '微软雅黑',
            textShadowColor: "#000",
            textShadowOffsetY: 0,
            //padding:[20,65,5,0]
            padding:[20,65,5,30]
          },
          position:'top',
          axisTick : {show: false},
          axisLine: {
            show: false,
            lineStyle:{
              color:'#fff',
            }
          },
          axisLabel: {
            color: "rgba(255, 255, 255)",
            fontSize: 12,
            padding:[0,10,0,0],
            fontWeight: 'bolder',
            fontFamily : '微软雅黑',
          },
          splitLine: {
            show: true,
            lineStyle:{
              type:'dashed',
              color: "rgba(255,255,255,.1)"
            }
          },
        }],

        xAxis: {
          type: 'category',
          axisTick : {
            show: false,
            alignWithLabel: true,
            length:5,
          },
          axisLabel: {
            color: "rgba(255, 255, 255)",
            fontSize: 13,
            padding:[30,-15,0,0],
            fontWeight: 'bolder',
            fontFamily : '微软雅黑',
            interval: 0,
            rotate:1,
          },
          //inverse:'true', //排序
          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.5)"
            }
          },
          data : this.data.xAxis,
        },
        /*series: [
          {
            name: "量值",
            type: 'pictorialBar',
            // barWidth : 15,
            color:['#50c767'],
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
                  color: 'rgb(255,255,255)',
                  position: 'top',
                  fontWeight: 'bolder',
                  fontFamily : '微软雅黑',
                  formatter:function(value){
                    return (value.data).toFixed(2);
                  }
                }
              },
            },
            zlevel:0,
            // 顺序 从下向上 传入
            data:this.data.yAxis
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
            zlevel:1,
            // data: dataArr,
            data: dataArr.map(item => {
              console.log('item',item);
              return {
                value: item,
                label: {
                  show: true,
                  fontSize: 12,
                  position: 'top',
                  distance: 10,
                  color: '#666',
                  padding: [4, 4],
                  formatter: '{c}'
                },
                itemStyle: {
                  normal: {
                    // barBorderRadius: item > 0 ? [15, 15, 0, 0] : [0, 0, 15, 15], // 动态设置柱状图圆角
                    color: item.color
                  }
                }
              }
            })
          }
        ],*/
        series: [
          {
            name: '覆盖面积',
            type: "pictorialBar",
            barWidth: "60%",
            stack: "总量",
/*            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                /!*              color: {
                                type: "linear",
                                x: 0,
                                y: 0,
                                x2: 0,
                                y2: 1,
                                colorStops: [
                                  {
                                    offset: 0,
                                    color: "rgba(48, 236, 166, 1)" // 0% 处的颜色
                                  },
                                  {
                                    offset: 1,
                                    color: "rgba(0, 34, 66, 0.2)" // 100% 处的颜色
                                  }
                                ],
                                globalCoord: false // 缺省为 false
                              } //渐变颜色*!/
                color: new echarts.graphic.LinearGradient(
                    0, 0, 0, 1, [
                      { offset: 0, color: "rgba(48, 236, 166, 1)" },

                      { offset: 1, color: "rgba(0, 34, 66, 0.2)" }
                      //{ offset: 0.5, color: '#44C0C1' },
                      //{ offset: 1, color: '#71C8B1' }
                    ]
                ),

              }
            },*/
            symbol:
                "path://M12.000,-0.000 C12.000,-0.000 16.074,60.121 22.731,60.121 C26.173,60.121 -3.234,60.121 0.511,60.121 C7.072,60.121 12.000,-0.000 12.000,-0.000 Z",

            // data: [13,-54,71,-24,57,-13,54,71,24],
            data: dataArr.map(item => {
              // console.log('item',item);
              return {
                value: item.value,
                label: item.label,
                level: item.level,
                itemStyle: {
                  normal: {
                    // barBorderRadius: item > 0 ? [15, 15, 0, 0] : [0, 0, 15, 15], // 动态设置柱状图圆角
                    color: item.color
                  }
                }
              }
            })
          },
          {
            name: "覆盖面积",
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
            tooltip:{
              show:false
            },
            data: this.data.yAxis
          },
        ],

      }

      this.myChart.setOption(option);
      window.addEventListener('resize',()=>{
        this.myChart.resize();
      },true)
    }

  }
}
</script>

<style lang="scss" scoped>
.myChart-wrapper {
  width: 100%;
  height: 100%;
}
</style>
