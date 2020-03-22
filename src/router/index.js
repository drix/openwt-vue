import Auth from "@okta/okta-vue"
import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home.vue'

Vue.use(Auth, {
  issuer: 'https://dev-756139.okta.com/oauth2/default',
  client_id: '0oa4dt7coy66lwKeS4x6',
  redirect_uri: 'http://iotech.club/implicit/callback',
  scope: 'openid profile email'
});
Vue.use(Router);

const lazyRoute = (route) => ({
    path: route.path,
    name: route.component,
    component: () => import(`../components/${route.component}.vue`),
    props: true,
    meta: { requiresAuth: true },
})
const lazyRoutes = [
    { path: '/about', component: 'About' },
    { path: '/boat', component: 'List' },
    { path: '/boat/new', component: 'BoatNew' },
    { path: '/boat/:id', component: 'Boat' },
    { path: '/boat/:id/edit', component: 'BoatEdit' },
].map(lazyRoute)

const routes = [
    {
        path: '/',
        name: 'home',
        component: Home,
        meta: { requiresAuth: true },
    },
    {
        path: '/implicit/callback',
        component: Auth.handleCallback(),
    },
    ... lazyRoutes
]

let router = new Router({
  mode: 'history',
  routes
});

router.beforeEach(Vue.prototype.$auth.authRedirectGuard());

export default router
