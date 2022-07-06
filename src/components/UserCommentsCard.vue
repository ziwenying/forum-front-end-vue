<template>
  <div class="card">
    <div class="card-header">
      <strong>{{ comments.length }}</strong> 已評論餐廳
    </div>
    <div class="card-body">
      <a href="/restaurants/2" v-for="comment in comments" :key="comment.id">
        <img
          :src="comment.Restaurant.image"
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
  name: "UserCommentsCard",
  props: {
    profile: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      comments: [],
    };
  },
  created() {
    this.fetchComments();
  },
  methods: {
    fetchComments() {
      this.comments = this.profile.Comments;
      console.log(this.comments);
    },
  },
};
</script>