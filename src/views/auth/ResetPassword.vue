<template>
  <v-container fluid fill-height style="background-color: var(--v-primary-base)">
    <p>{{ $vuetify.breakpoint.width }} </p>
    <h2 v-if="bigWindow" class="white--text mb-10">Informe o email com o qual você se cadastrou no PBL System</h2>
    <v-layout align-center justify-space-around>
      <v-flex xs12 sm10 md11 lg10>
        <v-dialog v-model="dialog" max-width="290">
          <v-card color="card">
            <v-card-title class="headline error white--text">Erro</v-card-title>
            <v-card-text>{{ dialogMessage }}</v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn text color="error" @click.native="dialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <h2 v-if="!bigWindow" class="white--text mb-5" style="text-align: center">Informe o email com o qual você se cadastrou no PBL System</h2>
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
            Enviar
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
  </v-container>
</template>

<script>
import firebase from 'firebase';
import { db } from '@/firebase/config';
import formRules from '@/utils/formRules';

export default {
  name: 'Login',
  mixins: [formRules],
  data() {
    return {
      valid: true,
      mail: '',
      password: '',
      confirmation: '',
      institution: '',
      state: '',
      loading: false,
      dialog: false,
      dialogMessage: '',
      confRules: {
        equal: value => value === this.password || 'Confirmação deve ser igual à senha',
      },
    };
  },
  methods: {
    sendResetPasswordEmail() {
      const v = this;
      if (v.$refs.form.validate()) {
        alert("Email enviado!")
      }
    },
  },
  computed: {
    bigWindow() {
      return this.$vuetify.breakpoint.width > 1120
    }
  },
};
</script>

<style scoped>
p {
  margin: 1em;
}
</style>
