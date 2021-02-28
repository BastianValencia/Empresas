<template>
    <div>
        <Appbar></Appbar>
        <Navbar></Navbar>
        <div class="text-center">
            <h1 class="font-weight-light my-6" >Template SMS</h1>
            <v-divider class="blue darken-2 mx-4 my-4 "></v-divider>
            <v-form >
                <v-card
                class="mx-auto my-10 px-2"
                elevation="16"
                max-width="90%"                      
                >
                    <v-row>
                        <v-col cols="12" md="6" xs="12">
                            <v-row>
                                <v-col>
                                    <v-textarea 
                                    onkeypress="return((event.charCode >= 33 && event.charCode <= 128) || event.charCode == 191 || event.charCode == 32 || event.charCode == 13)"
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
                            </v-row>
                            <v-row>
                                <v-col>
                                    <template>
                                        <v-file-input 
                                            class="mx-5"
                                            v-model="$v.file.$model"
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
                                    <v-radio-group 
                                    v-model="separador">

                                        <v-radio
                                        color="deep-purple accent-4"
                                        value=","
                                        >
                                        <template v-slot:label>
                                        <div><Span class="black--text">COMA </Span><strong class="deep-purple--text text--accent-4">( , )</strong></div>
                                        </template>
                                        </v-radio>

                                        <v-radio 
                                        color="deep-purple accent-4"
                                        value=";"
                                        >
                                        <template v-slot:label>
                                        <div><Span class="black--text">PUNTO Y COMA </Span><strong class="deep-purple--text text--accent-4">( ; )</strong></div>
                                        </template>
                                        </v-radio>
                                        
                                        <v-radio 
                                        color="deep-purple accent-4"
                                        value="tab"
                                        >
                                        <template v-slot:label>
                                        <div><Span class="black--text">TABULACIÓN </Span><strong class="deep-purple--text text--accent-4">( tab )</strong></div>
                                        </template>
                                        </v-radio>
                                    </v-radio-group>
                                </v-col>
                            </v-row>
                        </v-col>
                        <v-col
                            cols="12" md="6" xs="12"
                            >
                            <v-card 
                            elevation="10"
                            class="mx-4 py-2"
                            >
                                <v-row>
                                    <v-col>
                                        <span>ENVIAR MENSAJES</span>
                                        <v-radio-group
                                        row
                                        v-model="enviar"
                                        >
                                        <v-radio
                                        class="mx-auto"
                                        color="deep-purple accent-4"
                                        :value="false"
                                        label="Enviar Ahora "
                                        >
                                        </v-radio>
                                        <v-radio 
                                        class="mx-auto"
                                        color="deep-purple accent-4"
                                        :value="true"
                                        label="Enviar a Futuro "
                                        >
                                        </v-radio>
                                        
                                    </v-radio-group>
                                    </v-col>
                                </v-row>
                                <v-row v-if="enviar">
                                    <v-col class="mx-auto" cols="12">
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
                                                class="mr-5"
                                                
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
                                <v-row v-if="enviar">
                                    <v-col>
                                         <v-menu
                                            ref="menu2"
                                            v-model="menu2"
                                            :close-on-content-click="false"
                                            :nudge-right="40"
                                            :return-value.sync="time"
                                            transition="scale-transition"
                                            offset-y
                                            max-width="290px"
                                            min-width="290px"
                                        >
                                            <template v-slot:activator="{ on, attrs }">
                                            <v-text-field
                                                color="deep-purple accent-4"
                                                class="mr-5"
                                                v-model="time"
                                                label="Seleccione Hora"
                                                prepend-icon="mdi-clock-time-four-outline"
                                                readonly
                                                v-bind="attrs"
                                                v-on="on"
                                            ></v-text-field>
                                            </template>
                                            <v-time-picker
                                            color="deep-purple accent-4"
                                            v-if="menu2"
                                            v-model="time"
                                            full-width
                                            scrollable
                                            :max="restriccion"
                                            >
                                            <v-spacer></v-spacer>
                                            <v-btn
                                                text
                                                color="deep-purple accent-4"
                                                @click="menu2 = false"
                                            >
                                                Cancel
                                            </v-btn>
                                            <v-btn
                                                text
                                                color="deep-purple accent-4"
                                                @click="$refs.menu2.save(time)"
                                            >
                                                OK
                                            </v-btn></v-time-picker>
                                        </v-menu>
                                    </v-col>
                                </v-row>
                                <v-row>
                                    <v-col>
                                        <v-btn @click="prueba" :disabled="$v.$invalid" color="green" outlined>Enviar</v-btn>
                                    </v-col>
                                    
                                </v-row>
                            </v-card>
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
import { required, minLength, maxLength } from 'vuelidate/lib/validators'
import { mapActions, mapState } from 'vuex';

export default {
    name:'Intento',
    components: {
    Navbar,
    Appbar
    },
    data() {
        return{
            rules: [textarea => textarea.length <= 160 || 'Maximo 160 caracteres'],
            textarea:'',
            file: [],
            date:'',
            menu: false,
            hoy: new Date().toISOString().substr(0, 10),
            futuro:'',
            enviar:null,
            separador:'',
            time:'',
            menu2:false,
            restriccion:''
            
        }
    },
    validations:{
        textarea:{required, maxLength: maxLength(160), minLenght: minLength(1)},
        file:{required},
        separador:{required},
        enviar:{required},
    },
    methods:{
        mostrar(){
            console.log(this.file)
            console.log(this.file.type)
            console.log(this.date)
        },
        
        ...mapActions(['boton']),
        prueba(){
            console.log(this.textarea)
            console.log(this.file)
            console.log(this.separador)
            console.log(this.enviar)
            console.log(this.date)
            console.log(this.time)

            if(!this.enviar){
                console.log(this.hoy)
            }
        }
    },
    created(){
        
        this.boton(true)
       
    },
    computed:{
    ...mapState(['empresa','usuario'])
  },
  
}
</script>

