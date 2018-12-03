import User from '@/store/modules/user'
import { Message } from 'element-ui'

const checkError = res => {
  let errorMsg = '网络异常，请稍后重试'
  const { errmsg, errcode } = (res.data || {})
  errorMsg = errmsg || errorMsg
  if (res.status === 200 && errcode === 0) return res.data.data
  if ([300005, 300006, 300007, 300008].indexOf(errcode) !== -1) {
    User.actions.LogOut()
    setTimeout(() => {
      location.replace('/signin')
    }, 1000)
  }

  Message.error({
    showClose: true,
    message: errorMsg,
    time: 1500
  })
  const httpError = new Error(errorMsg)
  httpError.code = errcode || res.status
  httpError.message = errorMsg
  throw httpError
}

export default {
  response: checkError
}
