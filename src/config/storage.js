// 异步
let set = function(key, value) {
  const promise = new Promise(function(resolve, reject) {
    uni.setStorage({
      key: key,
      data: value,
      success: function() {
        resolve(value)
      },
      fail: function(err) {
        reject(err)
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
// 同步
let setSync = function(key, value) {
  try {
    uni.setStorageSync(key, value)
  } catch (error) {
    // error
    console.log('setSync_', error)
  }
}
let getSync = function(key, value) {
  try {
    const value = uni.getStorageSync(key)
    if (value) {
      return value
    }
  } catch (e) {
    // error
  }
}
export { set, get, setSync, getSync }
