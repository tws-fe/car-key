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
  </div>
</template>

<script>
import anime from 'animejs'
import {url, fetch} from '../api'
import {mapState, mapMutations} from 'vuex'
const keybox = window.twsdevice.keybox

export default {
  name: 'home',
  computed: mapState(['reqData']),
  created () {
    keybox.readOutsideRfidData(window, this.readOutsideRfidCallback)
  },
  methods: {
    ...mapMutations(['setReqData']),
    readOutsideRfidCallback (state, data) {
      if (state === -100) {

      } 
      if (state === 100) {

        // todo：rfids获取和赋值
        let rfids = data.slice(1, data.length-1)
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
            userId: '',
            orgId: data.orgId,
            orgCode: data.orgCode,
            remark: data.remark
          })
          this.$router.push({name: 'backReact', query:{isRead: true}})
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
