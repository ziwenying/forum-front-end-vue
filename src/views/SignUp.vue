<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign Up</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="name">Name</label>
        <input
          id="name"
          v-model="name"
          name="name"
          type="text"
          class="form-control"
          placeholder="name"
          autocomplete="username"
          required
          autofocus
        />
      </div>

      <div class="form-label-group mb-2">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="email"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          name="password"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
        />
      </div>

      <div class="form-label-group mb-3">
        <label for="password-check">Password Check</label>
        <input
          id="password-check"
          v-model="passwordCheck"
          name="passwordCheck"
          type="password"
          class="form-control"
          placeholder="Password"
          autocomplete="new-password"
          required
        />
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing === true"
      >
        {{ isProcessing ? "處理中" : "Submit" }}
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signin"> Sign In </router-link>
        </p>
      </div>

      <p class="mt-5 mb-3 text-muted text-center">&copy; 2017-2018</p>
    </form>
  </div>
</template>

<script>
import authorizationAPI from "./../apis/authorization";
import { Toast } from "./../utils/helpers";

export default {
  name: "SingUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordCheck: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // 變成處理中
        this.isProcessing = true;

        //註冊輸入的資料
        const formData = {
          name: this.name,
          email: this.email,
          password: this.password,
          passwordCheck: this.passwordCheck,
        };

        // 檢驗 1
        if (
          !this.name ||
          !this.email ||
          !this.password ||
          !this.passwordCheck
        ) {
          this.isProcessing = false;
          Toast.fire({
            icon: "warning",
            title: "請輸入完整資料",
          });
          return;
        } else if (this.password !== this.passwordCheck) {
          this.isProcessing = false;
          Toast.fire({
            icon: "warning",
            title: "請輸入相同密碼",
          });
          return;
        }

        const { data } = await authorizationAPI.create({ formData });

        // 檢驗 2
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        //成功轉址到 `/restaurants`
        this.$router.push({ name: "restaurants" });
      } catch (error) {
        this.isProcessing = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "註冊失敗，請稍後再試",
        });
      }
    },
  },
};
</script>