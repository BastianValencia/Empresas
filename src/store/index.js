import Vue from 'vue'
import Vuex from 'vuex'
import { auth, db, storage } from '../firebase'
import router from '@/router'
import firebase from '@firebase/app';
require('firebase/auth');


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    usuario:'',
    empresa:'',
    error:'',
    drawer:true
  },
  mutations: {
    setUsuario(state,payload){
      state.usuario = payload
    },
    setEmpresa(state,payload){
      state.empresa = payload
    },
    setError(state,payload){
      state.error = payload
    },
    setError1(state){
      state.error = ''
    },
    setDrawer(state,payload){
      state.drawer = payload
    }
  },
  actions: {

    async ingresoUsuario({commit, dispatch},payload){
      try{
        await firebase.auth().signInWithEmailAndPassword(payload.email, payload.pass)
        .then(res => {
          try{
            db.collection('usuarios').doc(res.user.uid).get()
            .then(re => {
              if(re.data().tipo == 'Cliente'){
                try{
                  
                  db.collection('Empresas').doc(re.data().idempresa).get()
                  .then(r => {
                    
                    if(!r.data().suspendido && r.data().estado){
                      
                      if(re.data().estado){
                          router.push({name:'Panel'})
                          commit('setEmpresa', r.data())
                          commit('setUsuario', re.data())
                      }else{
                        auth.signOut()
                        .then(() => {
                          commit('setError', 'USUARIO O CONTRASEÑA INVALIDA')
                          router.push({name:'Home'})
                        })
                      }
                    }else{
                      auth.signOut()
                      .then(() => {
                        commit('setError', 'Usuario no permitido, contacte al Administrador')
                        router.push({name:'Home'})
                      })
                    }
                  })
                }catch (error) {
                  console.log(error)
                }
              }else{
                auth.signOut()
                .then(() => {
                  commit('setError', 'USUARIO NO PERMITIDO')
                  router.push({name:'Home'})
                })
              }
            })
          }catch (error) {
            console.log(error)
          }
        })
      }catch (error) {
        commit('setError', 'USUARIO O CONTRASEÑA INVALIDA')
      }
    },
    detectarUsuario({commit,dispatch},user){
      if(user != null){ 
        db.collection('usuarios').doc(user.uid).get()
        .then(res =>{
          commit('setUsuario', res.data())
          db.collection('Empresas').doc(res.data().idempresa).get()
          .then(res => {
            commit('setEmpresa', res.data())
          })
        })
      }else{
        commit('setUsuario',user)
        
      }
    },
    getEmpresa({commit,dispatch},id){
      db.collection('Empresas').doc(id).get()
      .then(res => {
        commit('setEmpresa', res.data())
      })
    },
    cerrarSesion({commit}){
      auth.signOut()
      .then(()=>{
        router.push({name:'Home'})
      })
    },
    boton({commit},valor){
      commit('setDrawer', valor)
    }

  },
  modules: {
  },
  getters:{
    existeUsuario(state){
      if(state.usuario === null){
        return false
      }else{
        return true
      }
    }
  }
})
