<template>
    <div ref="stacklineFQ" class="myChart-wrapper"></div>
</template>

<script>
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/component/legend.js");
require("echarts/lib/component/tooltip.js");
require("echarts/lib/chart/line");
export default {
    name:'stacklineFQ',
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
                yUnit:'',
                legendData:[]
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
            this.myChart = echarts.init(this.$refs.stacklineFQ); 
            var options={
             tooltip: {
                trigger: 'axis',
                    axisPointer: {
                        type: 'shadow',
                        shadowStyle: {
                            color: 'rgba(0,46, 115, 0.3)'
                        }
                    },
                textStyle: {
                    align: 'left',
                    color: '#fff',
                    fontSize: '16'
                },  
             },
            legend: {
        
                show: true,
                data: ['二氧化硫', '氮氧化物','颗粒物','挥发性有机物'],
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
                        rotate:0,
                        color: "rgba(255, 255, 255)",
                        fontSize: 14,
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
            series:[
                {
                    name:'二氧化硫',
                    type:'line',
                //    stack:'总量',
                    color: ['#4cc2ff'],
                    data:this.data.eyhl
                },
                {
                    name:'氮氧化物',
                    type:'line',
                //    stack:'总量',
                    color: ['#5eff7d'],
                    data:this.data.dyhw
                },
                {
                    name:'颗粒物',
                    type:'line',
                //    stack:'总量',
                    color: ['#FFFF77'],
                    data:this.data.klw
                },
                {
                    name:'挥发性有机物',
                    type:'line',
                //    stack:'总量',
                    color: ['#ffa562'],
                    data:this.data.hfxyjw
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