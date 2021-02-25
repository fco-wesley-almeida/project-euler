<template>
  <div>
    <v-layout align-center justify-center wrap>
      <v-flex xs11 md8 lg6>
        <v-card color="card" class="mt-3">
          <v-form class="pa-1" ref="form" v-model="valid">
            <v-layout class="pa-2">
              <div
                class="my-auto"
                style="width: 100px; margin-left: 10px; margin-right: 0px"
              >
                <v-layout column align-center justify-center fill-height>
                  <input
                    id="fileInput"
                    name="myFile"
                    type="file"
                    accept="image/png, image/jpeg"
                    @change="didChangeImage"
                  />
                  <v-avatar
                    size="80"
                    style="cursor: pointer"
                    @click.stop="didTapAddImage()"
                  >
                    <v-img
                      id="previewImage"
                      ref="previewImage"
                      :src="
                        resultFile ||
                        user.imageURL ||
                        '/img/profile-default.jpg'
                      "
                      class="elevation-2"
                    />
                  </v-avatar>
                  <v-btn
                    small
                    text
                    color="primary"
                    @click.stop="didTapAddImage()"
                  >
                    Trocar
                    <v-icon x-small>camera_alt</v-icon>
                  </v-btn>
                </v-layout>
              </div>
              <div style="width: 100%">
                <v-card-title>
                  <v-text-field
                    class="my-1"
                    v-model="user.name"
                    :rules="[formRules.required]"
                    required
                    label="Nome"
                  />
                </v-card-title>
                <v-card-subtitle>
                  <div class="my-1">
                    <v-icon class="mr-2" color="primary">mail</v-icon>
                    <span>{{ user.email }}</span>
                  </div>
                  <div>
                    <v-text-field
                      class="my-1"
                      prepend-icon="school"
                      v-model="user.institution"
                      :rules="[formRules.required]"
                      required
                      label="Instituição"
                    />
                  </div>
                  <div>
                    <v-text-field
                      prepend-icon="public"
                      v-model="user.state"
                      :rules="[formRules.required]"
                      required
                      label="Estado"
                    />
                  </div>
                </v-card-subtitle>
              </div>
            </v-layout>
          </v-form>
        </v-card>
      </v-flex>
      <v-scale-transition>
        <v-btn
          v-show="profileHasChanged"
          small
          dark
          fab
          style="
            position: fixed;
            bottom: 0;
            right: 0;
            margin-right: 300px;
            margin-bottom: 16px;
          "
          @click="didTapRevert"
          color="disabled"
        >
          <v-icon>undo</v-icon>
        </v-btn>
      </v-scale-transition>
      <v-scale-transition>
        <v-btn
          v-show="profileHasChanged"
          primary
          dark
          style="
            position: fixed;
            bottom: 0;
            right: 0;
            margin-right: 16px;
            margin-bottom: 16px;
          "
          @click.native.stop="didTapUpdate"
          color="primary"
          >Salvar</v-btn
        >
      </v-scale-transition>
      <v-scale-transition>
        <v-btn
          primary
          dark
          style="
            position: fixed;
            bottom: 0;
            right: 0;
            margin-right: 120px;
            margin-bottom: 16px;
          "
          color="primary"
          @click="redefinirSenha = true"
          >Redifinir senha</v-btn
        >
      </v-scale-transition>

      <v-snackbar
        v-model="snackbar"
        color="success"
        name='Snackbar'
        bottom
        right
        :timeout="2000"
        >Salvo com sucesso!</v-snackbar
      >
      <v-snackbar 
        v-model="snackbarPass" 
        :color="colorSnackbar" 
        name='SnackbarPass' 
        bottom 
        dark
        :timeout="2000"
        ><v-icon v-if="colorSnackbar === 'primary'" color="white" class="mr-3" >check</v-icon>
        <div>{{ messageSnackbar }}</div>
      </v-snackbar>

      <UploadDialogs
        :is-uploading="uploading"
        :upload-progress="progress"
        :show-snackbar="snackbar"
        :upload-name="uploadName"
        :upload-size="uploadSize"
        @hideSnackbar="snackbar = false"
        @didTapCancel="didTapCancel"
      />
    </v-layout>

    <confirmation-dialog
      v-if="redefinirSenha"
      :enabled="redefinirSenha"
      :title="'Redefinir senha'"
      :dialogColor="'primary'"
      :confirmationButtonColor="'primary'"
      :confirmationButtonMessage="'Confirmar'"
      :confirmationMessage="'Será enviado uma mensagem para o seu email com um link para redefinição de senha. Você tem certeza que deseja redefinir sua senha?'"
      @abort="redefinirSenha = false"
      @confirm="sendResetPasswordEmail"
    />
  </div>
