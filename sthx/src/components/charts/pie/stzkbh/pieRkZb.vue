<template>
  <div ref="myChart" class="myChart-wrapper">

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
          dataArr: [],
          title: [],
          color: [188, 235, 127],
          itemGap:30,
          legendHeight:0,
          itemWidth:15

        };
      }
    }
  },
  mounted() {
    this.initChart();
  },
  watch:{
    data:{
      handler: function (val, oldVal) {
        this.$nextTick(()=>{
          this.initChart();
        })
      },
      deep: true
    }
  },
  methods: {
    initChart() {
      var that = this;
      let dataArr=this.data.dataArr
      this.itemGap=parseInt(document.getElementsByTagName('html')[0].style['font-size'])
      this.myChart = echarts.init(this.$refs.myChart);


      let total=0
      dataArr.forEach(v=>total=parseInt(v.value)+total)
      let option = {
        title: [
        ],

        //color: ["#FF8888","#5599FF", "#31ada5", "#4cc2ff","#5eff7d", ],
        color: ["#32ec7c","#f6cf2f","#7a9df1", "#43dce8","#564AA3", "#4cc2ff", ],
        //color: [,,"#66FF66"],
        tooltip: {
          show: true,
          formatter: "{b} : {c} 万人 ({d}%)"
        },
        legend: {
          show: false,
          //itemGap: this.itemGap*2.8,
          itemGap: this.itemGap*3.0,
          top:'25%',
          left:'43%',
          right: "5%",
          icon: "circle",
          orient: "vertical",
          itemWidth: 8,
          itemHeight: 8,
          formatter: name => {
            let value = dataArr.filter(v => {
              return v.name == name;
            });
            return [
              //"{a|" + name + "}{b|" + ((value[0].value)/10000).toFixed(2) + "平方千米}{c||}{d|"+(value[0].value/total*100).toFixed(2)+"%}"
              "{a|   " + name + "}{b|                 " + parseInt(((value[0].value))).toFixed(0) +    "}{d|                           "+((parseInt(value[0].value))/total*100).toFixed(2)+"%}"
            ].join("\n");
          },
          textStyle: {
            rich: {
              a: {
                color: "#ffffff",
                align: "left",
                width:7*this.itemGap,
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
                width:this.itemGap*8,
                padding: [0, 5,0,0]
              },
              d: {
                color: "#a3f0eb",
                align: "center",
                fontSize: '1.6rem',
                width:this.itemGap*2,
              }
            }
          }
        },
        series: [
          {
            name: "",
            type: "pie",
            center: ["50%", "50%"],
            width:'100%',
            radius: ["10%", 85],
            roseType:'angle',
            max:20,
            labelLine: {
              show: true,
              length:8,
              length2:5
            },
            label:{
              color: "rgba(255,255,255)",
              fontWeight: 'bolder',
              fontFamily : '微软雅黑',
              fontSize: 12,
              //formatter: "{b}:{d}%"
              formatter: "{b} : "
                  +"\n {c} 万人({d}%)"
            },
            itemStyle: {
              emphasis: {
                opacity: 1,
              }
            },
            data: dataArr
          }
        ]
      };
      if (window.innerHeight<800) {
        option.legend.itemWidth=7
        option.legend.itemGap=10
      }
      this.myChart.setOption(option);
      this.myChart.on('click', function(params) {
        console.log(params);

        that.$emit('pieClick',{
          name:params.name
        });
      });

      window.addEventListener(
          "resize",
          () => {
            if (window.innerHeight<800) {
              this.legendHeight=0;
              this.itemGap=0
              option.legend.itemGap=10
              option.legend.itemWidth=7
            }else{
              this.itemGap=parseInt(document.getElementsByTagName('html')[0].style['font-size'])
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

.myChart-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

}
</style>
