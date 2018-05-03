<template>
  <div class="back">
    <img class="down" src="../assets/back/back_down.png" alt="">
    <img class="key" src="../assets/back/back_key.png" alt="">
    <div class="timedown timedown_base">{{timedown}}秒</div>
    <div class="msg back_msg_base">请将钥匙放在感应区感应，等待柜门自动打开</div>

    <modal-time v-if="preReturnPercentage>=0&&preReturnPercentage<100"
      :data="{msg:'正在自动打开柜门，请稍候...', user:borrowData.userName, no:borrowData.carNo}">
   </modal-time>

    <modal-time v-if="returningPercentage>=0&&returningPercentage<100"
      :data="{msg:'正在自动打开盒子，请稍候...', user:borrowData.userName, no:borrowData.carNo}">
    </modal-time>

    <error-mask v-show="showMask" :msgs="msgs">
        <div class="error_btn_gyfalid" @click="reGo"></div>
    </error-mask>

    <router-view></router-view>
  </div>
</template>

<script>
import bus from '../modules/bus'
import {mapState, mapMutations} from 'vuex'
import { message } from 'element-ui'
import {url, fetch} from '../api' 
const keybox = window.twsdevice.keybox
import ErrorMask from '../components/ErrorMask'
import ModalTime from '../components/ModalTime'

export default {
  name: 'BackReact',
  data () {
    return {
      preReturnPercentage: -1, //归还钥匙，盒子移动进度
      returningPercentage: -1, //规划钥匙，盒子的打开进度
      timedown: 30,
      timer: null,
      showMask: false,
      errorCount: 0,
      msgs: ['钥匙感应（第一次）不成功', '二次失败将自动返回首页']
    }
  },
  computed: mapState(['reqData', 'rfids','selectCar', 'borrowData']),
  created () {
    // 如果是首页成功感应过来的，直接调用preReturnHandler
    if (this.$route.query.isRead) {
      this.preReturnHandler()
    } else {
      console.log('调用readOutsideRfidHandler')
      this.readOutsideRfidHandler()
    }
    this.timer = setInterval(this.goTime , 1000)
  },
  destroyed () {
    this.clearTime()
  },
  methods: {
    ...mapMutations(['setReqData', 'setRfids', 'setBorrowData']),
    clearTime () {
      if (this.timer) {
        clearInterval(this.timer)
        this.timer = null
      }
    },
    reGo () {
      this.showMask = false
      this.timedown = 30
      this.timer = setInterval(this.goTime , 1000)
    },
    goTime () {
      this.timedown--
      if (this.timedown === 0) {
        this.clearTime()
        this.$router.push('/home')
      }
    },
    readOutsideRfidHandler () {
      // console.log('调用keybox.readOutsideRfidData, 参数：', window, this.readOutsideRfidCallback)
      keybox.readOutsideRfidData(window, this.readOutsideRfidCallback)
    },
    readOutsideRfidCallback (state, data) {
      if (state === -100) {
        this.errorCount++
        if (this.errorCount === 2) {
          this.clearTime()
          this.$router.push('/home')
        }
        message.error('连接rfid失败')
        this.showMask = true
        this.clearTime()
      } 
      if (state === 100) {
        this.clearTime()
        message({
          message: '读取到rfid信息',
          type: 'success',
          duration: 2000
        })
        // 硬件js返回的data是string：'["AABBCCDDEEFFDD1122","sdf"]' ==> 'AABBCCDDEEFFDD1122,sdf'
        let rfids = data.slice(1, data.length-1).replace(/"/g,'')
        fetch(url.keyByChips, {
          deviceId: this.reqData.deviceId,
          chips: rfids
        }).then(res => {
          message.close()

          let data = res.data.data
          this.setReqData({
            isStatus: 2,
            keyId: data.id,
            carId: data.carId,
            boxNo: data.boxNo,
            userId: data.userId,
            orgId: data.orgId,
            orgCode: data.orgCode,
            remark: data.remark
          })

          this.setRfids(data.keyChips.map(item => {
            return item.chipId
          }).join(','))

          // 设置借用人和车牌号
          this.setBorrowData({
            userName: data.userName,
            carNo: data.carNo
          })

          this.preReturnHandler()
        })
      }
    },
    preReturnHandler () {
      //归还钥匙的预处理，此指令会让转盘把指定的盒柜转到出口位置
      console.log('调用keybox.readOutsideRfidData, 参数：null,null' )
      // 模拟调试时屏蔽，上线时需要打开，用env变量来判断处理
      if (process.env.VUE_APP_API === 'real') {
        keybox.readOutsideRfidData(null, null)
      }
      setTimeout(() => {
        console.log('调用keybox.preReturn')
        keybox.preReturn(this.reqData.boxNo, this.rfids, window, this.preReturnCallback)
      }, 100)
    },
    preReturnCallback (state, data) {
      if (state === -1) {
        message.error('盒子正在执行其他操作，不能执行本次指令')
      } else if (state === -100) {
        message.error('盒子中有钥匙，不能归还')
      } else if (state === 100) {
        console.log('preReturn-state: ', state, ' data: ', data)
        this.preReturnPercentage = parseInt(data)
      }
    },
    returningHandler () {
      console.log('调用keybox.returning')
      //归还钥匙,打开出口的盒子
      keybox.returning(this.reqData.boxNo, this.rfids, window, this.returningCallback)
    },
    returningCallback (state, data) {
      if (state === -1) {
        message.error('盒子正在执行其他操作，不能执行本次指令')
      } if (state === -2) {
        message.error('盒子不在出口位置，不能执行')
      } else if (state === -100) {
        message.error('盒子中有钥匙，不能归还')
      } else if (state === 100) {
        this.returningPercentage = parseInt(data)
        console.log('returning-state: ', state, ' data: ', data)
      } else if (state === 200) { //检测到钥匙已放入
        console.log('returning-state: ', state)
        bus.$emit('returningState', state)
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
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
        this.$router.push('/backReact/backClose')
      }
    }
  },
  components: {
    ErrorMask,
    ModalTime
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
