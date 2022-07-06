<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">美食達人</h1>
    <hr />
    <div class="row text-center">
      <div v-for="user in users" :key="user.id" class="col-3">
        <router-link :to="{ name: 'user', params: { id: user.id } }">
          <img :src="user.image" width="140px" height="140px" />
        </router-link>
        <h2>{{ user.name }}</h2>
        <span class="badge badge-secondary"
          >追蹤人數：{{ user.FollowerCount }}</span
        >
        <p class="mt-3">
          <button
            v-if="user.isFollowed"
            @click.stop.prevent="deleteFollowed(user.id)"
            type="button"
            class="btn btn-danger"
          >
            取消追蹤
          </button>
          <button
            v-else
            @click.stop.prevent="addFollowed(user.id)"
            type="button"
            class="btn btn-primary"
          >
            追蹤
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs.vue";

const dummyData = {
  users: [
    {
      id: 1,
      name: "root",
      email: "root@example.com",
      password: "$2a$10$mnvbkPzs2c29EEhgYJRLdOmutjcjLVYFhGQg5Lt1R8DPTD9as5Gsi",
      isAdmin: true,
      image:
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/392330767/android/sticker.png",
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      Followers: [],
      FollowerCount: 0,
      isFollowed: false,
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$Pk1gxJ1B2IbjSGm2aFW0IO.aKHzzdm9HtjU0CsYqsnV7BIV7z7FRC",
      isAdmin: false,
      image:
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/392330768/android/sticker.png",
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      Followers: [],
      FollowerCount: 0,
      isFollowed: false,
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$3ZhJowb82ehqktuOG3O7UOHqFjlmzSFDjbkr5x.xPjwL72L6gfzeO",
      isAdmin: false,
      image:
        "https://stickershop.line-scdn.net/stickershop/v1/sticker/392330766/android/sticker.png",
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      Followers: [],
      FollowerCount: 0,
      isFollowed: false,
    },
  ],
};

export default {
  name: "UsersTop",
  components: {
    NavTabs,
  },
  data() {
    return {
      users: [],
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      const { users } = dummyData;
      this.users = users;
    },
    addFollowed(userId) {
      const addTheUser = () => {
        this.users = this.users.map((user) => {
          return userId === user.id
            ? {
                ...user,
                FollowerCount: user.FollowerCount + 1,
                isFollowed: true,
              }
            : user;
        });
      };
      addTheUser();
    },
    deleteFollowed(userId) {
      const deleteTheUser = () => {
        this.users = this.users.map((user) => {
          return userId === user.id
            ? {
                ...user,
                FollowerCount: user.FollowerCount - 1,
                isFollowed: false,
              }
            : user;
        });
      };
      deleteTheUser();
    },
  },
};
</script>