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
                    itemGap: 30
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
            //var color = ["#BCEB7F", "#3D6D70", "#5AD2FA", "#7A8DEB", "#458F7B"];
            //console.log(this.data)
            var dataArr = [
                {
                    value: this.data.outsideGrass,
                    name: "草地",
                    itemStyle: {
                        normal: {
                            color: "#BCEB7F"
                        }
                    }
                },
                {
                    value: this.data.outsideBlackSoilProject,
                    name: "黑土滩",
                    itemStyle: {
                        normal: {
                            color: "#3D6D70"
                        }
                    }
                },
                {
                    value: this.data.outsideGrassWoodland,
                    name: "林草交错区",
                    itemStyle: {
                        normal: {
                            color: "#ebd47a"
                        }
                    }
                },
                {
                    value: this.data.outsideWaters,
                    name: "水域",
                    itemStyle: {
                        normal: {
                            color: "#5AD2FA"
                        }
                    }
                },
                {
                    value: this.data.outsideGrassWoodland,
                    name: "林地",
                    itemStyle: {
                        normal: {
                            color: "#8FBC8F"
                        }
                    }
                },
                {
                    value:  this.data.outsideBuildingBareLand,
                    name: "建筑/裸地",
                    itemStyle: {
                        normal: {
                            color: "#7A8DEB"
                        }
                    }
                }
            ];
            var dataArr1 = [
                {
                    value: this.data.insideGrass,
                    name: "草地",
                    itemStyle: {
                        normal: {
                            color: "#458F7B"
                        }
                    }
                },
                /* {
                    value: this.data.insideBuildingBareLand,
                    name: "黑土滩",
                    itemStyle: {
                        normal: {
                            color: "#458F7B"
                        }
                    }
                },
                 {
                    value: this.data.outsideGrassWoodland,
                    name: "林草交错区",
                    itemStyle: {
                        normal: {
                            color: "#458F7B"
                        }
                    }
                }, */
                {
                    value: this.data.insideWaters,
                    name: "水域",
                    itemStyle: {
                        normal: {
                            color: "#5AD2FA"
                        }
                    }
                },
                {
                    value: this.data.insideWoodland,
                    name: "林地",
                    itemStyle: {
                        normal: {
                            color: "#8FBC8F"
                        }
                    }
                },
                {
                    value: this.data.insideBuildingBareLand,
                    name: "建筑/裸地",
                    itemStyle: {
                        normal: {
                            color: "#7A8DEB"
                        }
                    }
                }
            ];
             let total = 0;
            dataArr.forEach(v => (total = v.value + total));
            console.log(this.data)
            let option = {
                title: [
                    {
                        text: this.data.sum,
                        left: "49%",
                        top: "25%",
                        textAlign: "center",
                        textBaseline: "middle",
                        textStyle: {
                            color: "#ffffff",
                            fontWeight: "normal",
                            fontSize: this.itemGap * 3.2
                        }
                    },
                    {
                        text: "总面积(km²)",
                        left: "50%",
                        top: "33%",
                        textAlign: "center",
                        textBaseline: "middle",
                        textStyle: {
                            color: "ffffff",
                            fontWeight: "normal",
                            fontSize: this.itemGap * 1.4
                        }
                    }
                ],
                legend: {
                    show: true,
                    bottom: this.itemGap * 3,
                    icon: "circle",
                    orient: "vertical",
                    itemWidth: 8,
                    itemHeight: 8,
                    //data: ['草地', '黑土滩', '水域', '建筑/裸地'],
                    formatter: name => {
                        let value = dataArr.filter(v => {
                            return v.name == name;
                        });
                         return name == '黑土滩' ? [
                            "{a|" + name + "}{b|" + value[0].value + "}{c||}{d|"
                            + (value[0].value / total * 100).toFixed(2) + "%(占比草地)}"].join("\n") :
                            [
                            "{a|" + name + "}{b|" + value[0].value + "}{c||}{d|"
                            + (value[0].value / total * 100).toFixed(2) + "%}"].join("\n");
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
                                width: this.itemGap * 8
                            },
                            c: {
                                color: "rgba(255, 255, 255, 0.12)",
                                align: "left",
                                fontSize: this.itemGap * 1,
                                width: this.itemGap * 5
                            },
                            d: {
                                color: "#427583",
                                align: "left",
                                fontSize: this.itemGap * 1.6,
                                width: this.itemGap * 12
                            }
                        }
                    }
                },
                series: [
                    {
                        type: "pie",
                        data: [100],
                        //z: 2,

                        radius: ["50%", "0%"],
                        center: ["50%", "30%"],
                        itemStyle: {
                            normal: {
                                color: "rgba(15,46,65,.8)"
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
                        radius: ["35%", "42%"],
                        center: ["50%", "30%"],
                        name: "",
                        type: "pie",
                        selectedOffset: this.itemGap * 1.6, //选中是扇区偏移量
                        startAngle: 90,
                        //z: 3,
                        color: ["#BCEB7F", "#3D6D70", "#5AD2FA", "#7A8DEB"],
                        labelLine: {
                            normal: {
                                show: false,
                                length: 30,
                                length2: 10,
                                lineStyle: {
                                    width: 2
                                }
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    fontSize: this.itemGap * 2.8
                                },
                                formatter: function (params) {
                                    return params.name + "\n" + params.value + "%";
                                }
                            }
                        },
                        data: dataArr
                    },
                    {
                        radius: ["0%", "30%"],
                        center: ["50%", "30%"],
                        name: "",
                        type: "pie",
                        selectedOffset: this.itemGap * 1.6, //选中是扇区偏移量
                        startAngle: 90,
                        //z: 3,
                        color: ["#458F7B", "#458F7B", "#5AD2FA", "#7A8DEB"],
                        itemStyle:{
                            borderColor:"#458F7B"
                        },
                        labelLine: {
                            normal: {
                                show: false,
                                length: 30,
                                length2: 10,
                                lineStyle: {
                                    width: 2
                                }
                            }
                        },
                        label: {
                            normal: {
                                show: false,
                                textStyle: {
                                    fontSize: this.itemGap * 2.8
                                },
                                formatter: function (params) {
                                    return params.name + "\n" + params.value + "%";
                                }
                            }
                        },
                        data: dataArr1
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
