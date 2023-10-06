import { createRouter, createWebHistory } from 'vue-router';

import Home from "../views/pages/Home.vue"
import Login from "../views/pages/Login.vue"
import Article from "../views/pages/Article.vue"
import Dashboard from "../views/pages/Dashboard.vue"

const ifAuthenticated = (to,from, next) => {
    const loggedIn = localStorage.getItem('session_token')
    if (loggedIn) {
        next()
        return
    }
    next('/login')
}

const routes = [ 
   // { path: "/dashboard", component: Dashboard },
    { path: "/Login", component: Login },
    { path: "/", component: Home },
    { path: "/article/:id", component: Article },
    //{ path: "/:pathMatch(.*)*", component: NotFound},
    { path: "/dashboard", component: Dashboard, beforeEnter: ifAuthenticated}
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router; 