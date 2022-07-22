(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-71c50812"],{"73a3":function(t,a,e){"use strict";e.r(a);var s=function(){var t=this,a=t._self._c;return a("div",{staticClass:"container py-5"},[a("AdminNav"),a("router-link",{staticClass:"btn btn-primary mb-4",attrs:{to:"/admin/restaurants/new"}},[t._v(" New Restaurant ")]),a("AdminRestaurantsTable")],1)},r=[],n=e("e04c"),i=function(){var t=this,a=t._self._c;return a("div",[t.isLoading?a("Spinner"):a("table",{staticClass:"table"},[a("thead",{staticClass:"thead-dark"},[a("tr",[a("th",{attrs:{scope:"col"}},[t._v("#")]),a("th",{attrs:{scope:"col"}},[t._v("Category")]),a("th",{attrs:{scope:"col"}},[t._v("Name")]),a("th",{attrs:{scope:"col",width:"300"}},[t._v("操作")])])]),a("tbody",t._l(t.restaurants,(function(e){return a("tr",{key:e.id},[a("th",{attrs:{scope:"row"}},[t._v(" "+t._s(e.id)+" ")]),a("td",[t._v(" "+t._s(e.Category?e.Category.name:"未分類")+" ")]),a("td",[t._v(t._s(e.name))]),a("td",{staticClass:"d-flex justify-content-between"},[a("router-link",{staticClass:"btn btn-link",attrs:{to:{name:"admin-restaurant",params:{id:e.id}}}},[t._v(" Show ")]),a("router-link",{staticClass:"btn btn-link",attrs:{to:{name:"admin-restaurant-edit",params:{id:e.id}}}},[t._v("Edit")]),a("button",{staticClass:"btn btn-link",attrs:{type:"button",disabled:!0===t.isProcessing},on:{click:function(a){return a.stopPropagation(),a.preventDefault(),t.deleteRestaurant(e.id)}}},[t._v(" Delete ")])],1)])})),0)])],1)},u=[],o=(e("d9e2"),e("be6c")),c=e("2fa3"),d=e("2375"),l={name:"AdiminRestaurantsTable",components:{Spinner:d["a"]},data(){return{restaurants:[],isLoading:!0,isProcessing:!1}},created(){this.fetchRestaurants()},methods:{async fetchRestaurants(){try{this.isLoading=!0;const t=await o["a"].restaurants.get();if("OK"!==t.statusText)throw new Error("無法顯示餐廳，請稍後再試");const a=t.data.restaurants;this.restaurants=a,this.isLoading=!1}catch(t){this.isLoading=!1,c["a"].fire({icon:"error",title:"無法顯示餐廳，請稍後再試"})}},async deleteRestaurant(t){try{this.isProcessing=!0;const{data:a}=await o["a"].restaurants.delete({restaurantId:t});if("success"!==a.status)throw new Error(a.message);const e=()=>{this.restaurants=this.restaurants.filter(a=>a.id!==t)};e(),this.isProcessing=!1,c["a"].fire({icon:"success",title:"刪除餐廳成功"})}catch(a){this.isProcessing=!1,c["a"].fire({icon:"error",title:"無法刪除餐廳，請稍後再試"})}}}},m=l,b=e("2877"),g=Object(b["a"])(m,i,u,!1,null,null,null),p=g.exports,h={name:"AdminRestaurants",components:{AdminNav:n["a"],AdminRestaurantsTable:p}},v=h,f=Object(b["a"])(v,s,r,!1,null,null,null);a["default"]=f.exports},be6c:function(t,a,e){"use strict";var s=e("2fa3");a["a"]={categories:{create({name:t}){return s["b"].post("/admin/categories/",{name:t})},get(){return s["b"].get("/admin/categories")},delete({categoryId:t}){return s["b"].delete("/admin/categories/"+t)},update({categoryId:t,name:a}){return s["b"].put("/admin/categories/"+t,{name:a})}},restaurants:{create({formData:t}){return s["b"].post("/admin/restaurants",t)},getDetail({restaurantId:t}){return s["b"].get("/admin/restaurants/"+t)},get(){return s["b"].get("/admin/restaurants")},delete({restaurantId:t}){return s["b"].delete("/admin/restaurants/"+t)},update({restaurantId:t,formData:a}){return s["b"].put("/admin/restaurants/"+t,a)}},users:{get(){return s["b"].get("/admin/users")},update({userId:t,isAdmin:a}){return s["b"].put("/admin/users/"+t,{isAdmin:a})}}}},e04c:function(t,a,e){"use strict";var s=function(){var t=this,a=t._self._c;return a("div",{staticClass:"mb-3"},[a("h1",[t._v("餐廳後台")]),a("router-link",{attrs:{to:"/admin/restaurants"}},[t._v("Restaurants")]),t._v("  | "),a("router-link",{attrs:{to:"/admin/categories"}},[t._v("Categories")]),t._v("  | "),a("router-link",{attrs:{to:"/admin/users"}},[t._v("Users")])],1)},r=[],n={name:"AdminNav"},i=n,u=e("2877"),o=Object(u["a"])(i,s,r,!1,null,null,null);a["a"]=o.exports}}]);
//# sourceMappingURL=chunk-71c50812.ea1f220b.js.map