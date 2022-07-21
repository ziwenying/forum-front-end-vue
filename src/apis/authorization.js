import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

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
    return apiHelper.post('/signup', formData, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
}

/*

發送請求，原本寫 axios.post()，現在要改寫成 apiHelper.post()

*/


//     async handleSubmit(e) {
//   try {

//     if (!this.email || !this.password) {
//       Toast.fire({
//         icon: 'warning',
//         title: '請填入 email 和 password'
//       })
//       return
//     }

//     this.isProcessing = true

//     // 使用 authorizationAPI 的 signIn 方法
//     // 並且帶入使用者填寫的 email 和 password
//     const response = await authorizationAPI.signIn({
//       email: this.email,
//       password: this.password
//     })

//     const { data } = response

//     if (data.status !== 'success') {
//       throw new Error(data.message)
//     }

//     // 將 token 存放在 localStorage 內
//     localStorage.setItem('token', data.token)

//     // 成功登入後轉址到餐聽首頁
//     this.$router.push('/restaurants')
//   } catch (error) {
//     this.password = ''
//     this.isProcessing = false

//     Toast.fire({
//       icon: 'warning',
//       title: '請確認您輸入了正確的帳號密碼'
//     })
//   }
// }