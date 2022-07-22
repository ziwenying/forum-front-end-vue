import { apiHelper } from './../utils/helpers'

export default {
  // 帶入需要的參數 - 登入必須資料
  signIn({ email, password }) {
    // 這裡 return 的會是一個 Promise，之後 Vue 元件接到 Promise 物件後，就可以用 then 做後續操作
    //引入 helper.js 中的 apiHelper 變數
    return apiHelper.post('/signin', {
      email,
      password
    })
  },
  create({ formData }) {
    return apiHelper.post('/signup', formData)
  },
}

/*

發送請求，原本寫 axios.post()，現在要改寫成 apiHelper.post()

*/