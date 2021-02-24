<template>
  <div>
    <v-layout class="my-2" align-center justify-center wrap>
      <input
        ref="input"
        id="fileInput"
        type="file"
        accept="image/png, image/jpeg"
        @change="didChangeFile"
      />
      <v-flex xs12 class="px-10">
        <v-img v-if="image" style="cursor: pointer" contain ref="previewImage" @click="didTapFile"
              aspect-ratio="1" :height="200" :src="image">
        </v-img>
      </v-flex>
      <v-btn v-if="!readonly" class="mt-2" @click="didTapFile" color="primary">
        {{image ? 'Mudar imagem' : 'Escolher imagem'}}
        <v-icon>image</v-icon>
      </v-btn>
    </v-layout>

    <ImageFullScreen v-if="showImageFullScreen"
      :show="showImageFullScreen"
      :continuous="false"
      :currentIndex="0"
      :images="[{url: image}]"
      @closed="showImageFullScreen = false"
    />


  </div>

</template>

<script>
  import formRules from "@/utils/formRules";
  import ImageFullScreen from '@/components/dialogs/ImageFullScreen'

  export default {
    mixins: [formRules],
    components: { ImageFullScreen },
    data: () => ({
      image: '',
      showImageFullScreen: false
    }),
    props: {
      value: {
        type: Object
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      if (typeof this.value.value == "string") {
        this.image = this.value.value;
      } else {
        if (this.value.value)
          this.setPreviewImage(this.value.value);
      }
    },
    methods: {
      updateValue: function (value) {
        this.$emit("input", value);
      },
      didTapFile() {
        if (this.readonly) {
          this.showImageFullScreen = true
        } else {
          this.$refs.input.click();
        }
      },
      didChangeFile(e) {
        let files = e.target.files || e.dataTransfer.files
        if (!files.length) return
        let file = files[0];
        this.value.value = file;
        this.setPreviewImage(file);
      },
      setPreviewImage(file) {
        let _this = this;

        let fr = new FileReader()

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
