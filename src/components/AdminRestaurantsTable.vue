<template>
  <table class="table">
    <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Category</th>
        <th scope="col">Name</th>
        <th scope="col" width="300">操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="restaurant in restaurants" :key="restaurant.id">
        <th scope="row">
          {{ restaurant.id }}
        </th>
        <td>{{ restaurant.Category ? restaurant.Category.name : "未分類" }}</td>
        <td>{{ restaurant.name }}</td>
        <td class="d-flex justify-content-between">
          <router-link
            :to="{ name: 'admin-restaurant', params: { id: restaurant.id } }"
            class="btn btn-link"
          >
            Show
          </router-link>

          <router-link
            :to="{
              name: 'admin-restaurant-edit',
              params: { id: restaurant.id },
            }"
            class="btn btn-link"
            >Edit</router-link
          >

          <button
            @click.stop.prevent="deleteRestaurant(restaurant.id)"
            type="button"
            class="btn btn-link"
            :disabled="isProcessing === true"
          >
            Delete
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  name: "AdiminRestaurantsTable",
  data() {
    return {
      restaurants: [],
      isLoading: true,
      isProcessing: false,
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    async fetchRestaurants() {
      try {
        this.isLoading = true;
        const response = await adminAPI.restaurants.get();
        // 檢驗
        if (response.statusText !== "OK") {
          throw new Error("無法顯示餐廳，請稍後再試");
        }
        const data = response.data.restaurants;
        this.restaurants = data;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法顯示餐廳，請稍後再試",
        });
      }
    },
    async deleteRestaurant(restaurantId) {
      try {
        this.isProcessing = true;
        const { data } = await adminAPI.restaurants.delete({ restaurantId });

        // 檢驗
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        // 刪
        const deleteTheRestaurant = () => {
          this.restaurants = this.restaurants.filter(
            (restaurant) => restaurant.id !== restaurantId
          );
        };
        deleteTheRestaurant();
        this.isProcessing = false;
        Toast.fire({
          icon: "success",
          title: "刪除餐廳成功",
        });
      } catch (error) {
        this.isProcessing = false;
        Toast.fire({
          icon: "error",
          title: "無法刪除餐廳，請稍後再試",
        });
      }
    },
  },
};
</script>