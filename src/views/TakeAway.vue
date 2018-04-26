<template>
 <div class="main_key">
    <img class="down" src="../assets/key/arrow_top.png">
      <div class="cupBoard">
          <img style="width:100%;" src="../assets/key/openbox.jpg">
          <div class="keybox">
               <img style="width:100%;" src="../assets/key/take_key.png">
          </div>
      </div>
      <div class="timedown timedown_base">{{timedown}}秒</div>
      <div class="msg back_msg_base">请在钥匙盒内取走钥匙，柜门{{timedown}}秒后自动关闭或手动关闭柜口</div>
  </div>
</template>
<style scoped>
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
    top: 280px;
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
    animation: keymove 3s infinite;
    opacity: 1;
  }
  @keyframes downmove {   
    from {    
      top: 320px;
      opacity: 0;
    }
    to {
      top: 280px;
      opacity: 1;
    }  
   
}

@keyframes keymove{
     from {    
      top: -100px;
      opacity: 0;
    }
    to {
      top: -300px;
      opacity:1;
    }  
}
.msg {
  bottom: 114px;
}
</style>

<script>
import {url, fetch} from '../api'
import {message} from 'element-ui'

const keybox = window.twsdevice.keybox
export default {
  name: 'TakeAway',
  data () {
    return {
      borrowedPercentage: -1,
      timedown: 60,
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
        this.borrowedHandler()
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
    borrowedHandler () {
      //领用完毕，立即关闭盒柜，调用本方法前必须成功执行borrowing
      // todo: 盒柜号和设备id需要从后台获取，暂时没有这个字段
      let boxNum = '01'
      let rfids = 'aabbccddeeff,aabbccddeeff'
      keybox.borrowed(boxNum, rfids, window, this.borrowedCallback)
    },
    borrowedCallback (state, data) {
      if (state === -1) {
        message.error('盒子正在执行其他操作，不能执行本次指令')
      } else if (state === -100) {
        message.error('盒子没有打开')
      } else if (state === -200) {
        message.error('钥匙没有领走')
      } else if (state === -300) {
        message.error('盒子中有钥匙，但盒子中的钥匙的rfid与预期不符')
      } else if (state === -400) {
        message.error('盒子中有未知的rfid卡片')
      } else if (state >= 0 && state <= 100) {
        this.borrowedPercentage = state
      } else if (state === 200) {
        // todo：获取各参数
        fetch(url.borrowAndReback, {
          isStatus: 1,
          keyId: '1523844972998100000',
          carId: 1,
          deviceId: '1523842068369100000',
          boxNo: 12312,
          userId: 19,
          remark: '',
          orgId: '440400100000',
          orgCode: '440400100000', 
          borrowReason: '',
          bhours: 1
          }).then(res => {
          this.$router.push('home')
        })
      }
    }
  },
  watch: {
    
  }
}
</script>