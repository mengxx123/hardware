import Vue from 'vue'
import Router from 'vue-router'

const Home = resolve => require(['@/views/Home'], resolve)
const CoreValue = resolve => require(['@/views/CoreValue'], resolve)
const About = resolve => require(['@/views/About'], resolve)
const TextToAsc2 = resolve => require(['@/views/TextToAsc2'], resolve)
const Binary = resolve => require(['@/views/Binary'], resolve)
const Utf8 = resolve => require(['@/views/Utf8'], resolve)
const CharsetConvert = resolve => require(['@/views/CharsetConvert'], resolve)
const MessageCode = resolve => require(['@/views/MessageCode'], resolve)
const Error404 = resolve => require(['@/views/error/Error404'], resolve)

Vue.use(Router)

let routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/core_values',
        component: CoreValue
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/text_to_asc2',
        component: TextToAsc2
    },
    {
        path: '/binary',
        component: Binary
    },
    {
        path: '/utf8',
        component: Utf8
    },
    {
        path: '/charset/convert',
        component: CharsetConvert
    },
    {
        path: '/messageCode',
        component: MessageCode
    },
    {
        path: '*',
        component: Error404
    }
]

let router = new Router({
    mode: 'history',
    routes: routes,
    scrollBehavior (to, from, savedPosition) {
        return {
            x: 0,
            y: 0
        }
    }
})

export default router
