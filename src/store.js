import Vue from 'vue'
import Vuex from 'vuex'
import {url,fetch} from './api'
import { Footer } from 'element-ui';
import projectConf from '../project.config'
Vue.use(Vuex)
const host = process.env.VUE_APP_ENV === 'production'? projectConf.productionPath : ''

export default new Vuex.Store({
  state: {
    selectCar: null,
    imgHost: '',
    // 派出所的信息
    departData: {
      departId: '',
      departName: ''
    },
    // 服务器返回的指纹数据
    fingerInfo: [],
    // 借用和归还的请求数据
    reqData: {
      isStatus: '',
      keyId: '',
      carId: '',
      deviceId: '',
      boxNo: '',
      userId: '',
      orgId: '',
      orgCode: '',
      remark: '',
      bhours: ''
    },
    rfids: '',
    appBgi: host + '/static/sy-bj.png',
    borrowData: {
      userName: '',
      carNo: ''
    }
  },
  mutations: {
    setBorrowData (state, data) {
      state.borrowData = data
    },
    setRfids (state, data) {
      state.rfids = data
    },
    setReqData (state, data) {
      state.reqData = Object.assign({}, state.reqData, data)
    },
    setFingerInfo (state, arr) {
      state.fingerInfo = arr.filter(item => {
        return item.orgId === state.departData.departId
      })
    },
    setDepartData (state, data) {
      state.departData = data
    },
    setAppBgi (state, imgUrl) {
      state.appBgi = host + imgUrl
    },
    setSelectCar (state, carInfo) {
      state.selectCar = carInfo
    },
    setSysInfo (state, arr) {
      let index = arr.findIndex(item => {
        return item.paramKey === 's_file' && item.paramName === 'imagePath'
      })
      state.imgHost = arr[index].paramValue
    }
  },
  actions: {
    initSysInfo ({commit}) {
      fetch(url.sysparamInfo).then(res => {
        commit('setSysInfo', res.data.data)
      })
    },
    initDepartData ({commit, state}) {
      fetch(url.orgInfo).then(res => {
        let departData = res.data.data[0]
        commit('setDepartData', departData)
        commit('setReqData', {
          deviceId: departData.deviceId
        })
        fetch(url.fingerInfo, {
          orgId: state.departData.departId
        }).then(res => {
          commit('setFingerInfo', res.data.data)
        })
      })
    },
  }
})
