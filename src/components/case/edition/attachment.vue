<template>
  <v-card color="background">
    <v-flex>
      <v-toolbar color="primary" dark>
        <v-btn icon @click.native="close">
          <v-icon>close</v-icon>
        </v-btn>
        <v-toolbar-title>Editar anexos</v-toolbar-title>
        <v-spacer />
        <v-btn text :loading="loading" @click.native="didTapSave()">Salvar</v-btn>
      </v-toolbar>
    </v-flex>
    <v-card-text>
      <!-- <v-layout align-center justify-center my-5>
        <v-flex xs12 md8 lg6>
          <v-stepper class="card" v-model="stepper" vertical>
            <v-stepper-content step="1">
              <taiper-editor v-model="files"/>
            </v-stepper-content>
          </v-stepper>
        </v-flex>
      </v-layout> -->
    </v-card-text>
<!--    <UploadDialogs-->
<!--      :is-uploading="uploading"-->
<!--      :upload-progress="progress"-->
<!--      :show-snackbar="false"-->
<!--      :upload-name="uploadName"-->
<!--      :upload-size="uploadSize"-->
<!--      @hideSnackbar="snackbar = false"-->
<!--      @didTapCancel="didTapCancel"-->
<!--    />-->
  </v-card>
</template>

<script>
// import TaiperEditor from "@/components/taiper_editor/index.vue";
export default {
  // components: { TaiperEditor },
  mounted () {
    document.querySelector('.v-dialog').style.width="60%"
  },
  data: () => ({
    files: []
  }),
  methods: {
    close() {
      this.$emit("finished");
    }
  }
}


</script>
