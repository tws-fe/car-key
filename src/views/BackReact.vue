<template>
  <div class="back">
    <img class="down" src="../assets/back/back_down.png" alt="">
    <img class="key" src="../assets/back/back_key.png" alt="">
    <div class="timedown timedown_base">{{timedown}}秒</div>
    <div class="msg back_msg_base">请将钥匙放在感应区感应，等待柜门自动打开</div>
    <div class="progress_box" v-if="preReturnPercentage>=0&&preReturnPercentage<100">
      <el-progress  :text-inside="true" :stroke-width="28" :percentage="preReturnPercentage"></el-progress>
    </div>
    <div class="progress_box" v-if="returningPercentage>=0&&returningPercentage<100">
      <el-progress  :text-inside="true" :stroke-width="28" :percentage="returningPercentage"></el-progress>
    </div>
  </div>
</template>

<script>
import { message } from 'element-ui'
const keybox = window.twsdevice.keybox

export default {
  name: 'BackReact',
  data () {
    return {
      preReturnPercentage: -1, //归还钥匙，盒子移动进度
      returningPercentage: -1, //规划钥匙，盒子的打开进度
      timedown: 30,
      timer: null
    }
  },
  created () {
    this.readOutsideRfidHandler()
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
  },
  methods: {
    readOutsideRfidHandler () {
      keybox.readOutsideRfidData(window, this.readOutsideRfidCallback)
    },
    readOutsideRfidCallback (state, data) {
      let that = this
      if (state === -100) {
        message.error('连接rfid失败')
      } 
      if (state === 100) {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
        message({
          message: '读取到rfid信息',
          type: 'success',
          duration: 2000,
          onClose () {
            that.preReturnHandler()
          }
        })
        // todo：根据获取的data(一个rfid数组)去获取相关的boxNum和rfids
        // 上面onClose中的preReturnHandler在异步回调后处理
      }
    },
    preReturnHandler () {
      //归还钥匙的预处理，此指令会让转盘把指定的盒柜转到出口位置
      // todo: 盒柜号和设备id需要从后台获取，暂时没有这个字段
      let boxNum = '01'
      let rfids = 'aabbccddeeff,aabbccddeeff'
      keybox.preReturn(boxNum, rfids, window, this.preReturnCallback)
    },
    preReturnCallback (state, data) {
      if (state === -1) {
        message.error('盒子正在执行其他操作，不能执行本次指令')
      } else if (state === -100) {
        message.error('盒子中有钥匙，不能归还')
      } else if (state >= 0 && state <= 100) {
        this.preReturnPercentage = state
      }
    },
    returningHandler () {
      //归还钥匙,打开出口的盒子
      // todo: 盒柜号和设备id需要从后台获取，暂时没有这个字段
      let boxNum = '01'
      let rfids = 'aabbccddeeff,aabbccddeeff'
      keybox.returning(boxNum, rfids, window, this.returningCallback)
    },
    returningCallback (state, data) {
      if (state === -1) {
        message.error('盒子正在执行其他操作，不能执行本次指令')
      } if (state === -2) {
        message.error('盒子不在出口位置，不能执行')
      } else if (state === -100) {
        message.error('盒子中有钥匙，不能归还')
      } else if (state >= 0 && state <= 100) {
        this.returningPercentage = state
      }
    }
  },
  watch: {
    preReturnPercentage (val) {
      if (val === 100) {
        this.returningHandler()
      }
    },
    returningPercentage (val) {
      if (val === 100) {
        this.$router.push('backClose')
      }
    }
  }
}
</script>

<style scoped>
.progress_box {
  width: 1000px;
  position: absolute;
  bottom: 114px;
  left: 50%;
  transform: translateX(-50%);
}
.msg {
  bottom: 114px;
}
/* .timedown {
  top: 200px;
  left: 368px;
} */
.back {
  position: fixed;
  z-index: 10;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-image: url(../assets/back/back_bg.png);
  background-size: cover;
}
.down {
  position: absolute;
  top: 240px;
  left: 764px;
  animation: downmove 2s infinite;
}
@keyframes downmove {
  from {
    top: 240px;
  }
  to {
    top: 290px;
  }
}
.key {
  position: absolute;
  top: 380px;
  left: 1166px;
  animation: keymove 2s infinite;
}
@keyframes keymove {
  from {
    top: 380px;
  }
  to {
    top: 260px;
  }
}
</style>
