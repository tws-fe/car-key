<template>
  <div class="verify">
    <div class="inner">
      <div class="left">
        <div class="bg">
          <img class="bg_img" src="../assets/verify/verify_finger_bg.png" alt="">
          <img class="finger" src="../assets/verify/verify_finger.png" alt="">
          <div class="fingerprint">
            <img class="fingerprint_bg" src="../assets/verify/verify_fingerprint_bg.png" alt="">
            <div class="fingerprint_cover">
              <img class="fingerprint_default" src="../assets/verify/verify_fingerprint_default1.png" alt="">
              <div class="fingerprint_move_box">
                <img class="fingerprint_move" src="../assets/verify/verify_fingerprint_move1.png" alt="">
              </div>
              <div class="line"></div>
            </div>
          </div>
        </div>
        <div class="msg">
          <img src="../assets/verify/verify_finger_msg.png" alt="">
        </div>
      </div>
      <div class="right">
        <div class="bg">
          <img class="bg_img"  src="../assets/verify/verify_face.png" alt="">
          <p class="face_msg">请对准摄像头</p>
          <!-- 六边形容器，暂时不用屏蔽 -->
          <!-- 多div覆盖方案 -->
          <!-- <div class="face_img">
            <div class="face_img_cover">
              <div class="face_img_in1">
                <img class="face_img_in2" src="../assets/verify/verify_finger_bg.png" alt="">
              </div>
            </div>
          </div> -->
          <!-- clip-path方案 -->
          <!-- <img class="face_img_polygon" src="../assets/verify/verify_finger_bg.png" alt=""> -->
        </div>
        <div class="msg">
          <img src="../assets/verify/verify_face_msg.png" alt="">
        </div>
      </div>
    </div>
    <div class="time">
      <p class="timedown">{{timedown}}</p>
      <p class="timemsg">{{timedown}}秒后自动关闭此页面</p>
    </div>
    <modal-time v-if="preBorrowPercentage>=0&&preBorrowPercentage<100">
      <div class="BorrowMan">
            <span>借用人:&nbsp;{{selectCar.borrowUser}}</span>
            <span>车牌号:&nbsp;{{selectCar.no}}</span>
      </div>
      <div class="ProgressBar">
          <img src="../assets/verify/ProgressBar.gif">
      </div>
      <div class="prompt_txt">
        正在自动打开柜门，请稍候...
      </div>
    </modal-time> 
    <modal-time v-if="borrowingPercentage>=0&&borrowingPercentage<100">
       <div class="BorrowMan">
            <span>借用人:&nbsp;{{selectCar.borrowUser}}</span>
            <span>车牌号:&nbsp;{{selectCar.no}}</span>
      </div>
      <div class="ProgressBar">
          <img src="../assets/verify/ProgressBar.gif">
      </div> 
      <div class="prompt_txt">
        正在自动打开盒子，请稍候...
      </div>
    </modal-time> 

<!--    <error-mask v-show="showMask" :msgs="msgs">
      <div class="error_btn" @click="confirm"></div>
      <div class="error_btn" @click="cancel"></div>
    </error-mask> -->

    <router-view></router-view>
  </div>
</template>


<script>
import bus from '../modules/bus'
import {mapMutations, mapState} from 'vuex'
import Vue from 'vue'
import { message, Progress } from 'element-ui'
Vue.use(Progress)
import TakeAway from './TakeAway'
import ErrorMask from '../components/ErrorMask'
import ModalTime from '../components/ModalTime'
// import { fingerprint, fingerprintCallback } from '../modules/FingerprintExtension'
const fingerprint = window.twsdevice.fingerprint
const keybox = window.twsdevice.keybox

