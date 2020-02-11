<template>
  <v-container fill-height fluid grid-list-xl>
    <v-layout align-center justify-center wrap>
      <v-layout align-start justify-center wrap>
        <v-flex xs12>
          <v-layout align-center justify-center>
        <v-flex xs10 md8 lg4>
          <v-card class="mt-3">
            <v-layout class="pa-2">
              <div class="my-auto" style="width: 100px; margin-right: -10px">
                <v-layout align-center justify-center fill-height>
                  <input
                  id="fileInput"
                  name="myFile"
                  type="file"
                  accept="image/png, image/jpeg"
                  @change="didChangeImage"
                />
                  <v-avatar size="80" style="cursor: pointer" @click.stop="didTapAddImage()">
                    <v-img
                      id="previewImage"
                      ref="previewImage"
                      :src="resultFile || user.imageURL || '/img/profile-default.jpg'"
                      class="elevation-2"
                    />
                  </v-avatar>
                </v-layout>
              </div>
              <div>
                <v-card-title>{{user.name}}</v-card-title>
                <v-card-subtitle>
                  <div>
                    <v-icon color="primary">mail</v-icon>
                    {{user.email}}
                  </div>
                  <div>
                    <v-icon color="disabled">school</v-icon>
                    {{user.institution}}
                  </div>
                  <div>
                    <v-icon color="disabled">public</v-icon>
                    {{user.state}}
                  </div>
                </v-card-subtitle>
              </div>
            </v-layout>
          </v-card>
        </v-flex>
          </v-layout>
        </v-flex>
        <v-flex xs12>
          <v-layout align-center justify-center>
        <v-flex xs11 md8 lg6>
          <v-card text="Insira seus dados">
            <v-card-title>Editar Perfil</v-card-title>
            <v-form class="pa-1" ref="form" v-model="valid">
              <v-container py-0>
                <v-layout wrap>
                  <v-flex xs12>
                    <v-text-field v-model="user.email" label="Email" disabled />
                  </v-flex>
                  <v-flex xs12>
                    <v-text-field
                      v-model="user.name"
                      :rules="[formRules.required]"
                      required
                      label="Nome"
                    />
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field v-model="user.institution" rows="1" label="Instituição" />
                  </v-flex>

                  <v-flex xs12>
                    <v-text-field v-model="user.state" rows="1" label="Estado" />
                  </v-flex>

                  <v-flex xs12 text-xs-right>
                    <v-btn
                      class="mx-0 font-weight-light"
                      color="accent"
                      text
                      @click.native="didTapUpdate()"
                    >
                      <v-icon>check</v-icon>Salvar
                    </v-btn>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-form>
            <UploadDialogs
              :is-uploading="uploading"
              :upload-progress="progress"
              :show-snackbar="snackbar"
              :upload-name="uploadName"
              :upload-size="uploadSize"
              @hideSnackbar="snackbar = false"
              @didTapCancel="didTapCancel"
            />
          </v-card>
        </v-flex>
      </v-layout>
        </v-flex>
      </v-layout>
    </v-layout>
  </v-container>
</template>

<script>
import { db, auth } from "@/firebase/db";
import photoupload from "@/mixins/photoupload";
import formRules from "@/utils/formRules";
import UploadDialogs from "@/components/PhotoUploadDialogs";

const users = db.collection("teachers");

export default {
  name: "Perfil",
  components: { UploadDialogs },
  mixins: [photoupload, formRules],
  data() {
    return {
      user: {},
      snackbar: false,
      valid: false
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
      return "teachers";
    },
    document() {
      return this.$store.state.app.userID;
    },
    filepath() {
      return "teachers/" + this.$store.state.app.userID;
    }
  },
  mounted() {
    this.$bind("user", users.doc(this.$store.state.app.userID));
  },
  methods: {
    didTapUpdate() {
      if (this.valid) {
        this.$firestoreRefs.user.set(this.user);
        this.$store.state.app.user = this.user;
        auth.currentUser.updateProfile({displayName: this.user.name});

        if (this.file != null) {
          this.createFile();
        } else {
          this.snackbar = true;
        }
      } else {
        this.$refs.form.validate();
      }
    },
    uploadFinished(photoURL) {
      this.uploading = false;
      this.file = null;
      this.snackbar = true;
      this.progress = 0;
      auth.currentUser.updateProfile({photoURL});
    }
  }
};
</script>

<style>
input[type="file"] {
  display: none;
}
</style>