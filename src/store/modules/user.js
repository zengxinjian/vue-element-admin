import { login, logout, getInfo } from '@/api/login'
import { removeToken } from '@/utils/auth'

const user = {
  state: {
    token: '',
    signining: false,
    menus: [],
    authorities: [],
    info: {},

    name: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return login(username, userInfo.password, userInfo.smscode).then(res => {
        const info = {
          username: res.username || username,
          created: res.created,
          fullname: res.fullname || username,
          email: res.email,
          mobile: res.mobile,
          status: res.status
        }
        this.store.set('token', res['access_token'])
        this.store.set('menus', res.menus)
        this.store.set('authorities', res.authorities)
        this.store.set('info', info)
        return {
          token: res['access_token'],
          menus: res.menus,
          authorities: res.authorities,
          info
        }
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.avatar)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
