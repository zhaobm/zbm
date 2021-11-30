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
                    data: ["使用量","回收量"],
                    left: "center",
                    top:0,
                    // itemWidth :8,
                    itemWidth :8,
                    icon: 'circle',
                    textStyle: { color: "rgba(255,255,255)" ,
                                    fontWeight: 'bolder',
                                    fontFamily : '微软雅黑',}
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
                            fontWeight: 'bolder',
                                    fontFamily : '微软雅黑',
                            fontSize: 12,
                            padding:[0,10,0,0],
                            interval: 0,
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
                            name: "使用量",
                            type:'bar',
                            barWidth : 15,
                            color:['#31ada5'],
                            itemStyle: {
                            normal: {
                              //柱状图渐变
                              color: new echarts.graphic.LinearGradient(
                                  0, 0, 0, 1, [
                                    { offset: 0, color: '#55c8fe' },
                                    { offset: 0.3, color: '#4dbcf6' },
                                    { offset: 0.5, color: '#3ca3e6' },
                                    { offset: 0.7, color: '#3193db' },
                                    { offset: 1, color: '#2683d0' }
                                    // { offset: 0.5, color: '#31ada5' },
                                    // { offset: 1, color: '#5ad9e8' }
                                  ]
                              ),
                              //刻度显示在顶部
                              label: {
                                show: true,
                                color: '#fff',
                                position: 'top',
                                fontWeight: 'bolder',
                                fontFamily : '微软雅黑',
                              }
                            },
                            emphasis: {
                                opacity: 1
                            }
                            },
                            // 顺序 从下向上 传入
                            data:this.data.SYL,
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
                    
                    
                        {
                            name: "回收量",
                            type: 'bar',
                            barWidth : 15,
                         color:['#9dee5b'],

                        itemStyle: {
                            normal: {
                                barBorderWidth: 1,
                                barBorderColor: "#eee",
                            },
                            emphasis: {
                                opacity: 1
                            }
                        },
                            // 顺序 从下向上 传入
                            data:this.data.HSL,
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
                      {
                        type: 'pictorialBar',
                        symbol: 'rect',
                        symbolSize: [15, 2],
                        symbolOffset:[-10,0],
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
                        data: this.data.SYL
                      },
                      {
                        type: 'pictorialBar',
                        symbol: 'rect',
                        symbolSize: [15, 2],
                        symbolOffset:[-10,0],
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
                        data: this.data.HSL
                      },

                    ]
          }

        /*
             ////求和
        var series = option["series"];
        
        var fun = function(params) {
            var datavalue = 0;
            for (var i = 0; i < series.length; i++) {
                datavalue += parseInt(series[i].data[params.dataIndex]);
            }
            return datavalue;
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
                            datavalue += parseInt(series[j].data[params.dataIndex]);
                        }
                    }
                }
                return datavalue
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
        */
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
    height: 95%;
  }
</style>
