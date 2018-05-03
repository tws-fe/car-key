<template>
  <div id="app" :style="{'background-image': `url(${appBgi})`}">
    <Nav />
    <!-- <transition name="slide-fade"> -->
      <router-view/>
    <!-- </transition> -->
    <Foot />
    <!-- <DemoNav /> -->
  </div>
</template>

<script>
import DemoNav from './components/DemoNav'
import Foot from './components/Foot'
import Nav from './components/Nav'
import {mapActions, mapState} from 'vuex'
export default {
  computed: mapState(['appBgi']),
  created() {
    this.initSysInfo()
    this.initDepartData()
  },
  methods: mapActions(['initSysInfo', 'initDepartData']),
  components: {
    DemoNav,
    Foot,
    Nav
  }
}
</script>

<style>
html, body {
  height: 100%;
}
html::-webkit-scrollbar{
  display:none;
}
#app {
  width: 100%;
  height: 100%;
  /* background-image: url('./assets/sy-bj.png'); */
  background-size: cover;
}
.timedown_base {
  position: absolute;
  top: 200px;
  left: 368px;
  width: 168px;
  height: 168px;
  background: #114b8f;
  border-radius: 50%;
  font-size: 48px;
  color: #fff;
  text-align: center;
  line-height: 168px;
}
.back_msg_base {
  position: absolute;
  width: 100%;
  font-size: 48px;
  color: #fff;
  text-align: center;
}
.mask_base {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
  z-index: 10;
}

.slide-fade-enter{
  transform: translateX(100%);
}
.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s ease;
}
.slide-fade-leave-to {
  transform: translateX(-100%);
}
</style>
