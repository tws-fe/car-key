<template>
  <div class="apply">
       <div class="img_box">
            <img :src="imgUrl">
            <!-- <img src="../assets/police_car.png" alt=""> -->
            <div class="CarNumber">车牌号：{{CarNumber}}</div>
       </div>
       <div class="main">
           <div class="ly_cause">
               <div class="ly_cause_right">
           <el-select v-model="value" placeholder="选择借用事由" >
              <el-option v-if="options"
                v-for="item in options"
                :key="item.id"
                :label="item.remark"
                :value="item.remark">
              </el-option>
        </el-select>
               </div>
    
           </div>
           
           <div class="jytime">
               <div class="jytime_box2" style="margin-left:128px;">
                <div class="delbox"  @click="conputerhour(-1)">
                 
                </div>
                    <div>
                        <input class="jytime_hour" type="number" v-model="hour" @focus="fo('hour')" @blur="bl('hour')" />
                        <span class="jytime_txt">小时</span>
                        <div class="tishik" v-show="showhour">
                              <div style="margin-top:20px">
                                 <img src="../assets/gth.png">
                              </div>
                              <div style="margin-top:10px">
                                  请在键盘区域输入借用时间
                              </div>
                              <div>
                                 （小时不超过二十四小时）
                              </div>
                        </div>
                    </div>
                  <div class="addbox" @click="conputerhour(1)">
                 
                  </div>
               </div>
               <div class="jytime_box2" style="margin-left:46px;">
                    <div class="delbox"  @click="conputerday('del')">
                 
                    </div>
                    <div>
                        <input class="jytime_hour" type="number" v-model="day" @focus="fo('day')" @blur="bl('day')"  />
                        <span class="jytime_txt">天数</span>
                    </div>
                    <div class="tishik"  v-show="showday">
                              <div style="margin-top:20px">
                                 <img src="../assets/gth.png">
                              </div>
                              <div style="margin-top:12px;">
                                 请在键盘区域输入借用天数
                              </div>
                              <div>
                                 （天数不超过100天）
                              </div>
                        
                        </div>
                    <div class="addbox" @click="conputerday('add')">
                 
                    </div>            
               </div>
               <div class="crrow">
                  <img src="../assets/crrow.png">
               </div>
               <div class="statis">
                    <div>
                       <span>
                         <span style="color:white">借用时间：</span>
                         <span v-show="day!=0">{{day}}天</span>
                         {{hour}}小时
                         </span>
                   </div>
                    <div class="nextstep" @click="toVerify"></div>
               </div>
                 
           </div>

          
       </div>
    
  </div>
