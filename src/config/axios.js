import axios from 'uni-axios'
import { baseUrl } from './global'
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
const http = axios.create({
  baseURL: baseUrl,
  timeout: 6000,
  // #ifdef H5
  withCredentials: true,
  // #endif
  headers: {
    'Content-Type': 'application/json',
    authorization:
      'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZW5hbnRfaWQiOjAsImxpY2Vuc2UiOiJtYWRlIGJ5IGF1dGgiLCJ1c2VyX2lkIjoxLCJ1c2VyX25hbWUiOiIxMzI2NTc0Njc4OCIsInNjb3BlIjpbInNlcnZlciJdLCJleHAiOjE1Nzg5NDA5NjcsImRlcHRfaWQiOjAsImF1dGhvcml0aWVzIjpbIlJPTEVfIl0sImp0aSI6IjUwYjMzOTljLWM0OGItNGNjZS1hNTRkLWJiZGVjYTM5MjY4MyIsImNsaWVudF9pZCI6InBhdGllbnQiLCJ1c2VybmFtZSI6IjEzMjY1NzQ2Nzg4In0.ljWawHZ6dYGRGknp8RMm6ygjPfRKiGlI3mGrGjWfKEg'
  }
})

// 拦截器 在请求之前拦截
http.interceptors.request.use(config => {
  // code...
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
