<template>
  <div class="container py-5">
    <NavTabs />
    <h1>餐廳描述頁</h1>
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <Spinner v-if="isLoading" />
    <template>
      <RestaurantDetail :initial-restaurant="restaurant" />
      <hr />
      <!-- 餐廳評論 RestaurantComments -->
      <RestaurantComments
        :restaurant-comments="restaurantComments"
        @after-delete-comment="afterDeleteComment"
      />
      <!-- 新增評論 CreateComment -->
      <CreateComment
        :restaurant-id="restaurant.id"
        @after-create-comment="afterCreateComment"
      />
    </template>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs.vue";
import RestaurantDetail from "./../components/RestaurantDetail.vue";
import RestaurantComments from "./../components/RestaurantComments.vue";
import CreateComment from "./../components/CreateComment .vue";
import Spinner from "./../components/Spinner.vue";

import restaurantsAPI from "./../apis/restaurants";
import { Toast } from "./../utils/helpers";
import { mapState } from "vuex";

export default {
  name: "Restaurant",
  components: {
    NavTabs,
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
    Spinner,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        tel: "",
        address: "",
        openingHours: "",
        description: "",
        categoryName: "",
        image: "",
        isFavorited: false,
        isLiked: false,
      },
      restaurantComments: [],
      isLoading: true,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  // 直接改變路由取得正確的單一餐廳資料
  beforeRouteUpdate(to, from, next) {
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  },
  created() {
    // 透過路由取得要顯示的餐廳 Id
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  methods: {
    async fetchRestaurant(restaurantId) {
      try {
        this.isLoading = true;
        const response = await restaurantsAPI.getRestaurant({ restaurantId });

        // 檢驗
        if (response.statusText !== "OK") {
          throw new Error("無法取得餐廳資料，請稍後再試");
        }

        const data = response.data;

        this.restaurant = {
          id: data.restaurant.id,
          name: data.restaurant.name,
          tel: data.restaurant.tel,
          address: data.restaurant.address,
          openingHours: data.restaurant.opening_hours,
          description: data.restaurant.description,
          categoryName: data.restaurant.Category.name,
          image: data.restaurant.image,
          isFavorited: data.isFavorited,
          isLiked: data.isLiked,
        };
        this.restaurantComments = data.restaurant.Comments;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法取得餐廳資料，請稍後再試",
        });
      }
    },
    afterDeleteComment(commentId) {
      // 以 filter 保留未被選擇的 comment.id
      this.restaurantComments = this.restaurantComments.filter(
        (comment) => comment.id !== commentId
      );
    },
    afterCreateComment(payload) {
      const { commentId, restaurantId, text } = payload;

      // 新增的評論資料加進 restaurantComments
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
        // text: text 的縮寫
        text,
        // 直接抓當下的時間
        createdAt: new Date(),
      });
    },
  },
};
</script>