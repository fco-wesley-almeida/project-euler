<template>
  <v-card @click="didTapCard" color="card" class="pa-2">
    <v-card-title>{{receivedTutorialCase.title}}</v-card-title>
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
