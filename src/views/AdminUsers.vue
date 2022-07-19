<template>
  <div class="container py-5">
    <!-- AdminNav Component -->
    <AdminNav />
    <table class="table">
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
// import { v4 as uuidv4 } from "uuid";

const dummyData = {
  users: [
    {
      id: 1,
      name: "root",
      email: "root@example.com",
      password: "$2a$10$mnvbkPzs2c29EEhgYJRLdOmutjcjLVYFhGQg5Lt1R8DPTD9as5Gsi",
      isAdmin: true,
      image: null,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
    },
    {
      id: 2,
      name: "user1",
      email: "user1@example.com",
      password: "$2a$10$Pk1gxJ1B2IbjSGm2aFW0IO.aKHzzdm9HtjU0CsYqsnV7BIV7z7FRC",
      isAdmin: false,
      image: null,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
    },
    {
      id: 3,
      name: "user2",
      email: "user2@example.com",
      password: "$2a$10$3ZhJowb82ehqktuOG3O7UOHqFjlmzSFDjbkr5x.xPjwL72L6gfzeO",
      isAdmin: false,
      image: null,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
    },
  ],
};

const dummyUser = {
  id: 1,
  name: "root",
  email: "root@example.com",
  password: "$2a$10$mnvbkPzs2c29EEhgYJRLdOmutjcjLVYFhGQg5Lt1R8DPTD9as5Gsi",
  isAdmin: true,
  image: null,
  createdAt: "2022-07-04T00:55:09.000Z",
  updatedAt: "2022-07-04T00:55:09.000Z",
};

export default {
  name: "AdminUsers",
  components: {
    AdminNav,
  },
  data() {
    return {
      users: [],
      currentUser: {},
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      this.currentUser = dummyUser;

      this.users = dummyData.users;
    },
    changeRole({ userId, isAdmin }) {
      this.users = this.users.map((user) => {
        return user.id === userId
          ? {
              ...user,
              isAdmin: !isAdmin,
            }
          : user;
      });
    },
  },
};
</script>