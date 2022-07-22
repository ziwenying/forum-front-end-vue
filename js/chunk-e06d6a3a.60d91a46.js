(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e06d6a3a"],{6135:function(t,e,s){"use strict";s.r(e);var r=function(){var t=this,e=t._self._c;return e("div",{staticClass:"container py-5"},[e("AdminNav"),t.isLoading?e("Spinner"):e("table",{staticClass:"table"},[e("thead",{staticClass:"thead-dark"},[e("tr",[e("th",{attrs:{scope:"col"}},[t._v("#")]),e("th",{attrs:{scope:"col"}},[t._v("Email")]),e("th",{attrs:{scope:"col"}},[t._v("Role")]),e("th",{attrs:{scope:"col",width:"140"}},[t._v("Action")])])]),e("tbody",t._l(t.users,(function(s){return e("tr",{key:s.id},[e("th",{attrs:{scope:"row"}},[t._v(t._s(s.id))]),e("td",[t._v(t._s(s.email))]),e("td",[t._v(t._s(s.isAdmin?"admin":"user"))]),e("td",[e("button",{directives:[{name:"show",rawName:"v-show",value:s.id!==t.currentUser.id,expression:"user.id !== currentUser.id"}],staticClass:"btn btn-link",attrs:{type:"button"},on:{click:function(e){return t.changeRole({userId:s.id,isAdmin:s.isAdmin})}}},[t._v(" "+t._s(s.isAdmin?"set as user":"set as admin")+" ")])])])})),0)])],1)},a=[],n=(s("d9e2"),s("e04c")),i=s("2f62"),u=s("be6c"),o=s("2fa3"),d=s("2375"),c={name:"AdminUsers",components:{AdminNav:n["a"],Spinner:d["a"]},data(){return{users:[],isLoading:!0}},created(){this.fetchUsers()},computed:{...Object(i["b"])(["currentUser"])},methods:{async fetchUsers(){try{this.isLoading=!0;const t=await u["a"].users.get();if("OK"!==t.statusText)throw new Error("無法取得使用者資料，請稍後再試");const e=t.data;this.users=e.users,this.isLoading=!1}catch(t){this.isLoading=!1,console.log(t),o["a"].fire({icon:"error",title:"無法取得使用者資料，請稍後再試"})}},async changeRole({userId:t,isAdmin:e}){try{const{data:s}=await u["a"].users.update({userId:t,isAdmin:(!e).toString()});if("success"!==s.status)throw new Error(s.message);this.users=this.users.map(s=>s.id===t?{...s,isAdmin:!e}:s),console.log(this.users)}catch(s){console.log(s),o["a"].fire({icon:"error",title:"無法更改使用者權限，請稍後再試"})}}}},l=c,m=s("2877"),h=Object(m["a"])(l,r,a,!1,null,null,null);e["default"]=h.exports},be6c:function(t,e,s){"use strict";var r=s("2fa3");e["a"]={categories:{create({name:t}){return r["b"].post("/admin/categories/",{name:t})},get(){return r["b"].get("/admin/categories")},delete({categoryId:t}){return r["b"].delete("/admin/categories/"+t)},update({categoryId:t,name:e}){return r["b"].put("/admin/categories/"+t,{name:e})}},restaurants:{create({formData:t}){return r["b"].post("/admin/restaurants",t)},getDetail({restaurantId:t}){return r["b"].get("/admin/restaurants/"+t)},get(){return r["b"].get("/admin/restaurants")},delete({restaurantId:t}){return r["b"].delete("/admin/restaurants/"+t)},update({restaurantId:t,formData:e}){return r["b"].put("/admin/restaurants/"+t,e)}},users:{get(){return r["b"].get("/admin/users")},update({userId:t,isAdmin:e}){return r["b"].put("/admin/users/"+t,{isAdmin:e})}}}},e04c:function(t,e,s){"use strict";var r=function(){var t=this,e=t._self._c;return e("div",{staticClass:"mb-3"},[e("h1",[t._v("餐廳後台")]),e("router-link",{attrs:{to:"/admin/restaurants"}},[t._v("Restaurants")]),t._v("  | "),e("router-link",{attrs:{to:"/admin/categories"}},[t._v("Categories")]),t._v("  | "),e("router-link",{attrs:{to:"/admin/users"}},[t._v("Users")])],1)},a=[],n={name:"AdminNav"},i=n,u=s("2877"),o=Object(u["a"])(i,r,a,!1,null,null,null);e["a"]=o.exports}}]);
//# sourceMappingURL=chunk-e06d6a3a.60d91a46.js.map