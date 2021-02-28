<template>
  <v-app>
    <v-main>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>

import Navbar from './components/Navbar';
import Appbar from './components/Appbar';
import { mapActions,mapGetters, mapState } from 'vuex';

export default {
  name: 'App',

  components: {
    Navbar,
    Appbar
  },

  data: () => ({
    
  }),
  methods:{
    
  },
  computed:{
    ...mapGetters(['existeUsuario']),
    ...mapState(['empresa','usuario'])
  },

};
</script>
