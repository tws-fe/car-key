<template>
  <div class="error_mask mask_base">
    <div class="error_box">
      <div class="error_title">
        温馨提示
      </div>
      <div class="error_msg">
        <img v-if="!state" src="../assets/verify/verify_error_tip.png" alt="">
        <img v-else src="../assets/back/verify_ok_tip.png" alt="">
        <p v-for="(msg,index) in msgs" :key="index" v-html="msg"></p>
      </div>
      <div class="error_btn_box">
        <div class="error_btn_line"></div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['msgs', 'state']
}
</script>

<style scoped>
.error_mask {
  display: flex;
}
.error_box {
  width: 790px;
  height: 516px;
  margin: auto;
  border-radius: 10px;
  overflow: hidden; 
  background-color: #d3dfed;
  position: relative;
}
.error_title {
  font-size: 24px;
  height: 66px;
  line-height: 66px;
  background-color: #4a9ee2;
  color: #fff;
  padding-left: 24px;
}
.error_msg {
  text-align: center;
}
.error_msg>img {
  width: 136px;
  height: 122px;
  margin-top: 54px;
}
.error_msg>p {
  font-size: 26px;
  margin: 0;
}
.error_msg>p:nth-of-type(1) {
  margin-top: 32px;
}
.error_msg>p:nth-of-type(2) {
  margin-top: 20px;
}
.error_btn_box {
  height: 112px;
  width: 100%;
  position: absolute;
  bottom: 0;
  display: flex;
  /* justify-content: center; */
}
.error_btn_line {
  width: 670px;
  height: 2px;
  background-image: url(../assets/verify/verify_line.png);
  margin: 0 auto;
  position: absolute;
  top: -2px;
  left: 60px;
}
.error_btn {
  margin: auto;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>

