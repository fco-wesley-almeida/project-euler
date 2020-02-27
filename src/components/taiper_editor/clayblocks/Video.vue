<template>
  <v-layout class="my-2">
    <input
      ref="input"
      id="fileInput"
      type="file"
      accept="video/quicktime, video/mp4, video/ogg"
      @change="didChangeFile"
    />
    <template v-if="video">
      <v-layout align-center column fill-height justify-center>
        <video width="100%" height="200" controls>
          <source :src="video" type="video/mp4">
          Your browser does not support the video tag.
        </video>
        <v-btn class="mt-2" @click="didTapFile" color="primary">
          Mudar vídeo
          <v-icon>movie</v-icon>
        </v-btn>
      </v-layout>


    </template>
      <template v-else>
        <v-layout align-center fill-height justify-center>
          <v-btn @click="didTapFile" x-large color="primary">
            Escolher vídeo
            <v-icon>movie</v-icon>
          </v-btn>
        </v-layout>
      </template>
  </v-layout>
</template>

<script>
  import formRules from "@/utils/formRules";
  export default {
    mixins: [formRules],
    data: () => ({video: ''}),
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
          this.setPreviewVideo(this.value.value);
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
        this.setPreviewVideo(file);
      },
      setPreviewVideo(file) {
        var _this = this

        var fr = new FileReader()

        fr.onload = function () {
          _this.video = fr.result // is the data URL because called with readAsDataURL
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
