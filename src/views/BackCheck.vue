<template>
  <div class="mask_base">
    <div class="timedown timedown_base">{{timedown}}秒</div>
    <div class="msg back_msg_base">系统在自动检验中...</div>
    <div class="scan_box">
      <img class="key" src="../assets/back/backCheck_key.png" alt="">
      <img ref="checkScan" class="scan" src="../assets/back/backCheck_scan.png" alt="">
    </div>
    <error-mask v-show="showMask" :msgs="msgs" :state="okState">
      <div v-if="msgIndex<=1" class="rescan error_btn" @click="reScan" ></div>
      <div v-if="msgIndex===2" class="suggest error_btn" @click="suggest"></div>
      <div v-if="msgIndex===3" class="tohome error_btn" @click="tohome"></div>
    </error-mask>
  </div>
</template>

<script>
import { circlePoint, keyframes } from '../modules/circlePoint'
import ErrorMask from '../components/ErrorMask'
let msgArr = [
  ['钥匙扫描验证&nbsp;(&nbsp;第一次&nbsp;)&nbsp;不成功，', '三次失败后请通知管理员'],
  ['钥匙扫描验证&nbsp;(&nbsp;第二次&nbsp;)&nbsp;不成功，', '三次失败后请通知管理员'],
  ['钥匙扫描验证&nbsp;(&nbsp;第三次&nbsp;)&nbsp;不成功，', '请通知管理员提交问题'],
  ['提交问题成功，点击按钮返回首页', '']
]
export default {
  name: 'BackCheck',
  data () {
    return {
      showMask: false,
      msgIndex: 2,
      timedown: 30,
      timer: null
    }
  },
  created () {
    this.timer = setInterval(() => {
      this.timedown--
      if (this.timedown === 0) {
        this.timedown = 30
      }
    }, 1000)
  },
  mounted () {
    let points = circlePoint()
    points.push(points[0])
    let animateStr = keyframes('keysearchmove', points)
    let style = document.createElement("style")
    style.innerText = animateStr
    document.head.appendChild(style)
    this.$refs['checkScan'].style.cssText += 'animation: keysearchmove 1.5s infinite;'
  },
  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  computed: {
    msgs () {
      return msgArr[this.msgIndex]
    },
    okState () {
      return this.msgIndex === 3
    }
  },
  methods: {
    reScan () {
      this.showMask = false
    },
    suggest () {
      this.msgIndex = 3
    },
    tohome () {
      this.$router.push('home')
    }
  },
  components: {
    ErrorMask
  }
}
</script>

<style scoped >
.mask_base {
  background-color: rgba(0, 0, 0, 0.3);
}
.msg {
  bottom: 126px;
}
.scan_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 492px;
  height: 502px;
}
.scan_box>img {
  position: absolute;
}
.scan {
  width: 100%;
  height: 100%;
}
.key {
  width: 350px;
  height: 350px;
}
.error_btn {
  width: 338px;
  height: 58px;
}
.rescan {
  background-image: url(../assets/back/backCheck_rescan_default.png);
}
.rescan:active {
  background-image: url(../assets/back/backCheck_rescan_click.png);
}
.suggest {
  background-image: url(../assets/back/backCheck_suggest_default.png);
}
.suggest:active {
  background-image: url(../assets/back/backCheck_suggest_click.png);
}
.tohome {
  background-image: url(../assets/back/backCheck_tohome_default.png);
}
.tohome:active {
  background-image: url(../assets/back/backCheck_tohome_click.png);
}
</style>
