<template>
  <v-card class="pa-2 my-2 mx-2">
      <v-layout>
        <v-icon large class="pa-5">{{icon}}</v-icon>

        <v-flex>
          <input
            ref="input"
            id="fileInput"
            type="file"
            @change="didChangeFile"
          />
          <v-text-field
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
        this.value.type = this.getFileType(file);
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
      }
    },
    computed: {
      fileName() {
        return this.value.value.name;
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
