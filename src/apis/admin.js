import { apiHelper } from './../utils/helpers'

export default {
  // 分 categories, restaurants,
  categories: {
    create({ name }) {
      return apiHelper.post('/admin/categories/', { name })
    },
    get() {
      return apiHelper.get('/admin/categories')
    },
    delete({ categoryId }) {
      return apiHelper.delete(`/admin/categories/${categoryId}`)
    },
    update({ categoryId, name }) {
      return apiHelper.put(`/admin/categories/${categoryId}`, { name })
    },

  },
  restaurants: {
    // 建立新餐廳
    create({ formData }) {
      return apiHelper.post('/admin/restaurants', formData)
    },
    // 只拿其中一個的餐廳資料
    getDetail({ restaurantId }) {
      return apiHelper.get(`/admin/restaurants/${restaurantId}`)
    },
    get() {
      return apiHelper.get('/admin/restaurants')
    },
    delete({ restaurantId }) {
      return apiHelper.delete(`/admin/restaurants/${restaurantId}`)
    },
    update({ restaurantId, formData }) {
      return apiHelper.put(`/admin/restaurants/${restaurantId}`, formData)
    },
  },
  users: {
    get() {
      return apiHelper.get('/admin/users')
    },
    update({ userId, isAdmin }) {
      return apiHelper.put(`/admin/users/${userId}`, { isAdmin })
    },
  }
}