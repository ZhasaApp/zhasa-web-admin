import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/branch',
            component: () => import("../components/pages/BranchesPage/BranchesListPage.vue")
        },
        {
            path: '/zhasa-web-admin',
            component: () => import("../components/pages/AllUsersList/AllUsersListPage.vue")
        },
        {
            path: '/brands',
            component: () => import("../components/pages/AllUsersList/AllUsersListPage.vue")
        },
        {
            path: '/sales-types',
            component: () => import("../components/pages/AllUsersList/AllUsersListPage.vue")
        }
    ]
})

export default router