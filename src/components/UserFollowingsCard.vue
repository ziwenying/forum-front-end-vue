<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ profile.followingsLength }}</strong> followings (追蹤者)
    </div>
    <div class="card-body">
      <router-link
        v-for="following in followings"
        :key="following.id"
        :to="{
          name: 'user',
          params: following.id,
        }"
      >
        <img
          :src="following.image | emptyImage"
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
  name: "UserFollowingsCard",
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
      followings: [],
    };
  },
  watch: {
    profile() {
      this.fetchFollowings();
    },
  },
  created() {
    this.fetchFollowings();
  },
  methods: {
    fetchFollowings() {
      this.followings = this.profile.Followings;
    },
  },
};
</script>