<template>
  <div class="demo">
    <router-link tag="li" class="nav" to="home">首页</router-link>
    <router-link tag="li"  class="nav" to="keyList">申请钥匙</router-link>
    <router-link tag="li" class="nav" to="apply">填写事由</router-link>        
    <router-link tag="li" class="nav" to="verify">身份验证</router-link>         
    <router-link tag="li"  class="nav" to="takeAway">取走钥匙</router-link>    
    <router-link tag="li" class="nav" to="backReact">钥匙感应</router-link>        
    <router-link tag="li" class="nav" to="backClose">钥匙放入柜中</router-link>        
    <router-link tag="li" class="nav" to="BackCheck">钥匙确认</router-link>        
    <router-link tag="li" class="nav" to="backSuccess">钥匙归还成功</router-link>        
  </div>
</template>

<style scoped>
.demo {
  position: fixed;
  right: 0;
  bottom: 60px;
  z-index: 1000;
  min-width: 160px;
  background-color: #ccc;
  text-align: center;
}
.nav {
  display: block;
  height: 60px;
  line-height: 60px;
}
</style>