</template>

<script>
import firebase from 'firebase';
import { db, auth } from "@/firebase/config";
import photoupload from "@/mixins/photoupload";
import formRules from "@/utils/formRules";
import UploadDialogs from "@/components/dialogs/PhotoUpload";
import ConfirmationDialog from "@/components/dialogs/Confirmation.vue";

const users = db.collection("users");


export default {
  name: "Perfil",
  components: { UploadDialogs, ConfirmationDialog },
  mixins: [photoupload, formRules],
  data() {
    return {
      user: {},
      firebaseUser: {},
      snackbar: false,
      snackbarPass: false,   
      valid: false,
      redefinirSenha: false,
      messageSnackbar: '',
      colorSnackbar: '',
      mail: ''
    };
  },
  computed: {
    fileinputID() {
      return "fileInput";
    },
    previewImageID() {
      return "previewImage";
    },
    collection() {
      return "users";
    },
    document() {
      return this.$store.state.app.userID;
    },
    filepath() {
      return "users/" + this.$store.state.app.userID;
    },
    profileHasChanged() {
      if (this.user && this.firebaseUser) {
        return (
          this.user.name !== this.firebaseUser.name ||
          this.user.state !== this.firebaseUser.state ||
          this.user.institution !== this.firebaseUser.institution ||
          this.resultFile
        );
      }
      return false;
    },
  },
  mounted() {
    this.user = Object.assign(this.$store.state.app.user, this.user);
    this.$bind("firebaseUser", users.doc(this.$store.state.app.userID));
  },
  methods: {
    async didTapUpdate() {
      if (this.valid) {
        if (this.file != null) {
          this.createFile();
        } else {
          this.snackbar = true;
        }
        await this.$firestoreRefs.firebaseUser.update(this.user);
        this.$store.state.app.user = this.user;
        await auth.currentUser.updateProfile({ displayName: this.user.name });
      } else {
        this.$refs.form.validate();
      }
    },
    didTapRevert() {
      let revertObject = {};
      Object.assign(revertObject, this.firebaseUser);
      this.user = revertObject;
      this.resultFile = null;
    },
    uploadFinished(photoURL) {
      this.uploading = false;
      this.file = null;
      this.resultFile = null;
      this.snackbar = true;
      this.progress = 0;
      this.$store.state.app.user.imageURL = photoURL;
      this.$firestoreRefs.firebaseUser.update({ imageURL: photoURL });
      auth.currentUser.updateProfile({ photoURL });
    },
    showMessage(message, state) {
      this.messageSnackbar = message
      this.colorSnackbar = state === "error" ? "error" : "primary"
      this.snackbarPass = true
    },
    sendResetPasswordEmail() {
      const auth = firebase.auth();
      const mail = firebase.auth().currentUser.email;
      console.log(mail);
      auth
        .sendPasswordResetEmail(mail)
        .then((result) => {
          this.showMessage(
            "Uma mensagem de redefinição de senha foi enviada para o seu email.",
            "sucess"
          );
        })
        .catch((error) => {
          const messages = {
            "auth/network-request-failed": "Erro de conexão com o servidor.",
          };
          const message =
            messages[error.code] ||
            "Ocorreu um erro no envio do email de redefinição de senha. Tente novamente dentro de alguns minutos. Se o erro persistir, contate o administrador do sistema.";
          this.showMessage(message, "error");
        });
        this.redefinirSenha = false
    },
  }
};
</script>

<style>
input[type="file"] {
  display: none;
}
</style>
