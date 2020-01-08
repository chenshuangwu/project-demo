import axios from 'axios'
import router from '@/router';
import qs from 'qs'
import store from '@/store'


 /**
   * 跳转登录页
   * 携带当前页面路由，以期在登录页面完成登录后返回当前页面
   */
  const toLogin = () => {
    router.replace({
        path: '/login',
        query: {
            redirect: router.currentRoute.fullPath
        }
    });
}

// 创建axios 实例
const instance = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  timeout: 10000 // 请求超时时间
})

 // 设置post请求头
 instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';


// request 拦截器
instance.interceptors.request.use(
  config => {
    // 这里可以自定义一些config 配置
    if (config.method === 'post') {
      config.data = qs.stringify(config.data)
    }
    // loading + 1
    store.dispatch('SetLoading', true)

    return config
  },
  error => {
    //  这里处理一些请求出错的情况

    // loading 清 0 
    setTimeout(function () {
      store.dispatch('SetLoading', 0)
    }, 300)
    
    console.log(error)
    Promise.reject(error)
  }
)

// response 拦截器
instance.interceptors.response.use(
  response => {
    const res = response.data
    // 这里处理一些response 正常放回时的逻辑

    // loading - 1
    store.dispatch('SetLoading', false)

    return res
  },
  error => {
    // 这里处理一些response 出错时的逻辑

    // loading - 1
    store.dispatch('SetLoading', false)

    return Promise.reject(error)
  }
)

export default instance
