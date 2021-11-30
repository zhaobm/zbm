<template>
    <div class="hot-echart">
        <ul class='hot-warp'>
            <li v-for="(item,key) in hotData.seriseData" :key="item.id" class='hot-item'>
                <p class="first-span">{{item.name}}</p>
                <span  v-for="(v,k) in item.data" :key="v.id" class="item" :class="{active : k === item.index}">
                    {{v}}
                    <i class='tootip'>{{item.value}}</i>
                </span>
            </li>
            <li class='xAxis'>
                <p class="first-span"></p>
                <span v-for="(xAxis,key) in hotData.xAxis" :key="xAxis.id">{{xAxis}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
import tootip from "../../../assets/images/tooltip.png";
export default {
    name: "hot-echart",
    props: {
        hotData:{
            type:Object,
            default:()=>{
                return{
                    xAxis:[],
                    yAxis:[],
                    seriseData:[]
                }
            }
        }
    },
    data(){
        return{
            className:''
        }
    },
    methods:{

    },
    mounted(){

    },
    components: {

    }
}
</script>
<style lang="scss" scoped>
    .hot-echart{
        height: 100%;
        .hot-warp{
           padding: 0;
           box-sizing: border-box;
           margin: 0;
           background-image: linear-gradient(to top, rgba(173, 255, 250, 0.01), rgba(117, 255, 246, 0.03));
        }
        .hot-item{
            list-style: none;
            border-bottom: 1px dotted rgba(255, 255, 255, 0.5);
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding:3.6px 3px;
            box-sizing: border-box;
        }
        .first-span{
            color: rgba(117, 239, 255, 0.3);
            display: inline-block;
            min-width: 96px;
            margin: 0;
        }
        .hot-item span{
            display: inline-block;
            font-size: 1rem;
            color: rgba(255, 255, 255, 0.5);
            flex: 1;
            height: 1.2rem;
            min-width: 58px;
            text-align: center;
            &:nth-child(2){
                background-color: #5ea858;
                border-radius: 2px 0 0 2px;
            }
            &:nth-child(3){
                background-color: #007a6d;
            }
            &:nth-child(4){
                background-color: #269cbc;
            }
            &:nth-child(5){
                background-color: #176b9a;
            }
            &:nth-child(6){
                background-color: #644285;
            }
            &:nth-child(7){
                 background-color: #535b88;
                  border-radius: 0 2px 2px 0;
            }
        }
        .xAxis{
            list-style: none;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            padding:4px;
           span{
                font-family: PingFangSC;
                font-size: 1.2rem;
                text-align: center;
                color: rgba(255, 255, 255, 0.45);
                flex: 1;
                flex-wrap: nowrap;
                padding:2px 6px;
            }
        }
        .tootip{
            display: inline-block;
            width: auto;
            position: absolute;
            top: -25px;
            right: 8%;
            padding:5px 8px;
            background: url(../../../assets/images/tooltip.png) no-repeat center center;
            background-size: 100% 100%;
            z-index: 5;
            opacity: 0.8;
        }
        .item.active{
            position: relative;
        }
        .item.active::after{
            display: inline-block;
            content: '';
            position: absolute;
            width: 8px;
            height: 8px;
            right: 40%;
            top: 20%;
            border-radius: 8px;
            background:#fff;
            box-shadow: 0 0 20px rgba(255, 0, 0, 0.9);
        }
    }
</style>

