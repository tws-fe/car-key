import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import KeyList from './views/KeyList.vue'
import Apply from './views/Apply.vue'
import TakeAway from './views/TakeAway.vue'
import BackReact from './views/BackReact.vue'
import BackClose from './views/BackClose.vue'
import BackCheck from './views/BackCheck.vue'
import BackSuccess from './views/BackSuccess.vue'
import Verify from './views/Verify.vue'
import Test from './views/Test.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: Home,
      meta: {
        title: '首页'
      }
    },
    {
      path: '/keyList',
      name: 'keyList',
      component: KeyList,
      meta: {
        title: '首页 > 申请钥匙'
      }
    },
    {
      path: '/apply',
      name: 'apply',
      component: Apply,
      meta: {
        title: '首页 > 申请钥匙 > 填写事由'
      }
    },
    {
      path: '/backReact',
      name: 'backReact',
      component: BackReact,
      meta: {
        title: '首页 > 归还钥匙 > 钥匙感应'
      }
    },
    {
      path: '/backClose',
      name: 'backClose',
      component: BackClose,
      meta: {
        title: '首页 > 归还钥匙 > 钥匙放入柜中'
      }
    },
    {
      path: '/backCheck',
      name: 'backCheck',
      component: BackCheck,
      meta: {
        title: '首页 > 归还钥匙 > 钥匙确认'
      }
    },
    {
      path: '/backSuccess',
      name: 'backSuccess',
      component: BackSuccess,
      meta: {
        title: '首页 > 归还钥匙 > 钥匙归还成功'
      }
    },
    {
      path: '/test',
      name: 'test',
      component: Test,
      meta: {
        title: '首页 > 布局测试'
      }
    },
    {
      path: '/verify',
      name: 'verify',
      component: Verify,
      meta: {
        title: '首页 > 申请钥匙 > 填写事由 > 身份验证'
      },
      children: [
        {
          path: 'takeAway',
          name: 'takeAway',
          component: TakeAway,
          meta: {
            title: '首页 > 申请钥匙 > 填写事由 > 身份验证 > 取走钥匙'
          }
        }
      ]
    }   
  ]
})
