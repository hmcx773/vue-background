// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/index.less'
import './styles/reset.less'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
Vue.config.productionTip = false

// 注册一个全局守卫，作用是在路由跳转前对路由进行判断，防止未登录的用户也能跳转到其他页面
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('myToken')
  if (token) {
    // 如果token值存在，证明已经登陆，继续请求，不进行拦截
    next()
  } else {
    if (to.path !== '/') {
      // 如果token不存在，且客户端想要跳过login进入其他页面，强制跳回login
      next({path: '/'})
    } else {
      // 如果token不存在，且客户端是进入login，则不进行跳转，继续执行
      next()
    }
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
