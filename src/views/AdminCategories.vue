<template>
  <div class="container py-5">
    <AdminNav />

    <form class="my-4">
      <div class="form-row">
        <div class="col-auto">
          <input
            v-model="newCategoryName"
            type="text"
            class="form-control"
            placeholder="新增餐廳類別..."
          />
        </div>
        <div class="col-auto">
          <button
            type="button"
            class="btn btn-primary"
            @click.stop.prevent="createCategory"
            :disabled="isProcessing === true"
          >
            {{ isProcessing ? "處理中" : "新增" }}
          </button>
        </div>
      </div>
    </form>
    <table class="table">
      <thead class="thead-dark">
        <tr>
          <th scope="col" width="60">#</th>
          <th scope="col">Category Name</th>
          <th scope="col" width="210">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <th scope="row">
            {{ category.id }}
          </th>
          <td class="position-relative">
            <div v-show="!category.isEditing" class="category-name">
              {{ category.name }}
            </div>
            <input
              v-show="category.isEditing"
              v-model="category.name"
              type="text"
              class="form-control"
            />
            <span
              v-show="category.isEditing"
              class="cancel"
              @click="handleCancel(category.id)"
            >
              ✕
            </span>
          </td>
          <td class="d-flex justify-content-between">
            <button
              v-show="!category.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="toggleIsEditing(category.id)"
            >
              Edit
            </button>
            <button
              v-show="category.isEditing"
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="
                updateCategory({ categoryId: category.id, name: category.name })
              "
            >
              Save
            </button>
            <button
              type="button"
              class="btn btn-link mr-2"
              @click.stop.prevent="deleteCategory(category.id)"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import AdminNav from "./../components/AdminNav.vue";
import adminAPI from "./../apis/admin";
import { Toast } from "./../utils/helpers";

export default {
  name: "AdminCategories",
  components: {
    AdminNav,
  },

  data() {
    return {
      newCategoryName: "",
      categories: [],
      isProcessing: false,
    };
  },
  created() {
    this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await adminAPI.categories.get();

        // 檢測
        if (response.statusText !== "OK") {
          throw new Error("無法載入餐廳分類，請稍後再試");
        }
        // 載入
        const allCategories = response.data;
        this.categories = allCategories.categories.map((category) => ({
          ...category,
          isEditing: false,
          nameCached: "",
        }));
      } catch (error) {
        Toast.fire({
          icon: "error",
          title: "無法載入餐廳分類，請稍後再試",
        });
      }
    },
    async createCategory() {
      try {
        // 執行中
        this.isProcessing = true;
        // 新輸入的類別名
        const name = this.newCategoryName;

        const { data } = await adminAPI.categories.create({ name });
        // 檢驗
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        // 新增
        this.categories.push({
          name: name,
          id: data.categoryId,
          isEditing: false,
        });
        // 新增完成後把輸入的類別名字刪掉
        this.newCategoryName = "";
        this.isProcessing = false;
      } catch (error) {
        this.isProcessing = false;
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法新增餐廳分類，請稍後再試",
        });
      }
    },
    async deleteCategory(categoryId) {
      try {
        const { data } = await adminAPI.categories.delete({ categoryId });
        // 檢驗
        if (data.status !== "success") {
          throw new Error(data.message);
        }

        // 將該餐廳類別從陣列中移除
        this.categories = this.categories.filter(
          (category) => category.id !== categoryId
        );
        Toast.fire({
          icon: "success",
          title: "成功刪除該餐廳類別",
        });
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法刪除餐廳分類，請稍後再試",
        });
      }
    },
    toggleIsEditing(categoryId) {
      // 找到正在編輯的那一筆
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,
            isEditing: !category.isEditing,
            // 暫存上一筆資料
            nameCached: category.name,
          };
        }
        return category;
      });
    },
    async updateCategory({ categoryId, name }) {
      try {
        const { data } = await adminAPI.categories.update({
          categoryId,
          name,
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        // 正在編輯的那筆變成編輯狀態樣式
        this.toggleIsEditing(categoryId);
      } catch (error) {
        console.log(error);
        Toast.fire({
          icon: "error",
          title: "無法更新餐廳分類，請稍後再試",
        });
      }
    },
    handleCancel(categoryId) {
      this.categories = this.categories.map((category) => {
        if (category.id === categoryId) {
          return {
            ...category,

            // 把原本的餐廳類別名稱還回去
            name: category.nameCached,
          };
        }

        return category;
      });

      this.toggleIsEditing(categoryId);
    },
  },
};
</script>

<style scoped>
.category-name {
  padding: 0.375rem 0.75rem;
  border: 1px solid transparent;
  outline: 0;
  cursor: auto;
}

.btn-link {
  width: 62px;
}

.cancel {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 25px;
  height: 25px;
  border: 1px solid #aaaaaa;
  border-radius: 50%;
  user-select: none;
  cursor: pointer;
  font-size: 12px;
}
</style>