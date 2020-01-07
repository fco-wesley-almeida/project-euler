<template>
  <v-layout wrap justify-center align-center pa-5>
    <!-- Search bar -->
    <v-flex xs12 md10 lg8>
      <v-layout wrap pa-3>
      <v-toolbar style="border-radius: 20px">
      <v-text-field
        v-model="searchString"
        hide-details
        prepend-icon="search"
        single-line
        placeholder="Buscar por título da tutoria ou dos casos"
      ></v-text-field>
    </v-toolbar>
      </v-layout>
    </v-flex>
    <!-- Content -->
    <v-flex xs12 md10 lg8>
      <tutorial-lister :tutorials="filteredTutorials" :searching='searchString != ""'/>
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
    <v-dialog
        v-model="showingCreationDialog"
        fullscreen
        transition="fade-transition"
      >
        <new-tutorial-form @finished="showingCreationDialog = false"/>
      </v-dialog>
      <v-icon>add</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import { db } from '@/firebase/db';
import NewTutorialForm from './creation/index.vue';
import TutorialLister from './lister/index.vue';

export default {
  name: 'Tutorials',
  components: { NewTutorialForm, TutorialLister },
  data: () => ({
    tutorials: [],
    searchString: '',
    showingFAB: false,
    showingCreationDialog: false,
  }),
  mounted() {
    this.showingFAB = true;
    this.$bind(
      'tutorials',
      db
        .collection('tutorials')
        .where('teacherID', '==', this.$store.state.app.userID),
    );
  },

  computed: {
    filteredTutorials() {
      return this.tutorials.filter((tutorial) => {
        const searchableStrings = [];
        if (tutorial.name) {
          searchableStrings.push(tutorial.name.toLowerCase());
        }
        if (tutorial.currentCase) {
          searchableStrings.push(tutorial.currentCase.toLowerCase());
        }
        return searchableStrings.some(string => string.includes(this.searchString.toLowerCase()));
      });
    },
  },
};
</script>

<style scoped>
::placeholder {
  color: red!important;
  opacity: 1;
}
</style>
