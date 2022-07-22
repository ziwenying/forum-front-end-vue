import Vue from 'vue'
import Vuex from 'vuex'

import usersAPI from './../apis/users'

Vue.use(Vuex)

export default new Vuex.Store({
  // 資料
  state: {
    // 登入使用者
    currentUser: {
      id: -1,
      name: '',
      email: '',
      image: '',
      isAdmin: false
    },
    // 是否成功登入
    isAuthenticated: false,
    token: ''
  },
  getters: {
  },
  mutations: {
    // 對照 SignIn.vue 檔案看，其傳入了 state 物件和 data.user，此時的 state 物件是預設值，需要使用 data.user 來覆蓋。
    // 最終修改好的資料會被保存在 state 裡。
    setCurrentUser(state, currentUser) {
      state.currentUser = {
        ...state.currentUser,
        // 使用 API 取得的 currentUser 覆蓋掉 Vuex state 中的 currentUser
        ...currentUser
      }
      // 將使用者驗證用的 token 儲存在 state 中
      state.token = localStorage.getItem('token')
      // 將使用者的登入狀態改為 true
      state.isAuthenticated = true
    },
    revokeAuthentication(state) {
      // 登出功能
      state.currentUser = {}
      state.isAuthenticated = false
      // 登出時一併將 state 內的 token 移除
      state.token = ''
      localStorage.removeItem('token')
    }
  },
  // 路由設定檔中的 beforeEach() 來呼叫 actions 裡面的非同步函式 
  actions: {
    // 在 actions 中可以透過參數的方式取得 commit 的方法
    async fetchCurrentUser({ commit }) {
      // 進行 token 的驗證，看是否依然有效
      try {
        const { data } = await usersAPI.getCurrentUser()

        const { id, name, email, image, isAdmin } = data

        commit('setCurrentUser', {
          id,
          name,
          email,
          image,
          isAdmin
        })
        return true //有效時 return true
      } catch (error) {
        console.error('can not fetch user information')
        // 驗證失敗的話一併觸發登出的行為，以清除 state 中的 token
        commit('revokeAuthentication')
        return false
      }
    }
  },
  modules: {
  }
})
