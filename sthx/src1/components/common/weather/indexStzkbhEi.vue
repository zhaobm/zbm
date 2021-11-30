<template>
    <div class="weater" >
        <div class="inner" :class="[className,isActive]" @mouseover="mouseover" @mouseout="mouseout" @click="click()">
            <div class="name">{{name}}</div>
            <div class="value">{{value}}
              <span class="unite" >{{unite}}</span></div>
            <!--
                <slot></slot>
            -->
        </div>
    </div>
</template>
<script>
export default {
    name: "weater",
    props: {
        name: {
            type: String
        },
        value: {
            type: String
        },
        unite:{
            type:String
        }
    },
    data(){
        return{
            className:'',
            isActive:'',
        }
    },
    watch: {
        data: {
            handler: function (val, oldVal) {
                this.$nextTick(() => {
                   this.switchClass();
                })
            },
            deep: true
        }
    },
    methods:{
        switchClass(){
          //console.log(this.name);
          var newname = "";
          if(this.name == "EI2016" || this.name == "EI2017"|| this.name == "EI2018"|| this.name == "EI2019"|| this.name == "EI2020"){
            newname  = this.name.substring(0,2);
          }
          else if(this.name == "评价结果2016" || this.name == "评价结果2017"|| this.name == "评价结果2018"|| this.name == "评价结果2019"|| this.name === "评价结果2020"){
            newname  = this.name.substring(0,4);
          }
          else{
            newname  = this.name;
          }
          // if(this.name == "△EI")
          // console.log(this.name);
            switch (newname) {
              case "EI":
                this.className='icon1'
                break;
              case "评价结果":
                this.className='icon4'
                break;
              case "△EI":
                this.className='icon6'
                break;
              case "变化分级":
                this.className='icon5'
                break;
              default:
                    this.className=''
                    break;
            }
        },

        mouseover(){
            this.isActive = 'Active'
        },
        mouseout(){
            this.isActive = 'unActive'
        },
        click(){
            console.log("点击");
            this.$emit('switch',this.name);
        }
    },
    mounted(){
        this.switchClass()
    },
    components: {

    }
}
</script>
<style lang="scss" scoped>
    .weater{
        height: 100%;
        background-image: linear-gradient(0deg, rgba(173,255,250,0.01) 0%, rgba(117, 156, 255,0.03) 100%);
        border-radius: 6px;
        display: inline-block;
        margin:0 5px;
        flex:1;
        .inner{
          //width: 175px;
          //height:220px;
          width: 100%;
          height:100%;
            display: flex;
            flex-direction: column;
            background: url(../../../assets/images/icon-meteor-fengsu.svg) no-repeat;
            background-position: 50% 55%;
            background-size: 35% 35%;
            align-content: center;
            text-align: center;
            align-content: space-between;
            flex-direction: column;
            justify-content: space-between;
            transition: all 1s ease-in-out;
            .name{
                height: 3rem;
                line-height: 30px;
                font-family: PingFangSC-Regular;
                font-size: 1.8rem;
                color: rgba(255, 255, 255, 0.85);
                letter-spacing: 0;
                text-align: center;
                margin-top: 15px;
            }
            .value{
                display:flex;
                justify-content: center;
                height: 36px;
                line-height: 36px;
                font-family: Helvetica-Light;
                font-size: 1.8rem;
                color: #a3f0eb;
                letter-spacing: 0;
                align-items: baseline;
                margin-top: 75px;
                .unite{
                    margin-left: 5px;
                    font-size: 2.0rem;
                    color: #a3f0eb;
                }
            }
            &.icon1{
                background-image: url(../../../assets/images/stzkpj/ShiJian2016.svg);
            }
            &.icon2{
                background-image: url(../../../assets/images/stzkpj/ShiJian2017.svg);
            }
            &.icon3{
                background-image: url(../../../assets/images/stzkpj/BianHua.svg);
                //background-size: 30% 30%;
            }
            &.icon4{
                background-image: url(../../../assets/images/stzkpj/PingJia.svg);
            }
            &.icon5{
                background-image: url(../../../assets/images/stzkpj/FenJi.svg)
            }
            &.icon6{
              background-image: url(../../../assets/images/stzkpj/diff.svg)
            }
            &.icon7{
              background-image: url(../../../assets/images/stzkpj/jingji.svg)
            }
            &.icon8 {
            background-image: url(../../../assets/images/stzkpj/jinrong.svg)
            }
          &.icon9{
            background-image: url(../../../assets/images/stzkpj/renkou.svg)
          }
          &.icon10{
            background-image: url(../../../assets/images/stzkpj/renkouzhanbi.svg)
          }
            &.Active{
                background-size: 40% 40%;
                cursor: pointer;
                // &.icon3{
                //    background-size: 35% 35%;
                //}
                //&.icon4{
                //    background-size: 30% 30%;
                //}
            }

            &.unActive{
                background-size: 35% 35%;
                //&.icon3{
                //    background-size: 30% 30%;
                //}
                //&.icon4{
                //    background-size: 25% 25%;
                //}
            }
        }

    }
     @media screen and (max-height: 800px) {
        .weater {
            .inner{
                .name{
                    height: 16px;
                    line-height: 16px;
                    transform: scale(0.8);
                    margin-top:5px
                    }
                }
            }
    }
</style>

