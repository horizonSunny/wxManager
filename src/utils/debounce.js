// 防抖
let debounceTime
export function _debounce(fn, delay) {
  let timeOut = delay || 200
  return (function() {
    let th = this
    let args = arguments
    if (debounceTime) {
      clearTimeout(debounceTime)
    }
    debounceTime = setTimeout(function() {
      debounceTime = null
      fn.apply(th, args)
    }, timeOut)
  })()
}
// 节流
export function _throttle(fn, interval) {
  let last
  let timer
  let intervalTime = interval || 200
  return function() {
    let th = this
    let args = arguments
    let now = +new Date()
    if (last && now - last < intervalTime) {
      clearTimeout(timer)
      timer = setTimeout(function() {
        last = now
        fn.apply(th, args)
      }, intervalTime)
    } else {
      last = now
      fn.apply(th, args)
    }
  }
}
