<template>
  <div class="main_key">
    <img class="down" src="../assets/key/arrow.png">
      <div class="cupBoard">
          <img style="width:100%;" src="../assets/key/openbox.gif">
          <div class="keybox">
               <img style="width:100%;" src="../assets/key/back_key.png">
          </div>
      </div>
      <div class="timedown timedown_base">{{timedown}}秒</div>
      <div class="msg back_msg_base">请把钥匙放到盒内关闭柜门</div>
  </div>
</template>
<style>
  .main_key{
     width: 100%;
     height: 100%;
     position: fixed;
     top: 0;
     left: 0;
     background: url(../assets/key/bg02.png) no-repeat;
     background-size: cover;
  }
  .cupBoard{
    position: absolute;
    top: 376px;
    right: 399px;
    width: 457px;
    height: 280px;
  }
  .down{
    width: 83px;
    height: 108px;
    top: 240px;
    left: 795px;
    animation: downmove 2s infinite;
    position: absolute;
    z-index: 10
  }
  .keybox{
    width: 300px;
    height: 242px;
    position: absolute;
    right: 0;
    top: -300px;
    animation: keymove 4s infinite;
    opacity: 0;
  }
  @keyframes downmove {   
    from {    
      top: 240px;
      /* transform: translateY(240px); */
      opacity: 0;
    }
    to {
      top: 290px;
      /* transform: translateY(290px); */
      opacity: 1;
    }  
   
}

@keyframes keymove{  
  0%{
    top: -300px;
    /* transform: translateY(-300px); */
    opacity: 0;
  }
  60%{
    top: -300px;
    /* transform: translateY(-300px); */
    opacity:0;
  }
  100%{
    top: -100px;
    /* transform: translateY(-100px); */
    opacity: 1;
  } 
 
}
.msg {
  bottom: 114px;
}

</style>
<script>
import {mapState} from 'vuex'
import { message } from 'element-ui'
const keybox = window.twsdevice.keybox

export default {
  name: 'BackClose',
  data () {
    return {
      returnedPercentage: -1,
      timedown: 30,
      timer: null
    }
  },
  computed: mapState(['reqData', 'rfids']),
  created () {
    this.returnedHandler()
    this.timer = setInterval(() => {
      this.timedown--
      if (this.timedown === 0) {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
        // this.$router.push('home')
      }
    }, 1000)
  },
  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  methods: {
    returnedHandler () {
      //钥匙归还，关闭盒子
      keybox.returned(this.reqData.boxNo, this.rfids, window, this.returnedCallback)
    },
    returnedCallback (state, data) {
      if (state === -1) {
        message.error('盒子正在执行其他操作，不能执行本次指令')
      } else if (state === -100) {
        message.error('盒子没有打开')
      } else if (state === -300) {
        message.error('盒子中有钥匙，但rfid不符合预期')
      } else if (state === -400) {
        message.error('盒子中有未知的rfid卡片')
      } else if (state >= 0 && state <= 100) {
        this.returnedPercentage = state
      } else if (state === 200) {
        fetch(url.borrowAndReback, this.reqData).then(res => {
          this.$router.push('backSuccess')
        })
      }
    }
  }
}
</script>
