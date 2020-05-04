<template>
  <v-card elevation="10" @click="didTapCard" color="primary" dark class="pa-2">
    <v-card-title>{{receivedTutorialCase.title}}</v-card-title>
    <v-card-subtitle>
      <div>Passo atual: {{(receivedTutorialCase.currentStep || 1) + " / 9"}}</div>
      <v-progress-linear color="white" class="mt-1" :value="((receivedTutorialCase.currentStep || 1.0)/9.0)*100" />
    </v-card-subtitle>
  </v-card>
</template>

<script>
import Vue from "vue";

export default Vue.extend({
  name: "TutorialCaseCard",
  props: {
    tutorialCase: Object,
    canBeActive: Boolean
  },
  computed: {
    receivedTutorialCase() {
      return this.$props.tutorialCase;
    }
  },
  methods: {
    didTapCard() {
      this.$store.state.app.currentCaseName = this.receivedTutorialCase.title;
      this.$router.push({
        name: "CaseSteps",
        params: {
          tutorialID: this.$route.params.tutorialID,
          caseID: this.tutorialCase.id
        }
      });
    }
  }
});
</script>
