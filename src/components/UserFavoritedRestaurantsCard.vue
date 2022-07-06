<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ favoritedRestaurants.length }}</strong> 收藏的餐廳
    </div>
    <div class="card-body">
      <a
        href="/restaurants/23"
        v-for="favoritedRestaurant in favoritedRestaurants"
        :key="favoritedRestaurant.id"
      >
        <img
          :src="favoritedRestaurant.image"
          width="60"
          height="60"
          class="avatar"
        />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserFavoritedRestaurantsCard",
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      favoritedRestaurants: [],
    };
  },
  created() {
    this.fetchComments();
  },
  methods: {
    fetchComments() {
      this.favoritedRestaurants = this.profile.FavoritedRestaurants;
      console.log(this.favoritedRestaurants);
    },
  },
};
</script>