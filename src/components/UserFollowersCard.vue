<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ followers.length }}</strong> followers (追隨者)
    </div>
    <div class="card-body">
      <a v-for="follower in followers" :key="follower.id" href="/users/2">
        <img :src="follower.image" width="60" height="60" class="avatar" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserFollowersCard",
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      followers: [],
    };
  },
  created() {
    this.fetchFollowers();
  },
  methods: {
    fetchFollowers() {
      this.followers = this.profile.Followers;
      console.log(this.followers);
    },
  },
};
</script>