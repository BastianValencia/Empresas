import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@fortawesome/fontawesome-free/css/all.css'
import Vuelidate from 'vuelidate'
Vue.use(Vuelidate)

Vue.config.productionTip = false

import Router from 'vue-router'
//paginas redundantes, cuando estas en una pagina y lo mandas a la misma, para evitar el error, agregar esto
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error => error)
};

import {auth} from './firebase';

auth.onAuthStateChanged(user =>{
  if(user){
  
      const detectoUsuario = {
        email:user.email,
        uid: user.uid,
      }
      store.dispatch('detectarUsuario', detectoUsuario)
  }else{
    
    store.dispatch('detectarUsuario',user)
  }
  new Vue({
    router,
    store,
    vuetify,
    render: h => h(App)
  }).$mount('#app')
})
