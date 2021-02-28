<template >
    <div v-bind:style="{backgroundImage: 'url(https://www.xtrafondos.com/wallpapers/geometria-3d-3586.jpg)', height:'100%',width:'100%', backgroundPosition: 'center center',
    backgroundSize: 'cover'}" class="pt-16" >
        <v-form @submit.prevent="ingresoUsuario({email: $v.email.$model, pass: $v.pass.$model})">
            <v-card
                class="mx-auto mt-16"
                width="450"                      
                >
                    <v-card-title class="title text-center font-weight-regular">
                    <div class="container text-center pb-0">
                        <h1 class="font-weight-light ">Login</h1>
                    </div >
                    </v-card-title>

                    <v-window>
                    <v-window-item >
                        <v-card-text>
                            <v-text-field class="mx-10 " outlined type="email" color="#00013a" v-model="$v.email.$model"
                                label="Email"
                                placeholder="correo@correo.cl"
                            ></v-text-field>
                            <span v-if="!$v.email.email" class="caption red--text ">Email no valido</span>
                        </v-card-text>
                        <v-card-text >
                            <v-text-field class="mx-10" outlined type="password" color="#00013a" v-model="$v.pass.$model" label="Password" >
                                Password
                            </v-text-field>
                        </v-card-text>
                    </v-window-item>

                   
                    </v-window>

                    <v-divider color="#00013a"></v-divider>
                    <v-row>
                        <v-col class="mt-2 text-center" cols="8">
                            <span v-if="error" class="ml-5 caption red--text ">{{error}}</span>
                        </v-col>
                        <v-col cols="4" class="mt-1">
                            <v-spacer></v-spacer>
                            <v-btn 
                            type="submit"
                            :disabled="$v.$invalid"
                            text
                            class=""
                            color="#00013a"> Ingresar </v-btn>
                        </v-col>
                    </v-row>
            </v-card>
            
        </v-form>
    </div>
</template>

<script>

import {mapActions, mapState, mapMutations, Store} from 'vuex'
import { required, minLength, email } from 'vuelidate/lib/validators'

  export default {
    name:'Login',
    data: () => ({
      
      email:'',
      pass:'',
      src:'@/assets/log.jpg'
    }),
    methods: {
        ...mapActions(['ingresoUsuario']),   
    },
    computed: {
      ...mapState(['error']),
      ...mapMutations(['setError','setError1'])
    },
    validations:{
        email:{required, email},
        pass:{required, minLenght: minLength(6)}
    }
    
  }
</script>