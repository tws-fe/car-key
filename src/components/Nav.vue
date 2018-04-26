<template>
<div class="nav_box_container">
    <div class="nav_box">
        <div>
            <img class="jh" src="../assets/sy-jh.png" />
            <div class="nav_txt_box">
                <p class="nav_txt">{{$store.state.departData.departName}}</p>
                <img class="nax_txt_img" src="../assets/sy-xt.png" />
            </div>
        </div>
        <div class="nav_bj_box" v-if="isShow">
            <img class="nav_bj_img" src="../assets/top/top_user.png" />             
            <img class="nav_bj_img" src="../assets/top/top_set.png" />                   
        </div>
        <div class="nav_bj_box" v-else>
            <img class="nav_bj_img" src="../assets/top/top_back.png" @click="toBack"/>             
            <img class="nav_bj_img" src="../assets/top/top_home.png" @click="toHome"/> 
        </div>
    </div>
</div>
</template>

<script>
export default {
    data () {
        return {
            isShow: false
        }
    },
    created () {
        this.isShow = this.$route.name === 'home'
    },
    methods: {
        toBack () {
            this.$router.go(-1)
        },
        toHome () {
            this.$router.push('home')
        }
    },
    watch: {
        '$route.name': function(vale) {
            this.isShow = vale === 'home'
        }
    }
}
</script>

<style scoped lang="scss">
.nav_box_container {
    height: 132px;
    width: 100%;
}   
.nav_box{
    box-sizing: border-box;
    padding: 24px 86px 24px 50px;
    height: 84px;
    width: 100%;
    position: fixed;
    z-index: 9999;
    .jh {
        width: 82px;
        height: 84px;
    }
    .nav_txt_box {
        position: absolute;
        top: 24px;
        left: 148px;
        .nav_txt {
            font-size: 20px;
            color: #fff;
            margin-top: 18px;
            margin-bottom: 8px;
        }
        .nax_txt_img {
            width: 316px;
            height: 24px;
        }
    }
    .nav_bj_box{
        background-image: url(../assets/dh2.png);
        background-size: cover;
        width: 206px;
        height: 62px;
        border-radius: 32px;
        position: absolute;
        right: 86px;
        top: 24px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        .nav_bj_img {
            cursor: pointer;
            width: 36px;
            height: 36px;
            &:nth-of-type(1) {
                margin-left: 22px;
            }
            &:nth-of-type(2) {
                margin-right: 22px;
            }
        }
    }
}     
</style>
