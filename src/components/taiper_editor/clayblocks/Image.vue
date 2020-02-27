<template>
  <v-layout class="my-2">
    <input
      ref="input"
      id="fileInput"
      type="file"
      accept="image/png, image/jpeg"
      @change="didChangeFile"
    />
    <v-img style="cursor: pointer" contain ref="previewImage" @click="didTapFile" aspect-ratio="1" height="200" :src="image">
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
    data: () => ({image: ''}),
    props: {
      value: {
        type: Object
      }
    },
    mounted(){
      if (typeof this.value.value == "string"){
        this.image = this.value.value;
      } else {
        if (this.value.value)
        this.setPreviewImage(this.value.value);
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
          _this.image = fr.result // is the data URL because called with readAsDataURL
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
