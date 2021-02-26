<template>
  <v-layout wrap justify-center align-center px-0>
    <v-flex xs12 md10 lg8>
      <lister
        v-if="attachments"
        :items="attachments"
        hideSearchbar
        cardBreakpoints="xs12 md12 lg12"
        :customSearchFunction="searchGroup"
      >
        <template v-slot:default="slotProps">
          <div class="pa-2">
            <attachment-card
              :attachment="slotProps.item"
              :attachments="attachments"
            />
          </div>
        </template>
      </lister>

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
          title="Editar anexo"
          onlyAnnexes
          @finished="showingEditionDialog = false"
          :id="receivedTutorialCase.id"
          :tutorialCase="receivedTutorialCase"
        />
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script lang="ts">
import Vue from "vue";
import Lister from "@/components/Lister.vue";
import attachmentCard from "@/components/case/card/attachment.vue";
import NewCaseForm from "@/components/case/edition/index.vue";
import { TutorialCase } from "@/firebase/models/case.js";

export default Vue.extend({
  components: { Lister, attachmentCard, NewCaseForm },
  props: {
    tutorialCase: Object,
  },
  data: () => ({
    files: [],
    showingEditionDialog: false,
  }),
  computed: {
    receivedTutorialCase(): TutorialCase {
      return this.tutorialCase;
    },
    attachments() {
      return this.tutorialCase.annexes;
    },
    searchGroup() {
      return () => {
        return true;
      };
    },
  },
  methods: {
    openDialog() {
      const dialog = document.querySelector(".v-dialog") as HTMLElement;
      if (dialog) {
        dialog.style.width = "60%";
      }
      this.showingEditionDialog = true;
    },
  },
});
</script>
