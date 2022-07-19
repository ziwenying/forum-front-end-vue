import { apiHelper } from './../utils/helpers'
const getToken = () => localStorage.getItem('token')

export default {
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


  //
}


//
/*
created() {
  const { page = '', categoryId = '' } = this.$route.query
  this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId })
},
beforeRouteUpdate(to, from, next) {
  const { page = '', categoryId = '' } = to.query
  this.fetchRestaurants({ queryPage: page, queryCategoryId: categoryId })
  next()
},
methods: {
    async fetchRestaurants({ queryPage, queryCategoryId }) {
    try {
      const response = await restaurantsAPI.getRestaurants({
        page: queryPage,
        categoryId: queryCategoryId
      })

      const {
        restaurants,
        categories,
        categoryId,
        page,
        totalPage,
        prev,
        next
      } = response.data

      this.restaurants = restaurants
      this.categories = categories
      this.categoryId = categoryId
      this.currentPage = page
      this.totalPage = totalPage
      this.previousPage = prev
      this.nextPage = next
    } catch (error) {
      console.log('error', error)
      Toast.fire({
        icon: 'error',
        title: '無法取得餐廳資料，請稍後再試'
      })
    }
  }
}

*/