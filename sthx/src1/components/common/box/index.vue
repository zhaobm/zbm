<template>
    <div class="box">
        <h3 v-if="title">{{title}}</h3>
       <slot name="subBtn"></slot>
       <slot name="content" class="box-content"></slot>
    </div>
</template>
<script>
export default {
    name: "box",
    props: {
        title: {
            type: String
        }
    },
    components: {

    }
}
</script>
<style lang="scss" scoped>
    .box{
        width: 100%;

        border:1px solid rgba(117,239,255,0.30);
        color: #fff;
        box-sizing: border-box;
        position: relative;
        display:flex;
        flex-direction: column;
        overflow: hidden;
        h3{
            padding: 0;
            padding-left: 10px;
            margin:0;
            height: 38px;
            line-height: 38px;
            font-size: 1.6rem;
            font-weight: normal;
            text-indent: 10px;
            margin-bottom:10px;
            font-family: PingFangSC;
            font-weight: 300;
            font-style: normal;
            font-stretch: normal;
            letter-spacing: normal;
            
            color: #fff;
            background: url("../../../../src/assets/images/banner1.png") no-repeat;
            background-size: cover;
            
            //color: #72dbd3;
        }
        .box-content{
            flex: 1;
            width: 100%;
        }
        &::before{
            content: "";
            height: 12px;
            width: 12px;
            border-top:2px solid #60DBD1;
            border-left:2px solid #60DBD1;
            box-sizing: border-box;
            position: absolute;
            left:-1px;
            top:-1px;
            //box-shadow:1px 1px 1px #60DBD1 inset;
        }
        &::after{
            content: "";
            height: 12px;
            width: 12px;
            border-right:2px solid #60DBD1;;
            border-bottom:2px solid #60DBD1;;
            box-sizing: border-box;
            position: absolute;
            right:-1px;
            bottom:-1px;
        }
    }
    @media screen and (max-height: 800px) {
    .box {
       h3{
           line-height: 2rem;
           margin-bottom:0px;
       }
    }
}
</style>

