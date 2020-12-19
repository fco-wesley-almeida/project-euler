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
        style="
          position: fixed;
          bottom: 0;
          right: 0;
          margin-right: 16px;
          margin-bottom: 16px;
        "
        color="primary"
        @click="changePassword"
        >Salvar</v-btn
      >
    </v-scale-transition>

    <v-snackbar v-model="snackbar" :color="colorSnackbar" bottom right>
      <v-icon v-if="colorSnackbar === 'primary'" color="white" class="mr-3"
        >check</v-icon
      >
      <div>{{ messageSnackbar }}</div>
    </v-snackbar>
  </v-layout>
</template>

<script>
import firebase from "firebase";
import formRules from "@/utils/formRules";

export default {
  mixins: [formRules],
  created() {
    /*
            Ao invés de o objeto user ser criado do lado de fora do export, é melhor criá-lo assim que o componente for criado.
            Vide ciclo de vida de um componente em VueJS. Dessa forma, ele pode ser usado como um objeto pertencente ao compo-
            nente, o que é melhor.
        */
    this.user = firebase.auth().currentUser;
  },
  data() {
    return {
      user: {}, // Objeto que guardará o usuário atual
      oldPassword: "",
      newPassword: "",
      snackbar: false,
      messageSnackbar: "",
      colorSnackbar: "",
    };
  },
  methods: {
    showMessage(message, state) {
      this.messageSnackbar = message;
      this.colorSnackbar = state === "error" ? "error" : "primary";
      this.snackbar = true;
    },
    changePassword() {
      if (this.oldPassword == this.newPassword) {
        this.showMessage(
          "A nova senha deve ser diferente da senha atual. Favor tentar novamente.",
          "sucess"
        );
      } else if (
        this.user.reauthenticateAndRetrieveDataWithCredential(
          firebase.auth.EmailAuthProvider.credential(
            this.user.email,
            this.oldPassword
          )
        )
      ) {
        this.user
          .updatePassword(this.newPassword)
          .then((result) => {
              console.log(result);
            this.showMessage("Senha alterada com sucesso!!", "sucess");
          })
          .catch((error) => {
            console.log(error);
            this.showMessage(
              "Senha inválida. Favor tente novamente.",
              "sucess"
            );
          });
      } else {
        this.showMessage(
          "Senha atual inválida. Favor tentar novamente.",
          "sucess"
        );
      }
    },
  },
};
</script>

<style>
</style>