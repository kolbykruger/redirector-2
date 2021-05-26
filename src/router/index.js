import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/data',
        name: 'Data',
        component: () => import('../views/Data.vue')
    },
    {
        path: '/processing',
        name: 'Processing',
        component: () => import('../views/Processing.vue')
    },
    {
        path: '/intersection',
        name: 'Intersection',
        component: () => import('../views/Intersection.vue')
    },
    {
        path: '/algorithmic',
        name: 'Algorithmic',
        component: () => import('../views/Algorithmic.vue')
    },
    {
        path: '/definition',
        name: 'Definition',
        component: () => import('../views/Definition.vue')
    },
    {
        path: '/culmination',
        name: 'Culmination',
        component: () => import('../views/Culmination.vue')
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        console.log(to)
        console.log(from)
        console.log(savedPosition)
        // always scroll to top
        return new Promise(resolve => {
            setTimeout(() => {
                resolve({ left: 0, top: 0, behavior: 'smooth' })
            }, 300)
        })
    }
})

export default router
