<template>
  <div class="container py-5">
    <UserProfileCard :profile="profile" :initialIsFollowed="isFollowed" />
    <div class="row">
      <div class="col-md-4">
        <!-- followings card -->
        <UserFollowingsCard :profile="profile" />
        <br />
        <!-- followers card -->
        <UserFollowersCard :profile="profile" />
      </div>
      <div class="col-md-8">
        <!-- UserCommentsCard -->
        <UserCommentsCard :profile="profile" />
        <br />
        <!-- UserFavoritedRestaurantsCard -->
        <UserFavoritedRestaurantsCard :profile="profile" />
      </div>
    </div>
  </div>
</template>

<script>
import UserProfileCard from "./../components/UserProfileCard.vue";
import UserFollowingsCard from "./../components/UserFollowingsCard.vue";
import UserFollowersCard from "./../components/UserFollowersCard.vue";
import UserCommentsCard from "./../components/UserCommentsCard.vue";
import UserFavoritedRestaurantsCard from "./../components/UserFavoritedRestaurantsCard.vue";

import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "User",
  components: {
    UserProfileCard,
    UserFollowingsCard,
    UserFollowersCard,
    UserCommentsCard,
    UserFavoritedRestaurantsCard,
  },
  data() {
    return {
      profile: {
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
      },
      isFollowed: false,
    };
  },
  created() {
    const { id: userId } = this.$route.params;
    this.fetchUsers(userId);
  },
  beforeRouteUpdate(to, from, next) {
    const { id: userId } = to.params;
    this.fetchUsers(userId);
    next();
  },
  methods: {
    async fetchUsers(userId) {
      try {
        const response = await usersAPI.get({ userId });
        // 檢驗
        if (response.statusText !== "OK") {
          throw new Error("無法顯示個人頁面，請稍後再試");
        }
        const { profile, isFollowed } = response.data;
        this.profile = {
          ...this.profile,
          id: profile.id,
          image: profile.image,
          name: profile.name,
          email: profile.email,
          comments: profile.Comments,
          FavoritedRestaurants: profile.FavoritedRestaurants,
          Followers: profile.Followers,
          Followings: profile.Followings,
          followingsLength: profile.Followings.length,
          followersLength: profile.Followers.length,
          commentsLength: profile.Comments.length,
          favoritedRestaurantsLength: profile.FavoritedRestaurants.length,
        };
        this.isFollowed = isFollowed;
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法顯示個人頁面，請稍後再試",
        });
      }
    },
  },
};
</script>