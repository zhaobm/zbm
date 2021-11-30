<template>
    <div class="leftbox">
        <div class="head">
            <h3 v-if="title">{{title}}</h3>
        </div>
        <slot class="leftbox-content"></slot>
    </div>
</template>
<script>
export default {
    name: "leftbox",
    props: {
        title: {
            type: String
        }
    },
    components: {

    },
}
</script>
<style lang="scss" scoped>

    .leftbox{
        width: 100%;

        border:1px solid rgba(117,239,255,0.30);
        color: #fff;
        box-sizing: border-box;
        position: relative;
        padding: 5px;
        overflow: hidden;
        .head{
            width: 100%;
            display: flex;
            flex-direction: row;
            h3{
                padding: 0;
                margin:0;
                height: 26px;
                line-height: 26px;
                font-size: 1.6rem;
                font-weight: normal;
                text-indent: 10px;
                margin-bottom:10px;
                font-family: PingFangSC;
                font-weight: 300;
                font-style: normal;
                font-stretch: normal;
                letter-spacing: normal;
                color: #72dbd3;
              //color: #89d6f5;
                width:85%;
            }
        }

        .leftbox-content{
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
            left:1px;
            top:1px;
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
            right:1px;
            bottom:1px;
        }
        
    }
    @media screen and (max-height: 800px) {
    .leftbox {
       h3{
           line-height: 2rem;
           margin-bottom:0px;
       }
    }
}
</style>

