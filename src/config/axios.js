import axios from 'uni-axios'
import { baseUrl } from './global'
import * as navTo from './navTo'
/**
 * 请求接口日志记录
 */
function _reqlog(req) {
  if (process.env.NODE_ENV === 'development') {
    console.log('请求地址：' + req.url, req.data || req.params)
    console.log('请求信息：' + req)
  }
  //TODO 调接口异步写入日志数据库
}
/**
 * 响应接口日志记录
 */
function _reslog(res) {
  if (process.env.NODE_ENV === 'development') {
    console.log(`${res.config.url}响应结果：`, res)
  }
}

// 创建自定义接口服务实例
// Authorization Basic cGF0aWVudDpwYXRpZW50
const http = axios.create({
  baseURL: baseUrl,
  timeout: 6000,
  // #ifdef H5
  withCredentials: true,
  // #endif
  headers: {
    'Content-Type': 'application/json',
    authorization: 'Basic cGF0aWVudDpwYXRpZW50'
  }
})

// 拦截器 在请求之前拦截
http.interceptors.request.use(config => {
  // code...
  if (config.headers.authorization.indexOf('Basic') > -1) {
    uni.redirectTo({ url: '/pages/index' })
  }
  _reqlog(config)
  return config
})

// 拦截器 在请求之后拦截
http.interceptors.response.use(response => {
  // _reslog(response)
  return response.data
  // code...
})

export default http
