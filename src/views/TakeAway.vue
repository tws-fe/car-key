<template>
  <div class="main_key_container">
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
      <!-- todo:关闭盒子的进度条 -->
    </div>
  </div>
</template>
<style scoped>
.main_key_container {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background-image: url(/static/sy-bj.png);
  background-size: cover; 
}

  .main_key{
     width: 100%;
     height: 100%;
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
import bus from '../modules/bus'
import {mapState, mapMutations} from 'vuex'
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
  computed: {
    ...mapState(['reqData', 'rfids'])
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

    bus.$on('borrowingState', (state) => {
      if (state === 200) {
        if (this.timer) {
          clearInterval(this.timer)
          this.timer = null
        }
        this.borrowedHandler()
      }
    })
  },
  destroyed () {
    if (this.timer) {
      clearInterval(this.timer)
      this.timer = null
    }
  },
  methods: {
    ...mapMutations(['setReqData']),
    borrowedHandler () {
      //领用完毕，立即关闭盒柜，调用本方法前必须成功执行borrowing
      keybox.borrowed(this.reqData.boxNo, this.rfids, window, this.borrowedCallback)
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
        console.log(state)
      } else if (state === 200) {
        fetch(url.borrowAndReback, this.reqData).then(res => {
          this.$router.push({name: 'index'})
        })
      }
    }
  },
  watch: {
    
  }
}
</script>