import { createRouter, createWebHistory } from "vue-router";
import AllUsersListPage from "../components/pages/AllUsersList/AllUsersListPage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            component: AllUsersListPage
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