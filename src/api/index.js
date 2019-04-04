// 在api组件里设置所有的跨域请求发送，方便管理和维护
//  引入axios组件
import axios from 'axios'
const baseURL = 'http://localhost:8888/api/private/v1/'
axios.defaults.baseURL = baseURL

// 添加请求拦截器
axios.interceptors.request.use(function (config) { // config就是请求对象
  // 在请求之前执行
  // 将token赋值给客户端和服务端约定好的key中，作为请求发送
  let token = localStorage.getItem('myToken')
  if (token) {
    config.headers['Authorization'] = token
  }
  return config
}, function (error) {
  // 在请求错误时执行
  return Promise.reject(error)
})

//  登陆验证
export const checkUser = params => {
  return axios.post('login', params).then(res => res.data)
}

//  请求用户列表
export const getUserList = params => {
  return axios.get('users', params).then(res => res.data)
}
