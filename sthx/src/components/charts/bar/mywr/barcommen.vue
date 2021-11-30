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
                console.log(this.data);
                this.myChart = echarts.init(this.$refs.myChart);
                let option = {
                  /*  grid:{
                        containLabel:false,
                        width:"80%",
                        height:"70%"
                    },*/
                    legend: {
                        textStyle:{
                            color:"#fff",
                            fontSize:14,
                            padding:10
                        }
                    },
                    tooltip : {
                    },
                    dataset:{
                        source:this.data.data
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
                               // color: "rgba(0,0,0,0.5)"
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
                               // color: "rgba(0,0,0,0.5)"
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
                            barWidth : 16,
                            itemStyle:{
                                color:new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1, [
                                        { offset: 0, color: '#06B5D7' },
                                        { offset: 0.3, color: '#4dbcf6' },
                                        { offset: 0.5, color: '#3ca3e6' },
                                        { offset: 0.7, color: '#3193db' },
                                        { offset: 1, color: '#2683d0' }
                                    ]
                                ),
                            },
                            label:{
                                color:"#fff",
                                fontWeight:'bold',
                                fontSize:12,
                                show:true,
                                position:'top'
                            }
                        },
                        {
                            type: 'bar',
                            barWidth : 16,
                            itemStyle:{
                                color:new echarts.graphic.LinearGradient(
                                    0, 0, 0, 1, [
                                        { offset: 0, color: '#9adb89' },
                                        { offset: 0.3, color: '#a6d09b' },
                                        { offset: 0.5, color: '#50e644' },
                                        { offset: 0.7, color: '#07a80c' },
                                        { offset: 1, color: '#2cb52c' },

                                    ]
                                ),
                            },
                            label:{
                                color:"#fff",
                                fontWeight:'bold',
                                fontSize:12,
                                show:true,
                                position:'top'
                            }
                        },
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