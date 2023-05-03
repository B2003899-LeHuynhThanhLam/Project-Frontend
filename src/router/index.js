import { createWebHistory, createRouter } from "vue-router";
import store from "../store";

const routes = [{
        path: "/login",
        name: "Login",
        component: () =>
            import ("../views/UserLogin.vue"),
    },
    {
        path: "/register",
        name: "Register",
        component: () =>
            import ("../views/UserRegister.vue"),
    },
    {
        path: "/profile",
        name: "Profile",
        component: () =>
            import ("../views/UserProfile.vue"),
    },
    {
        path: "/",
        alias: "/moviereview",
        name: "moviereview",
        component: () =>
            import ("../views/MoviereviewHome.vue"),
    },
    {
        path: "/editmoviereview/:id",
        name: "Editmoviereview",
        component: () =>
            import ("../views/MoviereviewEdit.vue"),
    },
    {
        path: "/addmoviereview",
        name: "Createmoviereview",
        component: () =>
            import ("../views/ReviewCreate.vue"),
    },
    {
        path: "/author",
        name: "Author",
        component: () =>
            import ("../views/DirectorHome.vue"),
    },
    {
        path: "/editauthor/:id",
        name: "EditAuthor",
        component: () =>
            import ("../views/DirectorEdit.vue"),
    },
    {
        path: "/addauthor",
        name: "CreateAuthor",
        component: () =>
            import ("../views/DirectorCreate.vue"),
    },
    {
        path: "/reviewer",
        name: "Reviewer",
        component: () =>
            import ("../views/ReviewerHome.vue"),
    },
    {
        path: "/editreviewer/:id",
        name: "EditReviewer",
        component: () =>
            import ("../views/ReviewerEdit.vue"),
    },
    {
        path: "/addreviewer",
        name: "CreateReviewer",
        component: () =>
            import ("../views/ReviewerCreate.vue"),
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const publicPages = ["/login", "/register"];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = store.getters.userLoggedIn;

    if (authRequired && !loggedIn) {
        next("/login");
    } else {
        next();
    }
});

export default router;