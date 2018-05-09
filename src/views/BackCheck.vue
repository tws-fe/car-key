<template>
  <div class="mask_base">
    <div class="timedown timedown_base">{{timedown}}秒</div>
    <div class="msg back_msg_base">系统在自动检验中...</div>
    <img class="key" src="../assets/back/backCheck_key.png" alt="">
    <div class="scan_box">
      
      <img ref="checkScan" class="scan" src="../assets/back/backCheck_scan.png" alt="" >
    </div>
    <error-mask v-show="showMask" :msgs="msgs" :state="okState">
      <div v-if="msgIndex<=1" class="rescan error_btn" @click="reScan" ></div>
      <div v-if="msgIndex===2" class="suggest error_btn" @click="suggest"></div>
      <div v-if="msgIndex===3" class="tohome error_btn" @click="tohome"></div>
    </error-mask>
    <div class="ScrollText">
          <div class="ScrollText_main" ref="scrollText">
                 <div style="text-align:right;font-size:24px;color:#fff">钥匙自动核实中</div>
                 <div style="margin-top:42px">
                   <span style="font-size:30px;margin-left:230px;color:#fff">正在进行扫描</span>
                   <span style="font-size:24px;margin-left:178px;color:#fff">钥匙异常</span>
                 </div>
                 <div style="margin-top:58px">
                   <span style="font-size:30px;margin-left:58px;color:#fff">钥匙损坏</span>
                   <span style="font-size:30px;margin-left:248px;color:#fff">异物排查</span>
                   <span style="font-size:30px;margin-left:320px;color:#fff">无物品</span>
                </div>
                 <div style="margin-top:84px">
                    <span style="font-size:24px;margin-left:340px;color:#fff">钥匙自动核实</span>
                    <span style="font-size:24px;margin-left:200px;color:#fff">钥匙是否放入</span>
                 </div>
          </div>
    </div>
    <div class="zhezao">
  
    </div>
  </div>
</template>

<script>
import bus from '../modules/bus'
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
      msgIndex: -1,
      timedown: 30,
      timer: null
    }
  },
  created () {
    bus.$on('checkError', (state) => {
      this.msgIndex++
      this.showMask = true
      this.$refs['checkScan'].style.animationPlayState = 'paused'
      this.$refs['scrollText'].style.animationPlayState = 'paused'
    })

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
      this.$refs['checkScan'].style.animationPlayState = 'running'
      this.$refs['scrollText'].style.animationPlayState = 'running'
    },
    suggest () {
      this.msgIndex = 3
    },
    tohome () {
      this.$router.push('/home')
    }
  },
  components: {
    ErrorMask
  }
}
</script>

<style scoped>
   .ScrollText{
     position: relative;
     width: 740px;
     height: 500px;
     overflow: hidden;
     /*box-shadow:0 0 30px 10px rgba(255,255,255,.7) inset;*/
     left: 620px;
     top: 300px;
     border-radius: 100px
   }
   .ScrollText_main{
     position: absolute;
     width:1400px;
     height: 498px;
     left: -1400px;
     top: 0px;
     color: white;
     animation: 8s rowup linear infinite normal; 
   }

   @keyframes rowup {
    0% {
        transform: translateX(0);
    }
    100% {
        transform: translateX(1400px);
    }
}
.zhezao{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: url(../assets/verify/zez.png);
  background-size: cover;
}
.mask_base{
  background-color: rgba(0,0,0,0) !important;
}
</style>

<style scoped >
.mask_base {
  background-color: rgba(0, 0, 0, 0.3);
}
.msg {
  bottom: 126px;
  z-index: 10;
}
.scan_box {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 492px;
  height: 502px;
  z-index: 10;
}
.scan_box>img {
  position: absolute;
  z-index: 10;
}
.scan {
  width: 100%;
  height: 100%;
}
.key {
  width: 350px;
  height: 350px;
  position: absolute;
  top:270px;
  left:722px;

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
