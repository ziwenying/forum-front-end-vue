<template>
  <div class="col-md-6 col-lg-4">
    <div class="card mb-4">
      <img
        class="card-img-top"
        :src="restaurant.image"
        alt="Card image cap"
        width="286px"
        height="180px"
      />
      <div class="card-body">
        <p class="card-text title-wrap">
          <!-- name: 'restaurant' 是 index.js 裡面的 name -->
          <router-link
            :to="{ name: 'restaurant', params: { id: restaurant.id } }"
          >
            {{ restaurant.name }}
          </router-link>
        </p>
        <span class="badge badge-secondary">{{
          restaurant.Category.name
        }}</span>
        <p class="card-text text-truncate">
          {{ restaurant.description }}
        </p>
      </div>
      <div class="card-footer">
        <button
          v-if="restaurant.isFavorited"
          type="button"
          class="btn btn-danger btn-border favorite mr-2"
          @click.stop.prevent="deleteFavorite(restaurant.id)"
        >
          移除最愛
        </button>
        <button
          v-else
          type="button"
          class="btn btn-primary btn-border favorite mr-2"
          @click.stop.prevent="addFavorite(restaurant.id)"
        >
          加到最愛
        </button>
        <button
          v-if="restaurant.isLiked"
          type="button"
          class="btn btn-danger like mr-2"
          @click.stop.prevent="deleteLike(restaurant.id)"
        >
          Unlike
        </button>
        <button
          v-else
          type="button"
          class="btn btn-primary like mr-2"
          @click.stop.prevent="addLike(restaurant.id)"
        >
          Like
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "RestaurantCard",
  props: {
    initialRestaurant: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
    };
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.addFavorite({ restaurantId });
        // 檢測
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        // 加入
        this.restaurant = {
          ...this.restaurant,
          isFavorited: true,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法加到我的最愛，請稍後再試",
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const { data } = await usersAPI.deleteFavorite({ restaurantId });
        // 檢測
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        // 移除
        this.restaurant = {
          ...this.restaurant,
          isFavorited: false,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法從我的最愛刪除，請稍後再試",
        });
      }
    },
    async addLike(restaurantId) {
      try {
        const { data } = await usersAPI.addLike({ restaurantId });
        // 檢測
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        // 加入
        this.restaurant = {
          ...this.restaurant,
          isLiked: true,
        };
        console.log(data.status);
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法從我的喜愛清單刪除，請稍後再試",
        });
      }
    },
    async deleteLike(restaurantId) {
      try {
        const { data } = await usersAPI.deleteLike({ restaurantId });
        // 檢測
        console.log(data.status);
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        // 移除
        this.restaurant = {
          ...this.restaurant,
          isLiked: false,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法從我的喜愛清單刪除，請稍後再試",
        });
      }
    },
  },
};
</script>