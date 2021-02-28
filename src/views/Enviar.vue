<template>
    <div>
        <Appbar></Appbar>
        <Navbar></Navbar>
        <div class="text-center">
            <h1 class="font-weight-light my-6" >Template SMS</h1>
            <v-divider class="blue darken-2 mx-4 my-4 "></v-divider>
            <v-form >
                <v-card
                class="mx-auto mt-10 px-2"
                elevation="16"
                max-width="90%"                      
                >
                    <v-row>
                        <v-col cols="6">
                            <v-textarea 
                            auto-grow 
                            prepend-icon="fas fa-comment-alt"
                            outlined
                            :rules="rules"
                            placeholder="Escriba su mensaje..."
                            class="mx-5" 
                            counter="160"
                            label="Mensaje SMS"
                            color="deep-purple accent-4" 
                            type="textarea"
                            v-model="$v.textarea.$model"
                            ></v-textarea>
                        </v-col>
                        <v-col
                            cols="12"
                            sm="6"
                            md="4"
                            >
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                :return-value.sync="date"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                            >
                                <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                    v-model="date"
                                    color="deep-purple accent-4"
                                    label="Seleccione Fecha"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                ></v-text-field>
                                </template>
                                <v-date-picker
                                color="deep-purple accent-4"
                                v-model="date"
                                no-title
                                scrollable
                                :min="hoy"
                                
                                >
                                <v-spacer></v-spacer>
                                <v-btn
                                    text
                                    color="deep-purple accent-4"
                                    @click="menu = false"
                                >
                                    Cancel
                                </v-btn>
                                <v-btn
                                    text
                                    color="deep-purple accent-4"
                                    @click="$refs.menu.save(date)"
                                >
                                    OK
                                </v-btn>
                                </v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col cols="6">
                            <template>
                                <v-file-input 
                                    class="mx-5"
                                    v-model="file"
                                    color="deep-purple accent-4"
                                    counter
                                    hint="archivos acecptados"
                                    label="Subir Archivo"
                                    accept=".csv, text/plain, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                                    prepend-icon="fas fa-paperclip"
                                    outlined
                                    :show-size="1000"
                                >
                                    <template v-slot:selection="{ index, text }">
                                    <v-chip
                                        v-if="index < 2"
                                        color="deep-purple accent-4"
                                        dark
                                        label
                                        small
                                    >
                                        {{ text }}
                                    </v-chip>
                                    <span
                                        v-else-if="index === 2"
                                        class="overline grey--text text--darken-3 mx-2"
                                    >
                                        +{{ files.length - 2 }} File(s) 
                                    </span>
                                    </template>
                                </v-file-input>
                            </template>
                        </v-col>
                    </v-row>
                    <v-row>
                        <v-col class="mx-5" >
                            <span>Seleccione el separador usado</span>
                            <v-radio-group >
                                <v-radio
                                color="deep-purple accent-4"
                                value=","
                                label="COMA ( , ) "
                                >
                                <span>HOLA</span>
                                </v-radio>
                                <v-radio 
                                color="deep-purple accent-4"
                                value=";"
                                label="PUNTO Y COMA ( ; ) "
                                >
                                </v-radio>
                                <v-radio 
                                color="deep-purple accent-4"
                                value="tab"
                                label="TABULACION (tab)"
                                >
                                </v-radio>
                            </v-radio-group>
                        </v-col>
                        <v-col>
                            <v-btn @click="mostrar"></v-btn>
                        </v-col>
                    </v-row>
                </v-card>
            </v-form>
        </div >
    </div>
        
</template>

<script>

import Appbar from '../components/Appbar';
import Navbar from '../components/Navbar';
import { required, minLength, maxLength } from 'vuelidate/lib/validators';
import { mapActions } from 'vuex';

export default {
    name:'Enviar',
    components: {
    Navbar,
    Appbar
    },
    data() {
        return{
            rules: [textarea => textarea.length <= 160 || 'Maximo 160 caracteres'],
            textarea:'',
            file: [],
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            picker: new Date().toISOString(),
            hoy:new Date().toISOString().substr(0, 10),
            futuro:''
            
            
        }
    },
    validations:{
        textarea:{required, maxLength: maxLength(160), minLenght: minLength(1)},
    },
    methods:{
        mostrar(){
            console.log(this.file)
            console.log(this.file.type)
            console.log(this.date)
        },
        fechaFutura(){
            var e = new Date()
            var a = e.getFullYear() + '-' + (e.getMonth()+2) + '-' + e.getDate()
            this.futuro = a
           
        },
        ...mapActions(['boton'])
    },
    created(){
        this.fechaFutura()
        this.boton(true)
    },
    
  
}
</script>

