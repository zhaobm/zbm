<template>
  <div ref="myChart" class="myChart-wrapper"></div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
require("echarts/lib/component/legend.js");
require("echarts/lib/component/tooltip.js");

// 引入柱状图组件
require("echarts/lib/chart/bar");
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
          seriesData: []
        };
      }
    }
  },
  mounted() {
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
    initChart() {
      this.myChart = echarts.init(this.$refs.myChart);
      console.log(this.data)
      let option = {
        legend: {
          show: true,
          data: ["罗天", "黑土地", "水域", "建筑/裸地",'林草交错区','林地'],
          left: "center",
          icon: "circle",
          itemWidth: 8,
          itemWidth: 8,
          textStyle: { color: "rgba(255,255,255,0.65)" }
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            shadowStyle: {
              color: "rgba(255,255,255,0.1)"
            },
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            //console.log(params)
            var str = params[0].name + "<br>";
            params.forEach(function(v, i) {
              str += v.seriesName + ": " + v.value  + "km²" + "<br>";
            });
            return str;
          }
        },
        grid: {
          left: 0,
          right: "12%",
          bottom: "3%",
          top: "20",
          containLabel: true
        },
        yAxis: [
          {
            type: "category",
            name: "(平方千米)",
            axisTick: {
              show: false,
              alignWithLabel: true,
              length: 5
            },
            axisLabel: {
              color: "rgba(255, 255, 255, 0.65)",
              fontSize: '1.2rem',
              padding: [0, 10, 0, 0]
            },
            inverse: "true", //排序
            axisLine: {
              show: true,
              lineStyle: {
                color: "rgba(255,255,255,.5)"
              }
            },
            data: this.data.xAxis
          }
        ],
        xAxis: [
          {
            type: "value",
            name: "(平方千米)",
            offset: 0,
            nameTextStyle: {
              color: "rgba(255, 255, 255, 0.65)",
              fontSize: 12,
              textShadowColor: "#000",
              textShadowOffsetY: 0,
              padding: [25, 0, 0, 0]
            },
            position: "bottom",
            axisTick: { show: false },
            axisLine: {
              show: false,
              lineStyle: {
                color: "#fff"
              }
            },
            axisLabel: {
              color: "rgba(255, 255, 255, 0.65)",
              fontSize: 12,
              padding: [0, 10, 0, 0]
            },
            splitLine: {
              show: true,
              lineStyle: {
                type: "dashed",
                color: "rgba(255,255,255,.1)"
              }
            }
          }
        ],
        series: [
          {
            name: "黑土地",
            type: "bar",
            stack: "one",
            color: ["#3D6D70"],
            barMaxWidth: 6,
            barCategoryGap: 30,
            itemStyle: {
              normal: {
                barBorderRadius: [30, 0, 0, 30],
                shadowBlur: 1,
                shadowColor: "rgba(188,235,127,0.02)",
                shadowOffsetY: 22
              },
              emphasis: {
                opacity: 1
              }
            },
            data: this.data.yAxisBlackSoilProject
            //y轴的值，通过 堆积得到。
            //例如：在一个垂直的柱子里显示2个堆积项，则由2个堆积项相加得到数值。
          },
          {
            name: "草地",
            type: "bar",
            stack: "one",
            //stack 是归类的意思。
            //例如：将stack:'one' 的归为一类。stack 后的参数，任意命名。
            color: ["#BCEB7F"],
            barMaxWidth: 6,
            barCategoryGap: 30,
            itemStyle: {
              normal: {
                barBorderRadius: [0, 30, 30, 0],
                shadowBlur: 1,
                shadowColor: "rgba(188,235,127,0.02)",
                shadowOffsetY: 22
              },
              emphasis: {
                opacity: 1
              }
            },
            data: this.data.yAxisGrass
          },

          {
            name: "水域",
            type: "bar",
            stack: "two",
            color: ["#5AD2FA"],
            barMaxWidth: 6,
            barCategoryGap: 30,
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                shadowBlur: 1,
                shadowColor: "rgba(188,235,127,0.02)",
                shadowOffsetY: 22
              },
              emphasis: {
                opacity: 1
              }
            },
            data:this.data.yAxisWaters
          },
          {
            name: "建筑/裸地",
            type: "bar",
            color: ["#7A8DEB"],
            barMaxWidth: 6,
            barGap: "200%",
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                shadowBlur: 1,
                shadowColor: "rgba(188,235,127,0.02)",
                shadowOffsetY: 22
              },
              emphasis: {
                opacity: 1
              }
            },
            data: this.data.yAxisBuildingBareLand
          },
          {
            name: "林草交错区",
            type: "bar",
            color: ["#458F7B"],
            barMaxWidth: 6,
            barGap: "200%",
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                shadowBlur: 1,
                shadowColor: "rgba(188,235,127,0.02)",
                shadowOffsetY: 22
              },
              emphasis: {
                opacity: 1
              }
            },
            data: this.data.yAxisGrassWoodland
          },
          {
            name: "林地",
            type: "bar",
            color: ["#8FBC8F"],
            barMaxWidth: 6,
            barGap: "200%",
            itemStyle: {
              normal: {
                barBorderRadius: 30,
                shadowBlur: 1,
                shadowColor: "rgba(188,235,127,0.02)",
                shadowOffsetY: 22
              },
              emphasis: {
                opacity: 1
              }
            },
            data: this.data.yAxisWoodland
          }
        ]
      };

      this.myChart.setOption(option);
      window.addEventListener(
        "resize",
        () => {
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
