<template>
  <v-layout wrap justify-center align-center pa-5>
    <v-flex xs12 lg8>
      <v-layout wrap pa-3>
      <v-toolbar style="border-radius: 20px">
      <v-text-field
        v-model="searchString"
        hide-details
        clearable
        clear-icon="close"
        prepend-icon="search"
        single-line
      ></v-text-field>
    </v-toolbar>
      </v-layout>
    </v-flex>
    <v-flex xs12 lg8>
      <v-layout wrap ref="layout">
        <v-flex v-for="(tutorial, index) in filteredTutorials" :key="index" xs12 sm6 md4>
          <v-layout pa-3>
            <v-flex xs12>
              <v-card hover>
                <v-card-title>{{tutorial.name}}</v-card-title>
                <v-card-subtitle>
                  <div>
                    <v-icon color="disabled">group</v-icon>
                    Participantes: {{participantsCount(tutorial)}}
                  </div>
                </v-card-subtitle>
                <v-card-text>
                  <div>
                    Caso atual: {{caseCount(tutorial)}}
                  </div>
                  <div>
                    <v-icon color="primary">assignment</v-icon>
                    Casos futuros: {{caseCount(tutorial)}}
                  </div>
                  <div>
                    <v-icon color="disabled">assignment</v-icon>
                    Casos finalizados: {{caseCount(tutorial)}}
                  </div>
                </v-card-text>
              </v-card>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-flex>
    <v-btn
      v-show="showingFAB"
      color="primary"
      fixed
      bottom
      right
      fab
      @click.native.stop="showingCreationDialog = true"
    >
    <v-dialog
        v-model="showingCreationDialog"
        fullscreen
        transition="fade-transition"
      >
        <NewTutorialForm @finished="showingCreationDialog = false"/>
      </v-dialog>
      <v-icon>add</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import { db } from '@/firebase/db';
import NewTutorialForm from './CreationForm.vue';

export default {
  name: 'Tutorials',
  components: { NewTutorialForm },
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

  methods: {
    caseCount(tutorial) {
      return tutorial.cases ? tutorial.cases.length || 0 : 0;
    },
    participantsCount(tutorial) {
      return tutorial.students ? tutorial.students.length || 0 : 0;
    },
  },
};
</script>
