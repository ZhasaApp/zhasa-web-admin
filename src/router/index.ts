import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/zhasa-web-admin',
            component: () => import("../components/pages/AllUsersList/AllUsersListPage.vue")
        },
        {
            path: '/zhasa-web-admin/roles/personalData',
            component: () => import("../components/pages/PersonalDataPage/PersonalDataPage.vue")
        }
    ]
})

export default router