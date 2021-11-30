<template>
  <div ref="myChart" class="myChart-wrapper">
  </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
require("echarts/lib/component/legend.js");
require("echarts/lib/component/tooltip.js");
// 引入瀑布图组件
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
    methods:{
        initChart(){
        var that = this;
        this.myChart = echarts.init(this.$refs.myChart); 
        var options={
            tooltip: {
                trigger: 'axis',
                formatter: function(params){
                    var res=params[0].name+'<br/>';
                    var total2018=parseInt(options.series[1].data[params[0].dataIndex])+parseInt(options.series[2].data[params[0].dataIndex]);
                    var total2019=parseInt(options.series[3].data[params[0].dataIndex])+parseInt(options.series[4].data[params[0].dataIndex]);                     
                    res+= "2017年："+options.series[0].data[params[0].dataIndex]+"<br/>2018年新增："
                    +options.series[2].data[params[2].dataIndex]+"<br/>"+
                    "2018年总计："+total2018+"<br/>"+
                    "2019年新增："+options.series[4].data[params[4].dataIndex]+"<br/>"
                    +"2019年总计："+total2019; 
                    return res;
                },
                position: function (point, params, dom, rect, size) {
                // 鼠标坐标和提示框位置的参考坐标系是：以外层div的左上角那一点为原点，x轴向右，y轴向下
                // 提示框位置
                var x = 0; // x坐标位置
                var y = 0; // y坐标位置
 
                // 当前鼠标位置
                var pointX = point[0];
                var pointY = point[1];
 
                // 外层div大小
                // var viewWidth = size.viewSize[0];
                // var viewHeight = size.viewSize[1];
 
                // 提示框大小
                var boxWidth = size.contentSize[0];
                var boxHeight = size.contentSize[1];
 
                // boxWidth > pointX 说明鼠标左边放不下提示框
                if (boxWidth > pointX) {
                x = 5;
                } else { // 左边放的下
                x = pointX - boxWidth;
            }
 
            // boxHeight > pointY 说明鼠标上边放不下提示框
            if (boxHeight > pointY) {
                y = -18;
            } else { // 上边放得下
                y = pointY - boxHeight;
            }
 
            return [x, y];
            },
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
                },
            legend: {
        
                show: true,
                data: ['2017', '2018','2019'],
                top:"1%",
                left: "center",
                icon: 'circle',
                itemWidth: 5,
                textStyle: {
                    fontSize:16,
                    color: "rgba(255,255,255)" ,
                    fontWeight: 'bolder',
                    fontFamily : '微软雅黑',
                    }        
                },
            grid: {
                    left: '1%',
                    right: '1%',
                    bottom: '1%',
                    top:'14%',
                    containLabel: true
            },
    xAxis: {
                    type: 'category',
                    axisTick : {
                        show: false,
                        alignWithLabel: true,
                        length:5,

                    },
                    axisLabel: {
                        rotate:30,
                        interval:0,
                        color: "rgba(255, 255, 255)",
                        fontSize: 10,
                        padding:[0,10,0,0],
                        fontWeight: 'bolder',
                        fontFamily : '微软雅黑',
                        inverse:0
                    },
                    //inverse:'true', //排序
                    axisLine: {
                        show: true,
                        lineStyle: {
                            color: "rgba(255,255,255,.5)"
                        }
                    },
        data: this.data.xAxis,
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
                                inverse:0
                            },
                    splitLine: {
                        show: true,
                        lineStyle:{
                        type:'dashed',
                            color: "rgba(255,255,255,.1)"
                        }
                    },
    },
    series: [

        {
            name: '2017',
            type: 'bar',
         //   barWidth : 12,
            barCategoryGap:'20%',
            color: ['#5eff7d'],
            stack: '2017',
            label: {
                            show: true,
                            position: 'top',
                            color: "#eee",
                            fontWeight: 'bolder',
                            fontFamily : '微软雅黑',
                            textStyle:{
                                fontSize:6,
                            }                            
/*                             formatter: function (params){
                                return params.value
                            } */
            },
            data: this.data.Data2017
        },
        {
            name: '2018base',
            type: 'bar',
            itemStyle: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
            },
            emphasis: {
                itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            stack: '2018',
            data: this.data.Data2018base
        },
        {
            name:'2018',
            type:'bar',
        //    barWidth : 12,
            color: ['#FFFF77'],            
            stack:'2018',
            label: {
                            show: true,
                            position: 'top',
                            color: "#eee",
                            fontWeight: 'bolder',
                            fontFamily : '微软雅黑',
                            textStyle:{
                                fontSize:6,
                            }                            
/*                             formatter: function (params){
                                return params.value
                            } */
            },
            data: this.data.Data2018more
        },
        {
            name:'2019base',
            type:'bar',
            stack:'2019',
            itemStyle: {
                barBorderColor: 'rgba(0,0,0,0)',
                color: 'rgba(0,0,0,0)'
            },
            emphasis: {
                itemStyle: {
                    barBorderColor: 'rgba(0,0,0,0)',
                    color: 'rgba(0,0,0,0)'
                }
            },
            data: this.data.Data2019base
            
        },
        {
            name: '2019',
            type: 'bar',
        //    barWidth : 12,
            color: ['#4cc2ff'],            
            stack: '2019',
            label: {
                            show: true,
                            position: 'top',
                            color: "#eee",
                            fontWeight: 'bolder',
                            fontFamily : '微软雅黑',
                            textStyle:{
                                fontSize:6,
                            }
/*                             formatter: function (params){
                                return params.value
                            } */
            },
            data: this.data.Data2019more
        },

    ]
    }  

          this.myChart.setOption(options);
          window.addEventListener('resize',()=>{
                this.myChart.resize();
          },true);

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