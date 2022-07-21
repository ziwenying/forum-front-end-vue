<template>
  <form @submit.stop.prevent="handleSubmit">
    <div class="form-group mb-4">
      <label for="text">留下評論：</label>
      <textarea v-model="text" class="form-control" rows="3" name="text" />
    </div>
    <div class="d-flex align-items-center justify-content-between">
      <button type="button" class="btn btn-link" @click="$router.back()">
        回上一頁
      </button>
      <button type="submit" class="btn btn-primary mr-0">Submit</button>
    </div>
  </form>
</template>

<script>
import commentsAPI from "./../apis/comments";
import { Toast } from "./../utils/helpers";

export default {
  name: "CreateComment",
  props: {
    restaurantId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      text: "",
    };
  },
  methods: {
    async handleSubmit() {
      try {
        if (!this.text) {
          Toast.fire({
            icon: "warning",
            title: "請輸入留言",
          });
          throw new Error("請輸入留言");
        }

        const response = await commentsAPI.create({
          restaurantId: this.restaurantId,
          text: this.text,
        });

        // 檢驗
        if (response.data.status !== "success") {
          throw new Error(response.data);
        }

        const data = response.data;
        this.$emit("after-create-comment", {
          commentId: data.commentId,
          restaurantId: this.restaurantId,
          text: this.text,
        });
        this.text = ""; // 將表單內的資料清空
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法新增留言，請稍後再試",
        });
      }
    },
  },
};
</script>