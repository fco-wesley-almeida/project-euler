<template>
  <v-layout fill-height align-center justify-center pa-2>
    <v-flex xs12 md8 lg6>
        <case-content placeholderMessage="Você não cadastrou nenhuma referência." :title="tutorialCase.title" :content="tutorialCase.references || []"/>
    </v-flex>
    <v-btn
      class="mb-12"
      color="primary"
      fixed
      bottom
      right
      fab
      @click.native.stop="openDialog"
    >
      <v-icon>edit</v-icon>
    </v-btn>
    <v-dialog
      v-model="showingEditionDialog"
      transition="dialog-bottom-transition"
      scrollable
    >
      <new-case-form
        v-if="showingEditionDialog"
        title="Editar referência"
        only-references
        @finished="showingEditionDialog = false"
        :id="receivedTutorialCase.id"
        :tutorialCase="receivedTutorialCase"
      />
    </v-dialog>
  </v-layout>
</template>

<script lang="ts">
import CaseContent from "@/components/case/content";
import NewCaseForm from "@/components/case/edition/index.vue";
import Vue from "vue";
import {TutorialCase} from "../../firebase/models/case";
export default Vue.extend({
  components: { CaseContent, NewCaseForm },
  data: () => ({
    showingEditionDialog: false,
  }),
  props: {
    tutorialCase: Object
  },
  methods: {
    receivedTutorialCase(): TutorialCase {
      return this.tutorialCase;
    },
    openDialog() {
      const dialog = document.querySelector(".v-dialog") as HTMLElement;
      if (dialog) {
        dialog.style.width = "60%";
      }
      this.showingEditionDialog = true;
    },
  }
})
</script>

