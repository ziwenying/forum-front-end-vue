import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'https://forum-express-api.herokuapp.com/api'


// axios.create() 方法會回傳一個自訂的 axios 實例
const axiosInstance = axios.create({
  baseURL
})

// 使用 axios 提供 interceptors 的方法
axiosInstance.interceptors.request.use(
  config => {
    // 從 localStorage 將 token 取出
    const token = localStorage.getItem('token')

    // 如果 token 存在的話，則帶入到 headers 當中
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  err => Promise.reject(err)
)

export const apiHelper = axiosInstance


// 跳出的通知相關樣式設定
export const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
})




/*
Axios 函式庫裡提供了以下 axios.create()，可以做客製化設定。 
const instance = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 1000,
  headers: { 'X-Custom-Header': 'foobar' }
});

*/