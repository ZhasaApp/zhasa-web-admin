import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/zhasa-web-admin',
            component: () => import("../components/pages/AllUsersList/AllUsersListPage.vue")
        }
    ]
})

export default router