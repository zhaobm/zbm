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
          dataArr: [
          ],
          title: [],
          color: [188, 235, 127],
          itemGap: 30,
          legendHeight: 0,
          itemWidth: 15
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
      const dataArr = this.data.dataArr
      this.itemGap = parseInt(
        document.getElementsByTagName("html")[0].style["font-size"]
      );
      this.myChart = echarts.init(this.$refs.myChart);
      let total = 0, titleNumber = '', numArr = [], minData = '';
      dataArr.forEach(v => {
        total = parseFloat(v.value) + parseFloat(total);
        numArr.push(v.value)
        minData = Math.min.apply(null, numArr);
        let vs = Number(v.value),ms = Number(minData)
        titleNumber = titleNumber +  Math.ceil(vs / ms)+ ':'
      });
      let option = {
        title: [
          {
            text: titleNumber.substring(0, titleNumber.length - 1),
            left: "19%",
            top: "33%",
            textAlign: "center",
            textBaseline: "middle",
            textStyle: {
              color: "#a3f0eb",
              fontWeight: "normal",
              fontSize: this.itemGap * 2.4
            }
          }
        ],
        color: ["#E6E15C", "#21AF7C","#BCEB7F",  "#E0515F", "#458F7B"],
        //color: [ "#E0515F","#BCEB7F","rgba(80, 189, 240)","#21af7c","rgba(56, 110, 228)"],
        /* tooltip: {
          show: true,
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        }, */
        legend: {
          show: true,
          itemGap: this.itemGap * 1.5,
          top: "5%",
          left:'35%',
          right: "5%",
          icon: "circle",
          orient: "vertical",
          itemWidth: 8,
          itemHeight: 8,
          formatter: name => {
            let value = dataArr.filter(v => {
              return v.name == name;
            });
            /* return [
              "{a|" + name + "}{b|" + value[0].value + "}{c||}{d|"
              + (value[0].value / total * 100).toFixed(2) + "%}"].join("\n"); */
              return [
                //"{a|" + name + "}{b|" + ((value[0].value)/10000).toFixed(2) + "万亩}{c||}{d|"+(value[0].value/total*100).toFixed(2)+"%}"
                "{a|    " + name + "}{b|          " + parseInt(((value[0].value))).toFixed(0) + "  }{d|                     "+(value[0].value/total*100).toFixed(2)+"%}"
            ].join("\n");
          },
          textStyle: {
            rich: {
              a: {
                color: "#ffffff",
                align: "left",
                width:5*this.itemGap,
                padding: [0, 5, 0, 0]
              },
              b: {
                color: "#a3f0eb",
                align: "left",
                fontSize: '1.2rem',
                width:this.itemGap*5,
                padding: [0, 5,0,0]
              },
              c: {
                color: "rgba(255, 255, 255, 0.12)",
                align: "center",
                fontSize:'1.6rem',
                width:this.itemGap*6,
                 padding: [0, 5,0,0]
              },
              d: {
                color: "#a3f0eb",
                align: "center",
                fontSize: '1.6rem',
                width:this.itemGap*8,
              }
            }
          }
        },
        series: [
          {
            name: "访问来源",
            center: ["20%", "35%"],
            type: "pie",
            data: [90],
            z: 1,
            radius: ["43%", "0%"],
            itemStyle: {
              normal: {
                color: "rgba(16,53,69,.9)"
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
            center: ["20%", "35%"],
            clockWise: false,
            radius: ["64%", "65%"],
            itemStyle: {
              normal: {
                label: {
                  show: false
                },
                labelLine: {
                  show: false
                },
                color: 'rgba(117, 239, 255, 0.3)',
                shadowBlur: 40,
                shadowColor: "rgba(40, 40, 40, 0.5)"
              }
            },
            hoverAnimation: false,
            data: [
              {
                value: 75,
                name: ""
              },
              {
                value: 25,
                name: "",
                itemStyle: {
                  normal: {
                    show: false,
                    color: "rgba(0,0,0,0.08)", //未完成的圆环的颜色
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
            center: ["20%", "35%"],
            radius: [0, "40%"],
            label: {
              normal: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                color: "rgba(16,53,69,.2)"
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
            center: ["20%", "35%"],
            radius: ["50%", "60%"],
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
      if (window.innerHeight < 800) {
        option.legend.itemWidth = 7;
        option.legend.itemGap = 10;
      }
      this.myChart.setOption(option);
      window.addEventListener(
        "resize",
        () => {
          if (window.innerHeight < 800) {
            this.legendHeight = 0;
            this.itemGap = 0;
            option.legend.itemGap = 10;
            option.legend.itemWidth = 7;
          } else {
            this.itemGap = parseInt(
              document.getElementsByTagName("html")[0].style["font-size"]
            );

          }

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
  position: relative;
  // &:after{
  //     display: inline-block;
  //     content:'';
  //     position: absolute;
  //     width: 170px;
  //     height:170px;
  //     left: 2px;
  //     top:12px;
  //     border:1px solid red;
  //     border-radius: 50%;
  // }
}
</style>
