<template>
  <div class="container py-5">
    <!-- 餐廳表單 AdminRestaurantForm -->
    <AdminRestaurantForm
      :is-processing="isProcessing"
      @after-submit="handleAfterSubmit"
    />
  </div>
</template>

<script>
import AdminRestaurantForm from "./../components/AdminRestaurantForm.vue";

import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  name: "AdminRestaurantNew",
  components: {
    AdminRestaurantForm,
  },
  data() {
    return {
      isProcessing: false,
    };
  },
  methods: {
    async handleAfterSubmit(formData) {
      try {
        // 變成處理中
        this.isProcessing = true;

        const { data } = await adminAPI.restaurants.create({ formData });
        console.log(formData, { formData });
        // 檢驗
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        //成功轉址到 `/admin/restaurants`
        this.$router.push({ name: "admin-restaurants" });
      } catch (error) {
        this.isProcessing = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "新餐廳建立失敗，請稍後再試",
        });
      }
    },
  },
};
</script>