</template>
<style scoped>
  .img_box{
    width: 824px;
    height: 552px;
    position: absolute;
    top: 168px;
    left: 556px;
  }
  .img_box img{
    height: 456px;
    width: 100%;
    -webkit-box-reflect:below 0 -webkit-linear-gradient(transparent,transparent 70%,rgba(255,255,255,.3));
    font:bold 100px/1.231 georgia,sans-serif;
	  text-transform:uppercase;
  }
  .main{
    position: absolute;
    top: 730px;
    width: 100%
  }
  .ly_cause{
    display: flex;
    justify-content: left;
  }
   .xl{
    position: absolute;
    top: 60px;
    left: 0;
    width: 100%;
    background: white;
    height: 212px;
    overflow-y: auto    
  }
  .xl ul{
    padding: 0;
    margin: 0
  }
  .xl li{
    list-style: none;
    height: 53px;
    line-height: 53px;
    padding-left: 24px;
    color: #464e5a;
    font-size: 22px;
  }
  .xl_act{
    background: #5aa6df;
    color: white !important;
  }
  .ly_cause_right{
    box-shadow: 1px 1px 1px #10457e;
    border-radius: 8px;
    position: relative;
    width: 826px;
    margin-left: 555px;
    height: 54px;
  }
  .ly_cause_input{
    height: 52px;
    width: 654px;
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    border: none;
    border: 1px solid #1b79b5;
    float: left;
    padding-left: 17px;
    font-size: 30px;
    color: #464e5a;
  }
 
  .xl_icons{
    width: 52px;
    height: 54px;
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
    border: 1px solid #1b79b5;
    border-left: none;
    float: left;
    background: #e7e7e7;
    display:flex;
    justify-content: center;
    align-items: center 
  }
  .xl_icons img{
    width: 26px;
    height: 16px;
  }

  .jytime{
    height: 94px;
    font-size: 30px;
    color: white;
    clear: both;
    margin-top: 60px
  }
  .jytime_box1{
    float: left;
    color: white;
    font-size: 30px;
    height: 94px;
    line-height: 94px;
  }
  .jytime_box2{
    width: 390px;
    height: 94px;
    background: url(../assets/select.png);
    background-size: cover;
    float: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 5px;
    position: relative; 
  }
  .jytime_hour{
    width: 55px;
    background: #fff0;
    border: none;
    border-bottom: 2px solid #fff;
    outline: none;
    color: white;
    text-align: center;
  }
  .jytime_txt{
    letter-spacing: 19px;
    margin-left: 19px
  }
  .statis{
    overflow: hidden;
    display: flex;
    justify-content: left;
    align-items: center;
    margin-left: 600px;
    font-size: 34px;
    color: white;
    text-shadow: #3e3a3a 1.5px 2.5px 2px;
    height: 100%;
  }
  .statis span{
    color: #fa9e5b;
    
  }
  .statis img{
    width: 238px;
    height: 60px;
  }
  .tishik{
    background: url(../assets/tishi.png) no-repeat;
    background-size: cover;
    width: 278px;
    height: 168px;
    position: absolute;
    top: -150px;
    left: 20px;
    text-align: center;
    font-size: 18px;
    color: #04172c;
  }
  .tishik img{
    width:63px;
    height: 60px;
  }
  .delbox{
    width: 84px;
    height: 84px;
    border-radius: 50%;
    cursor: pointer;
    background: url(../assets/jx.png) no-repeat;
    background-size: cover;
  }
  .delbox:active{
    background: url(../assets/jx_active.png) no-repeat;
    background-size: cover;
  }
 .addbox{
    width: 84px;
    height: 84px;
    border-radius: 50%;
    cursor: pointer;
    background: url(../assets/add.png) no-repeat;
    background-size: cover;
  }
  .addbox:active{
    background: url(../assets/add_active.png) no-repeat;
    background-size: cover;
  }
  .nextstep{
   margin-left:106px;
   width: 238px;
   height: 58px;
   background: url(../assets/next2.png) no-repeat;
   background-size: cover;
   cursor: pointer;
  }
  .nextstep:active{
    background: url(../assets/next_active.png) no-repeat;
    background-size: cover;
  }
  .back{
   margin-left:43px;
   width: 238px;
   height: 58px;
   background: url(../assets/fh.png) no-repeat;
   background-size: cover;
   cursor: pointer;
  }
  .back:active{
    background: url(../assets/fh_active.png) no-repeat;
    background-size: cover;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
      -webkit-appearance: none !important;
      margin: 0;
  }
  .CarNumber{
    text-align: center;
    font-size: 30px;
    margin-top: 22px;
    color: white;
  }
  .crrow{
    float: left;
    margin-left: 42px;
    margin-right: 42px;
    margin-top: 28px;
  }
  
  
</style>
<style>
  .el-select{
    width:100%;
    height:100%;
    font-size: 30px;
  }
  .el-input{
    height: 100% ;
    font-size: 30px;
  }
  .el-input__inner{
    height: 100%;
  }
  .el-select .el-input__inner{
    font-size:1.2vw;
    
  }
  
  .el-input__icon{
    width:40px;
  }
  .el-select .el-input .el-select__caret{
    font-size:24px;
  }
