import http from './http'
import checkError from './check-error'
import checkAuth from './auth'
http.use(checkError)
http.use(checkAuth)

export default http

export const plugin = function(Vue) {
  Vue.prototype.$http = http
}
