<template>
  <div class="container py-5">
    <NavTabs />
    <h1 class="mt-5">人氣餐廳</h1>

    <hr />
    <div
      v-for="restaurant in restaurants"
      :key="restaurant.id"
      class="card mb-3"
      style="max-width: 540px; margin: auto"
    >
      <div class="row no-gutters">
        <div class="col-md-4">
          <a href="#">
            <img class="card-img" :src="restaurant.image" />
          </a>
        </div>
        <div class="col-md-8">
          <div class="card-body">
            <h5 class="card-title">{{ restaurant.name }}</h5>
            <span class="badge badge-secondary"
              >收藏數：{{ restaurant.FavoriteCount }}</span
            >
            <p class="card-text">
              {{ restaurant.description }}
            </p>
            <router-link
              :to="{ name: 'dashboard', params: { id: restaurant.id } }"
              class="btn btn-primary mr-2"
              >Show</router-link
            >
            <button
              v-if="restaurant.isFavorited"
              @click.stop.prevent="deleteFavorite(restaurant.id)"
              type="button"
              class="btn btn-danger mr-2"
            >
              移除最愛
            </button>
            <button
              v-else
              @click.stop.prevent="addFavorite(restaurant.id)"
              type="button"
              class="btn btn-primary"
            >
              加到最愛
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs";

const dummyData = {
  restaurants: [
    {
      id: 50,
      name: "Alessandro Watsica IV",
      tel: "545.416.9326 x986",
      address: "72573 Justina Station",
      opening_hours: "08:00",
      description: "Eos eos itaque recusandae rerum dolor. Ullam quis ",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=91.6737204935133",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 49,
      name: "Elenora Kautzer",
      tel: "002.591.4995",
      address: "72137 Austyn Port",
      opening_hours: "08:00",
      description: "Et exercitationem maiores beatae aut ipsam. Quibus",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=90.87706711384638",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 1,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 48,
      name: "Kamron Pfannerstill",
      tel: "1-534-483-2384",
      address: "361 Kane Meadow",
      opening_hours: "08:00",
      description: "dolores",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=94.92700423497287",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 5,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 47,
      name: "Kattie Smitham",
      tel: "1-721-119-6730",
      address: "50365 Denesik Field",
      opening_hours: "08:00",
      description: "Fuga magni esse magni numquam. Commodi et est et. ",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=72.34546185367911",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 1,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 46,
      name: "Addie Prohaska",
      tel: "(295) 155-6578",
      address: "4506 Kaia Port",
      opening_hours: "08:00",
      description: "Tempore quisquam molestias porro quo amet. Nihil m",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=51.46067506541306",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 1,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 45,
      name: "Emmanuelle Hayes",
      tel: "813-140-2382 x51569",
      address: "821 Stokes Spring",
      opening_hours: "08:00",
      description: "Perferendis dolores earum molestiae. Nihil in nobi",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=35.65960957937237",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 3,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 44,
      name: "Ashtyn Klein",
      tel: "1-111-950-2918 x6706",
      address: "31549 Hudson Terrace",
      opening_hours: "08:00",
      description: "maiores esse debitis",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=87.04837346139203",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 2,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 43,
      name: "Dr. Tremaine Simonis",
      tel: "1-792-754-4555",
      address: "842 Osinski Drive",
      opening_hours: "08:00",
      description: "Ipsam nobis nam qui ut.",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=14.125269618018343",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 1,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 42,
      name: "Coleman Von",
      tel: "119-265-0268 x8142",
      address: "8961 Feeney Expressway",
      opening_hours: "08:00",
      description: "Voluptatibus accusantium corrupti est culpa necess",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=71.85207126082904",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 5,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
    {
      id: 41,
      name: "Darryl Fay",
      tel: "(614) 996-1813 x90015",
      address: "580 Powlowski Rapid",
      opening_hours: "08:00",
      description: "aut",
      image:
        "https://loremflickr.com/320/240/restaurant,food/?random=96.45697429793107",
      viewCounts: 0,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      CategoryId: 5,
      FavoritedUsers: [],
      isFavorited: false,
      FavoriteCount: 0,
    },
  ],
};

export default {
  name: "RestaurantsTop",
  components: {
    NavTabs,
  },
  data() {
    return {
      restaurants: [],
    };
  },
  created() {
    this.fetchRestaurant();
  },
  methods: {
    fetchRestaurant() {
      this.restaurants = dummyData.restaurants;
      console.log(this.restaurants);
    },
    addFavorite(restaurantId) {
      this.restaurants = this.restaurants.map((restaurant) => {
        return restaurant.id === restaurantId
          ? {
              ...restaurant,
              FavoriteCount: restaurant.FavoriteCount + 1,
              isFavorited: true,
            }
          : restaurant;
      });
      console.log(this.restaurants);
    },
    deleteFavorite(restaurantId) {
      this.restaurants = this.restaurants.map((restaurant) => {
        return restaurant.id === restaurantId
          ? {
              ...restaurant,
              FavoriteCount: restaurant.FavoriteCount - 1,
              isFavorited: false,
            }
          : restaurant;
      });
    },
  },
};
</script>