<template>
  <div class="container py-5">
    <NavTabs />
    <Spinner v-if="isLoading" />
    <template>
      <h1 class="mt-5">美食達人</h1>
      <hr />
      <div class="row text-center">
        <div v-for="user in users" :key="user.id" class="col-3">
          <router-link :to="{ name: 'user', params: { id: user.id } }">
            <img :src="user.image | emptyImage" width="140px" height="140px" />
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
    </template>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs.vue";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner.vue";
import { emptyImageFilter } from "./../utils/mixins";

export default {
  name: "UsersTop",
  mixins: [emptyImageFilter],
  components: {
    NavTabs,
    Spinner,
  },
  data() {
    return {
      users: [],
      isLoading: true,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        this.isLoading = true;
        const response = await usersAPI.getTopUsers();
        // 檢測
        if (response.statusText !== "OK") {
          throw new Error("無法載入美食達人頁面，請稍後再試");
        }
        this.users = response.data.users;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        Toast.fire({
          icon: "error",
          title: "無法載入美食達人頁面，請稍後再試",
        });
      }
    },
    async addFollowed(userId) {
      try {
        const data = await usersAPI.addFollowing({ userId });
        // 檢測
        if (data.statusText !== "OK") {
          throw new Error("無法追蹤此美食達人，請稍後再試");
        }
        // 追蹤
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
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法追蹤此美食達人，請稍後再試",
        });
      }
    },
    async deleteFollowed(userId) {
      try {
        const data = await usersAPI.deleteFollowing({ userId });
        console.log(data);
        // 檢測
        if (data.statusText !== "OK") {
          throw new Error("無法追蹤此美食達人，請稍後再試");
        }
        // 取消追蹤
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
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法取消追蹤，請稍後再試",
        });
      }
    },
  },
};
</script>