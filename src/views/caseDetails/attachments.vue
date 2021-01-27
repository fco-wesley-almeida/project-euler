<template>
  <v-layout wrap justify-center align-center px-0>
    {{attachments}}
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
    </v-flex>
  </v-layout>
</template>

<script>
import Lister from "@/components/Lister";
import attachmentCard from "../../components/case/card/attachment";

export default {
  components: { Lister, attachmentCard },
  props: {
    tutorialCase: Object
  },
  data: () => ({

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
