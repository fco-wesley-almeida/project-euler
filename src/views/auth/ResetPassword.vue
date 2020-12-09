<template>
  <v-container fluid fill-height style="background-color: var(--v-primary-base)">
    <v-layout align-center justify-space-around>
      <v-flex xs10 sm7 md6 lg5>
        <h2 class="white--text mb-5">Informe o email com o qual você se cadastrou no PBL System</h2>
        <v-card color="card" class="elevation-6">
          <v-card-text class="px-10 pb-0">
            <v-form ref="form" v-model="valid" @keyup.native.enter="valid">
              <v-text-field
                v-model="mail"
                :rules="[formRules.required, formRules.email]"
                validate-on-blur
                append-icon="mail"
                name="login"
                label="E-mail"
                type="text"
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="py-5">
            <v-spacer />
            <v-btn
              :disabled="loading"
              :loading="loading"
              color="primary"
              @click="sendResetPasswordEmail"
            >
            <v-progress-circular v-if="loading" size="25" width="2" color="white" indeterminate/>
            <div v-else>Enviar</div>
            </v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
        <p class="white--text">
          Voltar ao
          <router-link class="white--text" to="login">login</router-link>
        </p>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="snackbar" :color="colorSnackbar" bottom dark>
      <v-icon v-if="colorSnackbar === 'primary'" color="white" class="mr-3">check</v-icon>
      <div>{{ messageSnackbar }}</div>
      <v-icon size="16" @click="snackbar = false">mdi-close-circle</v-icon>
    </v-snackbar>
  </v-container>
</template>

<script>
import firebase from 'firebase';
import formRules from '@/utils/formRules';

export default {
  name: 'Login',
  mixins: [formRules],
  data() {
    return {
      valid: true,
      mail: '',
      loading: false,
      snackbar: false,
      colorSnackbar: '',
      messageSnackbar: ''
    };
  },
  methods: {
    showMessage (message, state) {
          this.loading = false
          this.messageSnackbar = message
          this.colorSnackbar = state === 'error' ? 'error' : 'primary'
          this.snackbar = true
    },
    sendResetPasswordEmail() {
      const isValid = this.$refs.form.validate(); 
      if (isValid) {
        this.loading = true
        const auth = firebase.auth()
        auth.sendPasswordResetEmail(this.mail).then(result => {
          this.showMessage('Uma mensagem de redefinição de senha foi enviada para o seu email.', 'sucess')
        }).catch((error) => {
          const messages = {
              "auth/user-not-found":  "Este email não está cadastrado.",
              "auth/user-disabled": "Este usuário foi desativado.",
              "auth/network-request-failed": "Erro de conexão com o servidor."
          }
          const message = messages[error.code] || 'Ocorreu um erro no envio do email de redefinição de senha. Tente novamente dentro de alguns minutos. Se o erro persistir, contate o administrador do sistema.'
          this.showMessage(message, 'error')
        });
      }
    },
  },
  beforeCreate () {
    const userIsAuthenticated = firebase.auth().currentUser
    if (userIsAuthenticated) {
      this.$router.replace('/');
    }
  }
};
</script>

<style scoped>
  p {
    margin: 1em;
  }
  h2 {
    text-align: center;
  }
</style>
