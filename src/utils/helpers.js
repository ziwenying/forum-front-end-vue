import axios from 'axios'
import Swal from 'sweetalert2'

const baseURL = 'http://localhost:3000/api'

// axios.create() 方法會回傳一個自訂的 axios 實例，我們把它存到 apiHelper 變數裡
export const apiHelper = axios.create({
  baseURL
})

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