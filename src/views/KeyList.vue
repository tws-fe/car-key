<template>
  <div >
    <div class="swiper-container" v-if="lists">
      <div class="swiper-wrapper" >
        <div class="swiper-slide"  v-for="(item,index) in lists" :key="index">
          <div class="car_box_container">
            <div class="car_box" 
              :class="{'car_box_able':list.borrowStatus!=1}"
              :style="{'background-color':list.borrowStatus==1?'#fff':'#0368ba'}" 
              v-for="list in item" 
              :key="list.id" 
              @click="choose(list)">
              <div class="car_box_img">
                <img :src="list.imageUrl">
                <div class="zhezao flex" v-show="list.borrowStatus==1">
                  <div>点击查看详情</div>
                </div>
              </div>
              <div class="flex_space car_box_bot" :style="{'color':list.borrowStatus==1?'#000':'#fff'}">
                <table style="width:100%">
                    <tr style="height:30px; line-height:30px">
                      <td style="text-align:right">车牌号：</td>
                      <td style="text-align:left">{{list.no}}</td>
                      <td>品牌：{{list.modelName}}</td>         
                    </tr>
                    <tr style="height:30px;line-height:30px">
                      <td style="text-align:right">类型：</td>
                      <td style="text-align:left">{{list.typeName}}</td>
                      <td>座位：{{list.seat}}个</td>                
                    </tr>
                </table>
              </div>
             
              <div class="kj" :style="{'background':list.borrowStatus==1?'#e85744':'#0374be'}">
                <span v-show="list.borrowStatus==1">已借出&nbsp;{{list.overtime?'|&nbsp;超时'+list.overtime:''}}</span>
                <span v-show="list.borrowStatus!=1">可借</span>
              </div>                  
            </div>
          </div> 
        </div>  
      </div>
      <!-- Add Arrows -->
      <div class="swiper-button-next" v-if="lists.length>1"></div>
      <div class="swiper-button-prev" v-if="lists.length>1"></div>
      <!-- Add Pagination -->
      <div class="swiper-pagination"></div>
    </div>

    <!--未归还弹框-->
    <div class="back_tanmu flex" v-if="showPop" @click="showPop=false">
       
      <div class="backreturn">
        <div class="kj" style="background:red">
             已借出&nbsp;{{activeList.overtime?'|&nbsp;超时'+activeList.overtime:''}}  
       </div>  
         
            <div class="close_img" @click="showPop=false">
                <img src="../assets/gb.png">
            </div>
        <!--
          <div class="back_header flex_space">
            <div class="back_header_left">
              <img src="../assets/gt.png">
              <span>车辆信息</span>
            </div>
            <div class="back_header_right" @click="showPop=false">
              <img src="../assets/gb.png">
            </div>
          </div>
      -->

          <div class="back_car">
            <div class="backcar_box_img">
              <img :src="activeList.imageUrl">
              <div class="ly_man">
                  领用人：{{activeList.borrowUser}}
              </div>
            </div>
            <div class="flex_space car_box_bot" >
              <table id="cat_table" style="width:100%">
                <tbody>
                  <tr>
                    <td class="td_right">车辆类型：</td>
                    <td>{{activeList.typeName}}</td>
                    <td class="td_right">领用时间：</td>
                    <td>{{toDateString(activeList.borrowDate)}}</td>
                  </tr>
                  <tr>
                    <td class="td_right">车牌号码：</td>
                    <td>{{activeList.no}}</td>
                    <td class="td_right">预计归还时间：</td>
                    <td>{{toDateString(activeList.rebackDate)}}</td>
                  </tr>
                  <tr>
                    <td class="td_right">品牌型号：</td>
                    <td>{{activeList.modelName}}</td>
                    <td class="td_right">座位：</td>
                    <td>{{activeList.seat}}个</td>
                  </tr>
                </tbody>
              </table>            
            </div>
          </div>
      </div>
    </div>
    <!--违归还弹框结束-->   
  </div>
</template>

<script>
import {url,fetch} from "../api"
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.min.css'
export default {
  name: 'KeyList',
  data () {
    return {
      lists: null,
      activeList: null,
      showPop: false
    }
  },
  created() {
    this.getLists()
  },
  methods: {
    getLists() {
      fetch(url.carInfo, {
        orgId: this.$store.state.departData.departId
      }).then(res => {
        let lists = res.data.data
        this.reqHandler(lists)
      })
      .catch(err => {
        // let data = require('../mock')
        // this.reqHandler(data.default.data.data)
      })
    },
    overtimeString (date) {
      let now = new Date().getTime()
      let over = now - date
      let days = parseInt(over / (1000 * 60 * 60 * 24))
      if ( days > 0) {
        return days + '天'
      }
      let hours = parseInt(over / (1000 * 60 * 60))
      if (hours > 0) {
        return hours + '小时'
      }
      let minutes = parseInt(over / (1000 * 60))
      if ( minutes > 0 ) {
        return minutes + '分钟'
      }
      // 未超时
      return ''
    },
    reqHandler (lists) {
      lists.forEach(item => {
        if (item.borrowStatus === 1) {
          item.overtime = this.overtimeString(item.rebackDate)
        }
        // 真实环境下需要拼接imgHost
        if (!item.imageUrl.startsWith('http')) {
          item.imageUrl = this.$store.state.imgHost + item.imageUrl
        }
      })
      this.lists = []
      // 计算页码
      let pages = 0
      if (lists.length <= 8) {
        pages = 1
      } else {
        pages = Math.round(lists.length/8)
      }
      for (let index = 0; index < pages; index++) {
        this.lists.push(lists.slice(index*8,index*8+8))
      }
      let options = {}
      if (pages > 1) {
        options = {
          pagination: {
            el: '.swiper-pagination',
            clickable: true
          },
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          }
        }
      }
      this.$nextTick(() => {
        new Swiper('.swiper-container', options)

        //解决swiper-pagination-bullet没有css作用域的问题
        // let dom = document.querySelector('.swiper-pagination')
        // let attrs = Object.values(dom.attributes)
        // let index = attrs.findIndex(item => {
        //   return item.name.startsWith('data-v-')
        // })
        // dom.querySelectorAll('span').forEach(item => {
        //   item.setAttribute(attrs[index].name, '')
        // })
      })
    },
    choose (list) {
      if (list.borrowStatus === 1) {
        this.showPop = true
        this.activeList = list
        return
      }
      this.$store.commit('setSelectCar', list)
      this.$router.push({name: 'apply', query: {}})
    },
    toDateString (date) {
      let arr = new Date(date).toLocaleString('zh', {hour12:false}).split(' ')
      arr[0] = this.dateFormat(arr[0])
      return arr.join(' ')
    }
  }
}
</script>
<style>
/* .swiper-pagination-bullet {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #fff;
  opacity: 1;
}
.swiper-pagination-bullet-active {
   background-color: #007aff;
}  */
</style>

