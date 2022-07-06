<template>
  <div class="container py-5">
    <NavTabs />
    <!-- 餐廳類別標籤 RestaurantsNavPills -->
    <RestaurantsNavPills :categories="categories" />
    <div class="row">
      <!-- 餐廳卡片 RestaurantCard-->
      <RestaurantCard
        v-for="restaurant in restaurants"
        :key="restaurant.id"
        :initial-restaurant="restaurant"
      />
    </div>

    <!-- 分頁標籤 RestaurantPagination -->
    <RestaurantsPagination
      v-if="totalPage.length > 1"
      :current-page="currentPage"
      :total-page="totalPage"
      :category-id="categoryId"
      :previous-page="previousPage"
      :next-page="nextPage"
    />
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs.vue";
import RestaurantCard from "./../components/RestaurantCard.vue";
import RestaurantsNavPills from "./../components/RestaurantsNavPills.vue";
import RestaurantsPagination from "./../components/RestaurantsPagination.vue";

const dummyData = {
  restaurants: [
    {
      id: 1,
      name: "Shany Kuphal",
      tel: "1-422-383-6141",
      address: "196 Hills Route",
      opening_hours: "08:00",
      description: "Saepe autem quaerat pariatur. Tempora nulla optio ",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=33.18015832013619",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
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
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 3,
      name: "Chester Monahan",
      tel: "714-621-8386 x9321",
      address: "3101 Smitham Forks",
      opening_hours: "08:00",
      description: "Et et non veniam suscipit.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=50.71675927760011",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 4,
      name: "Roger Mosciski",
      tel: "1-200-147-6313 x908",
      address: "1028 Kayli Ranch",
      opening_hours: "08:00",
      description: "Asperiores molestiae dolor iure. Nemo fuga ratione",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=59.37657279899082",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 5,
      name: "Vilma Will",
      tel: "(910) 687-9951",
      address: "131 Jeremie Spurs",
      opening_hours: "08:00",
      description: "In architecto maxime voluptas odit sit est dolorem",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=7.993127013484824",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 6,
      name: "Ressie Kihn Jr.",
      tel: "(467) 130-3954",
      address: "073 O'Reilly Road",
      opening_hours: "08:00",
      description: "Occaecati repellat voluptate rerum maiores sapient",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=78.09151564546619",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 2,
      Category: {
        id: 2,
        name: "日本料理",
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 7,
      name: "Brannon Douglas DVM",
      tel: "(837) 726-9766 x698",
      address: "034 Sigrid Islands",
      opening_hours: "08:00",
      description: "Iure ducimus eius impedit aperiam atque et ex.\nQua",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=99.31142742805652",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 8,
      name: "Karley Lind",
      tel: "618.206.8595 x02438",
      address: "832 Adams Canyon",
      opening_hours: "08:00",
      description: "Ut ea doloribus consequatur maiores nostrum est. Q",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=65.29987687136042",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 5,
      Category: {
        id: 5,
        name: "素食料理",
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 9,
      name: "Althea Russel",
      tel: "569.542.0655 x722",
      address: "0053 Sanford View",
      opening_hours: "08:00",
      description: "Possimus et dolorem culpa.\nEnim voluptate nostrum ",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=24.941401422195185",
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
      isFavorited: false,
      isLiked: false,
    },
    {
      id: 10,
      name: "Eldora Hackett",
      tel: "(377) 165-7581 x7439",
      address: "33339 Spinka Shoal",
      opening_hours: "08:00",
      description: "Officia quia fuga quis voluptates dolorum velit nu",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=34.74681745008221",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 4,
      Category: {
        id: 4,
        name: "墨西哥料理",
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
      },
      isFavorited: false,
      isLiked: false,
    },
  ],
  categories: [
    {
      id: 1,
      name: "中式料理",
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
    },
    {
      id: 2,
      name: "日本料理",
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
    },
    {
      id: 3,
      name: "義大利料理",
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
    },
    {
      id: 4,
      name: "墨西哥料理",
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
    },
    {
      id: 5,
      name: "素食料理",
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
    },
    {
      id: 6,
      name: "美式料理",
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
    },
    {
      id: 7,
      name: "複合式料理",
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
    },
  ],
  categoryId: "",
  page: 1,
  totalPage: [1, 2, 3, 4, 5],
  prev: 1,
  next: 2,
};

export default {
  name: "Restaurants",
  components: {
    NavTabs,
    RestaurantCard,
    RestaurantsNavPills,
    RestaurantsPagination,
  },
  data() {
    return {
      restaurants: [],
      categories: [],
      categoryId: -1,
      currentPage: 1,
      totalPage: [],
      previousPage: -1,
      nextPage: -1,
    };
  },
  created() {
    this.fetchRestaurants();
  },
  methods: {
    fetchRestaurants() {
      const {
        restaurants,
        categories,
        categoryId,
        page,
        totalPage,
        prev,
        next,
      } = dummyData;
      this.restaurants = restaurants;
      this.categories = categories;
      this.categoryId = categoryId;
      this.currentPage = page;
      this.totalPage = totalPage;
      this.previousPage = prev;
      this.nextPage = next;
    },
  },
};
</script>