<template>
  <div>
    <v-dialog
      v-model="uploading"
      persistent
      max-width="290">
      <v-card>
        <v-card-title class="accent title white--text">Fazendo upload</v-card-title>
        <v-card-text>
          <p class="black--text subhead mt-2 mb-0 text-xs-left">{{ name + " - " + size }}</p>
          <p class="mb-1 text-xs-center">{{ progress + "%" }}</p>
          <v-progress-linear :value="progress"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn
            color="grey"
            flat
            dark
            @click.native="$emit('didTapCancel')">Cancelar</v-btn>
          <v-spacer/>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar
      v-model="snackbar"
      color="primary"
      bottom
      right
      dark
    >
      <v-icon
        color="white"
        class="mr-3"
      >
        check
      </v-icon>
      <div>Dados salvos com sucesso!</div>
      <v-icon
        size="16"
        @click="snackbar = false"
      >
        mdi-close-circle
      </v-icon>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  name: "PhotoUploadDialogs",
  props: {
    isUploading: {
      type: Boolean,
      default: false
    },
    showSnackbar: {
      type: Boolean,
      default: false
    },
    uploadProgress: {
      type: Number,
      default: 0
    },
    uploadName: {
      type: String,
      default: ''
    },
    uploadSize: {
      type: [Number, String],
      default: 0
    }
  },
  computed: {
    uploading () {
      return this.$props.isUploading
    },
    snackbar: {
      get () {
        return this.$props.showSnackbar
      },
      set (v) {
        this.$emit('hideSnackbar')
      }
    },
    progress () {
      return parseInt(this.$props.uploadProgress) || 0
    },
    name () {
      return this.$props.uploadName
    },
    size () {
      return this.$props.uploadSize
    }
  }
}
</script>