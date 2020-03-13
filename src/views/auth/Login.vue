<template>
  <v-container
    fluid
    fill-height>
    <v-layout
      align-center
      justify-space-around>
      <v-flex
        xs12
        sm8
        md4>
        <v-dialog
          v-model="dialog"
          max-width="290">
          <v-card>
            <v-card-title class="headline error white--text">Erro</v-card-title>
            <v-card-text class="pt-2"><p>{{ dialogMessage }}</p></v-card-text>
            <v-card-actions>
              <v-spacer/>
              <v-btn
                text
                color="error"
                @click.native="dialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-card class="elevation-6">
          <v-card-text class="px-10 pb-0">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @keyup.native.enter="valid && didTapLogin()">
              <v-text-field
                v-model="mail"
                :rules="[formRules.required, formRules.email]"
                append-icon="mail"
                name="login"
                label="E-mail"
                validate-on-blur
                type="text"/>

              <v-text-field
                id="password"
                v-model="password"
                :rules="[formRules.required]"
                append-icon="vpn_key"
                name="password"
                label="Senha"
                validate-on-blur
                type="password"/>
            </v-form>
          </v-card-text>
          <v-card-actions class="py-5">
            <v-spacer/>
            <v-btn
              :disabled="!valid || loading"
              :loading="loading"
              color="accent"
              large
              type="submit"
              @click.native="didTapLogin">Login</v-btn>
            <v-spacer/>
          </v-card-actions>
        </v-card>
        <p class="mt-3">Caso não possua um login cadastre-se
          <router-link to="cadastro">aqui</router-link>
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import formRules from '@/utils/formRules';
  import {login} from '@/firebase/api/auth';
  export default {
    name: 'Login',
    mixins: [formRules],
    data() {
      return {
        valid: true,
        mail: '',
        password: '',
        loading: false,
        dialog: false,
        dialogMessage: '',
      };
    },
    mounted() {
      this.$store.state.app.userID = null;
      this.$store.state.app.user = null;
    },
    methods: {
      didTapLogin() {
        const vm = this;
        if (vm.$refs.form.validate()) {
          vm.loading = true;
          login(vm.mail, vm.password).then((error) => {
            if (error) {
              vm.dialogMessage = error.code;
              if (error.code === 'auth/user-not-found') { vm.dialogMessage = 'Este email não está cadastrado...'; }

              if (error.code === 'auth/user-disabled') { vm.dialogMessage = 'Este usuário foi desativado...'; }

              if (error.code === 'auth/wrong-password') { vm.dialogMessage = 'Senha incorreta!'; }

              if (error.code === 'auth/network-request-failed') { vm.dialogMessage = 'Erro de conexão com o servidor!'; }
              vm.loading = false;
              vm.dialog = true;
            } else {
              vm.$router.replace('/tutorias');
            }
          });
        }
      },
    },
  };
</script>
