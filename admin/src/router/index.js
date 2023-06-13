import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import CreateUserApp from '../views/users/CreateUserApp.vue'
import IndexUserApp from '../views/users/IndexUserApp.vue'
import EditUserApp from '../views/users/EditUserApp.vue'

Vue.use(VueRouter)

const routes = [
  {path: '/dashboard',name: 'dashboard',component: HomeView},
  {path: '/',name: 'login',component: LoginView},
  {path: '/usuarios/index',name: 'usuario-index',component: IndexUserApp},
  {path: '/usuarios/create',name: 'usuario-create',component: CreateUserApp},
  {path: '/usuarios/edit/:id',name: 'usuario-edit',component: EditUserApp},

  {
    path: '/about',
    name: 'about',
    component: function () {
      return import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
