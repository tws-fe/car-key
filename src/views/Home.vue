<template>
  <div class="container">
    <div class="box" @click="handler('apply')">
      <p class="bg_img_box">
        <img class="bg_img" src="../assets/home/apply-key-pg.png" alt="" ref="apply">
      </p>
      <img class="key_txt" src="../assets/home/apply-key.png" alt="">
      <div class="move">
        <img class="moveup" src="../assets/home/apply-arrow.png" alt="">
      </div>
    </div>
    <div class="box" @click="handler('return')">
      <p class="bg_img_box">
        <img class="bg_img" src="../assets/home/return-key-bg.png" alt="" ref="return">
      </p>
      <img class="key_txt" src="../assets/home/return-key.png" alt="">
      <div class="move">
        <img class="movedown" src="../assets/home/return-arrow.png" alt="">
      </div>
    </div>
    <audio ref="readRfid">
      <source :src="host+'/static/readRfid.mp3'" type="audio/mpeg">
    </audio>
  </div>
</template>

<script>
import anime from 'animejs'
import {url, fetch} from '../api'
import {mapState, mapMutations, mapActions} from 'vuex'
import { message } from 'element-ui'
import projectConf from '../../project.config'
const host = process.env.VUE_APP_ENV === 'production'? projectConf.productionPath : ''
const keybox = window.twsdevice.keybox

export default {
  name: 'home',
  data () {
    return {
      host,
      keyByChipsLoading: false
    }
  },
  computed: mapState(['reqData', 'rfids']),
  created () {
    if (!sessionStorage.getItem('keyboxOpen')) {
      keybox.open(window, this.openCallback)
    } else {
      // 05.09首页的读芯片功能先屏蔽
      // keybox.readOutsideRfidData(window, this.readOutsideRfidCallback)
    }
    this.initDepartData()
  },
  methods: {
    ...mapMutations(['setReqData', 'setRfids', 'setBorrowData']),
    ...mapActions(['initDepartData']),
    readOutsideRfidCallback (state, data) {
      console.log('readOutsideRfidCallback: ', state, data)
      if (state === -100) {

      } 
      if (state === 100) {
        // 函数节流
        if (this.keyByChipsLoading) return
        this.keyByChipsLoading = true

        this.$refs['readRfid'].play()

        // 硬件js返回的data是string：'["AABBCCDDEEFFDD1122","sdf"]' ==> 'AABBCCDDEEFFDD1122,sdf'
        let rfids = data.slice(1, data.length-1).replace(/"/g,'')
        fetch(url.keyByChips, {
          deviceId: this.reqData.deviceId,
          chips: rfids
        }).then(res => {
          
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

          setTimeout(() => {
            this.keyByChipsLoading = false
            this.$router.push({name: 'backReact', query:{isRead: true}})
          }, 3000)          
        }).catch(err => {
          this.keyByChipsLoading = false
        })
      }
    },
    handler (ref) {
      let el = this.$refs[ref]
      anime({
        targets: el,
        width: '304px',
        height: '285px',
        duration: 300,
        complete: (anim) => {
          let path = ref === 'apply' ? '/keyList' : '/backReact'
          this.$router.push(path)
        }
      })
    },
    openCallback (state, data) {
      // console.log('open')
      if (state == 10) {
        message('设备打开成功')
        // console.log('设备打开成功')
        // console.log('调用keybox.readOutsideRfidData', window, this.readOutsideRfidCallback)
        // 05.09首页的读芯片功能先屏蔽
        // keybox.readOutsideRfidData(window, this.readOutsideRfidCallback)
        sessionStorage.setItem('keyboxOpen', state)
      } else if (state == 11){
        // message('设备已打开，无需重复的打开')
        console.log('设备已打开，无需重复的打开', state, data)
        // console.log('调用keybox.readOutsideRfidData', window, this.readOutsideRfidCallback)
        // 05.09首页的读芯片功能先屏蔽
        // keybox.readOutsideRfidData(window, this.readOutsideRfidCallback)
        sessionStorage.setItem('keyboxOpen', state)
      } else if (state == 30) {
        // message('设备已关闭')
        console.log('设备已关闭', state, data)
        sessionStorage.removeItem('keyboxOpen')
      } else if (state == -10){
        // message('设备打开失败，失败信息：'+data+'')
        console.log('设备打开失败，失败信息：'+data)
        sessionStorage.removeItem('keyboxOpen')        
      } else if (state == -30){
        // message('设备已关闭，不能重复关闭')
        console.log('设备已关闭，不能重复关闭', state, data)
        sessionStorage.removeItem('keyboxOpen')        
      } else if (state == -100){
        // message('设备已崩溃，不能正常使用')
        console.log('设备已崩溃，不能正常使用', state, data)
        sessionStorage.removeItem('keyboxOpen')        
      } else {
        // message('设备出现异常，错误码：'+state+', 错误信息：'+data+'')
        console.log('设备出现异常，错误码：'+state+', 错误信息：'+data+'')
        sessionStorage.removeItem('keyboxOpen')        
      }
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  position: relative;
  top: 132px;
  width: 1396px;
  height: 558px;
  margin: auto;
  .box {
    position: relative;
    float: left;
    text-align: center;
    background-image: url(../assets/home/home-bg.png);
    background-size: cover;
    width: 642px;
    height: 558px;
    &:last-of-type {
      margin-left: 110px;
    }
    .bg_img_box {
      margin-top: 90px;
      height: 300px;
      .bg_img {
        width: 320px;
        height: 300px;
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }
    .key_txt {
      width: 270px;
      height: 70px;
      margin-top: 6px;
    }
    .move {
      width: 150px;
      height: 204px;
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      overflow: hidden;
      .moveup, .movedown {
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
      }
    }
  }
}

.moveup {
  animation: arrowup 2s infinite;
}

.movedown {
  animation: arrowdown 2s infinite;
}

@keyframes arrowup {
  from {
    top: 204px;
  }
  to {
    top: 0;
  }
}
@keyframes arrowdown {
  from {
    top: 0;
  }
  to {
    top: 204px;
  }
}
</style>
