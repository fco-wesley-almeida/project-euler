<template>
  <v-layout wrap justify-center align-center fill-height>
    <v-flex xs12 md10 lg8 pa-0>
      <v-flex xs12>
        <v-layout wrap mb-3>
          <v-toolbar style="border-radius: 20px">
            <v-text-field
              v-model="searchText"
              hide-details
              prepend-icon="search"
              single-line
              placeholder="Buscar por título"
            ></v-text-field>
          </v-toolbar>
        </v-layout>
      </v-flex>
      <h3 v-if="activeCases.length > 0 || searching">Caso Ativo</h3>
      <lister
        :items="activeCases"
        cardBreakpoints="xs12"
        :searchText="searchText"
        :customSearchFunction="customSearch"
        hideSearchbar
        emptyListIcon="check"
        emptyListMessage="Nenhum caso ativo"
        emptySearchMessage="Nenhum caso encontrado"
      >
        <template v-slot:default="slotProps">
          <div class="pa-2">
            <case-card :tutorialCase="slotProps.item" />
          </div>
        </template>
      </lister>
    </v-flex>
    <v-flex xs12 md10 lg8 class="my-2">
      <h3 v-if="scheduledCases.length > 0 || searching">Casos Agendados</h3>
      <lister
        :items="scheduledCases"
        cardBreakpoints="xs12 md6 lg4"
        :searchText="searchText"
        :customSearchFunction="customSearch"
        hideSearchbar
        emptyListIcon="calendar_today"
        emptyListMessage="Nenhum caso agendado"
        emptySearchMessage="Nenhum caso encontrado"
      >
        <template v-slot:default="slotProps">
          <div class="pa-2">
            <case-card :tutorialCase="slotProps.item" :canBeActive="!hasActiveCase" />
          </div>
        </template>
      </lister>
    </v-flex>
    <v-flex xs12 md10 lg8 class="my-2">
      <h3 v-if="finishedCases.length > 0 || searching">Casos Finalizados</h3>
      <lister
        :items="finishedCases"
        cardBreakpoints="xs12 md6 lg4"
        :searchText="searchText"
        :customSearchFunction="customSearch"
        hideSearchbar
        emptyListIcon="history"
        emptyListMessage="Nenhum caso finalizado"
        emptySearchMessage="Nenhum caso encontrado"
      >
        <template v-slot:default="slotProps">
          <div class="pa-2">
            <case-card :tutorialCase="slotProps.item" />
          </div>
        </template>
      </lister>
    </v-flex>
    <v-scale-transition>
      <v-btn
        primary
        dark
        fab
        style="position: fixed; bottom: 0; right: 0; margin-right: 16px; margin-bottom: 72px"
        @click.native.stop="showingCreationDialog = true"
        color="primary"
      >
        <v-icon>add</v-icon>
      </v-btn>
    </v-scale-transition>
    <v-dialog v-model="showingCreationDialog" fullscreen transition="dialog-bottom-transition" scrollable>
      <new-case-form v-if="showingCreationDialog" @finished="showingCreationDialog = false" />
    </v-dialog>
  </v-layout>
</template>

<script>
import { db } from "@/firebase/db";
import CaseCard from "./card/index.vue";
import Lister from "@/components/Lister";
import NewCaseForm from "./creation/index";

export default {
  name: "TutorialCases",
  components: { CaseCard, Lister, NewCaseForm },
  mounted() {
    this.$bind(
      "cases",
      db
        .collection("cases")
        .where("tutorialID", "==", this.$route.params.tutorialID)
    );
  },
  data: () => ({
    cases: [],
    searchText: "",
    showingFAB: false,
    showingCreationDialog: false
  }),
  computed: {
    hasActiveCase() {
      return this.activeCases.length > 0;
    },
    searching() {
      return this.searchText !== "";
    },
    customSearch() {
      return (item, searchString) => {
        return item.title.toLowerCase().includes(searchString.toLowerCase());
      };
    },
    activeCases() {
      return this.cases.filter(item => {
        return item.status === "active";
      });
    },
    scheduledCases() {
      return this.cases.filter(item => {
        return item.status === "scheduled";
      });
    },
    finishedCases() {
      return this.cases.filter(item => {
        return item.status === "finished";
      });
    }
  }
};
</script>
