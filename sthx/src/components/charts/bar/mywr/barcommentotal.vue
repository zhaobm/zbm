<template>
    <div ref="myChart" class="myChart-wrapper">
    </div>
</template>

<script>
    // 引入基本模板
  /*  let echarts = require("echarts/lib/echarts");
    require("echarts/lib/component/legend.js");
    require("echarts/lib/component/tooltip.js");
    // 引入柱状图组件
    require("echarts/lib/chart/bar");*/
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
                        data:[]
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
                    splitLine:{
                        show:false
                    },
                    legend: {
                        type:'scroll',
                        pageIconColor:'#fff',
                        pageTextStyle:{
                            color:"#fff"
                        },
                        top:10,
                        left:20,
                        right:10,
                        textStyle:{
                            color:"#fff",
                            fontSize:14
                        }
                    },
                    tooltip : {
                    },
                    dataset:{
                        source:this.data.data
                      /*  source:[
                            ['test','入河负荷-1','排放负荷-1','入河负荷-2','排放负荷-2','入河负荷-3','排放负荷-3','入河负荷-4','排放负荷-4','入河负荷-5','排放负荷-5'],
                            ['总磷',10,20,10,20,10,20,10,20,10,20],
                            ['总氮',10,20,10,20,10,20,10,20,10,20],
                            ['氨氮',10,20,10,20,10,20,10,20,10,20],
                            ['cod',10,20,10,20,10,20,10,20,10,20]
                        ]*/
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel:{
                            show:true,
                            textStyle: {
                                color: "rgba(255,255,255,0.7)"
                            },
                            fontSize:12
                        },
                        axisLine:{
                            lineStyle: {
                                //color: "rgba(0,0,0,0.5)"
                            }
                        },
                        axisTick:{
                            show:false
                        }
                    },
                    yAxis: {
                        axisLabel:{
                            show:true,
                            textStyle: {
                                color: "rgba(255,255,255,0.7)"
                            },
                            fontSize:12
                        },
                        axisLine:{
                            lineStyle: {
                                //color: "rgba(0,0,0,0.5)"
                            }
                        },
                        axisTick:{
                            show:false
                        },
                        splitLine: {
                            show:true,
                            lineStyle:{
                                type:'dashed',
                                color:"rgba(255,255,255,0.5)"
                            }
                        }
                    },
                    series: [
                        {
                            type: 'bar',
                            stack:'1',
                            barWidth : 20,
                        },
                        {
                            type: 'bar',
                            stack:'2',
                            barWidth : 20,
                        },
                        {
                            type: 'bar',
                            stack:'1',
                            barWidth : 20,
                        },
                        {
                            type: 'bar',
                            stack:'2',
                            barWidth : 20,
                        },
                        {
                            type: 'bar',
                            stack:'1',
                            barWidth : 20,
                        },
                        {
                            type: 'bar',
                            stack:'2',
                            barWidth : 20,
                        },
                        {
                            type: 'bar',
                            stack:'1',
                            barWidth : 20,
                        },
                        {
                            type: 'bar',
                            stack:'2',
                            barWidth : 20,
                        },
                        {
                            type: 'bar',
                            stack:'1',
                            barWidth : 20,
                            label:{
                                color:"#fff",
                                fontWeight:'bold',
                                fontSize:12,
                                show:true,
                                position:'top',
                                formatter:function(params){
                                    var data=0.0;
                                    for(var i=1;i<params.value.length;i+=2)
                                    {
                                        data+=Number(params.value[i]);
                                    }
                                    return data.toFixed(2);
                                }
                            }
                        },
                        {
                            type: 'bar',
                            stack:'2',
                            barWidth : 20,
                            label:{
                                color:"#fff",
                                fontWeight:'bold',
                                fontSize:12,
                                show:true,
                                position:'top',
                                formatter:function(params){
                                    var data=0.0;
                                    for(var i=2;i<params.value.length;i+=2)
                                    {
                                        data+=Number(params.value[i]);
                                    }
                                    return data.toFixed(2);
                                }
                            }
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
    .myChart-wrapper {
        width: 100%;
        height: 100%;
    }
</style>