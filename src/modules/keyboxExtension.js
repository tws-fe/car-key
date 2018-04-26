import { message } from 'element-ui'

const keybox = window.twsdevice.keybox

//  state=10，启动成功
//  state=11，已经启动，无需重复启动
//  state=30, 已关闭，由close方法触发
//  state=-10，启动失败，data参数值指明失败原因表述
//  state=-30, 已关闭，无需重复关闭，由close方法触发
//  state=-100，因未知异常导致崩溃而无法使用
function openCallback(state, data) {
  if (state == 10) {
      message('设备打开成功');
  }else if(state == 11){
      message('设备已打开，无需重复的打开');
  }else  if (state == 30) {
      message('设备已关闭');
  }else if(state == -10){
      message('设备打开失败，失败信息：'+data+'');
  }else if(state == -30){
      message('设备已关闭，不能重复关闭');
  }else if(state == -100){
      message('设备已崩溃，不能正常使用');
  }else{
      message('设备出现异常，错误码：'+state+', 错误信息：'+data+'');
  }
}

//  state=-1， 盒子正在执行其他操作，不能执行本次指令
//  state=-100，盒子中钥匙不存在
//  state=-200, 盒子中的钥匙的rfid与预期不符, data是盒子中的rfid的数组
//  state=100,  钥匙存在且正确，盒子转动的进度, data-进度值（整型值）, 0-100
function preBorrowCallback(state, data) {

}

//  state=-1， 盒子正在执行其他操作，不能执行本次指令
//  state=-2， 盒子不在出口位置，不能执行
//  state=-100，盒子中钥匙不存在
//  state=-200, 盒子中的钥匙的rfid与预期不符, data是盒子中的rfid的数组
//  state=100,  钥匙存在且正确，打开盒子的进度, data-进度值（整型值）, 0-100
function borrowingCallback(state, data) {

}

//  state=-1， 盒子正在执行其他操作，不能执行本次指令
//  state=-2， 盒子不在出口位置，不能执行
//  state=-100，盒子中有钥匙，不能归还, data是盒子中的rfid的数组
//  state=100,  盒子中没有钥匙，可以归还，并且开始打开盒子， data-打开进度值（整型值）, 0-100
function preReturnCallback(state, data) {

}


export {
  keybox,
  openCallback,
  preBorrowCallback,
  preReturnCallback
}