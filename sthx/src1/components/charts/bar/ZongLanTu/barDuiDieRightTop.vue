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
          var that = this;
        this.myChart = echarts.init(this.$refs.myChart);
        let option = {
            legend: {
                show: true,
                data: ['工业源','农业源','集中式','移动源','生活源'],
                top:"1%",
                left: "center",
                icon: 'circle',
                itemWidth: 5,
                textStyle: {
                    fontSize:16,
                    color: "rgba(255,255,255)",
                    fontWeight: 'bolder',
                    fontFamily : '微软雅黑',
                }
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
                    top:'20%',
                    containLabel: true
                },
                yAxis: {
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
                },
                xAxis: {
                    type: 'category',
                    axisTick : {
                        show: false,
                        alignWithLabel: true,
                        length:5,

                    },
                    axisLabel: {
                        //rotate:50,
                        interval:0,
                        color: "rgba(255, 255, 255)",
                        fontSize: 14,
                        padding:[0,10,0,0],
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
                        name: "工业源",
                        type: 'bar',
                        barWidth : 12,
                        color: ['#5eff7d'],
                        stack:'五类污染源',
                        // itemStyle: {
                        //     normal: {
                        //         barBorderWidth: 1,
                        //         barBorderColor: "#eee",
                        //     },
                        //     emphasis: {
                        //         opacity: 1
                        //     }
                        // },
                        // 顺序 从下向上 传入
                        itemStyle: {
                            normal: {
                                barBorderWidth: 1,
                                barBorderColor: "#eee",
                            },
                            emphasis: {
                                opacity: 1
                            }
                        },
                        data: this.data.gyyData,
                        label:{
                            show: false,
                            position: 'top',
                            color: "#eee",
                            fontWeight: 'bolder',
                            fontFamily : '微软雅黑',
                            formatter: function (params){
                                return params.value
                            }
                        }
                    },
                    {
                        name: "农业源",
                        type: 'bar',
                        barWidth : 12,
                        //color: ['rgba(102,60,78)'],
                        color: ['#ffa562'],
                        stack:'五类污染源',
                        // itemStyle: {
                        //     normal: {
                        //         barBorderWidth: 1,
                        //         barBorderColor: "#eee",
                        //     },
                        //     emphasis: {
                        //         opacity: 1
                        //     }
                        // },
                        // 顺序 从下向上 传入
                        itemStyle: {
                            normal: {
                                barBorderWidth: 1,
                                barBorderColor: "#eee",
                            },
                            emphasis: {
                                opacity: 1
                            }
                        },
                        data:this.data.nyyData,
                        label:{
                            show: false,
                            position: 'top',
                            color: "#eee",
                            fontWeight: 'bolder',
                            fontFamily : '微软雅黑',
                            formatter: function (params){
                                return params.value
                            }
                        }
                    },
                    {
                        name: "集中式",
                        type: 'bar',
                        barWidth : 12,
                        //color: ['rgba(188, 235, 127)'],
                        color: ['#FFFF77'],
                        stack:'五类污染源',
                        // itemStyle: {
                        //     normal: {
                        //         barBorderWidth: 1,
                        //         barBorderColor: "#eee",
                        //     },
                        //     emphasis: {
                        //         opacity: 1
                        //     }
                        // },
                        // 顺序 从下向上 传入
                        itemStyle: {
                            normal: {
                                barBorderWidth: 1,
                                barBorderColor: "#eee",
                            },
                            emphasis: {
                                opacity: 1
                            }
                        },
                        data:this.data.jzsData,
                        label:{
                            show: false,
                            position: 'top',
                            color: "#eee",
                            fontWeight: 'bolder',
                            fontFamily : '微软雅黑',
                            formatter: function (params){
                                return params.value
                            }
                        }
                    },

                    {
                        name: "移动源",
                        type: 'bar',
                        barWidth : 12,
                        //color: ['rgba(240,155,96)'],
                        color: ['#66d7d2'],
                        stack:'五类污染源',
                        // itemStyle: {
                        //     normal: {
                        //         barBorderWidth: 1,
                        //         barBorderColor: "#eee",
                        //     },
                        //     emphasis: {
                        //         opacity: 1
                        //     }
                        // },
                        // 顺序 从下向上 传入
                        itemStyle: {
                            normal: {
                                barBorderWidth: 1,
                                barBorderColor: "#eee",
                            },
                            emphasis: {
                                opacity: 1
                            }
                        },
                        data:this.data.ydyData,
                        label:{
                            show: false,
                            position: 'top',
                            color: "#eee",
                            fontWeight: 'bolder',
                            fontFamily : '微软雅黑',
                            formatter: function (params){
                                return params.value
                            }
                        }
                    },
                    {
                        name: "生活源",
                        type: 'bar',
                        barWidth : 12,
                        //color: ['rgba(49,173,165)'],
                    //    color: ['#00ffea'],
                    //    color: ['#5b7fc0'],
                         color: ['#4cc2ff'],
                        stack:'五类污染源',
                        // itemStyle: {
                        //     normal: {
                        //         barBorderWidth: 1,
                        //         barBorderColor: "#eee",
                        //     },
                        //     emphasis: {
                        //         opacity: 1
                        //     }
                        // },
                        // 顺序 从下向上 传入
                        itemStyle: {
                            normal: {
                                barBorderWidth: 1,
                                barBorderColor: "#eee",
                            },
                            emphasis: {
                                opacity: 1
                            }
                        },
                        data:this.data.shyData,
                        label:{
                            show: true,
                            position: 'top',
                            color: "#eee",
                            fontWeight: 'bolder',
                            fontFamily : '微软雅黑',
                            formatter: function (params){
                                return params.value
                            }
                        }
                    },
                ]
          }
                    ////求和
        var series = option["series"];
        
        var fun = function(params) {
            var datavalue = 0;
            for (var i = 0; i < series.length; i++) {
                var value = parseFloat(series[i].data[params.dataIndex]).toFixed(2)
                datavalue += parseFloat(value);
            }
            return datavalue.toFixed(2);
        }
        if(series[series.length - 1]){
            series[series.length - 1]["label"]["formatter"] = fun;  
        }


        //点击图例求和，没开启的可以忽略下面代码
        this.myChart.on("legendselectchanged", function(obj) {
            console.log("clicklegend");
            var b = obj.selected,
                d = [];
            for (var key in b) {
                if (b[key]) {
                    for (var i = 0, l = series.length; i < l; i++) {
                        var changename = series[i]["name"];
                        if (changename == key) {
                            d.push(i);
                        }
                    }
                }
            }

            var fun = function(params) {
                var datavalue = 0;
                for (var i = 0; i < d.length; i++) {
                    for (var j = 0; j < series.length; j++) {
                        if (d[i] == j) {
                            var value = parseFloat(series[j].data[params.dataIndex]).toFixed(2)
                            datavalue += parseFloat(value);
                        }
                    }
                }
                return datavalue.toFixed(2);
            }
            for (var i = 0; i < series.length; i++) {
                series[i]["label"]["show"] = false;
            }
            for (var i = series.length - 1; i >= 0; i--) {
                var name = series[i]["name"];
                if (obj["selected"][name]) {
                    series[i]["label"]["formatter"] = fun
                    series[i]["label"]["show"] = true
                    break;
                }
            }
            that.myChart.setOption(option);
        })



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
    height: 100%;
  }
</style>
