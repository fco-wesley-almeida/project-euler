<template>
  <v-layout>
    <v-fade-transition mode="out-in">
      <component
        :is="shownComponent"
        :participants="participants"
        :tutorialCase="tutorialCase"
        :content="tutorialCase.content"
        :class="tab == 0 ? 'mx-2 mt-2' : '' "
        style="margin-bottom: 76px"
      />
    </v-fade-transition>
    <v-bottom-navigation color="primary" background-color="secondary" fixed v-model="tab">
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
import CaseContent from "@/components/case/content";
import Individual from "./individual";
import Ranking from "./ranking";

export default {
  name: "Step1",
  components: { CaseContent, Individual, Ranking },
  data: () => ({
    activationDialog: false,
    tab: 1,
    tabs: [CaseContent, Individual, Ranking]
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
