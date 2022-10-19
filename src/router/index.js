import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/additions",
  },
  {
    path: "/additions",
    name: "Additions",
    component: () => import("../views/AdditionsView.vue"),
  },
  {
    path: "/additions/products/:id",
    name: "AdditionsProducts",
    props: true,
    component: () => import("../views/AdditionsProducts.vue"),
  },
  {
    path: "/groups",
    name: "Groups",
    component: () => import("../views/GroupsView.vue"),
  },
  {
    path: "/products",
    name: "Products",
    component: () => import("../views/ProductsView.vue"),
  },
  {
    path: "/product/:id",
    name: "Product",
    props: true,
    component: () => import("../components/product/product.vue"),
  },
  {
    path: "/users",
    name: "Users",
    component: () => import("../views/UsersView.vue"),
  },
  {
    path: "/settings",
    name: "Settings",
    component: () => import("../views/SettingsView.vue"),
  },
  {
    path: "*",
    redirect: "/additions",
  },
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
