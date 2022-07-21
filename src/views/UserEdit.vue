<template>
  <div class="container py-5">
    <form @submit.stop.prevent="handleSubmit">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          v-model="user.name"
          id="name"
          type="text"
          name="name"
          class="form-control"
          placeholder="Enter Name"
          required
        />
      </div>

      <div class="form-group">
        <label for="image">Image</label>
        <img
          v-if="user.image"
          :src="user.image"
          class="d-block img-thumbnail mb-3"
          width="200"
          height="200"
        />
        <input
          id="image"
          type="file"
          name="image"
          accept="image/*"
          class="form-control-file"
          @change="handleFileChange"
        />
      </div>

      <button type="submit" class="btn btn-primary" :disabled="isProcessing">
        {{ isProcessing ? "資料更新中..." : "Submit" }}
      </button>
    </form>
  </div>
</template>

<script>
import { mapState } from "vuex";
import usersAPI from "./../apis/users";
import { Toast } from "./../utils/helpers";

export default {
  name: "UserEdit",
  data() {
    return {
      user: {
        id: -1,
        name: "",
        image: "",
      },
      isProcessing: false,
    };
  },
  watch: {
    currentUser() {
      if (this.currentUser.id === -1) return;
      const { id } = this.$route.params;
      this.setUser(id);
    },
  },
  created() {
    if (this.currentUser.id === -1) return;
    const { id } = this.$route.params;
    this.setUser(id);
  },
  beforeRouteUpdate(to, from, next) {
    if (this.currentUser.id === -1) return;
    const { id } = to.params;
    this.setUser(id);
    next();
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    setUser(userId) {
      if (userId.toString() !== this.currentUser.id.toString()) {
        this.$router.push({ name: "not-found" });
      }

      this.user = {
        ...this.user,
        id: this.currentUser.id,
        name: this.currentUser.name,
        image: this.currentUser.image,
      };
      console.log(this.currentUser);
    },
    handleFileChange(e) {
      const { files } = e.target;

      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.user.image = "";
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.image = imageURL;
        console.log(imageURL);
      }
    },
    async handleSubmit(e) {
      try {
        this.isProcessing = true;

        if (!this.user.name) {
          Toast.fire({
            icon: "warning",
            title: "請輸入姓名",
          });
        }

        const userId = this.currentUser.id;
        const form = e.target; // 送出的表單
        const formData = new FormData(form);

        const { data } = await usersAPI.update({ userId, formData });

        // 檢驗
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.isProcessing = false;
        // 轉址
        this.$router.push({ name: "user", params: { id: userId } });
      } catch (error) {
        this.isProcessing = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法編輯姓名，請稍後再試",
        });
      }
    },
  },
};
</script>