export default {
  name: 'Verify',
  data () {
    return {
      currentData: {}, //采集当前指纹的数据
      DBCacheObj: {}, //创建指纹库的返回值
      dbHandle: 0, //创建指纹库对应的句柄
      timedown: 60,
      timer: null,
      preBorrowPercentage: -1, //盒子转动的进度
      borrowingPercentage: -1, //打开盒子的进度
      showMask: true,
      msgs: ['指纹读头&nbsp;(&nbsp;人脸识别&nbsp;)&nbsp;读取不成功', '是否重新&nbsp;(&nbsp;识别&nbsp;)&nbsp;？']
    }
  },
  computed: mapState(['fingerInfo', 'rfids', 'reqData', 'selectCar']),
  created () {
    this.preBorrowHandler()
    // 流程step1: 启动指纹设备，监听回调
    // this.fingerprintHandler()
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
  mounted () {
    this.setAppBgi('/static/verify_bg.jpg')
    // document.querySelector('#app').style.backgroundImage = `url(${require('../assets/verify/verify_bg.jpg')})`
  },
  destroyed () {
    this.setAppBgi('/static/sy-bj.png')
    // document.querySelector('#app').style.backgroundImage = `url(${require('../assets/sy-bj.png')})`   
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }

    // 关闭指纹设备
    fingerprint.close()
  },
  methods: {
    ...mapMutations(['setAppBgi', 'setReqData']),
    cancel () {
      this.$router.push('keylist')
    },
    confirm () {
      this.timedown = 60
      this.showMask = false
    },
    fingerprintCallback(state, data) {
      console.log('启动指纹设备')
      if (state == 10) {
        console.log('设备打开成功');
      }else if(state == 11){
        console.log('设备已打开，无需重复的打开');
      }else if (state == 20) {
        // message({
        //   message: '采集到一枚指纹',
        //   duration: 2000          
        // })
        console.log('采集到一枚指纹')
        this.currentData = data
      }
    },
    fingerprintHandler () {
      // 启动指纹设备
      fingerprint.open(window, this.fingerprintCallback)
      // 创建指纹库
      this.DBCacheObj = fingerprint.DBCacheCreate()
      // 指纹库句柄
      this.dbHandle = this.DBCacheObj.dbHandle
      // 遍历后台返回的指纹数据，添加到指纹库
      this.fingerInfo.forEach(item => {
        // 获取指纹库记录数据
        let icount = fingerprint.DBCacheCount(this.dbHandle)
        fingerprint.DBCacheAdd(this.dbHandle, icount+1, item.fingerData.slice(3))
      })
    },
    preBorrowHandler () {
      console.log('keybox.preBorrow',this.reqData.boxNo, this.rfids)
      // 借用钥匙的预处理，此指令会让转盘把指定的盒柜转到出口位置
      keybox.preBorrow(this.reqData.boxNo, this.rfids, window, this.preBorrowCallback)
    },
    preBorrowCallback (state, data) {
      console.log('借用钥匙的预处理')
      let that = this
      if (state === -1) {
        message.error('盒子正在执行其他操作，不能执行本次指令')
      } else if (state === -100) {
        message.error('盒子中钥匙不存在')
      } else if (state === -200) {
        message.error('盒子中的钥匙的rfid与预期不符')
      } else if (state === 100) {
        console.log('盒子转出进度：', data)
        this.preBorrowPercentage = parseInt(data)
      }
    },
    borrowingHandler () {
      //立即打开出口的盒柜并领取钥匙，调用本方法前必须成功执行preBorrowKey
      keybox.borrowing(this.reqData.boxNo, this.rfids, window, this.borrowingCallback)
    },
    borrowingCallback (state, data) {
      console.log('打开盒柜')
      if (state === -1) {
        message.error('盒子正在执行其他操作，不能执行本次指令')
      } else if (state === -2) {
        message.error('盒子不在出口位置，不能执行')
      } else if (state === -100) {
        message.error('盒子中钥匙不存在')
      } else if (state === -200) {
        message.error('盒子中的钥匙的rfid与预期不符')
      } else if (state === 100) {
        console.log('盒柜打开进度: ', data)
        this.borrowingPercentage = parseInt(data)
      } else if (state === 200) { //钥匙已拿走(即没有检测到标签)
        bus.$emit('borrowingState', state)
      }
    }
  },
  watch: {
    currentData (val) {
      // 根据指纹模板查询对应的指纹ID
      let ret = fingerprint.DBCacheFindByTemplate(this.dbHandle, JSON.parse(val).template)
      // let ret = {
      //   status: 1
      // }
      if (ret.status === 1) {
        // 设置用户id
        this.setReqData({
          userId: this.fingerInfo[ret.fid-1].id
        })
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
        message({
          message: '指纹匹配成功',
          type: 'success',
          duration: 2000
        })
        // 流程step2：匹配到指纹，开启盒子转动
        this.preBorrowHandler()
      } else {
        message({
          message: '指纹不匹配',
          type: 'error'
        })
      }  
    },
    preBorrowPercentage (val) {
      if (val === 100) {
        // 流程step3: 盒子已转出，开启盒子打开
        this.borrowingHandler()
      }
    },
    borrowingPercentage (val) {
      if (val === 100) {
        // 流程step4: 盒子已打开，到取走钥匙界面
        // 2018.04.29  把takeAway修改为子路由了，到子路由时需要把定时器关掉
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
        this.$router.push('/verify/takeAway')
      }
    }
  },
  components: {
    ErrorMask,
    ModalTime
  }
}
</script>

<style scoped src="./Verify.css"></style>


