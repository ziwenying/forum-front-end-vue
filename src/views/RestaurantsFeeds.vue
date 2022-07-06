<template>
  <div class="container py-5">
    <NavTabs />

    <h1 class="mt-5">最新動態</h1>
    <hr />
    <div class="row">
      <div class="col-md-6">
        <h3>最新餐廳</h3>
        <!-- 最新餐廳 NewestRestaurants -->
        <NewestRestaurants :restaurants="restaurants" />
      </div>
      <div class="col-md-6">
        <!-- 最新評論 NewestComments-->
        <h3>最新評論</h3>
        <NewestComments :comments="comments" />
      </div>
    </div>
  </div>
</template>

<script>
import NavTabs from "./../components/NavTabs.vue";
import NewestRestaurants from "./../components/NewestRestaurants.vue";
import NewestComments from "./../components/NewestComments.vue";

const dummyData = {
  restaurants: [
    {
      id: 1,
      name: "Shany Kuphal",
      tel: "1-422-383-6141",
      address: "196 Hills Route",
      opening_hours: "08:00",
      description:
        "Saepe autem quaerat pariatur. Tempora nulla optio ea. Ea consectetur est ut quis. Commodi iste placeat est incidunt consequatur quo eos hic.\n \rDolore labore quisquam iure aut perspiciatis non dolore totam. Sed qui harum aliquam. Distinctio aut facere asperiores quis. In placeat tenetur mollitia occaecati sed eligendi. Similique qui rerum ab ullam dolores.\n \rNostrum minima molestiae. Optio qui tempora ut. Corporis illo omnis quasi odio culpa sunt. Facere sint earum ducimus assumenda mollitia. Officia animi sint similique error qui ab.",
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
    },
    {
      id: 4,
      name: "Roger Mosciski",
      tel: "1-200-147-6313 x908",
      address: "1028 Kayli Ranch",
      opening_hours: "08:00",
      description:
        "Asperiores molestiae dolor iure. Nemo fuga ratione nobis rem voluptas commodi. Est ex animi numquam. Est ea aliquid similique earum itaque. Neque ut qui praesentium sed eos similique provident quaerat velit. Suscipit praesentium saepe.",
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
    },
    {
      id: 5,
      name: "Vilma Will",
      tel: "(910) 687-9951",
      address: "131 Jeremie Spurs",
      opening_hours: "08:00",
      description:
        "In architecto maxime voluptas odit sit est doloremque mollitia voluptatem.",
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
    },
    {
      id: 6,
      name: "Ressie Kihn Jr.",
      tel: "(467) 130-3954",
      address: "073 O'Reilly Road",
      opening_hours: "08:00",
      description:
        "Occaecati repellat voluptate rerum maiores sapiente iusto. Aut sint nulla dignissimos et sunt. Consequatur eaque explicabo.",
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
    },
    {
      id: 7,
      name: "Brannon Douglas DVM",
      tel: "(837) 726-9766 x698",
      address: "034 Sigrid Islands",
      opening_hours: "08:00",
      description:
        "Iure ducimus eius impedit aperiam atque et ex.\nQuam sed voluptate aliquid sed.",
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
    },
    {
      id: 8,
      name: "Karley Lind",
      tel: "618.206.8595 x02438",
      address: "832 Adams Canyon",
      opening_hours: "08:00",
      description:
        "Ut ea doloribus consequatur maiores nostrum est. Quis officia non itaque. Sint possimus sit occaecati id voluptates dolores debitis perferendis. Nemo reiciendis optio. Facere voluptatem reprehenderit minus et sit consequatur iure hic.",
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
    },
    {
      id: 9,
      name: "Althea Russel",
      tel: "569.542.0655 x722",
      address: "0053 Sanford View",
      opening_hours: "08:00",
      description:
        "Possimus et dolorem culpa.\nEnim voluptate nostrum aspernatur aut.\nNon enim atque sed sit et deleniti itaque.",
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
    },
    {
      id: 10,
      name: "Eldora Hackett",
      tel: "(377) 165-7581 x7439",
      address: "33339 Spinka Shoal",
      opening_hours: "08:00",
      description:
        "Officia quia fuga quis voluptates dolorum velit numquam illo.",
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
    },
  ],
  comments: [
    {
      id: 21,
      text: "Est sed et culpa nobis.",
      UserId: 1,
      RestaurantId: 21,
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
      Restaurant: {
        id: 21,
        name: "Della Doyle",
        tel: "(174) 959-5458",
        address: "4696 Thompson Landing",
        opening_hours: "08:00",
        description:
          "In laudantium impedit maiores. Explicabo doloremque dolor rerum fugiat sunt. Consequatur quos ipsum commodi magni. Adipisci ipsum consequatur.\n \rEt porro dolor asperiores porro cum ducimus illo quas. Cupiditate est magni vero omnis. Quo porro ea nam. Rem aut sed dicta.\n \rOdio accusamus nostrum sit sed et dolor. Voluptas ut veritatis sunt iste et temporibus. Cupiditate et unde accusantium at explicabo facilis voluptatibus blanditiis debitis. Distinctio nihil ducimus officia ipsum quos.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=50.06148467696925",
        viewCounts: 0,
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
        CategoryId: 3,
      },
    },
    {
      id: 48,
      text: "Veniam iure aliquid veniam corporis vitae modi.",
      UserId: 1,
      RestaurantId: 48,
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
      Restaurant: {
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
      },
    },
    {
      id: 66,
      text: "Adipisci vitae placeat.",
      UserId: 1,
      RestaurantId: 16,
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
      Restaurant: {
        id: 16,
        name: "Lawson Pollich DDS",
        tel: "(426) 040-0962 x179",
        address: "5294 Gislason Estates",
        opening_hours: "08:00",
        description:
          "Porro temporibus quaerat qui error vel et est quia.\nSoluta officia hic non est fugiat.\nQuibusdam nesciunt id.\nOfficiis molestiae quibusdam ipsa ut harum accusantium natus provident non.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=25.17285025785454",
        viewCounts: 0,
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
        CategoryId: 5,
      },
    },
    {
      id: 87,
      text: "Ipsa in harum aliquam debitis unde iusto nostrum et voluptatem.",
      UserId: 1,
      RestaurantId: 37,
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
      Restaurant: {
        id: 37,
        name: "Ofelia Balistreri Sr.",
        tel: "520-558-1024",
        address: "798 Johns Lock",
        opening_hours: "08:00",
        description: "veniam",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=79.48946936465869",
        viewCounts: 0,
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
        CategoryId: 1,
      },
    },
    {
      id: 105,
      text: "Asperiores aut quia quo praesentium omnis impedit reprehenderit veniam vero.",
      UserId: 1,
      RestaurantId: 5,
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
      Restaurant: {
        id: 5,
        name: "Vilma Will",
        tel: "(910) 687-9951",
        address: "131 Jeremie Spurs",
        opening_hours: "08:00",
        description:
          "In architecto maxime voluptas odit sit est doloremque mollitia voluptatem.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=7.993127013484824",
        viewCounts: 0,
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
        CategoryId: 5,
      },
    },
    {
      id: 131,
      text: "Sunt facilis impedit ab nostrum dolor est et.",
      UserId: 1,
      RestaurantId: 31,
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
      Restaurant: {
        id: 31,
        name: "Danial Muller",
        tel: "829.592.1100 x1948",
        address: "58042 Trantow Hollow",
        opening_hours: "08:00",
        description:
          "Est minima ut eius numquam consequatur atque a eius quas. Non quia quia. Numquam optio repudiandae voluptatem odit.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=38.61002969356269",
        viewCounts: 0,
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
        CategoryId: 4,
      },
    },
    {
      id: 147,
      text: "Eius voluptas eum nihil est libero et at.",
      UserId: 1,
      RestaurantId: 47,
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
      Restaurant: {
        id: 47,
        name: "Kattie Smitham",
        tel: "1-721-119-6730",
        address: "50365 Denesik Field",
        opening_hours: "08:00",
        description:
          "Fuga magni esse magni numquam. Commodi et est et. Nemo quis rerum dignissimos hic occaecati veniam vel sit. Beatae vel corrupti quas dignissimos. Eos non temporibus laborum soluta.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=72.34546185367911",
        viewCounts: 0,
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
        CategoryId: 1,
      },
    },
    {
      id: 20,
      text: "Nemo ex molestiae nobis doloremque aliquam officia.",
      UserId: 2,
      RestaurantId: 20,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      User: {
        id: 2,
        name: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$Pk1gxJ1B2IbjSGm2aFW0IO.aKHzzdm9HtjU0CsYqsnV7BIV7z7FRC",
        isAdmin: false,
        image: null,
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
      },
      Restaurant: {
        id: 20,
        name: "Kyler Tremblay",
        tel: "163.029.9509",
        address: "93105 Jesus Mills",
        opening_hours: "08:00",
        description:
          "Et nobis rerum ab officia. Aliquid libero incidunt quis voluptatem. Accusantium aperiam eum consequatur et minus ducimus omnis. Laborum consequuntur et architecto dolorem ut similique magni quam quam. Iure voluptas dolores voluptatum occaecati doloribus et mollitia id aut. Sit expedita facilis consequatur rerum sint consequatur.\n \rDucimus est ducimus qui. Perferendis et aliquid quas qui voluptatem est beatae repellendus odit. Delectus sint iure error enim cum. Consequatur doloremque et quasi dolores.\n \rOccaecati velit maiores est. Ut distinctio dolorem consequuntur. Provident delectus perferendis in et blanditiis id esse alias ad. Voluptatibus architecto ut.",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=47.68857045799844",
        viewCounts: 0,
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
        CategoryId: 2,
      },
    },
    {
      id: 37,
      text: "Vero rerum nam et.",
      UserId: 2,
      RestaurantId: 37,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      User: {
        id: 2,
        name: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$Pk1gxJ1B2IbjSGm2aFW0IO.aKHzzdm9HtjU0CsYqsnV7BIV7z7FRC",
        isAdmin: false,
        image: null,
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
      },
      Restaurant: {
        id: 37,
        name: "Ofelia Balistreri Sr.",
        tel: "520-558-1024",
        address: "798 Johns Lock",
        opening_hours: "08:00",
        description: "veniam",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=79.48946936465869",
        viewCounts: 0,
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
        CategoryId: 1,
      },
    },
    {
      id: 85,
      text: "Beatae modi sit eius et animi deleniti reprehenderit quam.",
      UserId: 2,
      RestaurantId: 35,
      createdAt: "2022-07-04T00:55:09.000Z",
      updatedAt: "2022-07-04T00:55:09.000Z",
      User: {
        id: 2,
        name: "user1",
        email: "user1@example.com",
        password:
          "$2a$10$Pk1gxJ1B2IbjSGm2aFW0IO.aKHzzdm9HtjU0CsYqsnV7BIV7z7FRC",
        isAdmin: false,
        image: null,
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
      },
      Restaurant: {
        id: 35,
        name: "Sim Harvey",
        tel: "(345) 447-7805 x074",
        address: "63667 Cole Coves",
        opening_hours: "08:00",
        description: "itaque",
        image:
          "https://loremflickr.com/320/240/restaurant,food/?random=62.015262194099606",
        viewCounts: 0,
        createdAt: "2022-07-04T00:55:09.000Z",
        updatedAt: "2022-07-04T00:55:09.000Z",
        CategoryId: 4,
      },
    },
  ],
};

export default {
  name: "RestaurantsFeeds",
  components: {
    NavTabs,
    NewestRestaurants,
    NewestComments,
  },
  data() {
    return {
      restaurants: [],
      comments: [],
    };
  },
  created() {
    this.fetchFeeds();
  },
  methods: {
    fetchFeeds() {
      this.restaurants = dummyData.restaurants;
      this.comments = dummyData.comments;
    },
  },
};
</script>