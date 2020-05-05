<template>
  <v-container fluid fill-height style="background-color: var(--v-primary-base)">
    <v-layout align-center justify-space-around>
      <v-flex xs12 sm8 md4>
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
        <v-card color="card" class="elevation-6">
          <v-card-text class="px-10 pb-0">
            <v-form ref="form" v-model="valid" @keyup.native.enter="valid && login()">
              <v-text-field
                v-model="mail"
                :rules="[formRules.required, formRules.email]"
                validate-on-blur
                append-icon="mail"
                name="login"
                label="E-mail"
                type="text"
              />

              <v-text-field
                id="password"
                v-model="password"
                :rules="[formRules.required, formRules.password]"
                validate-on-blur
                append-icon="vpn_key"
                name="password"
                label="Senha"
                type="password"
              />

              <v-text-field
                id="confirmation"
                v-model="confirmation"
                :rules="[formRules.required, confRules.equal]"
                validate-on-blur
                append-icon="vpn_key"
                name="confirmation"
                label="Confirmação de senha"
                type="password"
              />

              <v-spacer />
              <v-text-field
                id="institution"
                v-model="institution"
                :rules="[formRules.required]"
                append-icon="school"
                validate-on-blur
                name="institution"
                label="Instituição"
              />
              <v-text-field
                id="state"
                v-model="state"
                :rules="[formRules.required]"
                append-icon="public"
                validate-on-blur
                name="state"
                label="Estado"
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="py-5">
            <v-spacer />
            <v-btn
              :disabled="loading"
              :loading="loading"
              color="primary"
              @click="signup"
            >
            Cadastrar
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
    signup() {
      const v = this;
      if (v.$refs.form.validate()) {
        v.loading = true;
        firebase
          .auth()
          .createUserWithEmailAndPassword(v.mail, v.password)
          .then(
            (response) => {
              db.collection('users')
                .doc(response.user.uid)
                .set({
                  name: v.mail,
                  email: v.mail,
                  institution: v.institution,
                  state: v.state,
                })
                .then(() => {
                  v.$store.state.app.userID = response.user.uid;
                  v.$router.replace('/tutorias');
                })
                .catch(() => {
                  v.dialogMessage = 'Erro ao criar seus dados iniciais...';
                  v.loading = false;
                  v.dialog = true;
                });
            },
            (error) => {
              if (error.code === 'auth/email-already-in-use') {
                v.dialogMessage = 'Este email já está em uso!';
              }
              v.loading = false;
              v.dialog = true;
            },
          );
      }
    },
  },
};
</script>

<style scoped>
p {
  margin: 1em;
}
</style>
