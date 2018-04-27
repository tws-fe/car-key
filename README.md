#### 项目名称：车辆钥匙管理系统

#### 项目构建
```
# 加载项目依赖包
npm install
cnpm install
yarn

# 开发环境，用rap接口mock数据
npm run serve

# 开发环境，用真实接口数据，用于联调
npm run serve-real

# 打包部署
npm run build
```

#### 域名和服务器地址
+ 袁工 192.168.5.67:8082

#### 项目模板说明
+ 使用最新的vue官方脚手架@vue/cli，采用无配置模板
+ [文档](https://github.com/vuejs/vue-cli/blob/dev/docs/README.md)

#### 适配方案：viewpoint
+ [参考文档](https://www.w3cplus.com/mobile/vw-layout-in-vue.html)

#### 技术栈
+ MVVM库：vue + vue-router + vuex
+ UI库：element-ui
+ 第三方模块：axios，anime-js，swiper