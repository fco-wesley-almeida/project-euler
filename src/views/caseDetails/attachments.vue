<template>
  <v-layout wrap justify-center align-center px-0>
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
            {{slotProps.item}}
          </div>
        </template>
      </lister>
    </v-flex>
  </v-layout>
</template>

<script>
import Lister from "@/components/Lister";
// import TaiperEditor from "@/components/taiper_editor/index";
export default {
//   components: { TaiperEditor },
  components: { Lister },
  props: {
    tutorialCase: Object
  },
  data: () => ({

  }),
  computed: {
      attachments () {
        console.log(this.tutorialCase.attachments)
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
