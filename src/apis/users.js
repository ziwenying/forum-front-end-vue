import { apiHelper } from './../utils/helpers'

// addFavorite、deleteFavorite 兩組 api 考慮到後端的運作流程，後端會先依 token 找出使用者，接著才為使用者和餐廳建立關聯，因此視為 API 的動作以 user 為中心

export default {
  // 不需要完整的 user profile 時，可使用此 api
  getCurrentUser() {
    return apiHelper.get(`/get_current_user`,)
  },
  get({ userId }) {
    return apiHelper.get(`/users/${userId}`)
  },
  getTopUsers() {
    return apiHelper.get('/users/top',)
  },
  // axios.post(url[, data[, config]]) 的三個參數
  // url - 網址
  // data - 要發送的資料，如果沒有則寫 null
  // config - 這裡可以把 token 帶到 headers 中
  addFavorite({ restaurantId }) {
    return apiHelper.post(`/favorite/${restaurantId}`, null,)
  },
  deleteFavorite({ restaurantId }) {
    return apiHelper.delete(`/favorite/${restaurantId}`,)
  },
  addLike({ restaurantId }) {
    return apiHelper.post(`/like/${restaurantId}`, null,)
  },
  deleteLike({ restaurantId }) {
    return apiHelper.delete(`/like/${restaurantId}`,)
  },
  addFollowing({ userId }) {
    return apiHelper.post(`/following/${userId}`, null,)
  },
  deleteFollowing({ userId }) {
    return apiHelper.delete(`/following/${userId}`,)
  },
  update({ userId, formData }) {
    return apiHelper.put(`/users/${userId}`, formData,)
  },
}