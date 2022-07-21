<template>
  <div class="container py-5">
    <AdminRestaurantForm
      :is-processing="isProcessing"
      :initial-restaurant="restaurant"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "./../components/AdminRestaurantForm.vue";

import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  components: {
    AdminRestaurantForm,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        categoryId: "",
        tel: "",
        address: "",
        description: "",
        image: "",
        openingHours: "",
      },
      isProcessing: false,
    };
  },
  created() {
    // 透過 this.$route.params 取得網址上的 id
    const { id } = this.$route.params;
    this.fetchRestaurant(id);
  },
  beforeRouteUpdate(to, from, next) {
    // 路由改變時重新抓取資料
    const { id } = to.params;
    this.fetchRestaurant(id);
    next();
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        // 變成處理中
        this.isProcessing = true;

        const { data } = await adminAPI.restaurants.update({
          restaurantId: this.restaurant.id,
          formData,
        });
        // 檢驗
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        Toast.fire({
          icon: "success",
          title: "新餐廳更新成功！",
        });
        //成功轉址到 `/admin/restaurants`
        this.$router.push({ name: "admin-restaurants" });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法更新餐廳資料，請稍後再試",
        });
      }
    },
    async fetchRestaurant(restaurantId) {
      try {
        const response = await adminAPI.restaurants.getDetail({
          restaurantId,
        });

        // 檢驗
        if (response.statusText !== "OK") {
          throw new Error("無法編輯餐廳資料，請稍後再試");
        }
        const { restaurant } = response.data;
        console.log(this.restaurant);
        this.restaurant = {
          ...this.restaurant,
          id: restaurant.id,
          name: restaurant.name,
          categoryId: restaurant.CategoryId,
          tel: restaurant.tel,
          address: restaurant.address,
          description: restaurant.description,
          image: restaurant.image,
          openingHours: restaurant.opening_hours,
        };
        console.log("this", this.restaurant);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法編輯餐廳資料，請稍後再試",
        });
      }
    },
  },
};
</script>