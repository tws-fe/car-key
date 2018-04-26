<template>
  <div class="suceess_box mask_base">
    <div class="timedown timedown_base">{{timedown}}秒</div>
    <div class="msg back_msg_base">钥匙归还成功，{{timedown}}秒后自动回到首页</div>
    <img class="suceess_img" src="../assets/back/backSuccess_police.png" alt="">
   </div>
</template>

<script>
export default {
  name: 'BackSuccess',
  data () {
    return {
      timedown: 3,
      timer: null
    }
  },
  created () {
    this.timer = setInterval(() => {
      this.timedown--
      if (this.timedown === 0) {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
        this.$router.push('home')
      }
    }, 1000)
  },
  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  }
}
</script>

<style scoped>
.msg {
  bottom: 126px;
}
.suceess_img {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.suceess_box {
  background-color: rgba(0,0,0,0.6);
}
</style>
