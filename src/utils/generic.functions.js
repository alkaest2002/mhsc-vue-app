export function debounce(fn, wait = 300) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    const context = this
    timer = setTimeout(() => {
      fn.apply(context, args)
    }, wait)
  }
}

export function throttle(fn, wait = 300) {
  let throttled = false
  return function (...args) {
    if (!throttled) {
      fn.apply(this, args)
      throttled = true
      setTimeout(() => {
        throttled = false
      }, wait)
    }
  }
}
