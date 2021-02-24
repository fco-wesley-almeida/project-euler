<template>
  <v-card
    color="background"
  >
    <v-flex>
    <v-toolbar color="primary" dark>
      <v-btn icon @click.native="close()">
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
      @hideSnackbar="snackbar = false"
      @didTapCancel="didTapCancel"
    />
  </v-card>
</template>

<script>
import formRules from "@/utils/formRules";
import CaseForm from "./form.vue"
import { TutorialCase } from "@/firebase/models/case";
import {setCase, getNewID} from "@/firebase/api/case";
import fileBatchUpload from "@/mixins/fileBatchUpload";
import {setCaseContent, setCaseAnnexes, setCaseReferences} from "@/firebase/api/case";
import UploadDialogs from "@/components/dialogs/PhotoUpload";

export default {
  mixins: [formRules, fileBatchUpload],
  components: {CaseForm, UploadDialogs},

  data: () => ({
      editingTutorialCase: new TutorialCase(),
      valid: false,
      docID: "",
      annexes: [],
      references: [],
      content: [],
      contentMap: []
  }),
  props: {
    tutorialCase: Object,
    id: String
  },
  mounted(){
    if (this.tutorialCase) {
      let obj = new TutorialCase();
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
        this.references = this.editingTutorialCase.references.slice();
        this.annexes = this.editingTutorialCase.annexes.slice();
        if (this.id){
          this.docID = this.id;
        } else {
         this.docID = getNewID();
        }
        vm.setupBatch(vm.extractFiles());
      }
    },
    async uploadsFinished() {
      for (var map of this.contentMap){
        let url = this.resultURLs[map.fileIndex];
        let objContentMap = this.contentMap[map.fileIndex]
        let ref = objContentMap ? objContentMap.ref : null
        if (this[ref]) {
          this[ref][map.contentIndex].value = url;
        }
      }
      this.editingTutorialCase.tutorialID = this.$route.params.tutorialID;
      const mapper = 
      this.annexes = this.annexes.map(obj => {
        const obj2 = JSON.parse(JSON.stringify(obj))
        obj2.visible = false
        return obj2
      })
      await setCase(this.editingTutorialCase, this.docID);
      await setCaseContent(this.content, this.docID);
      await setCaseReferences(this.references, this.docID);
      await setCaseAnnexes(this.annexes, this.docID);
      this.close();
    },
    extractFiles(){
      let files = [];
      this.contentMap = [];
      for (var i = 0; i < this.content.length; i++){
        let clayblock = this.content[i];
        if (clayblock.type.includes("image") || clayblock.type.includes("file") || clayblock.type.includes("video")){
          if (typeof clayblock.value !== "string") {
            this.contentMap.push({contentIndex: i, fileIndex: this.contentMap.length, clayblock: clayblock, ref: 'content'});
            files.push(clayblock.value);
          }
        }
      }
      for (var i = 0; i < this.references.length; i++){
        let clayblock = this.references[i];
        if (clayblock.type.includes("image") || clayblock.type.includes("file") || clayblock.type.includes("video")){
          if (typeof clayblock.value !== "string") {
            this.contentMap.push({contentIndex: i, fileIndex: this.contentMap.length, clayblock: clayblock, ref: 'references'});
            files.push(clayblock.value);
          }
        }
      }
      for (var i = 0; i < this.annexes.length; i++){
        let clayblock = this.annexes[i];
        if (clayblock.type.includes("image") || clayblock.type.includes("file") || clayblock.type.includes("video")){
          if (typeof clayblock.value !== "string") {
            this.contentMap.push({contentIndex: i, fileIndex: this.contentMap.length, clayblock: clayblock, ref: 'annexes'});
            files.push(clayblock.value);
          }
        }
      }
      console.log(files)
      console.log(this.contentMap)
      return files;
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
