// 异步
let set = function(key, value) {
  const promise = new Promise(function(resolve) {
    uni.setStorage({
      key: key,
      data: value,
      success: function() {
        resolve(value)
      }
    })
  })
  return promise
}

let get = function(key) {
  const promise = new Promise(function(resolve, reject) {
    uni.getStorage({
      key: key,
      success: function(res) {
        resolve(res.data)
      },
      fail: function(err) {
        reject(err)
      }
    })
  })
  return promise
  // return uni.getStorage({
  //   key: key,
  //   success: function(res) {
  //     console.log(res.data)
  //     return res.data
  //   }
  // })
}
export { set, get }
