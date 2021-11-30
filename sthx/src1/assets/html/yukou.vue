<template>
        <div>
            <video :id="'myVideo'+item.id" class="video-js">
                <source :src="list.src" type="video/mp4">
            </video>
        </div>
</template>

<script>
    import yukou from "../../assets/video/yukou.mp4"

    export default {
        name: "yukou",
        data(){
            return{
                list:[
                    {
                        src:yukou,
                        id:0,
                        pic:"",
                        name:"太平峪"
                    }
                ],
            }
        }

    }
</script>

<style scoped>

</style>