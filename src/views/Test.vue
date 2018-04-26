<template>
<div>
 <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
  <!-- <div class="fingerprint">
    <div class="cover"></div>
    <div class="line"></div>
  </div> -->
  <div class="search_box">
    <div class="search"></div>
  </div>
</div>
</template>
<style >
.search_box {
  position: relative;
  margin: 400px;
  width: 200px;
  height: 200px;
  background-color: #ccc;
}
.search {
  position: absolute;
  top: -40px;
  left: -40px;
  width: 400px;
  height: 600px;
  background:rgba(255, 255, 0, 0.3);
  animation: move 2s infinite;
}
@keyframes move {
  0% {
    top: -40px;
    left: -40px;
  }
  12% {
    top: -80px;
    left: 100px;
  }
  25% {
    top: -40px;
    left: 240px;
  }
  37% {
    top: 100px;
    left: 280px;
  }
  50% {
    top: 240px;
    left: 240px;
  }
  62% {
    top: 280px;
    left: 100px;
  }
  75% {
    top: 240px;
    left: -40px;
  }
  87% {
    top: 100px;
    left: -80px;
  }
  100% {
    top: -40px;
    left: -40px;
  }
}
.fingerprint  {
  width: 200px;
  height: 200px;
  margin: 100px;
  background-color: #0c9;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
}
.cover {
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  top: 0;
  animation: move 2s infinite;
}
.line {
  width: 100%;
  height: 2px;
  background-color: #c09;
  position: absolute;
  top: 0;
  animation: move 2s infinite;
}

@keyframes move {
  from {
    top: 0;
  }
  to {
    top: 100%;
  }
}
</style>


<script>
import Vue from 'vue';
import { Option, Select } from 'element-ui';
 Vue.use(Option)
 Vue.use(Select)
export default {
    data() {
      return {
        options: [{
          value: '选项1',
          label: '黄金糕'
        }, {
          value: '选项2',
          label: '双皮奶'
        }, {
          value: '选项3',
          label: '蚵仔煎'
        }, {
          value: '选项4',
          label: '龙须面'
        }, {
          value: '选项5',
          label: '北京烤鸭'
        }],
        value: ''
      }
    }
  }
</script>

<style lang="scss">

</style>

