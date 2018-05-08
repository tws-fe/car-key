<template>
  <div class="suceess_box mask_base">
    <div class="timedown timedown_base">{{timedown}}秒</div>
    <div class="msg back_msg_base">
      {{$route.query.user}}，<span class="carno_color">{{$route.query.no}}</span>
      钥匙{{$route.query.isBorrow?'申请':'归还'}}成功，感谢您的使用&nbsp;！
    </div>
    <img class="suceess_img" src="../assets/back/backSuccess_police.png" alt="">
    <audio ref="applySuccess">
      <source :src="host+'/static/applySuccess.mp3'" type="audio/mpeg">
    </audio>
    <audio ref="backSuccess">
      <source :src="host+'/static/backSuccess.mp3'" type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
import projectConf from '../../project.config'
const host = process.env.VUE_APP_ENV === 'production'? projectConf.productionPath : ''
export default {
  name: 'Success',
  data () {
    return {
      timedown: 3,
      timer: null,
      host
    }
  },
  mounted () {
    if (!this.$route.query.isBorrow) {
      this.$route.meta.title = '首页 > 申请钥匙 > 钥匙申请成功'
      this.$refs['backSuccess'].play()
    } else {
      this.$refs['applySuccess'].play()
    }

    setTimeout(() => {
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
    }, 3000)

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
.carno_color {
  color: #ffaf16;
}
</style>
