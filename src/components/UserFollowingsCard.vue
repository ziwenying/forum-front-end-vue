<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ followings.length }}</strong> followings (追蹤者)
    </div>
    <div class="card-body">
      <a href="/users/2" v-for="following in followings" :key="following.id">
        <img :src="following.image" width="60" height="60" class="avatar" />
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "UserFollowingsCard",
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      followings: [],
    };
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