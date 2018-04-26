import Vue from 'vue'

Vue.mixin({
  methods: {
    dateFormat (date) {
      let arr = date.split('/')
      arr = arr.map((item) => {
        return parseInt(item) < 10 ? '0' + item : item
      })
      return arr.join('-') 
    }
  }
})