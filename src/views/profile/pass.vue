<template>
    <v-layout align-center justify-center wrap>
        <v-flex xs11 md8 lg6>
            <v-card color="card" class="mt-3">
                <v-form class="pa-1" ref="form">
                    <v-layout class="pa-2">
                        <div style="width: 100%">
                            <v-card-title>
                                <v-text-field
                                id="password"
                                v-model="oldPassword"
                                :rules="[formRules.required]"
                                name="password"
                                label="Senha Atual"
                                type="password"
                                validate-on-blur
                                />
                            </v-card-title>

                            <v-card-title>
                                <v-text-field
                                id="newPassword"
                                v-model="newPassword"
                                :rules="[formRules.required]"
                                name="newPassword"
                                label="Nova Senha"
                                type="Password"
                                validate-on-blur
                                />
                            </v-card-title>
                        </div>
                    </v-layout>
                </v-form>
            </v-card>
        </v-flex>
        <v-scale-transition>
        <v-btn
            dark
            style="position: fixed; bottom: 0; right: 0; margin-right: 16px; margin-bottom: 16px"
            color="primary"
            @click="changePassword"
        >Salvar</v-btn>
        </v-scale-transition>  

        <v-snackbar v-model="snackbar" :color="colorSnackbar" bottom right>
        <v-icon> v-if="colorSnackbar === 'primary' color="white" class="mr-3">check</v-icon>
        <div> {{messageSnackbar}}</div>
        </v-snackbar>
        
    </v-layout>    
</template>

<script>
import firebase from 'firebase';
import { db, auth } from "@/firebase/config";
import formRules from "@/utils/formRules";



const user = firebase.auth().currentUser;

export default {
    name: 'Redefinir de senha',
    mixins:[formRules],
    data() {  
        return {
            oldPassword: '',
            newPassword: '',
            snackbar: false,
            messageSnackbar: '',
            colorSnackbar: ''
        };
    },
    methods:{
        showMensage(message, state){
            this.messageSnackbar = message
            this.colorSnackbar = state === 'error' ? 'error' : 'primary'
            this.snackbar = true
        },
        async changePassword(){
            
            if(this.oldPassword == user.oldPassword){
                user.updatePassword(newPassword).then(result => {
                this.showMensage('Senha alterada com sucesso!!', 'sucess')
                }).catch((error) => {
                    this.showMensage('Senha inválida. Favor tente novamente.', 'sucess')
                    }
                );
            }
        }
    }
}
</script>

<style>

</style>