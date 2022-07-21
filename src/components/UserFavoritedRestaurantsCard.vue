<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ profile.favoritedRestaurantsLength }}</strong> 收藏的餐廳
    </div>
    <div class="card-body">
      <div>
        <router-link
          v-for="favoritedRestaurant in favoritedRestaurants"
          :key="favoritedRestaurant.id"
          :to="{
            name: 'restaurant',
            params: favoritedRestaurant.Favorite.RestaurantId,
          }"
        >
          <img
            :src="favoritedRestaurant.image | emptyImage"
            width="60"
            height="60"
            class="avatar mr-1 mb-1"
          />
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "UserFavoritedRestaurantsCard",
  mixins: [emptyImageFilter],
  props: {
    profile: {
      type: Object,
      default: () => ({
        id: -1,
        image: "null",
        name: "",
        email: "",
        comments: [],
        FavoritedRestaurants: [],
        Followers: [],
        Followings: [],
        followingsLength: 0,
        followersLength: 0,
        commentsLength: 0,
        favoritedRestaurantsLength: 0,
      }),
    },
  },
  data() {
    return {
      favoritedRestaurants: [],
    };
  },
  watch: {
    profile() {
      this.fetchfavoritedRestaurants();
    },
  },
  created() {
    this.fetchfavoritedRestaurants();
  },
  methods: {
    fetchfavoritedRestaurants() {
      this.favoritedRestaurants = this.profile.FavoritedRestaurants;
    },
  },
};
</script>