<template>
  <v-layout align-center justify-center wrap>
    <v-flex xs12 fill-height>
      <v-fade-transition>
      <component :is="shownComponent" :tutorialCase="tutorialCase" :participants="participants" />
      </v-fade-transition>
    </v-flex>
    <v-btn v-if="showsPreviousButton" @click.native.stop="didTapPrevious" small fab style="position: fixed; left: 16px; top: 50%">
      <v-icon color="primary">navigate_before</v-icon>
    </v-btn>
    <v-btn v-if="showsNextButton" @click="didTapNext" small fab style="position: fixed; right: 16px; top: 50%">
      <v-icon color="primary">navigate_next</v-icon>
    </v-btn>
  </v-layout>
</template>

<script>
import { db } from "@/firebase/config";
import TermStep from "@/views/caseSteps/terms/index";
import GroupStep from "@/views/caseSteps/group/index";
import IndividualStep from "@/views/caseSteps/individual/index";

export default {
  components: { TermStep },
  data: () => ({
    tutorialCase: {},
    participants: [],
    groups: [],
    shownStep: 1
  }),
  methods: {
    didTapNext() {
      this.$store.state.app.currentStep = "Passo " + (this.shownStep+1);
      this.$router.push({name: 'CaseStep', params: {...this.$route.params, step: this.shownStep+1}});
    },
    didTapPrevious() {
      this.$store.state.app.currentStep = "Passo " + (this.shownStep-1);
      this.$router.push({name: 'CaseStep', params: {...this.$route.params, step: this.shownStep-1}});
    }
  },
  mounted() {
    this.shownStep = this.$route.params.step;
    this.$bind(
      "groups",
      db.collection(`cases/${this.$route.params.caseID}/groups`)
    );
    this.$bind("tutorialCase", db.doc(`cases/${this.$route.params.caseID}`));
    this.$bind(
      "participants",
      db
        .collection("users")
        .where("tutorials", "array-contains", this.$route.params.tutorialID)
    );
  },
  watch: {
    $route(val) {
      this.shownStep = this.$route.params.step;
    }
  },
  computed: {
    shownComponent() {
      if (this.shownStep == 1) {
        return TermStep;
      }
      if (this.shownStep == 6) {
        return IndividualStep;
      }
      return GroupStep;
    },
    showsNextButton() {
      return this.shownStep < this.tutorialCase.currentStep;
    },
    showsPreviousButton() {
      return this.shownStep > 1;
    }
  }
};
</script>

<style>

.fade-transition {
   transition: opacity 1s ease;
 }

.fade-enter, .fade-leave {
  opacity: 0;
}
</style>
