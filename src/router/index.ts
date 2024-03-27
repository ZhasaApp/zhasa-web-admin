import {createRouter, createWebHistory} from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            redirect: '/zhasa-web-admin/users'
        },
        {
            path: '/zhasa-web-admin/branch',
            component: () => import("../components/pages/BranchesPage/BranchesListPage.vue")
        },
        {
            path: '/zhasa-web-admin/users',
            component: () => import("../components/pages/AllUsersList/AllUsersListPage.vue")
        },
        {
            path: '/zhasa-web-admin/brands',
            component: () => import("../components/pages/BrandsPage/BrandsListPage.vue")
        },
        {
            path: '/zhasa-web-admin/sales-types',
            component: () => import("../components/pages/SaleTypePage/SaleTypesListPage.vue")
        },
        {
            path: '/:catchAll(.*)',
            redirect: '/zhasa-web-admin/users'
        }
    ]
})

export default router