<template>
  <div ref="myChart" class="myChart-wrapper">
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/bar");
require("echarts/lib/component/legend.js");
require("echarts/lib/component/tooltip.js");
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
                itemGap:30,
                seriesData:[]
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
          this.myChart = echarts.init(this.$refs.myChart)
          this.itemGap=parseInt(document.getElementsByTagName('html')[0].style['font-size'])
          let datalist = this.data.yAxis;
        let colorArray = [
                    {
                        top: 'rgba(23,108,155)',//红shen
                        bottom: 'rgba(23,108,155, 0.3)'
                    },
                    {
                        top: 'rgba(78,141,174)',//黄
                        bottom: 'rgba(78,141,174, 0.3)'
                    },
                    {
                        top: 'rgba(113,166,182)',//绿
                        bottom: 'rgba(113,166,182, 0.3)'
                    },
                    {
                        top: 'rgba(0,122,109)',//蓝
                        bottom: 'rgba(0,122,109, 0.3)'
                    },
                    {
                        top: 'rgba(74,161,154)',//深蓝
                        bottom: 'rgba(74,161,154, 0.3)'
                    },
                    {
                        top: 'rgba(94,168,88)',//粉
                        bottom: 'rgba(94,168,88, 0.3)'
                    },
                    {
                        top: 'rgba(141,171,72)',//红shen
                        bottom: 'rgba(141,171,72, 0.3)'
                    },
                    {
                        top: 'rgba(202,205,106)',//黄
                        bottom: 'rgba(202,205,106, 0.3)'
                    },
                    {
                        top: 'rgba(197,150,76)',//绿
                        bottom: 'rgba(197,150,76, 0.3)'
                    },
                    {
                        top: 'rgba(186,118,102)',//蓝
                        bottom: 'rgba(186,118,102, 0.3)'
                    },
                    {
                        top: 'rgba(168,73,87)',//深蓝
                        bottom: 'rgba(168,73,87, 0.3)'
                    },
                    {
                        top: 'rgba(169,93,139)',//粉
                        bottom: 'rgba(169,93,139, 0.3)'
                    },
                    {
                        top: 'rgba(100,66,133)',//深蓝
                        bottom: 'rgba(100,66,133, 0.3)'
                    },
                    {
                        top: 'rgba(83,91,136)',//粉
                        bottom: 'rgba(83,91,136, 0.3)'
                    }
        ];
        let labelColor=['#176C9B','#4E8DAE','#71A6B6','#007A6D','#4AA19A','#5EA858','#8DAB48',
        '#CACD6A','#C5964C','#BA7666','#A84957','#A95D8B','#644285','#535B88'];
          let option = {
            //backgroundColor:'#12234F',
                title: {
                    text: '',
                },
                legend: {
                    show: true,
                    data: this.data.yAxis,
                    left: "center",
                    icon: "circle",
                    itemWidth: 8,
                    itemWidth: 8,
                    textStyle: { color: "rgba(255,255,255,0.65)" }
                },
                tooltip: {
                    trigger: 'item',
                    formatter: "{b}<br/><b> {c}</b>万亩",
                },
                grid: {
                    top:'3%',
                    left: '1%',
                    right: '12%',
                    bottom: '6%',
                    containLabel: true
                },
                xAxis:  {
                    type: "value",
                    name: "(万亩)",
                    offset: 0,
                    nameTextStyle: {
                        color: "rgba(255, 255, 255, 0.65)",
                        fontSize: this.itemGap*1.2,
                        textShadowColor: "#000",
                        textShadowOffsetY: 0,
                        padding:[25,0,0,0]
                    },
                    position:'bottom',
                    axisTick : {show: false},
                    axisLine: {
                        show: false,
                        lineStyle:{
                            color:'#fff',
                        }
                    },
                    axisLabel: {
                                color: "rgba(255, 255, 255, 0.65)",
                                fontSize: this.itemGap*1.2,
                                padding:[0,10,0,0],
                            },
                    splitLine: {
                        show: true,
                        lineStyle:{
                           type:'dashed',
                            color: "rgba(255,255,255,.1)"
                        }
                    },
                },
                yAxis: [
                        {
                            type: 'category',
                            axisTick : {
                                show: false,
                                alignWithLabel: true,
                                length:5,

                            },
                            axisLabel: {
                                color: "rgba(255, 255, 255, 0.65)",
                                fontSize: this.itemGap*1.2,
                                padding:[0,10,0,0],
                                formatter: function (value, index) {
                                    return  value + '{'+ index +'|   ●}';
                                },
                                rich: {
                                    0: {
                                        color: labelColor[0],
                                        marginLeft:5
                                    },
                                    1: {
                                        color: labelColor[1],
                                        marginLeft:5
                                    },
                                    2: {
                                        color: labelColor[2],
                                        marginLeft:5
                                    },
                                    3: {
                                        color: labelColor[3],
                                        marginLeft:5
                                    },
                                    4: {
                                        color: labelColor[4],
                                        marginLeft:5
                                    },
                                    5: {
                                        color: labelColor[5],
                                        marginLeft:5
                                    },
                                    6: {
                                        color: labelColor[6],
                                        marginLeft:5
                                    },
                                    7: {
                                        color: labelColor[7],
                                        marginLeft:5
                                    },
                                    8: {
                                        color: labelColor[8],
                                        marginLeft:5
                                    },
                                    9: {
                                        color: labelColor[9],
                                        marginLeft:5
                                    },
                                    10: {
                                        color: labelColor[10],
                                        marginLeft:5
                                    },
                                    11: {
                                        color: labelColor[11],
                                        marginLeft:5
                                    },
                                    12: {
                                        color: labelColor[12],
                                        marginLeft:5
                                    },
                                    13: {
                                        color: labelColor[13],
                                        marginLeft:5
                                    }
                                }
                            },
                            inverse:'true', //排序
                            axisLine: {
                                show: true,
                                lineStyle: {
                                    color: "rgba(255,255,255,.5)"
                                }
                            },
                            data: datalist
                        }

                ],

                //series[0]即"辅助"这个series,将itemStyle的color和barBorderColor设为
                //rgba(0,0,0,0),即透明,data的数据设置一样的,这样在视觉的效果上第二个柱子
                //会和坐标轴有间距.
                series: [
                    {
                        name: "辅助",
                        type: "bar",
                        stack: "总",
                        barWidth: 6,
                        itemStyle: {
                            normal: {
                                barBorderColor: 'rgba(0,0,0,0)',
                                color: 'rgba(0,0,0,0)'
                            }
                        },
                        data: [15,15, 15, 15,15,15,15, 15, 15,15,15,15, 15, 15,15]
                    },
                    {
                        name: '',
                        type: 'bar',
                        stack: "总",
                        data: this.data.seriesData,
                        barWidth: '6',
                        itemStyle:{
                            normal: {
                                show: true,
                                color: function (params) {
                                    let num = colorArray.length;
                                    return{
                                        type: 'linear',
                                        colorStops: [{
                                            offset: 0, color: colorArray[params.dataIndex%num].bottom
                                        }, {
                                            offset: 1, color: colorArray[params.dataIndex%num].top
                                        }, {
                                            offset: 0, color: colorArray[params.dataIndex%num].bottom
                                        }, {
                                            offset: 1, color: colorArray[params.dataIndex%num].top
                                        }, {
                                            offset: 0, color: colorArray[params.dataIndex%num].bottom
                                        }, {
                                            offset: 1, color: colorArray[params.dataIndex%num].top
                                        }, {
                                            offset: 0, color: colorArray[params.dataIndex%num].bottom
                                        }, {
                                            offset: 1, color: colorArray[params.dataIndex%num].top
                                        }, {
                                            offset: 0, color: colorArray[params.dataIndex%num].bottom
                                        }, {
                                            offset: 1, color: colorArray[params.dataIndex%num].top
                                        }, {
                                            offset: 0, color: colorArray[params.dataIndex%num].bottom
                                        }, {
                                            offset: 1, color: colorArray[params.dataIndex%num].top
                                        },{
                                            offset: 0, color: colorArray[params.dataIndex%num].bottom
                                        }, {
                                            offset: 1, color: colorArray[params.dataIndex%num].top
                                        }, {
                                            offset: 0, color: colorArray[params.dataIndex%num].bottom
                                        }, {
                                            offset: 1, color: colorArray[params.dataIndex%num].top
                                        }, {
                                            offset: 0, color: colorArray[params.dataIndex%num].bottom
                                        }, {
                                            offset: 1, color: colorArray[params.dataIndex%num].top
                                        }, {
                                            offset: 0, color: colorArray[params.dataIndex%num].bottom
                                        }, {
                                            offset: 1, color: colorArray[params.dataIndex%num].top
                                        }, {
                                            offset: 0, color: colorArray[params.dataIndex%num].bottom
                                        }, {
                                            offset: 1, color: colorArray[params.dataIndex%num].top
                                        }, {
                                            offset: 0, color: colorArray[params.dataIndex%num].bottom
                                        }, {
                                            offset: 1, color: colorArray[params.dataIndex%num].top
                                        }, {
                                            offset: 0, color: colorArray[params.dataIndex%num].bottom
                                        }, {
                                            offset: 1, color: colorArray[params.dataIndex%num].top
                                        }, {
                                            offset: 0, color: colorArray[params.dataIndex%num].bottom
                                        }, {
                                            offset: 1, color: colorArray[params.dataIndex%num].top
                                        }],
                                        //globalCoord: false
                                    }
                                },
                                barBorderRadius:88,
                                borderWidth:0,
                                borderColor:'#333',
                            }
                        },
                        //为柱状添加顶部显示
                        label: {
                            normal: {
                                show: false
                            }
                        },
                    },
                ],
          }

          this.myChart.setOption(option);
            window.addEventListener(
                "resize",
                () => {
                    this.itemGap=parseInt(document.getElementsByTagName('html')[0].style['font-size'])
                    this.myChart.setOption(option);
                    this.myChart.resize();
                },
                true
            );
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
