import Vue from 'vue'
import VueRouter from 'vue-router'

import NotFound from '../views/NotFound.vue'
import SignIn from '../views/SignIn.vue'
import Restaurants from '../views/Restaurants.vue'

import store from './../store'

Vue.use(VueRouter)

// 處理非管理者 直接透過路由進入管理頁面
const authorizeIsAdmin = (to, from, next) => {
  // 如果非管理者直接用路由近來，轉到 /404
  const currentUser = store.state.currentUser
  if (currentUser && !currentUser.isAdmin) {
    next('/404')
    return
  }

  next()
}



const routes = [
  {
    // 根目錄轉址
    path: '/',
    name: 'root',
    redirect: '/signin'
  },
  {
    // 必經，直接載入，其餘動態載入
    path: '/signin',
    name: 'sign-in',
    component: SignIn
  },
  {
    path: '/signup',
    name: 'sign-up',
    component: () => import('../views/SignUp.vue')
  },
  {
    // 必經
    path: '/restaurants',
    name: 'restaurants',
    component: Restaurants
  },
  {
    path: '/restaurants/feeds',
    name: 'restaurants-feeds',
    component: () => import('../views/RestaurantsFeeds.vue')
  },
  {
    path: '/restaurants/top',
    name: 'restaurants-tops',
    component: () => import('../views/RestaurantsTop.vue')
  },
  {
    path: '/restaurants/:id/dashboard',
    name: 'restaurant-dashboard',
    component: () => import('../views/RestaurantDashboard.vue')
  },
  {
    path: '/restaurants/:id',
    name: 'restaurant',
    component: () => import('../views/Restaurant.vue')
  },
  {
    path: '/users/top',
    name: 'users-top',
    component: () => import('../views/UsersTop.vue')
  },
  {
    path: '/users/:id/edit',
    name: 'user-edit',
    component: () => import('../views/UserEdit.vue')
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/User.vue')
  },
  {
    path: '/admin',
    exact: true,
    redirect: '/admin/restaurants'
  },
  {
    path: '/admin/restaurants',
    name: 'admin-restaurants',
    component: () => import('../views/AdminRestaurants.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/restaurants/new',
    name: 'admin-restaurant-new',
    component: () => import('../views/AdminRestaurantNew.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/restaurants/:id/edit',
    name: 'admin-restaurant-edit',
    component: () => import('../views/AdminRestaurantEdit.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/restaurants/:id',
    name: 'admin-restaurant',
    component: () => import('../views/AdminRestaurant.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/categories',
    name: 'admin-categories',
    component: () => import('../views/AdminCategories.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue'),
    beforeEnter: authorizeIsAdmin
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound
  }
]

const router = new VueRouter({
  // 在 bootstraps 中，要使頁籤看起來是「當前頁籤」的樣式，需使用 .active
  // 透過設定 linkExactActiveClass 屬性，就可以加上你希望的 class 名稱，這邊加 .active
  linkExactActiveClass: 'active',
  routes
})

// 監聽"全域"的「切換路由」事件
router.beforeEach(async (to, from, next) => {
  // 使用 dispatch 呼叫 Vuex 內的 actions
  // 路由收到 request 之後，dispatch (指派)其他元件執行特定工作


  // 從 localStorage 取出 token
  const tokenInLocalStorage = localStorage.getItem('token')
  // store 中 state 原本存的 token
  const tokenInStore = store.state.token
  // 是否為驗證狀態
  let isAuthenticated = store.state.isAuthenticated

  // 如果 token 在 LocalStorage存在， 比較 localStorage 中 和 store 中的 token 是否一樣
  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    // 不一樣就需要重新驗證
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }


  // 對於不需要驗證 token 的頁面 (登入、登出 不須驗證)
  const pathsWithoutAuthentication = ['sign-up', 'sign-in']

  // 如果 token 無效且進入需要驗證的頁面則轉址到登入頁
  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    // 如果 token 無效，又不是到登入頁，需要轉址到登入頁
    next('/signin')
    return
  }
  // 如果 token 有效且進入不需要驗證到頁面則轉址到餐廳首頁
  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/restaurants')
    return
  }
  next()
})

export default router