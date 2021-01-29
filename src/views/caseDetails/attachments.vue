<template>
  <v-layout wrap justify-center align-center px-0>
    {{attachments}}
    {{files}}
    <v-flex xs12 md10 lg8>

      <lister v-if="attachments"
        :items="attachments"
        cardBreakpoints="xs12 md6"
        searchPlaceholder="Buscar por título da imagem"
        :customSearchFunction="searchGroup"
        :customSortFunction="sortGroups"
      >
        <template v-slot:default="slotProps">
          <div class="pa-2">
            <attachment-card :attachment="slotProps.item" :attachments="attachments"/>
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
        @click.native.stop="showingCreationDialog = true"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-dialog v-model="showingCreationDialog" transition="dialog-bottom-transition" scrollable>
          <v-stepper class="card" non-linear v-model="stepper" vertical>
            <v-stepper-content step="1">
              <taiper-editor v-model="files"/>
            </v-stepper-content>
          </v-stepper>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
import TaiperEditor from "@/components/taiper_editor/index.vue";
import Lister from "@/components/Lister";
import attachmentCard from "../../components/case/card/attachment";

export default {
  components: { Lister, attachmentCard, TaiperEditor },
  props: {
    tutorialCase: Object
  },
  data: () => ({
    files: [],
    showingCreationDialog: false
  }),
  computed: {
      attachments () {
        return this.tutorialCase.attachments
      },
    searchGroup() {
      return (attachment, searchString) => {
        return true
      };
    },
    sortGroups() {
      return (a, b) => {
        return a.title
          .toLowerCase()
          .localeCompare(b.title.toLowerCase(), "en", { numeric: true });
      };
    },
  }
};
</script>
