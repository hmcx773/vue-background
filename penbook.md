## 启用axios拦截器
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

## 导航守卫