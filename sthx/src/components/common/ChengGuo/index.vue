<template>
    <div class="weater" >
        <div class="inner" :class="[className,isActive]" @mouseover="mouseover" @mouseout="mouseout" @click="click()">
            <div class="value">{{value}}</div>
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
        },
        url:{
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
            switch (this.name) {
                case "PPT":
                    this.className='icon2'
                    break;
                case "Word":
                    this.className='icon5'
                    break;
                case "普查综合报告":
                    this.className='icon6'
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
            this.$emit('switch',this.url);
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
        background-image: linear-gradient(0deg, rgba(173,255,250,0.01) 0%, rgba(117,255,246,0.03) 100%);
        border-radius: 6px;
        display: inline-block;
        margin:0 5px;
        margin-left:26px;
        flex:1;
        .inner{
            width: 110px;
            height:155px;
            display: flex;
            flex-direction: column;
            background: url(../../../assets/images/icon-meteor-fengsu.svg) no-repeat;
            background-position: 50% -10%;
            background-size: 60% 60%;
            align-content: center;
            text-align: center;
            align-content: space-between;
            flex-direction: column;
            justify-content: space-between;
            transition: all 1s ease-in-out;
            .value{
                display:flex;
                justify-content: center;
                height: 60px;
                line-height: 15px;
                overflow: hidden;
                font-family: "Microsoft YaHei";
                font-size: 1.2rem;
                color: #a3f0eb;
                letter-spacing: 0;
                align-items: baseline;
                margin-top: 90px;
            }
            &.icon2{
                background-image: url(../../../assets/images/ppt.svg);
            }

            &.icon3{
                background-image: url(../../../assets/images/NongYeYuan.svg);
                background-size: 30% 30%;
            }

            &.icon4{
                background-image: url(../../../assets/images/JizhongShi.png);
                background-size: 25% 25%;
            }

            &.icon5{
                background-image: url(../../../assets/images/word.svg)
            }

            &.icon6{
                background-image: url(../../../assets/images/ShengHuoYuan.svg)
            }

            &.icon7{
                background-image: url(../../../assets/images/GongYeYuanQu.svg)
            }
            &.icon8{
                background-image: url(../../../assets/images/totalnumber.svg)
            }

            &.Active{
                background-size: 65% 65%;
                cursor: pointer;
            }

            &.unActive{
                background-size: 60% 60%;
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

