import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import {auth} from '../firebase'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/panel',
    name: 'Panel',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Panel.vue'),
    meta:{requireAuth:true}
  },
  {
    path: '/enviar',
    name: 'Enviar',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Enviar.vue'),
    meta:{requireAuth:true}
  },
  {
    path: '/intento',
    name: 'Intento',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Intento.vue'),
    meta:{requireAuth:true}
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to,from,next) =>{
  if(to.matched.some(record => record.meta.requireAuth)){
    const usuario = auth.currentUser
    if(!usuario){
      next({name:'Home'})
    }else{
      next()
    }
  }else{
    next()
  }
})

export default router
