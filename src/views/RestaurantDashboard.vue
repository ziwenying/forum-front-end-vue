<template>
  <div class="container py-5">
    <NavTabs />
    <div>
      <h1>{{ restaurant.name }}</h1>
      <span class="badge badge-secondary mt-1 mb-3">
        {{ restaurant.Category.name }}
      </span>
    </div>

    <hr />

    <ul>
      <li>評論數： {{ restaurant.Comments.length }}</li>
      <li>瀏覽次數： {{ restaurant.viewCounts }}</li>
    </ul>

    <button type="button" class="btn btn-link" @click="$router.back()">
      回上一頁
    </button>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";

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
};

export default {
  name: "RestaurantDashboard",
  components: {
    NavTabs,
  },
  data() {
    return {
      restaurant: {},
    };
  },
  created() {
    this.fetchRestaurant();
  },
  methods: {
    fetchRestaurant() {
      this.restaurant = dummyData.restaurant;
    },
  },
};
</script>