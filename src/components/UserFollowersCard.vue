<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ profile.followersLength }}</strong> followers (追隨者)
    </div>
    <div class="card-body">
      <router-link
        v-for="follower in followers"
        :key="follower.id"
        :to="{
          name: 'user',
          params: follower.id,
        }"
      >
        <img
          :src="follower.image | emptyImage"
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
  name: "UserFollowersCard",
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
      followers: [],
    };
  },
  watch: {
    profile() {
      this.fetchFollowers();
    },
  },
  created() {
    this.fetchFollowers();
  },
  methods: {
    fetchFollowers() {
      this.followers = this.profile.Followers;
    },
  },
};
</script>