<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ profile.commentsLength }}</strong> 已評論餐廳
    </div>
    <div class="card-body">
      <router-link
        :to="{ name: 'restaurant', params: comments.RestaurantId }"
        v-for="comment in comments"
        :key="comment.id"
      >
        <img
          :src="comment.Restaurant.image | emptyImage"
          width="60"
          height="60"
          class="avatar mr-1 mb-1"
        />
      </router-link>
    </div>
  </div>
</template>

<script>
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "UserCommentsCard",
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
      comments: [],
    };
  },
  watch: {
    profile() {
      this.fetchComments();
    },
  },
  created() {
    this.fetchComments();
  },
  methods: {
    fetchComments() {
      this.comments = this.profile.comments;
    },
  },
};
</script>