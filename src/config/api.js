import { baseUrl } from './global'
import { Promise } from 'q'

// 在http请求层面对其拦截，校验token是否失效
const get = (url, data) => {
  const wholeUrl = baseUrl + url
  return uni
    .request({
      url: wholeUrl
    })
    .then(data => {
      var [error, res] = data
      console.log('in_api_', res.data)
      const responseData = new Promise((resolve, reject) => {
        resolve(res.data)
      })
      return responseData
    })
}

export { get }
