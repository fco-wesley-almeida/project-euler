<template>
  <v-layout wrap justify-center align-content-start>
    <v-flex xs12 md8 lg7 pa-0>
      <v-flex xs12>
        <v-layout wrap mb-3>
          <v-toolbar style="border-radius: 5px">
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
        v-if="activeCases.length > 0 || searching"
        cardBreakpoints="xs12"
        :searchText="searchText"
        :customSearchFunction="customSearch"
        hideSearchbar
        emptyListIcon="check"
        emptyListMessage="Nenhum caso ativo"
        emptySearchMessage="Nenhum caso encontrado"
      >
        <template v-slot:default="slotProps">
            <case-card :tutorialCase="slotProps.item" />
        </template>
      </lister>
    </v-flex>
    <v-flex xs12 md8 lg7 class="my-2">
      <h3 v-if="scheduledCases.length > 0 || searching">Casos Agendados</h3>
      <lister
        :items="scheduledCases"
        v-if="scheduledCases.length > 0 || searching"
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
    <v-flex xs12 md8 lg7 class="my-2">
      <h3 v-if="finishedCases.length > 0 || searching">Casos Finalizados</h3>
      <lister
        :items="finishedCases"
        v-if="finishedCases.length > 0 || searching"
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
    <v-flex xs12 v-if="cases.length === 0">
      <p
        class="subtitle-2"
        style="text-align: center; width: 100%"
      >Nenhum caso cadastrado. Crie novos com o botão +</p>
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
    <v-dialog
      v-model="showingCreationDialog"
      fullscreen
      transition="dialog-bottom-transition"
      scrollable
    >
      <new-case-form v-if="showingCreationDialog" @finished="showingCreationDialog = false" />
    </v-dialog>
  </v-layout>
</template>

<script>
import { db } from "@/firebase/db";
import CaseCard from "@/components/case/card/index.vue";
import Lister from "@/components/Lister";
import NewCaseForm from "@/components/case/edition/index";
import { TutorialCase } from "../../firebase/models/case";

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
    tutorialCases() {
      return this.cases.map(value => {
        let tutorialCase = new TutorialCase(value);
        tutorialCase.id = value.id;
        return tutorialCase;
      });
    },
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
      return this.tutorialCases.filter(item => {
        return item.status === "active";
      });
    },
    scheduledCases() {
      return this.tutorialCases.filter(item => {
        return item.status === "scheduled";
      });
    },
    finishedCases() {
      return this.tutorialCases.filter(item => {
        return item.status === "finished";
      });
    }
  }
};
</script>
