import { createRouter, createWebHistory } from "vue-router";
import MainPage from "../Pages/MainPage.vue";
import AboutPage from "../Pages/AboutPage.vue";

const routes = [
    {
        path: '/',
        component: MainPage
    },
    {
        path: '/about',
        component: AboutPage
    },
];

const router = createRouter({
    routes,
    history: createWebHistory("/admin")
});

export default router;