</style>

<script>
import {mapMutations, mapState} from 'vuex'
import {url,fetch} from '../api'
import Vue from 'vue'
import {Select, Option, message } from 'element-ui'
const keybox = window.twsdevice.keybox
Vue.use(Select)
Vue.use(Option)
export default {
  name: 'Apply',
  // vue组件this实例化
  data() {
    return {
      btnLoading: false,
      showhour:false,
      showday:false,
      hour:1,
      day:0,
      options:null,
      CarNumber:null,
      value: '' //借用理由
    }
  },
  computed: {
    imgUrl () {
      // 正常流程需要先选择车辆，这里是为了开发过程的友好处理
      let selectCar = this.selectCar
      return selectCar ? selectCar.imageUrl : require('../assets/police_car.png')
    },
    ...mapState(['selectCar', 'reqData',])
  },
  created () { 
    if (process.env.VUE_APP_API === 'real') {
      console.log('调用keybox.readOutsideRfidData, 参数：null,null' )
      keybox.readOutsideRfidData(null, null)
    }
    this.getLists()

    // 保存相应的信息
    let selectCar = this.selectCar
    this.setReqData({
      isStatus: 1,
      carId: selectCar.id,
      orgId: selectCar.orgId,
      orgCode: selectCar.orgCode,
      remark: this.value,
      bhours: this.hour + this.day*24
    })
    this.CarNumber = selectCar.no
  },
  mounted () {
    this.setAppBgi('/static/txsybg.jpg')
    // document.querySelector('#app').style.backgroundImage = `url(${require('../assets/txsybg.jpg')})`
  },
  destroyed () {
    this.setAppBgi('/static/sy-bj.png')    
    // document.querySelector('#app').style.backgroundImage = `url(${require('../assets/sy-bj.png')})`   
  },
  methods: {
    ...mapMutations(['setAppBgi','setReqData', 'setRfids']),
    getLists () {
      fetch(url.borrowReason).then(res => {
        this.options = res.data.data
        // 默认选择第一个
        this.value = this.options[0].remark
      })
    },
    fo(obj){
       if(obj == "hour"){
           this.showhour = true;
       }else{
           this.showday = true;
       }
    },
    bl(obj){
     if(obj == "hour"){
           this.showhour = false;
           if(this.hour >23){
             this.hour = 23;
           }
           if(this.hour < 0){
            this.hour = 0;
           }
           this.hour = parseInt(this.hour);
       }else{
           this.showday = false;
           if(this.day >100){
             this.day = 100;
           }
           if(this.day < 0 || this.day==""){
            this.day = 0;
           }
           this.day = parseInt(this.day);
       }
    },
    conputerhour(num){
      if (this.hour <=0 && num < 0) return
      if (this.hour >=23 && num > 0) return
      this.hour += num
    },
    conputerday(obj){
      var day = this.day;
       if(obj == "add" && day <100){
           day++;
           this.day = day;
       }else if(obj == "del"  && day >0){
          day--;
          this.day = day;
       }
    },
    toVerify () {
      if (!this.value) {
        message({
          message: '请选择借用事由',
          type: 'error'
        })
        return
      }

      // 函数节流处理，按钮最好有loading状态
      if (this.btnLoading) return
      this.btnLoading = true

      let reqData = this.reqData
      fetch(url.keyChipInfo, {
        orgId: reqData.orgId,
        carId: reqData.carId
      }).then(res => {
        this.btnLoading = false

        let lists = res.data.data
        let data = lists[0]
        this.setReqData({
          deviceId: data.deviceId,
          keyId: data.keyId,
          boxNo: data.boxNo
        })

        // rfids拼接处理
        let rfids = []
        lists.forEach(item => {
          rfids.push(item.chipId)
        })
        this.setRfids(rfids.join(','))

        this.$router.push('verify')
      }).catch(error => {
        this.btnLoading = false
      })
    }
  }
}
</script>
