<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-space-around>
      <v-flex xs12 sm8 md4>
        <v-dialog v-model="dialog" max-width="290">
          <v-card>
            <v-card-title class="headline error white--text">Erro</v-card-title>
            <v-card-text class="pt-2">
              <p>{{ dialogMessage }}</p>
            </v-card-text>
            <v-card-actions>
              <v-spacer />
              <v-btn
                v-if="verifyEmail"
                text
                color="disabled"
                @click.native="resendVerificationEmail"
              >Reenviar e-mail</v-btn>
              <v-btn text color="error" @click.native="dialog = false">OK</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-card class="elevation-6">
          <v-card-text class="px-10 pb-0">
            <v-form
              ref="form"
              v-model="valid"
              lazy-validation
              @keyup.native.enter="valid && didTapLogin()"
            >
              <v-text-field
                v-model="mail"
                :rules="[formRules.required, formRules.email]"
                append-icon="mail"
                name="login"
                label="E-mail"
                validate-on-blur
                type="text"
              />

              <v-text-field
                id="password"
                v-model="password"
                :rules="[formRules.required]"
                append-icon="vpn_key"
                name="password"
                label="Senha"
                validate-on-blur
                type="password"
              />
            </v-form>
          </v-card-text>
          <v-card-actions class="py-5">
            <v-spacer />
            <v-btn
              :disabled="!valid || loading"
              :loading="loading"
              color="accent"
              large
              type="submit"
              @click.native="didTapLogin"
            >Login</v-btn>
            <v-spacer />
          </v-card-actions>
        </v-card>
        <p class="mt-3">
          Caso não possua um login cadastre-se
          <router-link to="cadastro">aqui</router-link>
        </p>
      </v-flex>
    </v-layout>
    <v-snackbar v-model="snackbar" color="primary" bottom dark>
      <v-icon color="white" class="mr-3">check</v-icon>
      <div>Email de verificação reenviado!</div>
      <v-icon size="16" @click="snackbar = false">mdi-close-circle</v-icon>
    </v-snackbar>
  </v-container>
</template>

<script>
import formRules from "@/utils/formRules";
import { login, sendVerificationEmail } from "@/firebase/api/auth";
export default {
  name: "Login",
  mixins: [formRules],
  data() {
    return {
      valid: true,
      verifyEmail: false,
      snackbar: false,
      mail: "",
      password: "",
      loading: false,
      dialog: false,
      dialogMessage: ""
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
        login(vm.mail, vm.password).then(result => {
          if (result == null) {
            vm.$router.replace("/tutorias");
          } else {
            if (result.code) {
              vm.verifyEmail = false;
              vm.dialogMessage = result.code;
              if (result.code === "auth/user-not-found") {
                vm.dialogMessage = "Este email não está cadastrado...";
              }

              if (result.code === "auth/user-disabled") {
                vm.dialogMessage = "Este usuário foi desativado...";
              }

              if (result.code === "auth/wrong-password") {
                vm.dialogMessage = "Senha incorreta!";
              }

              if (result.code === "auth/network-request-failed") {
                vm.dialogMessage = "Erro de conexão com o servidor!";
              }
            } else {
              vm.dialogMessage =
                "Email ainda não verificado, confirme por meio do link enviado para sua caixa de mensagens.";
              vm.verifyEmail = true;
              vm.verificationUser = result;
            }
            vm.loading = false;
            vm.dialog = true;
          }
        });
      }
    },
    resendVerificationEmail() {
      sendVerificationEmail(this.verificationUser).then(() => {
        this.dialog = false;
        this.verifyEmail = false;
        this.verificationUser = null;
        this.snackbar = true;
      });
    }
  }
};
</script>

<style scoped>
#app{
  background-color: var(--v-primary-base);
}
</style>
