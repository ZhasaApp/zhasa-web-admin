import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: () => import("../components/pages/AllUsersList/AllUsersListPage.vue")
        },
        {
            path: '/roles',
            component: () => import("../components/pages/AllRoles/RolesPage.vue")
        },
        {
            path: '/roles/personalData',
            component: () => import("../components/pages/PersonalDataPage/PersonalDataPage.vue")
        }
    ]
})

export default router