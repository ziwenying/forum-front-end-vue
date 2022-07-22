<template>
  <div class="row">
    <div class="col-md-12 mb-3">
      <h1>{{ restaurant.name }}</h1>
      <p class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.categoryName }}
      </p>
    </div>
    <div class="col-lg-4">
      <img
        class="img-responsive center-block"
        :src="restaurant.image"
        style="width: 250px; margin-bottom: 25px"
      />
      <div class="contact-info-wrap">
        <ul class="list-unstyled">
          <li>
            <strong>Opening Hour:</strong>
            {{ restaurant.openingHours }}
          </li>
          <li>
            <strong>Tel:</strong>
            {{ restaurant.tel }}
          </li>
          <li>
            <strong>Address:</strong>
            {{ restaurant.address }}
          </li>
        </ul>
      </div>
    </div>
    <div class="col-lg-8">
      <p>{{ restaurant.description }}</p>
      <router-link
        class="btn btn-primary btn-border mr-2"
        :to="{ name: 'restaurant-dashboard', params: { id: restaurant.id } }"
        >Dashboard</router-link
      >

      <button
        v-if="restaurant.isFavorited"
        @click.stop.prevent="deleteFavorite(restaurant.id)"
        type="button"
        class="btn btn-danger btn-border mr-2"
      >
        移除最愛
      </button>
      <button
        v-else
        @click.stop.prevent="addFavorite(restaurant.id)"
        type="button"
        class="btn btn-primary btn-border mr-2"
      >
        加到最愛
      </button>
      <button
        v-if="restaurant.isLiked"
        @click.stop.prevent="deleteLike(restaurant.id)"
        type="button"
        class="btn btn-danger like mr-2"
      >
        Unlike
      </button>
      <button
        v-else
        @click.stop.prevent="addLike(restaurant.id)"
        type="button"
        class="btn btn-primary like mr-2"
      >
        Like
      </button>
    </div>
  </div>
</template>

<script>
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "RestaurantDetail",
  props: {
    initialRestaurant: {
      type: Object,
      require: true,
    },
  },
  data() {
    return {
      restaurant: this.initialRestaurant,
    };
  },
  // 畫面沒更新是因為使用非同步方法呼叫 API 時，"此元件"在拿到後端回應之前，父元件就直接把 initialRestaurant 傳給此元件了，因此這個子元件沒有拿到 API 資料。
  // 需要透過 watch 來監聽資料變動
  watch: {
    initialRestaurant(newValue) {
      this.restaurant = {
        ...this.restaurant,
        ...newValue,
      };
    },
  },
  methods: {
    async addFavorite(restaurantId) {
      try {
        const data = await usersAPI.addFavorite({ restaurantId });
        // 檢測
        if (data.statusText !== "OK") {
          throw new Error("無法追蹤此美食達人，請稍後再試");
        }
        this.restaurant = {
          ...this.restaurant,
          isFavorited: true,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入最愛，請稍後再試",
        });
      }
    },
    async deleteFavorite(restaurantId) {
      try {
        const data = await usersAPI.deleteFavorite({ restaurantId });
        // 檢測
        if (data.statusText !== "OK") {
          throw new Error("無法將餐廳從最愛中刪除，請稍後再試");
        }

        this.restaurant = {
          ...this.restaurant,
          isFavorited: false,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳從最愛中刪除，請稍後再試",
        });
      }
    },
    async addLike(restaurantId) {
      try {
        const data = await usersAPI.addLike({ restaurantId });
        // 檢測
        if (data.statusText !== "OK") {
          throw new Error("無法將餐廳加入喜歡，請稍後再試");
        }
        this.restaurant = {
          ...this.restaurant,
          isLiked: true,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳加入喜歡，請稍後再試",
        });
      }
    },
    async deleteLike(restaurantId) {
      try {
        const data = await usersAPI.deleteLike({ restaurantId });
        // 檢測
        if (data.statusText !== "OK") {
          throw new Error("無法將餐廳從喜歡中刪除，請稍後再試");
        }

        this.restaurant = {
          ...this.restaurant,
          isLiked: false,
        };
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法將餐廳從喜歡中刪除，請稍後再試",
        });
      }
    },
  },
};
</script>

<style scoped>
.col-lg-8 p,
.contact-info-wrap li,
.contact-info-wrap strong {
  font-family: serif;
  font-size: 17px;
}
</style>