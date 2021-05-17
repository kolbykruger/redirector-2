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
    routes
})

export default router
