<template>
  <div class="container py-5">
    <form class="w-100" @submit.prevent.stop="handleSubmit">
      <div class="text-center mb-4">
        <h1 class="h3 mb-3 font-weight-normal">Sign In</h1>
      </div>

      <div class="form-label-group mb-2">
        <label for="email">email</label>
        <input
          id="email"
          v-model="email"
          name="email"
          type="email"
          class="form-control"
          placeholder="email"
          autocomplete="username"
          required
          autofocus
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
          autocomplete="current-password"
          required
        />
      </div>

      <button
        class="btn btn-lg btn-primary btn-block mb-3"
        type="submit"
        :disabled="isProcessing"
      >
        Submit
      </button>

      <div class="text-center mb-3">
        <p>
          <router-link to="/signup"> Sign Up </router-link>
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
  name: "SingIn",
  data() {
    // 在 component 裡需要使用 function return 的方式來回傳資料
    return {
      email: "",
      password: "",
      isProcessing: false,
    };
  },
  methods: {
    async handleSubmit() {
      try {
        // 都沒輸入
        if (!this.email || !this.password) {
          Toast.fire({
            icon: "warning",
            title: "請填入 email 和 password",
          });
          return;
        }
        // 開放
        this.isProcessing = true;

        //有輸入開始請求
        const response = await authorizationAPI.signIn({
          // 使用 JSON 格式
          email: this.email,
          password: this.password,
        });

        const { data } = response;

        // 如果 response 中的 status 不是 success 就失敗，throw 出警告訊息
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        // 將 response 中的 token 存放在 localStorage 內
        localStorage.setItem("token", data.token);
        // data.user 為 response 裡面的資料。
        // 將被 data.user 更新過的資料傳給 Vuex，並存在 state 裡。
        this.$store.commit("setCurrentUser", data.user);

        // 成功登入後轉址到餐廳首頁
        // 因為成功登入就會轉址，所以不用還原 isProcessing 的狀態
        this.$router.push("/restaurants");
      } catch (error) {
        // 因為登入失敗，所以要把按鈕狀態還原
        this.isProcessing = false;
        // 將密碼欄位清空
        this.password = "";
        // 顯示錯誤提示
        console.log("error", error);
        Toast.fire({
          icon: "warning",
          title: "請確認您輸入了正確的帳號密碼",
        });
      }
    },
  },
};

/*

Promise 寫法：

    handleSubmit() {
      // 使用 authorizationAPI 中的 signIn
      authorizationAPI
        .signIn({
          // 使用 JSON 格式
          email: this.email,
          password: this.password,
        })
        .then((response) => {
          // TODO: 向 API 請求後，取得資料 (response)
          const { data } = response;
          // 如果 response 中的 status 不是 success 就失敗，throw 出警告訊息
          if (data.status !== "success") {
            throw new Error(data.message);
          }

          // 將 response 中的 token 存放在 localStorage 內
          localStorage.setItem("token", data.token);
          // 成功登入後轉址到餐廳首頁
          // 因為成功登入就會轉址，所以不用還原 isProcessing 的狀態
          this.$router.push("/restaurants");
        })
        .catch((error) => {
          // 將密碼欄位清空
          this.password = "";
          // 顯示錯誤提示
          Toast.fire({
            icon: "warning",
            title: "請確認您輸入了正確的帳號密碼",
          });
          // 因為登入失敗，所以要把按鈕狀態還原
          this.isProcessing = false;
          console.log("error", error);
        });
    },




*/
</script>