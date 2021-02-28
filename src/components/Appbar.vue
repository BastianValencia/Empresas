<template>    
    <v-app-bar
        app
        color="indigo darken-1"
        dark
        elevation="10"
        >
        
        <v-app-bar-nav-icon @click.stop="boton(drawer = !drawer)" class="hidden-sm-and-up" ></v-app-bar-nav-icon>
        
            <!-- <router-link :to="{name:'Home'}"> -->
            <v-toolbar-title>
            
              <v-btn text href="/" x-large rounded dark >
                <!-- <img :src="require('./assets/SubmitFoto.png')"  width="50px"/> -->
                <span>Plataforma SMS </span>
              </v-btn>
              
            </v-toolbar-title>

            <!-- </router-link> -->

        <v-spacer></v-spacer>
        <!-- <v-btn text to="/ranking">
          <span class="mr-2">Ranking</span>
          <v-icon>fas fa-table</v-icon>
        </v-btn>
        <v-btn v-if="existeUsuario" text href="/panel">
          <v-icon size="50">fab fa-cpanel</v-icon>
        </v-btn>
        <v-btn v-if="!existeUsuario" text href="/login">
          <v-icon>far fa-address-book</v-icon>
          <span class="ml-2">Ingresar</span>
        </v-btn> -->
        <v-btn v-if="existeUsuario" text >
          <v-icon class="mr-2">fas fa-dollar-sign</v-icon>
        <span class="display-1">{{empresa.creditos}}</span>
        
        
        </v-btn> 
    </v-app-bar>
</template>

<script>

import { mapActions,mapGetters, mapState } from 'vuex';

export default {
  

  data: () => ({
    drawer:true
  }),
  methods:{
      ...mapActions(['boton']),
  },
  computed:{
    ...mapGetters(['existeUsuario']),
    ...mapState(['empresa','usuario'])
  },

};
</script>