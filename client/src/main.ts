import { createApp } from "vue";
import App from "./App.vue";
import Home from "./views/Home.vue";
import ViewArtBoard from "./views/ViewArtBoard.vue";
import Archive from "./views/Archive.vue";
import About from "./views/About.vue";
import OneYear from "./views/OneYear.vue";
import "./index.css";
import { createRouter, createWebHistory } from "vue-router";
import Api from "./service/api";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: Home,
      name: "Home",
    },
    {
      path: "/:date",
      component: ViewArtBoard,
      name: "View",
    },
    {
      path: "/archive",
      component: Archive,
      name: "Archive",
    },
    {
      path: "/about",
      component: About,
      name: "About",
    },
    {
      path: "/year/:year",
      component: OneYear,
      name: "Year",
    },
  ],
});

const app = createApp(App);

const url =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8787"
    : "https://workart.guuu.workers.dev";

app.provide("$api", new Api(url));
app.use(router);
app.mount("#app");
