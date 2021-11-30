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
                    yAxis:[],
                    erWuPuData:[],
                    HuanTong:[],
                    ChaZhiBi:[],
                    max:0,
                    min:0,
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
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                },
                
                formatter: function (params) {
                    var showHtm="";
                    var name = params[0].name  +'<br>';
                    showHtm += name;
                    for(var i=0;i<params.length;i++){
                        var seriesname = params[i].seriesName;
                        var value = params[i].value;
                        if(seriesname == '环境统计'){
                            showHtm += seriesname+" : " + (-value) +'<br>'
                        }
                        else{
                            showHtm += seriesname+" : " + value +'<br>'
                        }
                    }
                    return showHtm;
                }
                
            },
            legend: {
                show: true,
                data:['二污普', '环境统计'],
                left: "center",
                top:12,
                itemWidth :8,
                icon: 'circle',
                textStyle: { fontSize: 14,color: "rgba(255,255,255,0.85)" }  
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                top:'15%',
                containLabel: true
            },
            xAxis: {
                type : 'value',
                max:this.data.max,
                min:this.data.min,
                /*
                max:function (value) { 
                    var maxabs = Math.abs(value.max);
                    var minabs = Math.abs(value.min);
                    console.log(maxabs,minabs);
                    var max = 0;
                    if(maxabs>minabs){
                        max = parseInt(maxabs)+18000;
                    }
                    else if(maxabs<minabs){
                        max = parseInt(minabs)+18000;
                    }
                    else{
                        max = parseInt(maxabs)+18000;
                    }
                    console.log("max",max);
                    return max;
                },
                
                min:function (value) {
                    var maxabs = Math.abs(value.max);
                    var minabs = Math.abs(value.min);
                    console.log(maxabs,minabs);
                    var min = 0;
                    if(maxabs>minabs){
                        min = -parseInt(maxabs)-18000;
                    }
                    else if(maxabs<minabs){
                        min = -parseInt(minabs)-18000;
                    }
                    else{
                        min = -parseInt(maxabs)-18000;
                    }
                    console.log("min",min);
                    return min;
                },
                */
                axisTick : {
                    show: false,
                    alignWithLabel: true,
                    length:5,

                },
                axisLabel: {
                    color: "rgba(255, 255, 255, 0.85)",
                    fontSize: 12,
                    padding:[0,10,0,0],
                    formatter:function(value){
                        if (value<0) {
                            return -value;
                        }
                        else if (value>=0) {
                            return value;
                        }
                    }
                },
                //inverse:'true', //排序
                axisLine: {
                    show: false,
                    lineStyle: {
                        color: "rgba(255,255,255,.5)"
                    }
                },
                
                splitLine: {
                    show: true,
                    lineStyle:{
                        type:'dashed',
                        color: "rgba(255,255,255,0.1)"
                    }
                },
            },
            yAxis: [{
                type : 'category',
                //axisTick : {show: false},
                
                offset: 0,
                name: "",
                nameTextStyle: {
                    color: "rgba(255, 255, 255, 0.85)",
                    fontSize: 12,
                    textShadowColor: "#000",
                    textShadowOffsetY: 0,
                    padding:[10,0,0,0]
                },
                position:'top',
                axisTick : {show: false},
                axisLine: {
                    show: true,
                    lineStyle:{
                        color:'rgba(255,255,255,.5)',
                    }
                },
                axisLabel: {
                    color: "rgba(255, 255, 255, 0.85)",
                    fontSize: 12,
                    padding:[0,10,0,0],
                },
                splitLine: {
                    show: false,
                    lineStyle:{
                    type:'dashed',
                        color: "rgba(255,255,255,.1)"
                    }
                },
                data : this.data.yAxis
            }],
            series : [
                {
                    name:'二污普',
                    type:'bar',
                    stack: '总量',
                    barMaxWidth : 24,
                    color:['#008866'],
                    label: {
                        normal: {
                            show: true,
                            position: 'right',
                            fontSize:12,
                            color: "rgba(255,255,255,.8)"
                        }
                    },
                    itemStyle: {
                        normal: {
                            //barBorderRadius:  [30],
                            //shadowBlur: 1,
                            //shadowColor: "rgba(49, 173, 165, 0.08)",
                            //shadowOffsetX: 12
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                    data:this.data.erWuPuData,
                },
                {
                    name:'环境统计',
                    type:'bar',
                    stack: '总量',
                    barMaxWidth : 24,
                    barGap:'-100%',
                    color:['#31ada5'],
                    
                    label: {
                        normal: {
                            show: true,
                            position: 'left',
                            fontSize:12,
                            color: "rgba(255,255,255,.8)",
                            formatter: function (value) {
                                if(value.data<0){
                                    return -value.data;
                                }
                            },
                        }

                    },
                    itemStyle: {
                        normal: {
                            //barBorderRadius:  [30],
                            //shadowBlur: 1,
                            //shadowColor: "rgba(49, 173, 165, 0.08)",
                            //shadowOffsetX: 12
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                    data:this.data.HuanTong,
                },
                {
                    name:'差值比(%)',
                    type:'bar',
                    //stack: '总量',
                    barMaxWidth : 1,
                    color:['rgba(255,255,255,0)'],
                    
                    label: {
                        normal: {
                            show: true,
                            position: 'top',
                            //top:50,
                            fontSize:15,
                            color: "rgba(255,255,255,.8)"
                        }
                    },
                    itemStyle: {
                        normal: {
                            //barBorderRadius:  [30],
                            //shadowBlur: 1,
                            //shadowColor: "rgba(49, 173, 165, 0.08)",
                            //shadowOffsetX: 12
                        },
                        emphasis: {
                            opacity: 1
                        }
                    },
                    data:this.data.ChaZhiBi,
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
    height: 100%;
  }
</style>
