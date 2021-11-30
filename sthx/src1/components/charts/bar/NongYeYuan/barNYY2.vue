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
        let option = {
            legend: {
                    show: true,
                    data: ["分销售量","回收量"],
                    left: "center",
                    top:0,
                    itemWidth :8,
                    itemWidth :8,
                    icon: 'circle',
                    textStyle: { color: "rgba(255,255,255)",fontWeight: 'bolder',
                                    fontFamily : '微软雅黑', }
            },
            tooltip : {
                trigger: 'axis',
                        axisPointer: {
                            type: 'shadow',
                            shadowStyle: {
                                color: 'rgba(0,46, 115, 0.3)'
                            }
                        },
                        /* formatter: function(params) {
                            var str = '';
                            params.forEach(function(v, i) {
                                str += '收购价 ' + '<br>' + '日度： ' + params[0].data;
                            });
                            return str

                        }, */
                        textStyle: {
                            align: 'left',
                            color: '#fff',
                            fontSize: '16'
                        },
                        /* backgroundColor: 'rgba(15, 52, 135, 0.5)',
                        borderWidth: '1',
                        borderColor: '#5cc1ff',
                        extraCssText: 'box-shadow: 0 0 10px rgba(255, 255, 255, 0.7);' */
                    },
                    label: {
                                normal: {
                                    textStyle: {
                                        color: "#ff3b00"
                                    }
                                },
                                emphasis:{
                                    textStyle:{
                                        color:"#ff3b00"
                                    }
                                }
                            },
                    grid: {
                        left: '1%',
                        right: '1%',
                        bottom: '1%',
                        top:'15%',
                        containLabel: true
                    },
                    yAxis: [{
                        type: "value",
                        name: "",
                        offset: 0,
                        nameTextStyle: {
                            color: "rgba(255, 255, 255, 0.65)",
                            fontSize: 12,
                            textShadowColor: "#000",
                            textShadowOffsetY: 0,
                            padding:[10,0,0,0]
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
                            fontSize: 12,
                            padding:[0,10,0,0],
                            interval:0,
                            fontWeight: 'bolder',
                                    fontFamily : '微软雅黑',
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
                    series: [
                        {
                            name: "分销售量",
                            // type: 'pictorialBar',
                            // symbol: 'rect', 
                            // symbolSize: [15, 2],
                            // symbolMargin: 2,
                            // symbolRepeat: true,
                            type: 'bar',
                            barWidth : 15,
                            //color:['#9dee5b'],
                            color:['#31ada5'],
                            // itemStyle: {
                            //     normal: {
                            //         //barBorderRadius: 30,
                            //         shadowBlur: 1,
                            //         barBorderWidth: 1,
                            //         barBorderColor: "#eee",
                            //         shadowColor: "rgba(188,235,127,0.05)",
                            //         shadowOffsetX: 22
                            //     },
                            //     emphasis: {
                            //         opacity: 1
                            //     }
                            // },

                            // 顺序 从下向上 传入
                            data:this.data.XSL
                        },
                        {
                            name: "回收量",
                            type: 'bar',
                            barWidth : 15,
                            //color:['#9dee5b'],
                            // type: 'pictorialBar',
                            // symbol: 'rect', 
                            // symbolSize: [15, 2],
                            // symbolMargin: 2,
                            // symbolRepeat: true,    
                            color:['#9dee5b'],
                        //    barGap:'-60%',
                            // itemStyle: {
                            //     normal: {
                            //         //barBorderRadius: 30,
                            //         shadowBlur: 1,
                            //         barBorderWidth: 1,
                            //         barBorderColor: "#eee",
                            //         shadowColor: "rgba(188,235,127,0.05)",
                            //         shadowOffsetX: 22
                            //     },
                            //     emphasis: {
                            //         opacity: 1
                            //     }
                            // },
                            // 顺序 从下向上 传入
                            data:this.data.HSL
                        }
                    ]
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
  //@import "./../../../assets/css/_letiable.scss";
  .myChart-wrapper {
    width: 100%;
    height: 82%;
  }
</style>
