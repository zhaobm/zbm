<template>
    <div ref="myChart"
         class="myChart-wrapper">
    </div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入柱状图组件
require("echarts/lib/chart/pie");
require("echarts/lib/component/title.js");
require("echarts/lib/component/legend.js");
export default {
    name: "myChart",
    props: {
        title: {
            type: String
        },
        data: {
            type: Object,
            default: () => {
                return {
                    xAxis: [],
                    yAxis: [],
                    color: [188, 235, 127],
                    itemGap: 30,
                    seriesData:[]
                };
            }
        }
    },
    mounted () {
        this.initChart();
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
        initChart () {
            this.myChart = echarts.init(this.$refs.myChart);
            this.itemGap = parseInt(document.getElementsByTagName('html')[0].style['font-size'])
            let dataArr = this.data.seriesData;
            let total = 0;
            dataArr.forEach(v => (total = v.value + total));
            let option = {
                title: [
                    {
                        text: "1,004",
                        left: "49%",
                        top: "34%",
                        textAlign: "center",
                        textBaseline: "middle",
                        textStyle: {
                            color: "#a3f0eb",
                            fontWeight: "normal",
                            fontSize: this.itemGap * 3.2
                        }
                    },
                    {
                        text: "草面积(万亩)",
                        left: "50%",
                        top: "45%",
                        textAlign: "center",
                        textBaseline: "middle",
                        textStyle: {
                            color: "#a3f0eb",
                            fontWeight: "normal",
                            fontSize: this.itemGap * 1.4
                        }
                    }
                ],
                color: ["#48B787", "#BCEB7F"],
                tooltip: {
                    show: false,
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                grid: {
                    bottom: "20%"
                },
                legend: {
                    show: true,
                    bottom: this.itemGap * 1.5,
                    icon: "circle",
                    orient: "vertical",
                    itemWidth: 8,
                    itemHeight: 8,
                    //data: ['草地', '黑土滩', '水域', '建筑/裸地'],
                    formatter: name => {
                        let value = dataArr.filter(v => {
                            return v.name == name;
                        });
                        return [
                            "{a|" + name + "}{b|" + value[0].value + "}{c||}{d|"+ (value[0].value / total * 100).toFixed(2) + "%}"].join("\n");
                    },
                    textStyle: {
                        rich: {
                            a: {
                                color: "#82939B",
                                align: "left",
                                width: this.itemGap * 8
                            },
                            b: {
                                color: "#427583",
                                align: "left",
                                fontSize: this.itemGap * 1.6,
                                width: this.itemGap * 4
                            },
                            c: {
                                color: "rgba(255, 255, 255, 0.12)",
                                align: "center",
                                fontSize: this.itemGap * 1,
                                width: this.itemGap * 5
                            },
                            d: {
                                color: "#427583",
                                align: "center",
                                fontSize: this.itemGap * 1.6,
                                width: this.itemGap * 8
                            }
                        }
                    }
                },
                series: [
                    {
                        name: "访问来源",
                        center: ["50%", "40%"],
                        type: "pie",
                        data: [90],
                        z: 1,
                        radius: ["55%", "0%"],
                        itemStyle: {
                            normal: {
                                color: "rgba(0,31,48,.8)"
                            }
                        },
                        silent: true,
                        labelLine: {
                            normal: {
                                show: false
                            }
                        }
                    },
                    {
                        name: "访问来源",
                        type: "pie",
                        center: ["50%", "40%"],
                        clockWise: false,
                        radius: ["54%", "56%"],
                        itemStyle: {
                            normal: {
                                label: {
                                    show: false
                                },
                                labelLine: {
                                    show: false
                                },
                                shadowBlur: 40,
                                shadowColor: "rgba(40, 40, 40, 0.5)"
                            }
                        },
                        hoverAnimation: false,
                        data: [
                            {
                                value: 75,
                                name: "",
                                itemStyle: {
                                    normal: {
                                        show: false,
                                        color: "rgba(117, 239, 255, 0.3)",
                                        label: {
                                            show: false
                                        },
                                        labelLine: {
                                            show: false
                                        }
                                    }
                                }
                            },
                            {
                                value: 25,
                                name: "",
                                itemStyle: {
                                    normal: {
                                        show: false,
                                        color: "rgba(44,59,70,0)", //未完成的圆环的颜色
                                        label: {
                                            show: false
                                        },
                                        labelLine: {
                                            show: false
                                        }
                                    }
                                }
                            }
                        ]
                    },
                    {
                        name: "访问来源",
                        type: "pie",
                        center: ["50%", "40%"],
                        radius: [0, "35%"],
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        itemStyle: {
                            normal: {
                                color: "rgba(15,44,63,.2)"
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [{ value: 335, name: "" }]
                    },
                    {
                        name: "访问来源",
                        type: "pie",
                        center: ["50%", "40%"],
                        radius: ["40%", "50%"],
                        itemStyle: {
                            show: false
                        },
                        label: {
                            normal: {
                                show: false
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: dataArr
                    }
                ]
            };

            this.myChart.setOption(option);
            window.addEventListener(
                "resize",
                () => {
                    this.itemGap = parseInt(document.getElementsByTagName('html')[0].style['font-size'])
                    this.myChart.setOption(option);
                    this.myChart.resize();
                },
                true
            );
        }
    }
};
</script>

<style lang="scss" scoped>
//@import "./../../../assets/css/_letiable.scss";
.myChart-wrapper {
  width: 100%;
  height: 100%;
}
</style>
