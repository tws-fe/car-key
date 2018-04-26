import { message } from 'element-ui'

const fingerprint = window.twsdevice.fingerprint

function fingerprintCallback(state, data) {
  if (state == 10) {
     message('设备打开成功')
  }else if(state == 11){
     message('设备已打开，无需重复的打开')
  }else  if (state == 20) {
     message('采集到一枚指纹')
     console.log(data)
      // $('#data').text(data)
      // data = eval('('+data+')')
      // currentData=data
      // $('#image').attr('src','data:image/jpeg;base64,'+data.image)
      // lastDatas.push(currentData.template)
      // if(lastDatas.length>3){
      //     lastDatas.shift()
      // }
  }else  if (state == 30) {
     message('设备已关闭')
  }else if(state == -10){
     message('设备打开失败，失败信息：'+data)
  }else if(state == -30){
     message('设备已关闭，不能重复关闭')
  }else if(state == -100){
     message('设备已崩溃，不能正常使用')
  }else{
     message('设备出现异常，错误码：'+state+', 错误信息：'+data)
  }
}

export {
  fingerprint,
  fingerprintCallback
}