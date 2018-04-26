import axios from 'axios'
import qs from 'qs'

// axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'
export default function fetch(url, data = {}) {
  // 如果后台只支持标准表单x-www-form-urlencoded，不支持纯json格式数据
  // 需做如下处理
  // if (data) {
  //   Object.values(data).forEach(item => {
  //     if (typeof item === 'object') {
  //       item = JSON.stringify(item)
  //     }
  //   })
  // }
  // data = qs.stringify(data)

  return new Promise((resolve, reject) => {
    axios.post(url, data).then(res => {
      let result = res.data
      // todo:业务状态码的处理 result.errorCode
      resolve(result)
    }).catch(error => {
      reject(new Error(error))
    })
  })
}