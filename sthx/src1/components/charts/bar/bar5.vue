<template>
  <div ref="myChart" class="myChart-wrapper"></div>
</template>

<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
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
          color: [188, 235, 127]
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
      function toPercent(point) {
        let str = Number(point * 10).toFixed(1);
        str += "%";
        return str;
      }
      let a =this.data.datafs,data1=[];
      //let b =this.data.datawh,data2=[];
      for( let i=0;i<a.length;i++){
          data1.push(a[i]*0.1< 1 ? a[i]*0.1 : 1 )
      }
      //for( let i=0;i<b.length;i++){
          //data2.push(b[i]*0.1< 1 ? b[i]*0.1 : 1)
      //}
      let option = {
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          },
          formatter: function(params) {
            var str = params[0].name + "<br>";
            params.forEach(function(v, i) {
              if (i == 3 || i == 1) {
                return;
              } else {
                str += v.seriesName + ": " + v.value + "平方千米" + "<br>";
              }
            });
            return str;
          }
        },
        legend: {
          show: true,
          data: ["地表面积"],
          left: "center",
          icon: "circle",
          itemWidth: 8,
          itemWidth: 8,
          textStyle: { color: "rgba(255,255,255,0.65)" }
        },
        grid: {
          left: "1%",
          right: "1%",
          bottom: "3%",
          top: "15%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          axisTick: {
            show: false,
            alignWithLabel: true,
            length: 5
          },
          axisLabel: {
            color: "rgba(255, 255, 255, 0.65)",
            fontSize: 12,
            padding: [0, 10, 0, 0]
          },

          axisLine: {
            show: true,
            lineStyle: {
              color: "rgba(255,255,255,.5)"
            }
          },
          data: this.data.xAxis
        },
        yAxis: {
          type: "value",
          name: "(平方千米)",
          offset: 0,
          nameTextStyle: {
            color: "rgba(255, 255, 255, 0.65)",
            fontSize: 12,
            textShadowColor: "#000",
            textShadowOffsetY: 0,
            padding: [5, 0, 0, 0]
          },
          position: "top",
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
        },
        series: [
          {
            name: "地表面积",
            type: "bar",
            stack: "总量",
            barWidth: 10,
            itemStyle: {
              normal: {
                //barBorderRadius:
                //borderColor: '#3fa7dc',
                color: "rgba(102,60,78,.9)",
                shadowBlur: 1,
                shadowColor: "rgba(102,60,78,.3)",
                shadowOffsetX: -2
              }
            },
            barGap: "0",
            data: this.data.datawh
          },
          {
            name: "总量",
            type: "bar",
            stack: "总量",
            itemStyle: {
              normal: {
                /*barBorderRadius: 10,*/
                //borderColor: '#ff8464',
                color: "#FF6675",
                shadowBlur: 1,
                shadowColor: "rgba(188,235,127,0.03)",
                shadowOffsetX: 20
              }
            },
            data: data1, //辅助
            barCategoryGap: "-10%",
            barMinHeight: 4
          },
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
