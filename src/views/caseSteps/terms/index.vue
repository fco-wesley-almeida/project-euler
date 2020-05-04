<template>
  <v-layout wrap px-1 pb-5>
    <v-fade-transition mode="out-in">
      <component :is="shownComponent" :participants="participants" :tutorialCase="tutorialCase" style="margin-bottom: 76px" />
    </v-fade-transition>
    <v-bottom-navigation
      color="primary"
      background-color="secondary"
      fixed
      v-model="tab"
    >
      <v-btn>
        <span>Conteúdo</span>
        <v-icon>book</v-icon>
      </v-btn>

      <v-btn>
        <span>Individual</span>
        <v-icon>person</v-icon>
      </v-btn>

      <v-btn>
        <span>Geral</span>
        <v-icon>view_list</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </v-layout>
</template>

<script>
import Content from "@/views/caseDetails/content";
import Individual from "./individual";
import Ranking from "./ranking";

  export default {
    name: 'Step1',
    components: {Content, Individual, Ranking},
    data: () => ({
      activationDialog: false,
      tab: 1,
      tabs: [Content, Individual, Ranking]
    }),
    props: {
      tutorialCase: Object,
      participants: Array
    },
    computed: {
      shownComponent() {
        return this.tabs[this.tab];
      },
      hasRanking() {
        return this.tutorialCase.currentStep > 1;
      }
    }
  };
</script>
