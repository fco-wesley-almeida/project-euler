<template>
  <v-card
    color="background"
  >
    <v-flex>
    <v-toolbar color="primary" dark>
      <v-btn icon @click.native="didTapCancel()">
        <v-icon>close</v-icon>
      </v-btn>
      <v-toolbar-title>Criação de Caso</v-toolbar-title>
      <v-spacer />
      <v-btn text :loading="loading" @click.native="didTapSave()">Salvar</v-btn>
    </v-toolbar>
    </v-flex>
    <v-card-text>
      <case-form ref="form" v-model="editingTutorialCase" @validate="checkValidation"/>
    </v-card-text>
    <UploadDialogs
      :is-uploading="uploading"
      :upload-progress="progress"
      :show-snackbar="false"
      :upload-name="uploadName"
      :upload-size="uploadSize"
      :show-cancel-button="false"
      @hideSnackbar="snackbar = false"
      @didTapCancel="didTapCancel"
    />
  </v-card>
</template>

<script>
import formRules from "@/utils/formRules";
import CaseForm from "./form.vue"
import { TutorialCase } from "@/models/case";
import {createCase, updateCase} from "@/firebase/api/case";
import fileBatchUpload from "@/mixins/fileBatchUpload";
import {setCaseContent} from "@/firebase/api/case";
import UploadDialogs from "@/components/dialogs/PhotoUpload";

export default {
  mixins: [formRules, fileBatchUpload],
  components: {CaseForm, UploadDialogs},

  data: () => ({
      editingTutorialCase: new TutorialCase(),
      valid: false,
      loading: false,
      docID: "",
      content: [],
      contentMap: []
  }),
  props: {
    tutorialCase: Object,
    id: String
  },
  mounted(){
    if (this.tutorialCase) {
      let obj = new Object();
      Object.assign(obj, this.tutorialCase);
      this.editingTutorialCase = obj;
    } else {
      this.editingTutorialCase = new TutorialCase();
    }
  },
  computed: {
    collection () {
      return 'cases'
    },
    document () {
      return this.docID;
    }
  },
  methods: {
    didTapSave() {
      let form = this.$refs.form;
      form.validate();
      if (this.valid) {
        const vm = this;
        this.loading = true;
        this.content = this.editingTutorialCase.content.slice();
        this.editingTutorialCase.content = undefined;
        if (this.id){
          updateCase(this.editingTutorialCase, this.id).then(() => {
            vm.docID = vm.id;
            vm.setupBatch(vm.extractFiles());
          });
        } else {
          createCase(this.editingTutorialCase, this.$route.params.tutorialID).then((doc) => {
            vm.docID = doc.id;
            vm.setupBatch(vm.extractFiles());
          });
        }
      }
    },
    uploadsFinished() {
      for (var map of this.contentMap){
        let url = this.resultURLs[map.fileIndex];
        this.content[map.contentIndex].value = url;
      }
      console.log("Uploads finished")
      console.log(this.resultURLs);
      setCaseContent(this.content, this.docID);
      this.close();
    },
    extractFiles(){
      let files = [];
      this.contentMap = [];
      for (var i = 0; i < this.content.length; i++){
        let clayblock = this.content[i];
        if (clayblock.type.includes("image") || clayblock.type.includes("file") || clayblock.type.includes("video")){
          if (typeof clayblock.value !== "string") {
            this.contentMap.push({contentIndex: i, fileIndex: this.contentMap.length, clayblock});
            files.push(clayblock.value);
          }
        }
      }
      return files;
    },
    didTapCancel() {
      this.close();
    },
    checkValidation(v) {
      this.valid = v;
    },
    close() {
      this.loading = false;
      this.$emit("finished");
    }
  }
};
</script>
