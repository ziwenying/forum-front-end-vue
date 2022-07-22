<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />
    <Spinner v-if="isLoading" />
    <table v-else class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col" width="140">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <th scope="row">{{ user.id }}</th>
          <td>{{ user.email }}</td>
          <td>{{ user.isAdmin ? "admin" : "user" }}</td>
          <td>
            <button
              v-show="user.id !== currentUser.id"
              @click="changeRole({ userId: user.id, isAdmin: user.isAdmin })"
              type="button"
              class="btn btn-link"
            >
              {{ user.isAdmin ? "set as user" : "set as admin" }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "./../components/AdminNav.vue";
import { mapState } from "vuex";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";
import Spinner from "./../components/Spinner.vue";

export default {
  name: "AdminUsers",
  components: {
    AdminNav,
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
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    async fetchUsers() {
      try {
        this.isLoading = true;
        const response = await adminAPI.users.get();

        // 檢驗
        if (response.statusText !== "OK") {
          throw new Error("無法取得使用者資料，請稍後再試");
        }

        const data = response.data;
        this.users = data.users;

        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法取得使用者資料，請稍後再試",
        });
      }
    },
    async changeRole({ userId, isAdmin }) {
      try {
        const { data } = await adminAPI.users.update({
          userId,
          // boolean 記得要轉字串，不然會是 false
          isAdmin: (!isAdmin).toString(),
        });
        // 檢驗
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.users = this.users.map((user) => {
          return user.id === userId
            ? {
                ...user,
                isAdmin: !isAdmin,
              }
            : user;
        });
        console.log(this.users);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法更改使用者權限，請稍後再試",
        });
      }
    },
  },
};
</script>