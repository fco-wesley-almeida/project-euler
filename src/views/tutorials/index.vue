<template>
  <v-layout wrap justify-center align-center pa-5>
    <!-- Content -->
    <v-flex xs12 md10 lg8>
      <lister
        :items="tutorials"
        cardBreakpoints="xs12 md6 lg4"
        searchPlaceholder="Buscar por título ou caso atual"
        :customSearchFunction="searchTutorial"
      >
        <template v-slot:default="slotProps">
          <div class="pa-2">
            <tutorial-card :tutorial="slotProps.item" />
          </div>
        </template>
      </lister>
    </v-flex>
    <!-- Creation button -->
    <v-btn
      v-show="showingFAB"
      color="primary"
      fixed
      bottom
      right
      fab
      @click.native.stop="showingCreationDialog = true"
    >
      <!-- Creation dialog -->
      <v-dialog v-model="showingCreationDialog" fullscreen transition="fade-transition">
        <new-tutorial-form @finished="showingCreationDialog = false" />
      </v-dialog>
      <v-icon>add</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import { db } from "@/firebase/db";
import NewTutorialForm from "./creation/index.vue";
import Lister from "@/components/Lister";
import TutorialCard from "./Card.vue";

export default {
  name: "Tutorials",
  components: { NewTutorialForm, TutorialCard, Lister },
  data: () => ({
    tutorials: [],
    showingFAB: false,
    showingCreationDialog: false
  }),
  mounted() {
    this.showingFAB = true;
    this.$bind(
      "tutorials",
      db
        .collection("tutorials")
        .where("teacherID", "==", this.$store.state.app.userID)
    );
  },

  computed: {
    searchTutorial() {
      return (item, searchString) => {
        const searchableStrings = [];
        if (item.name) {
          searchableStrings.push(item.name.toLowerCase());
        }
        if (item.currentCase) {
          searchableStrings.push(item.currentCase.toLowerCase());
        }
        return searchableStrings.some(string =>
          string.includes(searchString.toLowerCase())
        );
      };
    }
  }
};
</script>

<style scoped>
</style>
