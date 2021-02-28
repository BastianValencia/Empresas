<template>
  <!-- Barra de navegacion lateral  -->
    <v-navigation-drawer color="indigo darken-1" :mobile-breakpoint="600" v-model="$store.state.drawer" dark app>
      <v-list-item class="pt-12">
        <v-list-item-content>
          <v-list-item-avatar size="100">
                <!-- <img :src="require('../assets/persona.jpg')"> -->
          </v-list-item-avatar>
          <v-list-item-title class="title text-center">
            {{empresa.nombre}}
          </v-list-item-title>
          <v-list-item-title class="title pt-8 text-center">
            {{usuario.nombre}}{{usuario.apellidoP}}
          </v-list-item-title>
          <v-list-item-title class="title text-center">
            {{usuario.apellidoM}}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list
        color=""
        dense
        nav
        flat
      >
        <template v-for="(item, index) in this.items" >
        
        <v-list-item
          active-class="indigo--text text--darken-4 white"
            v-if="item.title"
            :key="item.title"
            :to="item.to"
            
        >
        
            <v-list-item-icon class="mt-5 mb-5">
                <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            
            <v-list-item-content >
                <v-list-item-title class="">{{ item.title }}</v-list-item-title>
            
            </v-list-item-content>
            <v-list-item-icon class="mt-5" >
                <v-icon >fas fa-chevron-right</v-icon>
            </v-list-item-icon>
        </v-list-item>
        <v-divider
            :key="index"
            :inset="item.inset"
        ></v-divider>
        </template>
      </v-list>
        <template v-slot:append>
        <div class="pa-2">
          <v-btn block @click="cerrarSesion">
            <span class="mr-2 ">Cerrar Sesión</span>
            <v-icon >fas fa-sign-out-alt</v-icon>
          </v-btn>  
        </div>
      </template>
    </v-navigation-drawer>
</template>
<script>
//importaciones desde vuex 
import {mapActions, mapGetters, mapState, mapMutations} from 'vuex'
//exportacion imagen
// import img from '../assets/persona.jpg'
//metodos y datos 
export default {
    //datos de la barra lateral
    data(){
        return{
            
            items: [
                { title: 'Panel', icon: 'fas fa-exclamation', to:'/panel' },
                {divider:true, inset:true},
                { title: 'Enviar', icon: 'fas fa-history',to:'/enviar' },
                {divider:true, inset:true},
                { title: 'Intento', icon: 'fas fa-check-circle',to:'/intento' },
                {divider:true, inset:true},
            ],
            
        }
       
    },
    //metodos extraidos para el cierre de sesión 
  methods:{
    ...mapActions(['cerrarSesion'])
  },
  //metodo de obtencion de usuario de la store
  computed:{
    ...mapState(['usuario','empresa','drawer']),
  },

 
}
</script>