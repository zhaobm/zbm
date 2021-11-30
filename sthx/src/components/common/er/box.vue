<template>
    <div class="box">
        <h3 v-if="title">{{title}}</h3>
      <!--  <div class="buttomstyleleft"></div>-->
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
    .buttomstyleleft{
        background:url('../../../assets/er/images/you.png');
        background-size: 100% 100%;
        height: 36px; width: 36px;
        position: absolute; right: 0px; bottom: 0px
    }
    .box{
        width: 100%;
        margin-bottom: 1%;
        //background-color: rgba(8,49,84,0.30);
        //border:1px solid rgba(117,239,255,0.30);
        background:url("../../../assets/er/images/panel.png");
        background-size: 100% 100%;
        color: #fff;
        box-sizing: border-box;
        position: relative;
        display:flex;
        flex-direction: column;
        overflow: hidden;
        h3{
            padding: 0;
            margin:0;
            height: 45px;
            line-height: 45px;
            font-size: 1.5rem;
            text-indent: 20px;
            margin-bottom:10px;
            font-weight: 300;
            font-style: normal;
            font-stretch: normal;
            letter-spacing: normal;
            color: #fff;
            background: url("../../../../src/assets/images/banner1.png") no-repeat;
            background-size: cover;
        }
        .box-content{
            flex: 1;
            width: 100%;
            padding: 10px;
        }
       /* &::before{
            content: "";
            height: 12px;
            width: 12px;
            //border-top:2px solid #60DBD1;
            border-left:2px solid #60DBD1;
            box-sizing: border-box;
            position: absolute;
            left:-1px;
            top:-1px;
        }*/
        &::after{
            content: "";
            height: 12px;
            width: 12px;
            border-right:2px solid #60DBD1;;
            border-bottom:3px solid #60DBD1;;
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

