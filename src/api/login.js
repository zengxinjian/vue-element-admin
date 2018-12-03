import http from '@/http'
import request from '@/utils/request'
import md5 from 'js-md5'

// export function login(username, password, validateCode) {
//   return request({
//     url: '/api/v1/manage/login',
//     method: 'post',
//     data: {
//       username,
//       password: md5(password),
//       validateCode
//     }
//   })
// }
export function login(username, password, validateCode) {
  return http.post('/v1/manage/login', {
    username,
    password: md5(password),
    validateCode
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
