<template>
  <v-card class="pa-2 my-2 mx-2">
      <v-layout>
        <v-icon @click="didTapIcon" large class="pa-5">{{icon}}</v-icon>

        <v-flex>
          <input
            ref="input"
            id="fileInput"
            type="file"
            @change="didChangeFile"
          />
          <v-text-field
            style="cursor: pointer"
            label="Caminho do arquivo"
            readonly

            v-on:click="didTapFile"
            :rules="[formRules.required]"
            :value="fileName"
            class="mx-2"
          ></v-text-field>
          <v-text-field
            label="Título exibido"
            :rules="[formRules.required]"
            v-model="value.props.label"
            class="mx-2"
          ></v-text-field>
        </v-flex>
      </v-layout>

  </v-card>
</template>

<script>
  import formRules from "@/utils/formRules";
  export default {
    mixins: [formRules],
    data: () => ({preview: ''}),
    props: {
      value: {
        type: Object
      }
    },
    mounted(){
      if (typeof this.value.value == "string"){
        this.preview = this.value.value;
      } else {
        if (this.value.value)
          this.setPreview(this.value.value);
      }
    },
    methods: {
      updateValue: function(value) {
        this.$emit("input", value);
      },
      didTapIcon(){
        window.open(this.preview);
      },
      didTapFile(){
        this.$refs.input.click();
      },
      didChangeFile (e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        let file = files[0];
        this.value.value = file;
        this.value.type = this.getFileType(file);
        this.setPreview(file);
      },
      getFileType(file){
        console.log(file.type);
        if (file.type.includes("image")){
          return "file/image";
        }

        if (file.type.includes("audio") || file.type.includes("music")){
          return "file/music";
        }

        if (file.type.includes("video") || file.type.includes("movie")){
          return "file/movie";
        }

        return "file"
      },
      setPreview(file) {
        let _this = this;

        let fr = new FileReader();

        fr.onload = function () {
          _this.preview = fr.result // is the data URL because called with readAsDataURL
        };

        fr.readAsDataURL(file)
      },
    },
    computed: {
      fileName() {
        return this.value.value.name || this.preview;
      },
      icon() {
        if (this.value.type == "file/image"){
          return "image";
        }
        if (this.value.type == "file/music"){
          return "music_note";
        }
        if (this.value.type == "file/movie"){
          return "movie";
        }
        return "insert_drive_file";
      }
    }
  };
</script>

<style>
  input[type="file"] {
    display: none;
  }
</style>
