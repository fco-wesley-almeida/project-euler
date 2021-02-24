<template>
  <v-layout wrap justify-center align-center px-0>
    <v-flex xs12 md10 lg8>
      <lister
        v-if="attachments"
        :items="attachments"
        hideSearchbar
        cardBreakpoints="xs12 md12 lg12"
        :customSearchFunction="searchGroup"
        :customSortFunction="sortGroups"
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
      <!-- <v-dialog v-model="showingEditionDialog" transition="dialog-bottom-transition" scrollable>
        <editionDialog @finished="showingEditionDialog = false"/>
      </v-dialog> -->
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
import Lister from "@/components/Lister";
import attachmentCard from "../../components/case/card/attachment";
import NewCaseForm from "@/components/case/edition/index";
import { TutorialCase } from "@/firebase/models/case";
import { db } from "@/firebase/config";

export default {
  components: { Lister, attachmentCard, NewCaseForm },
  mounted() {
    this.$bind(
      "tutorialCase",
      db.collection("cases").doc(this.$route.params.caseID)
    );
  },
  props: {
    tutorialCase: Object,
  },
  data: () => ({
    files: [],
    tutorialCase: {},
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
      return (attachment, searchString) => {
        return true;
      };
    },
    sortGroups() {
      return (a, b) => {
        return (a.title || "")
          .toLowerCase()
          .localeCompare((b.title || "").toLowerCase(), "en", {
            numeric: true,
          });
      };
    },
  },
  methods: {
    openDialog() {
      const dialog = document.querySelector(".v-dialog");
      if (dialog) dialog.style.width = "60%";
      this.showingEditionDialog = true;
    },
  },
};
</script>
