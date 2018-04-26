import Vue from 'vue'
import Vuex from 'vuex'
import {url,fetch} from './api'
import { Footer } from 'element-ui';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    selectCar: null,
    imgHost: '',
    departData: {
      departId: '',
      departName: ''
    },
    fingerInfo: [],
    appBgi: './assets/sy-bj.png'
  },
  mutations: {
    setFingerInfo (state, arr) {
      state.fingerInfo = arr.filter(item => {
        return item.orgId === state.departData.departId
      })
    },
    setDepartData (state, data) {
      state.departData = data
    },
    setAppBgi (state, imgUrl) {
      state.appBgi = imgUrl
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
        commit('setDepartData', res.data.data[0])
        fetch(url.fingerInfo, {
          orgId: state.departData.departId
        }).then(res => {
          commit('setFingerInfo', res.data.data)
        })
      })
    },
  }
})
