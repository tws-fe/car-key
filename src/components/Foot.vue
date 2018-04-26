<template>
<div>
  <div class="foot">
    <p class="msg">
      {{this.$route.meta.title}}
    </p>
    <p class="msg">
      <span v-for="(list,index) in timeArr" :key="index">{{list}}&nbsp;&nbsp;</span>
    </p>
  </div>
</div>
</template>

<script>
const arr = ['日', '一', '二', '三', '四', '五', '六']
export default {
  data () {
    return {
      timeArr: null
    }
  },
  created () {
    setInterval(() => {
      this.formart(new Date())
    }, 1000)
  },
  methods: {
    formart (date) {
      let timeArr = date.toLocaleString('zh', {hour12:false}).split(' ')
      timeArr[0] = this.dateFormat(timeArr[0])
      timeArr.splice(1, 0, `星期${arr[date.getDay()]}`)
      this.timeArr = timeArr
    }
  }
}
</script>

<style scoped lang="scss">
.foot {
  position: fixed;
  z-index: 9999;
  bottom: 0;
  background-image: url('../assets/ddh.jpg');
  background-size: cover;
  width: 100%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: space-between;
}
.msg {
  display: inline-block;
  margin-top: 0;
  color: #fff;
  font-size: 22px;
  &:nth-of-type(1) {
    padding-left: 32px; 
  }
  &:nth-of-type(2) {
    padding-right: 88px;
  }
}
</style>
