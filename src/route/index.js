import {
    createRouter,
    createWebHistory
} from 'vue-router'
import Welcome from '../views/Welcome.vue'
import About from '../views/About.vue'

const routerHistory = createWebHistory()
const router = createRouter({
    history: routerHistory,
    routes: [{
            path: '/',
            component: Welcome,
            name: 'welcome',
            alias: '/welcome'
        },
        {
            path: '/about',
            component: About,
            name: 'about'
        }
    ]
})

export default router