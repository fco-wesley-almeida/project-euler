<template>
  <v-layout>
    <input
      ref="input"
      id="fileInput"
      type="file"
      @change="didChangeFile"
    />
    <v-img contain ref="previewImage" @click="didTapFile" aspect-ratio="1" height="200" :src="value.value">
      <template slot="placeholder">
        <v-layout align-center fill-height justify-center>
          <v-btn x-large color="primary">
            Escolher imagem
          <v-icon>image</v-icon>
          </v-btn>
        </v-layout>
      </template>
    </v-img>
  </v-layout>
</template>

<script>
  import formRules from "@/utils/formRules";
  export default {
    mixins: [formRules],
    props: {
      value: {
        type: Object
      }
    },
    methods: {
      updateValue: function(value) {
        this.$emit("input", value);
      },
      didTapFile(){
        this.$refs.input.click();
      },
      didChangeFile (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        let file = files[0];
        this.value.value = file;
        this.setPreviewImage(file);
      },
      setPreviewImage(file) {
        var _this = this

        var fr = new FileReader()

        fr.onload = function () {
          _this.$refs.previewImage.src = fr.result // is the data URL because called with readAsDataURL
        }

        fr.readAsDataURL(file)
      },
    },
    computed: {
      fileName() {
        return this.value.value.name;
      }
    }
  };
</script>

<style>
  input[type="file"] {
    display: none;
  }
</style>
