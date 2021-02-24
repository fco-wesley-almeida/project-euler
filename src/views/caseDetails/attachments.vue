<template>
  <v-layout wrap justify-center align-center px-0>
    <v-flex xs12 md10 lg8>

      <lister v-if="attachments"
        :items="attachments"
        hideSearchbar
        cardBreakpoints="xs12 md12 lg12"
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
        @click.native.stop="openDialog"
      >
        <v-icon>add</v-icon>
      </v-btn>
      <v-dialog v-model="showingCreationDialog" transition="dialog-bottom-transition" scrollable>
        <creationDialog @finished="showingCreationDialog = false"/>
      </v-dialog>
    </v-flex>
  </v-layout>
</template>

<script>
// import TaiperEditor from "@/components/taiper_editor/index.vue";
import Lister from "@/components/Lister";
import attachmentCard from "../../components/case/card/attachment";
import creationDialog from "@/components/case/creation/attachment"

export default {
  components: { Lister, attachmentCard, creationDialog },
  props: {
    tutorialCase: Object
  },
  data: () => ({
    files: [],
    showingCreationDialog: false
  }),
  computed: {
      attachments () {
        return this.tutorialCase.annexes
      },
    searchGroup() {
      return (attachment, searchString) => {
        return true
      };
    },
    sortGroups() {
      return (a, b) => {
        return (a.title || '')
          .toLowerCase()
          .localeCompare((b.title || '').toLowerCase(), "en", { numeric: true });
      };
    },
  },
  methods: {
    openDialog () {
      const dialog = document.querySelector('.v-dialog');
      if (dialog) dialog.style.width="60%";
      this.showingCreationDialog = true;
    }
  }
};
</script>