<style scoped>
>>> .swiper-pagination-bullet {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background-color: #fff;
  opacity: 1;
}
>>> .swiper-pagination-bullet-active {
   background-color: #007aff;
} 
.swiper-container {
  overflow: unset;
}
.swiper-slide {
  text-align: center;
  /* margin: 0 auto; */
}
.swiper-pagination {
  position: fixed;
  bottom: 80px;
}
.swiper-button-next {
  background-image: url('../assets/next.png');
}
.swiper-button-prev {
  background-image: url('../assets/prev.png');
}
.swiper-button-next, .swiper-button-prev {
  background-size: cover;
  width: 76px;
  height: 106px;
}
.car_box_container {
  width: 1520px !important;
  position: relative;
  left: 50%;
  transform: translate(-50%);
}

.flex {
  display: flex;
  justify-content: center;
  align-items: center;
}
/* .flex_space {
  display: flex;
  justify-content: center;
  align-items: center;
} */
/* .car {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 0.75vw;
  margin-top: 20px;
  flex-wrap: wrap;
} */
.car_box {
  background: #0368ba;
  padding: 10px;
  width: 332px;
  height:327px;
  margin: 0 12px;
  cursor: pointer;
  position: relative;
  margin-top: 62px;
  display: inline-block;
  float: left;
  box-shadow: 2px 3px 8px rgba(0,49,109,.6), inset 1px 1px 1px rgba(255,255,255,.1), inset 0 0 rgba(255,255,255,.17);
}

.car_box_able {
  background-image: url(../assets/keylist/carlist_bg.jpg);
  background-size: cover;
}

.back_carbox {
  background: white;
  color: #000;
  padding: 10px;
  width: 100%;
  margin: 0 20px;
  cursor: pointer;
  position: relative;
}
.car_box_img {
  position: relative;
  width: 332px;
  height: 248px;
}
.backcar_box_img {
  width: 100%;
  height: 100%;
  text-align: center;
  position: relative;
}
.backcar_box_img img{
  width: 740px;
  height: 554px;
  margin-top: 15  px;
}
.car_box_img img {
  width: 100%;
  height: 100%;
}
.car_box_txt {
  width: 4vw;
  text-align: right;
  min-width: 57px;
}
.car_box_bot {
  padding-top:10px;
  font-size: 16px;
}
.car_box_txt1 {
}
.car_box_input {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  cursor: pointer;
}
.backimg {
  position: absolute;
  bottom: 0;
  right: 0;
}
.zhezao {
  position: relative;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 18px;
  color: white;
  background-color: rgba(0, 0, 0, 0.7)
}
.outtime {
  position: absolute;
  top: 4px;
  left: 5px;
  color: red;
  font-size: 12px;
}

/*模态框*/
.backreturn {
  width: 780px;
  height: 716px;
  position: relative;
}
.back_header {
  background: #0c71c3;
  height: 35px;
  color: white;
}
.back_header_left img {
  margin-left: 15px;
  margin-right: 10px;
}
.back_header_right img {
  margin-right: 15px;
}
.back_car {
  color: #3f4349;
  background: #fff;
  padding: 0px;
  padding-top: 20px;
  width: 100%;
  cursor: pointer;
  position: relative;

}
.back_tanmu {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #0f43727a;
  z-index: 10;
  /* display: none; */
}
.flex_wrap{
  display: flex;
  flex-wrap: wrap;
}
.kj{
  position:absolute;
  top: -33px;
  left: 0;
  background: #0374be;
  color: white;
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 14px;
}
.close_img{
  position:absolute;
  right: -10px;
  top: -17px;
  z-index: 11;
  width: 32px;
  height: 32px;

}
.close_img img{
  width: 100%;
  height: 100%;
  cursor: pointer;
}
.ly_man{
  position: absolute;
  bottom: 3px;
  left: 20px;
  width: 720px;
  height: 66px;
  line-height: 66px;
  font-size: 26px;
  padding-left: 20px;
  background:#00000063;
  color: white;
  text-align: left;
}
#cat_table{
  font-size: 20px;
  color: #3f4349;
}
#cat_table tr{
  height: 40px;
  line-height: 40px;
}
.td_right{
  text-align: right;
}

</style>