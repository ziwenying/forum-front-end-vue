import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
  getRestaurant({ restaurantId }) {
    return apiHelper.get(`/restaurants/${restaurantId}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  // s
  getRestaurants({ page, categoryId }) {
    // JavaScript 原生 URLSearchParams() 方法
    // URLSearchParams() 為物件建構子，在使用時要用 new 的方式來產生實例，再透過 URLSearchParams.toString() 來產生 queryString。
    const searchParams = new URLSearchParams({ page, categoryId })

    // step 1, 發出 get 請求
    // step 2, HTTP Header 攜帶 token
    // step 3, 攜帶 categoryId, page 參數，透過 URLSearchParams.toString() 來產生 queryString
    return apiHelper.get(`/restaurants?${searchParams.toString()}`, {
      headers: { Authorization: `Bearer ${getToken()}` }
    })
  },
  getFeeds() {
    return apiHelper.get(`restaurants/feeds`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
  getRestaurantsTop() {
    return apiHelper.get(`restaurants/top`, {
      headers: {
        Authorization: `Bearer ${getToken()}`
      }
    })
  },
}