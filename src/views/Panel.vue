<template>
    <div>
        <Appbar></Appbar>
        <Navbar></Navbar>
        <div class="container text-center">
            <h1 class="font-weight-light">Panel</h1>
        </div >
    </div>
</template>

<script>

import Navbar from '../components/Navbar';
import Appbar from '../components/Appbar';
import { mapActions } from 'vuex';

export default {
    name:'Panel',
    components: {
    Navbar,
    Appbar
    },
    created(){
        this.boton(true)
    },
    methods:{
      ...mapActions(['boton'])
    },
}
</script>