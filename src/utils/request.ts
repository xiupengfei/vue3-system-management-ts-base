import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { useMessage, useMsgbox } from 'element3'
import NProgress from 'nprogress'

const UNKNOWN_ERROR = '未知错误!'

// 创建 axios 实例
const service: AxiosInstance = axios.create({
  baseURL: process.env.NODE_ENV === 'development'
    ? process.env.VUE_APP_BASE_API
    : process.env.VUE_APP_SERVER_URL,
  // baseURL: 'http://192.168.1.104:3000',
  timeout: 50000
  // withCredentials: true // 跨域请求时发送cookie
})

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    NProgress.start()
    // if (UserModule.token) {
    //   config.headers['Authorization'] = UserModule.token
    // }
    return config
  },
  (error) => {
    NProgress.done()
    Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    NProgress.done()
    return response.data
  },
  error => {
    NProgress.done()
    // timeout of 5000ms exceeded
    const re = /^timeout of (\d+)ms exceeded$/
    if (re.test(error.message)) {
      error.message = `请求超时: ${RegExp.$1}毫秒, 请重试！`
    }
    let showMessage = true
    switch (error.response && error.response.status) {
      case 400:
        error.message = error.response.data.msg || error.response.data.message || UNKNOWN_ERROR
        break
      case 401:
        error.message = '登录失效, 请重新登录！'
        showMessage = false
        // MessageBox.alert('令牌超时需重新登录', '提示:', {
        //   confirmButtonText: '重新登录',
        //   showClose: false,
        //   type: 'warning'
        // }).then(() => {
        //   // UserModule.ResetToken()
        //   // setTimeout(() => {
        //   //   location.reload()
        //   // }, 500)
        // })
        break
      case 403:
        error.message = '服务器拒绝了您的请求操作！'
        break
      case 404:
        error.message = '资源不存在, 或已被删除！'
        break
      case 500:
        error.message = '服务器异常！'
        break
      // default:
      //   error.message = UNKNOWN_ERROR
    }
    if (showMessage) {
      // Message({
      //   message: error.message,
      //   type: 'error',
      //   duration: 5 * 1000
      // })
    }

    return Promise.reject(error)
  }
)

export default service
