<template>
  <div class="error_mask mask_base">
    <div class="error_box">
      <div class="error_title">
        温馨提示
      </div>
      <div v-if="!data.recording">
        <div class="validate_sucess">验证成功</div>
        <div class="prompt_txt">
            {{data.msg}}
          </div>
          <div class="ProgressBar">
            <img src="../assets/verify/ProgressBar.gif">
          </div>
          <div class="BorrowMan">
            <span>借用人:&nbsp;{{data.user}}</span>
            <span>车牌号:&nbsp;{{data.no}}</span>
        </div>
      </div>
      <div class="modal-container" v-if="data.recording">
        <div class="prompt_txt">
          系统正在记录，请稍候...
        </div>
        <div class="ProgressBar">
          <img src="../assets/verify/ProgressBar.gif">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style scoped>
.error_mask {
  display: flex;
}
>>> .error_box {
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
>>> .prompt_txt{
   text-align: center;
   font-size: 26px;
   color: #0C151E;
   margin-top: 52px
 }
 
>>> .ProgressBar{
  width: 100%;
  text-align: center;
  margin-top: 26px;
}
>>> .ProgressBar img{
  width: 550px;
  height: 32px;
}
>>> .BorrowMan{
  width: 550px;
  margin-left: 120px;
  font-size: 30px;
  color: #1f262f;
  display: flex;
  justify-content: space-between;
  margin-top: 55px;
}
.validate_sucess{
  text-align:center;
  color: #ec7d1a;
  font-size: 62px;
  margin-top: 64px;
}
.modal-container {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
</style>


