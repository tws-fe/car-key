import fetch from './fetch.js'

let host = 'http://rap2api.taobao.org/app/mock/11500/'
// let host = '/car-web'

let url = {
  sysparamInfo: '/sysparamInfo', //系统参数
  orgInfo: '/orgInfo', //单位信息
  carInfo: '/carInfo',  //车辆信息
  borrowReason: '/borrowReason',  //借用理由
  fingerInfo: '/fingerInfo',  //指纹信息
  keyChipInfo :'/keyChipInfo', //钥匙芯片对应的数据
  borrowAndReback: '/borrowAndReback' //借用和归还
}

Object.keys(url).forEach(key => {
  url[key] = host + url[key]
})

export  {
  url,
  fetch
}