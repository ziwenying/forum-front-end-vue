<template>
  <div class="container py-5">
    <NavTabs />
    <h1>餐廳描述頁</h1>
    <!-- 餐廳資訊頁 RestaurantDetail -->
    <RestaurantDetail :initial-restaurant="restaurant" />
    <hr />
    <!-- 餐廳評論 RestaurantComments -->
    <RestaurantComments
      :restaurant-comments="restaurantComments"
      @after-delete-comment="afterDeleteComment"
    />
    <!-- 新增評論 CreateComment -->
    <CreateComment
      :restaurant-id="restaurant.id"
      @after-create-comment="afterCreateComment"
    />
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs.vue";
import RestaurantDetail from "./../components/RestaurantDetail.vue";
import RestaurantComments from "./../components/RestaurantComments.vue";
import CreateComment from "./../components/CreateComment .vue";

const dummyData = {
  restaurant: {
    id: 2,
    name: "Miss Eleazar Goodwin",
    tel: "407-096-6842 x8730",
    address: "813 Ankunding Forges",
    opening_hours: "08:00",
    description: "omnis",
    image:
      "https://loremflickr.com/320/240/restaurant,food/?random=66.29550100784051",
    viewCounts: 0,
    createdAt: "2022-07-04T00:55:09.000Z",
    updatedAt: "2022-07-04T00:55:09.000Z",
    CategoryId: 1,
    Category: {
      id: 1,
      name: "中式料理",
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
    },
    Comments: [
      {
        id: 102,
        text: "Modi et possimus consequatur mollitia earum.",
        UserId: 1,
        RestaurantId: 2,
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
        User: {
          id: 1,
          name: "root",
          email: "root@example.com",
          password:
            "$2a$10$mnvbkPzs2c29EEhgYJRLdOmutjcjLVYFhGQg5Lt1R8DPTD9as5Gsi",
          isAdmin: true,
          image: null,
          createdAt: "2022-07-04T00:55:09.000Z",
          updatedAt: "2022-07-04T00:55:09.000Z",
        },
      },
      {
        id: 2,
        text: "In et error eius ut neque.",
        UserId: 3,
        RestaurantId: 2,
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
        User: {
          id: 3,
          name: "user2",
          email: "user2@example.com",
          password:
            "$2a$10$3ZhJowb82ehqktuOG3O7UOHqFjlmzSFDjbkr5x.xPjwL72L6gfzeO",
          isAdmin: false,
          image: null,
          createdAt: "2022-07-04T00:55:09.000Z",
          updatedAt: "2022-07-04T00:55:09.000Z",
        },
      },
      {
        id: 52,
        text: "Itaque quo impedit nesciunt aut ipsum ipsa.",
        UserId: 3,
        RestaurantId: 2,
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
        User: {
          id: 3,
          name: "user2",
          email: "user2@example.com",
          password:
            "$2a$10$3ZhJowb82ehqktuOG3O7UOHqFjlmzSFDjbkr5x.xPjwL72L6gfzeO",
          isAdmin: false,
          image: null,
          createdAt: "2022-07-04T00:55:09.000Z",
          updatedAt: "2022-07-04T00:55:09.000Z",
        },
      },
    ],
  },
  currentUser: {
    id: 1,
    name: "管理者",
    email: "root@example.com",
    image: "https://i.pravatar.cc/300",
    isAdmin: true,
  },
  isAuthenticated: true,
};

export default {
  name: "Restaurant",
  components: {
    NavTabs,
    RestaurantDetail,
    RestaurantComments,
    CreateComment,
  },
  data() {
    return {
      restaurant: {
        id: -1,
        name: "",
        tel: "",
        address: "",
        openingHours: "",
        description: "",
        categoryName: "",
        image: "",
        isFavorited: false,
        isLiked: false,
      },
      restaurantComments: [],
      currentUser: dummyData.currentUser,
    };
  },
  created() {
    // 透過路由取得要顯示的餐廳 Id
    const { id: restaurantId } = this.$route.params;
    this.fetchRestaurant(restaurantId);
  },
  methods: {
    fetchRestaurant(restaurantId) {
      console.log("fetchRestaurant id: ", restaurantId);

      this.restaurant = {
        id: dummyData.restaurant.id,
        name: dummyData.restaurant.name,
        tel: dummyData.restaurant.tel,
        address: dummyData.restaurant.address,
        openingHours: dummyData.restaurant.opening_hours,
        description: dummyData.restaurant.description,
        categoryName: dummyData.restaurant.Category.name,
        image: dummyData.restaurant.image,
        isFavorited: dummyData.isFavorited,
        isLiked: dummyData.isLiked,
      };

      this.restaurantComments = dummyData.restaurant.Comments;
    },
    afterDeleteComment(commentId) {
      // 以 filter 保留未被選擇的 comment.id
      this.restaurantComments = this.restaurantComments.filter(
        (comment) => comment.id !== commentId
      );
    },
    afterCreateComment(payload) {
      const { commentId, restaurantId, text } = payload;

      // 新增的評論資料加進 restaurantComments
      this.restaurantComments.push({
        id: commentId,
        RestaurantId: restaurantId,
        User: {
          id: this.currentUser.id,
          name: this.currentUser.name,
        },
        // text: text 的縮寫
        text,
        // 直接抓當下的時間
        createdAt: new Date(),
      });
      console.log("restaurantComments", this.restaurantComments);
    },
  },
};
</script>